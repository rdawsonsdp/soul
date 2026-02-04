import { NextRequest, NextResponse } from 'next/server';
import { createCateringDraftOrder } from '@/lib/shopify';

interface CreateOrderRequest {
  lineItems: Array<{ variantId: string; quantity: number }>;
  headcount: number;
  eventType: string;
  buyerInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
    eventDate: string;
    notes?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();

    // Validate required fields
    if (!body.lineItems || body.lineItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in order' },
        { status: 400 }
      );
    }

    if (!body.headcount || body.headcount < 1) {
      return NextResponse.json(
        { success: false, error: 'Invalid headcount' },
        { status: 400 }
      );
    }

    if (!body.buyerInfo?.email) {
      return NextResponse.json(
        { success: false, error: 'Buyer email is required' },
        { status: 400 }
      );
    }

    // Check if Shopify is configured
    const shopifyConfigured =
      process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

    if (!shopifyConfigured) {
      // Return mock response for development
      console.log('Mock order created (Shopify not configured):', body);
      return NextResponse.json({
        success: true,
        draftOrderId: 'mock-order-123',
        draftOrderNumber: '#MOCK-1001',
        invoiceUrl: 'https://example.com/mock-invoice',
      });
    }

    // Create the draft order in Shopify
    const result = await createCateringDraftOrder(
      body.lineItems,
      body.headcount,
      body.eventType,
      body.buyerInfo
    );

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Error creating catering order:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
