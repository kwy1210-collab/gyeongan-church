/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { fetchCloudData, saveCloudData } from "@/lib/cloudDb";

export async function GET() {
  try {
    const cloud = await fetchCloudData();
    return NextResponse.json(cloud.visitations);
  } catch (error) {
    console.error("GET Visitations Error:", error);
    return NextResponse.json({ error: "Failed to load visitations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cloud = await fetchCloudData();
    let visitations = cloud.visitations;

    if (Array.isArray(body)) {
      visitations = body;
    } else if (body && typeof body === "object") {
      visitations = [body, ...visitations];
    }

    await saveCloudData({ ...cloud, visitations });
    return NextResponse.json(visitations);
  } catch (error) {
    console.error("POST Visitations Error:", error);
    return NextResponse.json({ error: "Failed to save visitation" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const cloud = await fetchCloudData();

    if (!body.id) {
      return NextResponse.json({ error: "Visitation ID is required" }, { status: 400 });
    }

    const updatedVisitations = cloud.visitations.map((v: any) => (v.id === body.id ? { ...v, ...body } : v));
    await saveCloudData({ ...cloud, visitations: updatedVisitations });
    return NextResponse.json(updatedVisitations);
  } catch (error) {
    console.error("PUT Visitations Error:", error);
    return NextResponse.json({ error: "Failed to update visitation" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const memberId = searchParams.get("memberId");

    const cloud = await fetchCloudData();
    let visitations = cloud.visitations;

    if (id) {
      visitations = visitations.filter((v: any) => v.id !== id);
    } else if (memberId) {
      visitations = visitations.filter((v: any) => v.memberId !== memberId);
    } else {
      return NextResponse.json({ error: "Visitation ID or Member ID is required" }, { status: 400 });
    }

    await saveCloudData({ ...cloud, visitations });
    return NextResponse.json(visitations);
  } catch (error) {
    console.error("DELETE Visitations Error:", error);
    return NextResponse.json({ error: "Failed to delete visitation" }, { status: 500 });
  }
}
