import { NextRequest, NextResponse } from 'next/server';
import { EventType } from '@/lib/types';
import { getProductsByEventType } from '@/lib/products';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const eventType = searchParams.get('eventType') as EventType | null;

    // Get products from local data, filtered by event type if specified
    const products = getProductsByEventType(eventType);

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error in catering-products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', products: [] },
      { status: 500 }
    );
  }
}
