import { NextRequest, NextResponse } from 'next/server';
import { getAppData, saveAppData, Order } from '@/lib/db';

// Create a new order
export async function POST(request: NextRequest) {
    try {
        const orderData = await request.json();

        // Get existing data
        const data = await getAppData();

        // Create new order
        const newOrder: Order = {
            id: orderData.id || Math.random().toString(36).substr(2, 8).toUpperCase(),
            date: orderData.date || new Date().toISOString(),
            status: 'pending',
            customer: orderData.customer,
            shippingAddress: orderData.shippingAddress,
            items: orderData.items,
            subtotal: orderData.subtotal,
            discount: orderData.discount || 0,
            couponCode: orderData.couponCode,
            shipping: orderData.shipping,
            total: orderData.total
        };

        // Add to orders array
        data.orders = [newOrder, ...(data.orders || [])];

        // Save updated data
        await saveAppData(data);

        return NextResponse.json({
            success: true,
            order: newOrder,
            message: 'Order created successfully'
        });

    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: `Failed to create order: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}

// Get all orders
export async function GET() {
    try {
        const data = await getAppData();

        return NextResponse.json({
            success: true,
            orders: data.orders || [],
            count: (data.orders || []).length
        });
    } catch (error) {
        console.error('Error loading orders:', error);
        return NextResponse.json(
            { error: 'Failed to load orders' },
            { status: 500 }
        );
    }
}

// Update order status
export async function PATCH(request: NextRequest) {
    try {
        const { orderId, status } = await request.json();

        if (!orderId || !status) {
            return NextResponse.json(
                { error: 'Order ID and status are required' },
                { status: 400 }
            );
        }

        const data = await getAppData();

        const orderIndex = data.orders.findIndex(o => o.id === orderId);
        if (orderIndex === -1) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        data.orders[orderIndex].status = status;
        await saveAppData(data);

        return NextResponse.json({
            success: true,
            order: data.orders[orderIndex],
            message: 'Order status updated'
        });

    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { error: `Failed to update order: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}
