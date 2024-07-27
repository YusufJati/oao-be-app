import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Brokers
  const broker1 = await prisma.broker.create({
    data: {
      kode: 'BRK001',
      nama: 'Broker One',
      alamat: 'Jl. Broker Satu No. 1',
      nomor_telepon: '08123456789',
      contact_person: 'John Doe',
      created_at: new Date(),
    },
  });

  const broker2 = await prisma.broker.create({
    data: {
      kode: 'BRK002',
      nama: 'Broker Two',
      alamat: 'Jl. Broker Dua No. 2',
      nomor_telepon: '08123456790',
      contact_person: 'Jane Smith',
      created_at: new Date(),
    },
  });

  // Seed Customers
  const customer1 = await prisma.customer.create({
    data: {
      nik: '1234567890123456',
      nama: 'Customer One',
      tempat_lahir: 'Jakarta',
      tanggal_lahir: new Date('1990-01-01'),
      jenis_kelamin: 'Male',
      golongan_darah: 'O',
      status_pernikahan: 'BELUM KAWIN',
      alamat: 'Jl. Customer Satu No. 1',
      rt_rw: '001/002',
      kelurahan: 'Kelurahan Satu',
      kecamatan: 'Kecamatan Satu',
      agama: 'Islam',
      pekerjaan: 'Engineer',
      kewarganegaraan: 'Indonesia',
      tanggal_berlaku: new Date('2030-01-01'),
      provinsi: 'DKI Jakarta',
      email: 'customer1@example.com',
      tanggal_input: new Date(),
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      nik: '1234567890123457',
      nama: 'Customer Two',
      tempat_lahir: 'Bandung',
      tanggal_lahir: new Date('1985-01-01'),
      jenis_kelamin: 'Female',
      golongan_darah: 'A',
      status_pernikahan: 'SUDAH KAWIN',
      alamat: 'Jl. Customer Dua No. 2',
      rt_rw: '003/004',
      kelurahan: 'Kelurahan Dua',
      kecamatan: 'Kecamatan Dua',
      agama: 'Christian',
      pekerjaan: 'Teacher',
      kewarganegaraan: 'Indonesia',
      tanggal_berlaku: new Date('2030-01-01'),
      provinsi: 'Jawa Barat',
      email: 'customer2@example.com',
      tanggal_input: new Date(),
    },
  });

  // Seed CustomerTransactions
  const transaction1 = await prisma.customerTransaction.create({
    data: {
      customer_id: customer1.id,
      broker_id: broker1.id,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 'Admin',
      updated_by: 'Admin',
      email: 'transaction1@example.com',
      kode_otp: '123456',
    },
  });

  const transaction2 = await prisma.customerTransaction.create({
    data: {
      customer_id: customer2.id,
      broker_id: broker2.id,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 'Admin',
      updated_by: 'Admin',
      email: 'transaction2@example.com',
      kode_otp: '654321',
    },
  });

  // Seed OpeningAccounts
  await prisma.openingAccount.create({
    data: {
      customerTransaction: { connect: { id: transaction1.id } },
      efek_saham: 'Yes',
      efek_utang: 'No',
      efek_reksa_dana: 'Yes',
      pendidikan_terakhir: 'S1',
      nama_ibu_kandung: 'Mother One',
      nama_perusahaan: 'Company One',
      alamat_perusahaan: 'Jl. Company One No. 1',
      kode_pos: '12345',
      nomor_perusahaan: '1234567890',
      jenis_pekerjaan: 'Engineer',
      email_perusahaan: 'company1@example.com',
      jabatan: 'Staff',
      bidang_usaha: 'IT',
      lama_bekerja: '5 years',
      penghasilan_pertahun: '100000000',
      penghasilan_tambahan_pertahun: '50000000',
      sumber_penghasilan_utama: 'Gaji',
      sumber_penghasilan_tambahan: 'Investasi',
      sumber_pendanaan_transaksi: 'Gaji',
      tujuan_investasi: 'Tabungan',
      tanda_tangan: Buffer.from('signature1'),
    },
  });

  await prisma.openingAccount.create({
    data: {
      customerTransaction: { connect: { id: transaction2.id } },
      efek_saham: 'No',
      efek_utang: 'Yes',
      efek_reksa_dana: 'No',
      pendidikan_terakhir: 'S2',
      nama_ibu_kandung: 'Mother Two',
      nama_perusahaan: 'Company Two',
      alamat_perusahaan: 'Jl. Company Two No. 2',
      kode_pos: '54321',
      nomor_perusahaan: '9876543210',
      jenis_pekerjaan: 'Teacher',
      email_perusahaan: 'company2@example.com',
      jabatan: 'Manager',
      bidang_usaha: 'Education',
      lama_bekerja: '10 years',
      penghasilan_pertahun: '150000000',
      penghasilan_tambahan_pertahun: '60000000',
      sumber_penghasilan_utama: 'Gaji',
      sumber_penghasilan_tambahan: 'Bisnis',
      sumber_pendanaan_transaksi: 'Gaji',
      tujuan_investasi: 'Pendidikan',
      tanda_tangan: Buffer.from('signature2'),
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
