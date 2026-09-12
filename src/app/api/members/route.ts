/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { fetchCloudData, saveCloudData } from "@/lib/cloudDb";

export async function GET() {
  try {
    const cloud = await fetchCloudData();
    return NextResponse.json(cloud.members);
  } catch (error) {
    console.error("GET Members Error:", error);
    return NextResponse.json({ error: "Failed to load members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cloud = await fetchCloudData();
    let members = cloud.members;

    if (Array.isArray(body)) {
      // Merge full array by ID, preserving latest items
      const map = new Map<string, any>();
      members.forEach((m: any) => map.set(m.id, m));
      body.forEach((m: any) => map.set(m.id, m));
      members = Array.from(map.values());
    } else if (body && typeof body === "object" && body.id) {
      // Add or update single member
      const map = new Map<string, any>();
      map.set(body.id, body);
      members.forEach((m: any) => {
        if (!map.has(m.id)) {
          map.set(m.id, m);
        }
      });
      members = Array.from(map.values());
    }

    await saveCloudData({ ...cloud, members });
    return NextResponse.json(members);
  } catch (error) {
    console.error("POST Members Error:", error);
    return NextResponse.json({ error: "Failed to save member" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const cloud = await fetchCloudData();

    if (!body.id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const map = new Map<string, any>();
    cloud.members.forEach((m: any) => map.set(m.id, m));
    
    const existing = map.get(body.id) || {};
    map.set(body.id, { ...existing, ...body });

    const updatedMembers = Array.from(map.values());
    await saveCloudData({ ...cloud, members: updatedMembers });
    return NextResponse.json(updatedMembers);
  } catch (error) {
    console.error("PUT Members Error:", error);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const cloud = await fetchCloudData();
    const updatedMembers = cloud.members.filter((m: any) => m.id !== id);

    await saveCloudData({ ...cloud, members: updatedMembers });
    return NextResponse.json(updatedMembers);
  } catch (error) {
    console.error("DELETE Members Error:", error);
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
