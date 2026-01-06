import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    // We now expect 'bookingType' from the frontend
    const { slotId, bookingType } = await request.json()

    // LOGIC: Set Price based on Type
    // Online = $35.00, In-Person = $55.00
    const priceAmount = bookingType === 'in_person' ? 5500 : 3500;
    const title = bookingType === 'in_person' 
        ? 'In-Person Tutoring (Ottawa)' 
        : 'Online Video Tutoring';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad', // Changed to Canadian Dollars
            product_data: {
              name: title,
            },
            unit_amount: priceAmount, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // We pass the type back so we can save it to the database later
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&slot_id=${slotId}&type=${bookingType}`,
      cancel_url: `${request.headers.get('origin')}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}