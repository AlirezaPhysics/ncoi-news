import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe securely
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const { slotId, tutorName } = await request.json()

    // 1. Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Tutoring Session with ${tutorName || 'Tutor'}`,
            },
            unit_amount: 2000, // $20.00 (in cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Where to go after payment?
      // We pass the slotId so we know which slot to book after they pay
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&slot_id=${slotId}`,
      cancel_url: `${request.headers.get('origin')}/`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}