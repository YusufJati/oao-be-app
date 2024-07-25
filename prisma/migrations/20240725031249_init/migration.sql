-- CreateTable
CREATE TABLE "Broker" (
    "id" SERIAL NOT NULL,
    "kode" VARCHAR(255),
    "nama" VARCHAR(255),
    "alamat" VARCHAR(255),
    "nomor_telepon" VARCHAR(255),
    "contact_person" VARCHAR(255),
    "created_at" TIMESTAMP(3),

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "nik" VARCHAR(255),
    "nama" VARCHAR(255),
    "tempat_lahir" VARCHAR(255),
    "tanggal_lahir" TIMESTAMP(3),
    "jenis_kelamin" VARCHAR(255),
    "golongan_darah" VARCHAR(255),
    "kode_negara" VARCHAR(255),
    "status_pernikahan" BOOLEAN,
    "jenis_identitas" VARCHAR(255),
    "alamat" VARCHAR(255),
    "rt_rw" VARCHAR(255),
    "kelurahan" VARCHAR(255),
    "kecamatan" VARCHAR(255),
    "agama" VARCHAR(255),
    "pekerjaan" VARCHAR(255),
    "kewarganegaraan" VARCHAR(255),
    "tanggal_berlaku" TIMESTAMP(3),
    "provinsi" VARCHAR(255),
    "foto" BYTEA,
    "tanda_tangan" BYTEA,
    "tanggal_input" TIMESTAMP(3),
    "email" VARCHAR(255),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerTransaction" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "broker_id" INTEGER,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_by" VARCHAR(255),
    "updated_by" VARCHAR(255),
    "email" VARCHAR(255),
    "kode_otp" VARCHAR(255),

    CONSTRAINT "CustomerTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpeningAccount" (
    "id" SERIAL NOT NULL,
    "efek_saham" VARCHAR(255),
    "efek_utang" VARCHAR(255),
    "efek_reksa_dana" VARCHAR(255),
    "pendidikan_terakhir" VARCHAR(255),
    "nama_ibu_kandung" VARCHAR(255),
    "nama_perusahaan" VARCHAR(255),
    "alamat_perusahaan" VARCHAR(255),
    "kode_pos" INTEGER,
    "nomor_perusahaan" INTEGER,
    "jenis_pekerjaan" VARCHAR(255),
    "email_perusahaan" VARCHAR(255),
    "jabatan" VARCHAR(255),
    "bidang_usaha" VARCHAR(255),
    "lama_bekerja" VARCHAR(255),
    "penghasilan_pertahun" VARCHAR(255),
    "penghasilan_tambahan_pertahun" VARCHAR(255),
    "sumber_penghasilan_utama" VARCHAR(255),
    "sumber_penghasilan_tambahan" VARCHAR(255),
    "sumber_pendanaan_transaksi" VARCHAR(255),
    "tujuan_investasi" VARCHAR(255),
    "tanda_tangan" BYTEA,

    CONSTRAINT "OpeningAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerTransaction_broker_id_customer_id_key" ON "CustomerTransaction"("broker_id", "customer_id");

-- CreateIndex
CREATE INDEX "fk_customer_transaction" ON "OpeningAccount"("id");

-- AddForeignKey
ALTER TABLE "CustomerTransaction" ADD CONSTRAINT "CustomerTransaction_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerTransaction" ADD CONSTRAINT "CustomerTransaction_broker_id_fkey" FOREIGN KEY ("broker_id") REFERENCES "Broker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningAccount" ADD CONSTRAINT "OpeningAccount_id_fkey" FOREIGN KEY ("id") REFERENCES "CustomerTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
