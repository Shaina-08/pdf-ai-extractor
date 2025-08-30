import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, AnalysisRecord } from '../../../lib/supabase';

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 100;
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'patient_name' | 'file_name';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  fileType?: string;
  dateFrom?: string;
  dateTo?: string;
}

function validateQueryParams(searchParams: URLSearchParams): Required<Pick<QueryParams, 'page' | 'limit'>> & Partial<QueryParams> {
  const params: Required<Pick<QueryParams, 'page' | 'limit'>> & Partial<QueryParams> = {
    page: 1,
    limit: 20
  };
  
  const page = parseInt(searchParams.get('page') || '1');
  params.page = page > 0 ? page : 1;
  
  const limit = parseInt(searchParams.get('limit') || '20');
  params.limit = limit > 0 && limit <= 100 ? limit : 20;
  
  const sortBy = searchParams.get('sortBy');
  if (sortBy && ['created_at', 'patient_name', 'file_name'].includes(sortBy)) {
    params.sortBy = sortBy as QueryParams['sortBy'];
  }
  
  const sortOrder = searchParams.get('sortOrder');
  if (sortOrder && ['asc', 'desc'].includes(sortOrder)) {
    params.sortOrder = sortOrder as QueryParams['sortOrder'];
  }
  
  const search = searchParams.get('search');
  if (search && search.length <= 100) {
    params.search = search.replace(/[<>'"]/g, '');
  }
  
  const fileType = searchParams.get('fileType');
  if (fileType && ['pdf', 'doc', 'docx', 'txt'].includes(fileType.toLowerCase())) {
    params.fileType = fileType.toLowerCase();
  }
  
  const dateFrom = searchParams.get('dateFrom');
  if (dateFrom && !isNaN(Date.parse(dateFrom))) {
    params.dateFrom = dateFrom;
  }
  
  const dateTo = searchParams.get('dateTo');
  if (dateTo && !isNaN(Date.parse(dateTo))) {
    params.dateTo = dateTo;
  }
  
  return params;
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

function sanitizeAnalysisRecord(record: AnalysisRecord): Partial<AnalysisRecord> {
  return {
    id: record.id,
    patient_name: record.patient_name ? `${record.patient_name.charAt(0)}***` : null,
    date_of_birth: record.date_of_birth ? '***' : null,
    patient_id: record.patient_id ? `${record.patient_id.substring(0, 3)}***` : null,
    insurance_provider: record.insurance_provider,
    original_text: record.original_text ? record.original_text.substring(0, 200) + '...' : null,
    file_name: record.file_name,
    file_type: record.file_type,
    file_url: record.file_url,
    file_size: record.file_size,
    created_at: record.created_at,
    updated_at: record.updated_at
  };
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();
  
  try {
    console.log(`[${requestId}] GET /api/get-history started`, {
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      referer: request.headers.get('referer')
    });

    if (!isSupabaseConfigured()) {
      console.error(`[${requestId}] Supabase not configured`);
      return NextResponse.json(
        { 
          error: 'Service temporarily unavailable',
          requestId,
          details: 'Please try again later'
        },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(clientIp)) {
      console.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { 
          error: 'Too many requests',
          requestId,
          details: 'Please try again later',
          retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(RATE_LIMIT_WINDOW / 1000).toString(),
            'X-RateLimit-Limit': MAX_REQUESTS_PER_WINDOW.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString()
          }
        }
      );
    }

    // Validate and parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const params = validateQueryParams(searchParams);

    let query = supabase!
      .from('analysis_records')
      .select('*', { count: 'exact' });

    if (params.search) {
      query = query.or(`patient_name.ilike.%${params.search}%,file_name.ilike.%${params.search}%`);
    }

    if (params.fileType) {
      query = query.eq('file_type', params.fileType);
    }

    if (params.dateFrom) {
      query = query.gte('created_at', params.dateFrom);
    }
    if (params.dateTo) {
      query = query.lte('created_at', params.dateTo);
    }

    const sortBy = params.sortBy || 'created_at';
    const sortOrder = params.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    const offset = (params.page - 1) * params.limit;
    query = query.range(offset, offset + params.limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error(`[${requestId}] Supabase error:`, error);
      return NextResponse.json(
        { 
          error: 'Failed to fetch analysis history',
          requestId,
          details: 'Database operation failed'
        },
        { status: 500 }
      );
    }

    // Sanitize sensitive data
    const sanitizedData = (data || []).map(sanitizeAnalysisRecord);

    const totalPages = count ? Math.ceil(count / params.limit) : 0;
    const hasNextPage = params.page < totalPages;
    const hasPrevPage = params.page > 1;

    const responseTime = Date.now() - startTime;
    
    console.log(`[${requestId}] GET /api/get-history completed`, {
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      recordsReturned: sanitizedData.length,
      totalRecords: count,
      page: params.page,
      limit: params.limit
    });

    return NextResponse.json(
      { 
        success: true,
        requestId,
        data: sanitizedData,
        pagination: {
          page: params.page,
          limit: params.limit,
          totalRecords: count,
          totalPages,
          hasNextPage,
          hasPrevPage
        },
        meta: {
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString()
        }
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'private, max-age=60, s-maxage=60',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'X-Request-ID': requestId
        }
      }
    );

  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    console.error(`[${requestId}] Get history error:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        error: 'Internal server error',
        requestId,
        details: 'An unexpected error occurred'
      },
      { 
        status: 500,
        headers: {
          'X-Request-ID': requestId
        }
      }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
