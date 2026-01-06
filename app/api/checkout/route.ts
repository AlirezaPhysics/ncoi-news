import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const { slotId, bookingType, fileUrl, description } = await request.json()

    let price = 3500 // Default Online
    let name = 'Online Tutoring Session'

    if (bookingType === 'in_person') {
        price = 5500
        name = 'In-Person Session (Ottawa)'
    } else if (bookingType === 'quick') {
        price = 2000 // $20.00
        name = 'Quick Question (Async Help)'
    }

    // Build the success URL differently for questions
    // We encode the file/desc into the URL so the Success Page can save it
    const successBase = `${request.headers.get('origin')}/success`
    let queryString = `?session_id={CHECKOUT_SESSION_ID}&type=${bookingType}`
    
    if (bookingType === 'quick') {
        // Pass the file and description to success page
        queryString += `&file=${encodeURIComponent(fileUrl)}&desc=${encodeURIComponent(description || '')}`
    } else {
        queryString += `&slot_id=${slotId}`
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: { name: name },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successBase + queryString,
      cancel_url: `${request.headers.get('origin')}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}