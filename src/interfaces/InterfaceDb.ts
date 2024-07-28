import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Interface for Broker
export interface Broker {
  id: number;
  kode?: string;
  nama?: string;
  alamat?: string;
  nomor_telepon?: string;
  contact_person?: string;
  created_at?: Date;
  CustomerTransaction?: CustomerTransaction[];
}

// Interface for Customer
export interface Customer {
  id: number;
  nik?: string;
  nama?: string;
  tempat_lahir?: string;
  tanggal_lahir?: Date;
  jenis_kelamin?: string;
  golongan_darah?: string;
  kode_negara?: string;
  status_pernikahan?: string;
  jenis_identitas?: string;
  alamat?: string;
  rt_rw?: string;
  kelurahan?: string;
  kecamatan?: string;
  agama?: string;
  pekerjaan?: string;
  kewarganegaraan?: string;
  tanggal_berlaku?: Date;
  provinsi?: string;
  foto?: Buffer;
  tanda_tangan?: Buffer;
  tanggal_input?: Date;
  email?: string;
  id_broker?: number;
  CustomerTransaction?: CustomerTransaction[];
}

// Interface for CustomerTransaction
export interface CustomerTransaction {
  id: number;
  customer_id?: number;
  broker_id?: number;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
  email?: string;
  kode_otp?: string;
  customer?: Customer;
  broker?: Broker;
  OpeningAccount?: OpeningAccount;
}

// Interface for OpeningAccount
export interface OpeningAccount {
  id: number;
  customerTransactionId?: number;  // This should be the ID of CustomerTransaction
  efek_saham?: string;
  efek_utang?: string;
  efek_reksa_dana?: string;
  pendidikan_terakhir?: string;
  nama_ibu_kandung?: string;
  nama_perusahaan?: string;
  alamat_perusahaan?: string;
  kode_pos?: string;
  nomor_perusahaan?: string;
  jenis_pekerjaan?: string;
  email_perusahaan?: string;
  jabatan?: string;
  bidang_usaha?: string;
  lama_bekerja?: string;
  penghasilan_pertahun?: string;
  penghasilan_tambahan_pertahun?: string;
  sumber_penghasilan_utama?: string;
  sumber_penghasilan_tambahan?: string;
  sumber_pendanaan_transaksi?: string;
  tujuan_investasi?: string;
  tanda_tangan?: Buffer;
  customerTransaction?: CustomerTransaction;
}

export interface GenerateOTPRequestt{
  body: {
    customer_id: number;
    broker_id: number;
    email: string;
  };
}

export interface ValidateOTPRequest {
  body: {
    email: string;
    otp: string;
  };
}

