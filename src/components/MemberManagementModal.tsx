"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  UserPlus,
  Calendar,
  FileText,
  Phone,
  MapPin,
  Heart,
  Users,
  Edit2,
  Trash2,
  Plus,
  BookOpen,
  CheckCircle,
  Filter,
  UserCheck,
  ChevronRight,
} from "lucide-react";

export interface Member {
  id: string;
  name: string;
  phone: string;
  position: string; // 직분 (장로, 권사, 집사, 성도 등)
  district: string; // 구역 (1구역, 2구역 등)
  birthdate?: string;
  address?: string;
  familyNotes?: string;
  notes?: string;
  createdAt: string;
}

export interface VisitationRecord {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  visitor: string; // 심방자 (담임목사, 교구장 등)
  type: string; // 심방 종류 (정기심방, 환우심방, 위로심방, 감사심방 등)
  scripture: string; // 말씀/본문
  prayerRequests: string; // 기도제목
  notes: string; // 심방 내용
  createdAt: string;
}

const INITIAL_MEMBERS: Member[] = [
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

const INITIAL_VISITATIONS: VisitationRecord[] = [
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberManagementModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"members" | "visitations" | "stats">("members");
  const [members, setMembers] = useState<Member[]>([]);
  const [visitations, setVisitations] = useState<VisitationRecord[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("전체");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Modals for Member Add/Edit
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [memberFormData, setMemberFormData] = useState<Partial<Member>>({
    name: "",
    phone: "",
    position: "성도",
    district: "1구역",
    birthdate: "",
    address: "",
    familyNotes: "",
    notes: "",
  });

  // Modals for Visitation Add/Edit
  const [isVisitationFormOpen, setIsVisitationFormOpen] = useState(false);
  const [editingVisitation, setEditingVisitation] = useState<VisitationRecord | null>(null);
  const [visitationFormData, setVisitationFormData] = useState<Partial<VisitationRecord>>({
    memberId: "",
    memberName: "",
    date: new Date().toISOString().split("T")[0],
    visitor: "담임목사",
    type: "정기심방",
    scripture: "",
    prayerRequests: "",
    notes: "",
  });

  // Load from localStorage or set defaults
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMembers = localStorage.getItem("gyeongan_church_members");
      const savedVisitations = localStorage.getItem("gyeongan_church_visitations");

      if (savedMembers) {
        try {
          const parsed = JSON.parse(savedMembers);
          setMembers(parsed);
          if (parsed.length > 0) setSelectedMemberId(parsed[0].id);
        } catch {
          setMembers(INITIAL_MEMBERS);
          setSelectedMemberId(INITIAL_MEMBERS[0].id);
        }
      } else {
        setMembers(INITIAL_MEMBERS);
        localStorage.setItem("gyeongan_church_members", JSON.stringify(INITIAL_MEMBERS));
        setSelectedMemberId(INITIAL_MEMBERS[0].id);
      }

      if (savedVisitations) {
        try {
          setVisitations(JSON.parse(savedVisitations));
        } catch {
          setVisitations(INITIAL_VISITATIONS);
        }
      } else {
        setVisitations(INITIAL_VISITATIONS);
        localStorage.setItem("gyeongan_church_visitations", JSON.stringify(INITIAL_VISITATIONS));
      }
    }
  }, []);

  // Save changes to localStorage
  const saveMembersToStorage = (newMembers: Member[]) => {
    setMembers(newMembers);
    localStorage.setItem("gyeongan_church_members", JSON.stringify(newMembers));
  };

  const saveVisitationsToStorage = (newVisitations: VisitationRecord[]) => {
    setVisitations(newVisitations);
    localStorage.setItem("gyeongan_church_visitations", JSON.stringify(newVisitations));
  };

  if (!isOpen) return null;

  // Districts list for filtering
  const districts = ["전체", ...Array.from(new Set(members.map((m) => m.district || "기타")))];

  // Filtered members
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.includes(searchQuery) ||
      m.phone.includes(searchQuery) ||
      m.position.includes(searchQuery) ||
      (m.notes && m.notes.includes(searchQuery));
    const matchesDistrict = selectedDistrict === "전체" || m.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const currentSelectedMember = members.find((m) => m.id === selectedMemberId) || filteredMembers[0] || null;
  const currentMemberVisitations = visitations.filter((v) => v.memberId === currentSelectedMember?.id);

  // Filtered Visitations
  const filteredVisitations = visitations.filter(
    (v) =>
      v.memberName.includes(searchQuery) ||
      v.type.includes(searchQuery) ||
      v.visitor.includes(searchQuery) ||
      v.scripture.includes(searchQuery) ||
      v.prayerRequests.includes(searchQuery) ||
      v.notes.includes(searchQuery)
  );

  // Save Member Handler
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberFormData.name || !memberFormData.phone) {
      alert("이름과 연락처는 필수 항목입니다.");
      return;
    }

    if (editingMember) {
      const updated = members.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              ...memberFormData,
              name: memberFormData.name!,
              phone: memberFormData.phone!,
              position: memberFormData.position || "성도",
              district: memberFormData.district || "1구역",
            }
          : m
      );
      saveMembersToStorage(updated);
    } else {
      const newMember: Member = {
        id: `m-${Date.now()}`,
        name: memberFormData.name!,
        phone: memberFormData.phone!,
        position: memberFormData.position || "성도",
        district: memberFormData.district || "1구역",
        birthdate: memberFormData.birthdate || "",
        address: memberFormData.address || "",
        familyNotes: memberFormData.familyNotes || "",
        notes: memberFormData.notes || "",
        createdAt: new Date().toISOString().split("T")[0],
      };
      const updated = [newMember, ...members];
      saveMembersToStorage(updated);
      setSelectedMemberId(newMember.id);
    }

    setIsMemberFormOpen(false);
    setEditingMember(null);
    resetMemberForm();
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("정말로 이 성도 정보를 삭제하시겠습니까? 관련 심방 기록도 함께 정리될 수 있습니다.")) {
      const updatedMembers = members.filter((m) => m.id !== id);
      saveMembersToStorage(updatedMembers);
      if (selectedMemberId === id) {
        setSelectedMemberId(updatedMembers[0]?.id || null);
      }
    }
  };

  const resetMemberForm = () => {
    setMemberFormData({
      name: "",
      phone: "",
      position: "성도",
      district: "1구역",
      birthdate: "",
      address: "",
      familyNotes: "",
      notes: "",
    });
  };

  const openAddMemberModal = () => {
    setEditingMember(null);
    resetMemberForm();
    setIsMemberFormOpen(true);
  };

  const openEditMemberModal = (member: Member) => {
    setEditingMember(member);
    setMemberFormData(member);
    setIsMemberFormOpen(true);
  };

  // Save Visitation Handler
  const handleSaveVisitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitationFormData.memberId || !visitationFormData.notes) {
      alert("성도 선택과 심방 메모는 필수 항목입니다.");
      return;
    }

    const targetMember = members.find((m) => m.id === visitationFormData.memberId);
    const memberName = targetMember ? targetMember.name : visitationFormData.memberName || "미지정";

    if (editingVisitation) {
      const updated = visitations.map((v) =>
        v.id === editingVisitation.id
          ? {
              ...v,
              ...visitationFormData,
              memberName,
              date: visitationFormData.date || new Date().toISOString().split("T")[0],
              visitor: visitationFormData.visitor || "담임목사",
              type: visitationFormData.type || "정기심방",
              scripture: visitationFormData.scripture || "",
              prayerRequests: visitationFormData.prayerRequests || "",
              notes: visitationFormData.notes || "",
            }
          : v
      );
      saveVisitationsToStorage(updated);
    } else {
      const newRecord: VisitationRecord = {
        id: `v-${Date.now()}`,
        memberId: visitationFormData.memberId!,
        memberName,
        date: visitationFormData.date || new Date().toISOString().split("T")[0],
        visitor: visitationFormData.visitor || "담임목사",
        type: visitationFormData.type || "정기심방",
        scripture: visitationFormData.scripture || "",
        prayerRequests: visitationFormData.prayerRequests || "",
        notes: visitationFormData.notes || "",
        createdAt: new Date().toISOString().split("T")[0],
      };
      const updated = [newRecord, ...visitations];
      saveVisitationsToStorage(updated);
    }

    setIsVisitationFormOpen(false);
    setEditingVisitation(null);
    resetVisitationForm();
  };

  const handleDeleteVisitation = (id: string) => {
    if (confirm("이 심방 기록을 삭제하시겠습니까?")) {
      const updated = visitations.filter((v) => v.id !== id);
      saveVisitationsToStorage(updated);
    }
  };

  const resetVisitationForm = () => {
    setVisitationFormData({
      memberId: currentSelectedMember?.id || "",
      memberName: currentSelectedMember?.name || "",
      date: new Date().toISOString().split("T")[0],
      visitor: "담임목사",
      type: "정기심방",
      scripture: "",
      prayerRequests: "",
      notes: "",
    });
  };

  const openAddVisitationForMember = (memberId?: string) => {
    const mId = memberId || currentSelectedMember?.id || members[0]?.id || "";
    const m = members.find((x) => x.id === mId);
    setEditingVisitation(null);
    setVisitationFormData({
      memberId: mId,
      memberName: m ? m.name : "",
      date: new Date().toISOString().split("T")[0],
      visitor: "담임목사",
      type: "정기심방",
      scripture: "",
      prayerRequests: "",
      notes: "",
    });
    setIsVisitationFormOpen(true);
  };

  const openEditVisitationModal = (rec: VisitationRecord) => {
    setEditingVisitation(rec);
    setVisitationFormData(rec);
    setIsVisitationFormOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden text-stone-800">
        {/* Header */}
        <div className="bg-stone-900 text-white px-5 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-inner">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">성도 & 심방 관리 시스템</h2>
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-amber-500/30">
                  경안교회
                </span>
              </div>
              <p className="text-xs text-stone-400">교인 명단 관리 및 목양 심방 기록 통합 솔루션</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Tabs */}
        <div className="bg-stone-50 border-b border-stone-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center bg-stone-200/70 p-1 rounded-xl gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab("members")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${
                activeTab === "members"
                  ? "bg-white text-amber-900 shadow-sm font-bold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Users className="w-4 h-4 text-amber-700" />
              <span>성도 목록</span>
              <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.2 rounded-full">
                {members.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("visitations")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${
                activeTab === "visitations"
                  ? "bg-white text-amber-900 shadow-sm font-bold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>심방 내역</span>
              <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.2 rounded-full">
                {visitations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${
                activeTab === "stats"
                  ? "bg-white text-amber-900 shadow-sm font-bold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <FileText className="w-4 h-4 text-amber-700" />
              <span>요약/통계</span>
            </button>
          </div>

          {/* Search Input & Action Buttons */}
          <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder={activeTab === "visitations" ? "심방내용, 성도명 검색..." : "이름, 연락처, 직분 검색..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {activeTab === "members" && (
              <button
                onClick={openAddMemberModal}
                className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>성도 등록</span>
              </button>
            )}

            {activeTab === "visitations" && (
              <button
                onClick={() => openAddVisitationForMember()}
                className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>심방 작성</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden bg-white">
          {/* TAB 1: MEMBERS */}
          {activeTab === "members" && (
            <div className="h-full flex flex-col md:flex-row">
              {/* Left Column: Member List */}
              <div className="w-full md:w-5/12 border-r border-stone-200 flex flex-col h-full bg-stone-50/50">
                {/* District Filter Bar */}
                <div className="p-3 border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-xs bg-white">
                  <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  {districts.map((dist) => (
                    <button
                      key={dist}
                      onClick={() => setSelectedDistrict(dist)}
                      className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 font-medium ${
                        selectedDistrict === dist
                          ? "bg-amber-800 text-white"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {dist}
                    </button>
                  ))}
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                  {filteredMembers.length === 0 ? (
                    <div className="py-12 text-center text-stone-400 text-xs">
                      검색 조건에 해당되는 성도가 없습니다.
                    </div>
                  ) : (
                    filteredMembers.map((m) => {
                      const isSelected = m.id === (currentSelectedMember?.id || selectedMemberId);
                      const visitCount = visitations.filter((v) => v.memberId === m.id).length;

                      return (
                        <div
                          key={m.id}
                          onClick={() => setSelectedMemberId(m.id)}
                          className={`p-3 rounded-xl cursor-pointer border transition-all ${
                            isSelected
                              ? "bg-amber-50/80 border-amber-400 shadow-sm"
                              : "bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-stone-900">{m.name}</span>
                              <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-md">
                                {m.position}
                              </span>
                              <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                                {m.district}
                              </span>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                isSelected ? "text-amber-800 translate-x-0.5" : "text-stone-300"
                              }`}
                            />
                          </div>

                          <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-stone-400" />
                              {m.phone}
                            </span>
                            {visitCount > 0 && (
                              <span className="text-amber-700 font-medium">심방 {visitCount}회</span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Member Detail View */}
              <div className="flex-1 h-full overflow-y-auto p-5 bg-white">
                {currentSelectedMember ? (
                  <div className="space-y-6">
                    {/* Top Info Card */}
                    <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                      <div className="absolute right-3 top-3 text-amber-500/10 pointer-events-none">
                        <Users className="w-32 h-32" />
                      </div>

                      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-extrabold">{currentSelectedMember.name}</h3>
                            <span className="bg-amber-500 text-stone-950 text-xs font-extrabold px-3 py-1 rounded-full">
                              {currentSelectedMember.position}
                            </span>
                            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                              {currentSelectedMember.district}
                            </span>
                          </div>
                          <p className="text-xs text-stone-300 mt-2 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>{currentSelectedMember.phone}</span>
                            {currentSelectedMember.birthdate && (
                              <>
                                <span className="mx-1">•</span>
                                <span>생년월일: {currentSelectedMember.birthdate}</span>
                              </>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditMemberModal(currentSelectedMember)}
                            className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>수정</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMember(currentSelectedMember.id)}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>삭제</span>
                          </button>
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
                        {currentSelectedMember.address && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{currentSelectedMember.address}</span>
                          </div>
                        )}
                        {currentSelectedMember.familyNotes && (
                          <div className="flex items-center gap-2">
                            <Heart className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{currentSelectedMember.familyNotes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Bar for member */}
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-800" />
                        <span>이 성도의 심방 기록 ({currentMemberVisitations.length}건)</span>
                      </h4>
                      <button
                        onClick={() => openAddVisitationForMember(currentSelectedMember.id)}
                        className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>심방 기록 추가</span>
                      </button>
                    </div>

                    {/* Member Visitation Log List */}
                    <div className="space-y-3">
                      {currentMemberVisitations.length === 0 ? (
                        <div className="bg-stone-50 border border-dashed border-stone-300 rounded-xl p-8 text-center">
                          <p className="text-stone-500 text-xs font-medium">등록된 심방 기록이 없습니다.</p>
                          <button
                            onClick={() => openAddVisitationForMember(currentSelectedMember.id)}
                            className="mt-2 text-amber-800 hover:underline text-xs font-bold"
                          >
                            + 첫 심방 내용 기록하기
                          </button>
                        </div>
                      ) : (
                        currentMemberVisitations.map((v) => (
                          <div
                            key={v.id}
                            className="bg-stone-50 border border-stone-200 rounded-xl p-4 hover:border-amber-300 transition-all space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="bg-amber-800 text-white text-xs px-2.5 py-0.5 rounded-md font-bold">
                                  {v.type}
                                </span>
                                <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                                  {v.date}
                                </span>
                                <span className="text-xs text-stone-500">({v.visitor})</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => openEditVisitationModal(v)}
                                  className="p-1 hover:bg-stone-200 text-stone-600 rounded"
                                  title="수정"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteVisitation(v.id)}
                                  className="p-1 hover:bg-red-100 text-red-600 rounded"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {v.scripture && (
                              <p className="text-xs font-semibold text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-100">
                                📖 말씀: {v.scripture}
                              </p>
                            )}

                            {v.prayerRequests && (
                              <p className="text-xs text-stone-700 bg-white p-2 rounded-lg border border-stone-200">
                                <span className="font-bold text-amber-800">기도제목:</span> {v.prayerRequests}
                              </p>
                            )}

                            <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line pl-1">
                              {v.notes}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-stone-400 text-xs">
                    성도를 선택해 주세요.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: VISITATIONS OVERALL */}
          {activeTab === "visitations" && (
            <div className="h-full overflow-y-auto p-5 bg-stone-50/50">
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-900">전체 심방 기록 ({filteredVisitations.length}건)</h3>
                  <button
                    onClick={() => openAddVisitationForMember()}
                    className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>새 심방 작성</span>
                  </button>
                </div>

                {filteredVisitations.length === 0 ? (
                  <div className="py-16 text-center text-stone-400 text-xs bg-white rounded-2xl border border-stone-200">
                    심방 기록이 없습니다.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredVisitations.map((v) => (
                      <div
                        key={v.id}
                        className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-extrabold text-stone-900">{v.memberName} 성도</span>
                            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-lg">
                              {v.type}
                            </span>
                            <span className="text-xs text-stone-500 font-medium">심방자: {v.visitor}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                              <Calendar className="w-3.5 h-3.5" />
                              {v.date}
                            </span>
                            <button
                              onClick={() => openEditVisitationModal(v)}
                              className="text-stone-400 hover:text-amber-800"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteVisitation(v.id)}
                              className="text-stone-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {v.scripture && (
                          <div className="text-xs font-bold text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-100">
                            📖 은혜의 말씀: {v.scripture}
                          </div>
                        )}

                        {v.prayerRequests && (
                          <div className="text-xs text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                            <span className="font-bold text-amber-800">기도제목:</span> {v.prayerRequests}
                          </div>
                        )}

                        <div className="text-xs text-stone-700 whitespace-pre-line leading-relaxed px-1">
                          {v.notes}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: STATS */}
          {activeTab === "stats" && (
            <div className="h-full overflow-y-auto p-6 bg-stone-50/50">
              <div className="max-w-4xl mx-auto space-y-6">
                <h3 className="text-base font-bold text-stone-900">교세 및 심방 통계 요약</h3>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 font-medium">등록 성도 수</p>
                      <p className="text-2xl font-extrabold text-stone-900">{members.length}명</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 font-medium">누적 심방 횟수</p>
                      <p className="text-2xl font-extrabold text-stone-900">{visitations.length}회</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 font-medium">관리 구역 수</p>
                      <p className="text-2xl font-extrabold text-stone-900">
                        {districts.filter((d) => d !== "전체").length}개 구역
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breakdown by District */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-stone-900">구역별 성도 분포</h4>
                  <div className="space-y-2">
                    {districts
                      .filter((d) => d !== "전체")
                      .map((dist) => {
                        const count = members.filter((m) => m.district === dist).length;
                        const pct = members.length > 0 ? Math.round((count / members.length) * 100) : 0;
                        return (
                          <div key={dist} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>{dist}</span>
                              <span className="text-stone-500">
                                {count}명 ({pct}%)
                              </span>
                            </div>
                            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-amber-700 h-full rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MEMBER EDIT / ADD MODAL */}
      {isMemberFormOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-stone-200 animate-scale-in">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-bold text-base text-stone-900">
                {editingMember ? "성도 정보 수정" : "신규 성도 등록"}
              </h3>
              <button onClick={() => setIsMemberFormOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">성명 *</label>
                  <input
                    type="text"
                    required
                    value={memberFormData.name || ""}
                    onChange={(e) => setMemberFormData({ ...memberFormData, name: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                    placeholder="예: 홍길동"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">연락처 *</label>
                  <input
                    type="text"
                    required
                    value={memberFormData.phone || ""}
                    onChange={(e) => setMemberFormData({ ...memberFormData, phone: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">직분</label>
                  <select
                    value={memberFormData.position || "성도"}
                    onChange={(e) => setMemberFormData({ ...memberFormData, position: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  >
                    <option value="성도">성도</option>
                    <option value="집사">집사</option>
                    <option value="안수집사">안수집사</option>
                    <option value="권사">권사</option>
                    <option value="장로">장로</option>
                    <option value="전도사">전도사</option>
                    <option value="목사">목사</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">소속 구역</label>
                  <input
                    type="text"
                    value={memberFormData.district || "1구역"}
                    onChange={(e) => setMemberFormData({ ...memberFormData, district: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                    placeholder="예: 1구역, 청년부"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">생년월일</label>
                  <input
                    type="date"
                    value={memberFormData.birthdate || ""}
                    onChange={(e) => setMemberFormData({ ...memberFormData, birthdate: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">가족 관계</label>
                  <input
                    type="text"
                    value={memberFormData.familyNotes || ""}
                    onChange={(e) => setMemberFormData({ ...memberFormData, familyNotes: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                    placeholder="예: 배우자 김영희 집사"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">주소</label>
                <input
                  type="text"
                  value={memberFormData.address || ""}
                  onChange={(e) => setMemberFormData({ ...memberFormData, address: e.target.value })}
                  className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  placeholder="도로명 주소 입력"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">특이사항 / 메모</label>
                <textarea
                  rows={3}
                  value={memberFormData.notes || ""}
                  onChange={(e) => setMemberFormData({ ...memberFormData, notes: e.target.value })}
                  className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  placeholder="신앙 상태, 봉사 부서 등 메모..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsMemberFormOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-sm"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VISITATION EDIT / ADD MODAL */}
      {isVisitationFormOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-stone-200 animate-scale-in">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-bold text-base text-stone-900">
                {editingVisitation ? "심방 기록 수정" : "새 심방 내용 작성"}
              </h3>
              <button onClick={() => setIsVisitationFormOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVisitation} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">대상 성도 *</label>
                  <select
                    required
                    value={visitationFormData.memberId || ""}
                    onChange={(e) => {
                      const mId = e.target.value;
                      const selected = members.find((x) => x.id === mId);
                      setVisitationFormData({
                        ...visitationFormData,
                        memberId: mId,
                        memberName: selected ? selected.name : "",
                      });
                    }}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  >
                    <option value="">성도 선택...</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.position}, {m.district})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">심방일자</label>
                  <input
                    type="date"
                    required
                    value={visitationFormData.date || ""}
                    onChange={(e) => setVisitationFormData({ ...visitationFormData, date: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">심방 구분</label>
                  <select
                    value={visitationFormData.type || "정기심방"}
                    onChange={(e) => setVisitationFormData({ ...visitationFormData, type: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  >
                    <option value="정기심방">정기심방</option>
                    <option value="환우심방">환우심방</option>
                    <option value="위로심방">위로심방</option>
                    <option value="감사심방">감사심방</option>
                    <option value="신규등록 심방">신규등록 심방</option>
                    <option value="수시상담">수시상담</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">심방자 (방문자)</label>
                  <input
                    type="text"
                    value={visitationFormData.visitor || "담임목사"}
                    onChange={(e) => setVisitationFormData({ ...visitationFormData, visitor: e.target.value })}
                    className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                    placeholder="예: 담임목사, 구역장"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">은혜의 말씀 / 본문 구절</label>
                <input
                  type="text"
                  value={visitationFormData.scripture || ""}
                  onChange={(e) => setVisitationFormData({ ...visitationFormData, scripture: e.target.value })}
                  className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  placeholder="예: 시편 23편 1-6절"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">기도 제목</label>
                <textarea
                  rows={2}
                  value={visitationFormData.prayerRequests || ""}
                  onChange={(e) => setVisitationFormData({ ...visitationFormData, prayerRequests: e.target.value })}
                  className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  placeholder="가정 및 개인 기도제목..."
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">심방 대화 및 메모 *</label>
                <textarea
                  rows={4}
                  required
                  value={visitationFormData.notes || ""}
                  onChange={(e) => setVisitationFormData({ ...visitationFormData, notes: e.target.value })}
                  className="w-full p-2 bg-white text-stone-900 font-medium border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-600/40 outline-none placeholder:text-stone-400"
                  placeholder="심방 주요 권면, 상황 및 대화 내용..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsVisitationFormOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-sm"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
