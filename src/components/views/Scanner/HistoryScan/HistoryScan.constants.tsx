// Alasan/Note – kenapa gagal/dup (mis. “sudah dipakai 11:17 oleh Gate A”).

// Kode voucher (masked) – 7 huruf depan + bintang, contoh dhwdwj2********.

// Tiket – nama/tipe (VIP, GA), opsional harga.

// Event – nama event (tooltip: tanggal/jam event).

// Petugas – yang scan (nama user dari scannedById).

// Lokasi/Gerbang – gate/pos (atau koordinat kalau ada).

// Device – identitas perangkat pemindai (model/OS/app versi).
const COLUMN_LIST_HISTORYSCAN = [
  {
    name: "STATUS",
    uid: "status",
    sort: true,
  },
  {
    name: "NOTE",
    uid: "note",
    sort: false,
  },
  {
    name: "CODE",
    uid: "code",
    sort: false,
  },
  {
    name: "TICKET",
    uid: "ticket",
    sort: true,
  },
  {
    name: "EVENT",
    uid: "event",
    sort: true,
  },
  {
    name: "LOCATION",
    uid: "location",
    sort: false,
  },
  {
    name: "Device",
    uid: "device",
    sort: false,
  },
  {
    name: "CREATED AT",
    uid: "createdAt",
    sort: true,
  },
  {
    name: "ACTIONS",
    uid: "actions",
    sort: false,
  },
];

export { COLUMN_LIST_HISTORYSCAN };
