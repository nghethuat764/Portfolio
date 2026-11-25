import type { Language, ProjectItem } from '../data/profile';

interface ProjectVisualPreviewProps {
  visualType: ProjectItem['visualType'];
  lang: Language;
  compact?: boolean;
}

export function ProjectVisualPreview({
  visualType,
  lang,
  compact = false,
}: ProjectVisualPreviewProps) {
  const isVi = lang === 'vi';

  if (visualType === 'archive-system') {
    return (
      <div
        className={`w-full h-full bg-zinc-950 text-zinc-100 flex flex-col justify-between ${
          compact ? 'p-5' : 'p-6 sm:p-8'
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
          <span className="font-mono text-[11px] text-zinc-400 tracking-wide">
            C# .NET · ORACLE DATABASE
          </span>
          <span className="font-mono text-[11px] text-[#60A5FA] tabular-nums">
            {isVi ? 'SỐ HÓA KHO LƯU TRỮ' : 'ARCHIVE DIGITIZATION'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-auto py-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-zinc-400">
              {isVi ? '01. TIẾP NHẬN' : '01. INTAKE'}
            </div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Phân loại & Mã hóa' : 'Indexing & Coding'}
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-[#2563EB]" />
            </div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-zinc-400">
              {isVi ? '02. LƯU TRỮ' : '02. STORAGE'}
            </div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Sơ đồ Kệ / Hộp' : 'Shelf / Box Map'}
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-full bg-[#2563EB]" />
            </div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-zinc-400">
              {isVi ? '03. KHAI THÁC' : '03. RETRIEVAL'}
            </div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Tra cứu & Mượn trả' : 'Search & Audit'}
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-[#2563EB]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800 pt-3">
          <span>{isVi ? 'Chuẩn hóa quy trình hồ sơ' : 'Standardized record lifecycle'}</span>
          <span className="font-mono text-zinc-300 tabular-nums">ACID · INDEXED</span>
        </div>
      </div>
    );
  }

  if (visualType === 'oracle-dataguard') {
    return (
      <div
        className={`w-full h-full bg-zinc-100 text-zinc-900 flex flex-col justify-between ${
          compact ? 'p-5' : 'p-6 sm:p-8'
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-3">
          <span className="font-mono text-[11px] text-zinc-500">ORACLE 19c / 21c</span>
          <span className="font-mono text-[11px] text-[#2563EB] font-medium">DATA GUARD HA</span>
        </div>

        <div className="grid grid-cols-11 items-center gap-2 my-auto py-4">
          <div className="col-span-5 rounded-xl border border-zinc-300 bg-white p-3.5 space-y-1">
            <div className="font-mono text-[10px] text-[#2563EB] font-medium">PRIMARY DB</div>
            <div className="text-xs font-semibold text-zinc-950">Read / Write Active</div>
            <div className="font-mono text-[10px] text-zinc-500">Redo Transport</div>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <div className="w-full h-[2px] bg-[#2563EB]" />
          </div>

          <div className="col-span-5 rounded-xl border border-zinc-300 bg-white p-3.5 space-y-1">
            <div className="font-mono text-[10px] text-zinc-500 font-medium">STANDBY DB</div>
            <div className="text-xs font-semibold text-zinc-950">Sync / Failover Ready</div>
            <div className="font-mono text-[10px] text-zinc-500">Redo Apply</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-600 border-t border-zinc-200 pt-3">
          <span>{isVi ? 'Kiến trúc dự phòng liên tục' : 'Continuous failover readiness'}</span>
          <span className="font-mono text-zinc-800">BACKUP &amp; RECOVERY</span>
        </div>
      </div>
    );
  }

  if (visualType === 'mobile-app') {
    return (
      <div
        className={`w-full h-full bg-zinc-950 text-zinc-100 flex flex-col justify-between ${
          compact ? 'p-5' : 'p-6 sm:p-8'
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
          <span className="font-mono text-[11px] text-zinc-400">
            iOS &amp; ANDROID · REST API
          </span>
          <span className="font-mono text-[11px] text-[#60A5FA] font-medium">
            MOBILE ENTERPRISE
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-auto py-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-[#60A5FA]">01. UI / UX</div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Thiết kế Di động' : 'Mobile Interface'}
            </div>
            <div className="font-mono text-[10px] text-zinc-400">iOS · Android</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-[#60A5FA]">02. GATEWAY</div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Kết nối API Bảo mật' : 'Secure REST API'}
            </div>
            <div className="font-mono text-[10px] text-zinc-400">JWT · HTTPS</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-[#60A5FA]">03. BACKEND</div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Đồng bộ CSDL' : 'DB Sync'}
            </div>
            <div className="font-mono text-[10px] text-zinc-400">Oracle · SQL</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800 pt-3">
          <span>{isVi ? 'Tác nghiệp linh hoạt mọi nơi' : 'Field mobility & operations'}</span>
          <span className="font-mono text-zinc-300">PUSH · OFFLINE SYNC</span>
        </div>
      </div>
    );
  }

  if (visualType === 'command-operations') {
    return (
      <div
        className={`w-full h-full bg-zinc-950 text-zinc-100 flex flex-col justify-between ${
          compact ? 'p-5' : 'p-6 sm:p-8'
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
          <span className="font-mono text-[11px] text-zinc-400">
            C# .NET · WEB &amp; MOBILE DASHBOARD
          </span>
          <span className="font-mono text-[11px] text-[#38BDF8] font-medium">
            COMMAND &amp; OPERATIONS
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-auto py-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-[#38BDF8]">
              {isVi ? '01. LÃNH ĐẠO' : '01. EXECUTIVE'}
            </div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Chỉ đạo & Phê duyệt' : 'Command & Approvals'}
            </div>
            <div className="font-mono text-[10px] text-zinc-400">KPI Dashboard</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-[#38BDF8]">
              {isVi ? '02. ĐIỀU PHỐI' : '02. COORDINATION'}
            </div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Giao việc & Nhắc hạn' : 'Task & SLA Routing'}
            </div>
            <div className="font-mono text-[10px] text-zinc-400">Workflow Engine</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-1.5">
            <div className="font-mono text-[10px] text-[#38BDF8]">
              {isVi ? '03. GIÁM SÁT' : '03. MONITORING'}
            </div>
            <div className="text-xs font-medium text-zinc-100">
              {isVi ? 'Báo cáo Thời gian thực' : 'Real-time Analytics'}
            </div>
            <div className="font-mono text-[10px] text-zinc-400">Oracle · SQL</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800 pt-3">
          <span>{isVi ? 'Vận hành đồng bộ toàn đơn vị' : 'Unified unit operations'}</span>
          <span className="font-mono text-zinc-300">KPI · SLA · REAL-TIME</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full bg-white text-zinc-900 flex flex-col justify-between ${
        compact ? 'p-5' : 'p-6 sm:p-8'
      }`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-3">
        <span className="font-mono text-[11px] text-zinc-500">ARCGIS ENTERPRISE</span>
        <span className="font-mono text-[11px] text-[#2563EB] font-medium">SPATIAL SYSTEM</span>
      </div>

      <div className="space-y-2.5 my-auto py-4">
        <div className="rounded-lg border border-zinc-200 bg-[#FAFAFA] px-3.5 py-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-900">ArcGIS Portal</span>
          <span className="font-mono text-[10px] text-zinc-500">
            {isVi ? 'Phân quyền & Cổng khai thác' : 'Access & Web GIS Portal'}
          </span>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-[#FAFAFA] px-3.5 py-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-900">ArcGIS Server</span>
          <span className="font-mono text-[10px] text-zinc-500">
            {isVi ? 'Dịch vụ bản đồ & Xử lý' : 'Map Services & Engine'}
          </span>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-[#FAFAFA] px-3.5 py-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-900">Enterprise Geodatabase</span>
          <span className="font-mono text-[10px] text-zinc-500">
            {isVi ? 'Dữ liệu không gian tập trung' : 'Central Spatial Repository'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-600 border-t border-zinc-200 pt-3">
        <span>{isVi ? 'Hệ thống ứng dụng tích hợp' : 'Multi-tier enterprise platform'}</span>
        <span className="font-mono text-zinc-800">PORTAL · SERVER</span>
      </div>
    </div>
  );
}
