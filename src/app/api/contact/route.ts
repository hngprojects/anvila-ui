import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/consts";
import { contactSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 422 }
      );
    }

    const backendPayload = {
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
      // enquiry_type: parsed.data.enquiryType,
    };

    const res = await fetch(`${BACKEND_URL}/api/v1/leads/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.detail ?? data.message ?? "Failed to submit contact form" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
