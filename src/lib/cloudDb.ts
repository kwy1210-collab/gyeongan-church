/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs/promises";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var activeCloudObjectId: string | undefined;
}

const DEFAULT_CLOUD_OBJECT_ID = "ff808181a04ccf2d01a051e81cf11590";

function getCloudUrl() {
  const id = globalThis.activeCloudObjectId || DEFAULT_CLOUD_OBJECT_ID;
  return `https://api.restful-api.dev/objects/${id}`;
}

const membersFilePath = path.join(process.cwd(), "data", "members.json");
const visitationsFilePath = path.join(process.cwd(), "data", "visitations.json");

const INITIAL_MEMBERS = [
  {
    id: "m-1",
    name: "홍길동",
    phone: "010-1234-5678",
    position: "집사",
    district: "1구역",
    birthdate: "1980-05-15",
    address: "경기도 광주시 경안동 123-45",
    familyNotes: "배우자: 김영희 (집사), 자녀 2명 (민수, 지은)",
    notes: "찬양대 봉사 중, 주일예배 참석 성실",
    createdAt: "2026-01-10",
  },
  {
    id: "m-2",
    name: "김성결",
    phone: "010-9876-5432",
    position: "권사",
    district: "2구역",
    birthdate: "1965-11-20",
    address: "경기도 광주시 송정동 88-1",
    familyNotes: "자녀 직장 관계로 독거 중",
    notes: "구역장 봉사 중, 새벽기도회 매일 참석",
    createdAt: "2026-01-15",
  },
  {
    id: "m-3",
    name: "이은혜",
    phone: "010-5555-7777",
    position: "성도",
    district: "3구역",
    birthdate: "1992-03-08",
    address: "경기도 광주시 태전동 아파트 101동",
    familyNotes: "신혼 가구, 남편 (박믿음 성도)",
    notes: "올해 초 등록, 교사 봉사 희망",
    createdAt: "2026-03-01",
  },
  {
    id: "m-4",
    name: "박믿음",
    phone: "010-3333-2222",
    position: "장로",
    district: "1구역",
    birthdate: "1958-08-30",
    address: "경기도 광주시 경안동 45-6",
    familyNotes: "배우자: 최순희 (권사)",
    notes: "재정부장 봉사 중",
    createdAt: "2026-01-01",
  },
];

const INITIAL_VISITATIONS = [
  {
    id: "v-1",
    memberId: "m-1",
    memberName: "홍길동",
    date: "2026-07-20",
    visitor: "담임목사",
    type: "정기심방",
    scripture: "시편 23편 1-6절",
    prayerRequests: "자녀 입시 준비 및 가정의 영육간 건강",
    notes: "가족 모두 영적으로 단합되어 있으며, 직장 사업장에 하나님의 은혜가 함께하기를 기도 드림.",
    createdAt: "2026-07-20",
  },
  {
    id: "v-2",
    memberId: "m-2",
    memberName: "김성결",
    date: "2026-07-25",
    visitor: "담임목사, 여전도회장",
    type: "환우심방",
    scripture: "이사야 41장 10절",
    prayerRequests: "관절 수술 후 쾌유 및 마음의 평안",
    notes: "수술 결과 경과 양호함. 통증 감소 및 조속한 회복을 위해 함께 합심 기도함.",
    createdAt: "2026-07-25",
  },
  {
    id: "v-3",
    memberId: "m-3",
    memberName: "이은혜",
    date: "2026-07-28",
    visitor: "구역장",
    type: "신규등록 심방",
    scripture: "여호수아 1장 9절",
    prayerRequests: "새로운 교회 적응과 가정의 믿음 바로 세우기",
    notes: "새 교우로서 경안교회 공동체에 잘 안착하고 있으며, 새가족 교육 수료 독려함.",
    createdAt: "2026-07-28",
  },
];

export async function fetchCloudData(): Promise<{ members: any[]; visitations: any[] }> {
  try {
    const res = await fetch(getCloudUrl(), { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data.members) && Array.isArray(json.data.visitations)) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn("Fetch cloud data failed, falling back to local files:", err);
  }

  // Local file fallback
  let members = INITIAL_MEMBERS;
  let visitations = INITIAL_VISITATIONS;

  try {
    const mData = await fs.readFile(membersFilePath, "utf-8");
    members = JSON.parse(mData);
  } catch {}

  try {
    const vData = await fs.readFile(visitationsFilePath, "utf-8");
    visitations = JSON.parse(vData);
  } catch {}

  return { members, visitations };
}

export async function saveCloudData(data: { members: any[]; visitations: any[] }) {
  // 1. Local disk save attempt
  try {
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(membersFilePath, JSON.stringify(data.members, null, 2), "utf-8");
    await fs.writeFile(visitationsFilePath, JSON.stringify(data.visitations, null, 2), "utf-8");
  } catch (e) {
    console.warn("Local disk write skipped:", e);
  }

  // 2. Cloud DB update with auto-creation fallback
  try {
    const res = await fetch(getCloudUrl(), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "gyeongan_church_master_db",
        data,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      // Re-create cloud object if current object expired or error
      const createRes = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "gyeongan_church_master_db",
          data,
        }),
      });
      if (createRes.ok) {
        const created = await createRes.json();
        if (created.id) {
          globalThis.activeCloudObjectId = created.id;
        }
      }
    }
  } catch (err) {
    console.error("Cloud DB write failed:", err);
  }
}
