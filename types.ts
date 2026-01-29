export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
}

export interface Product {
  id: string;
  code: string; // The QR or Barcode value
  name: string;
  manufacturer: string;
  description: string;
  imageUrl?: string;
  productionDate: string;
  batchNumber: string;
  isRegistered: boolean; // true = REAL, false/not found = FAKE
}

export enum ScanResultStatus {
  REAL = 'REAL',
  FAKE = 'FAKE',
  WARNING = 'WARNING' // For AI tamper detection
}

export interface ScanLog {
  id: string;
  code: string;
  timestamp: string;
  userId?: string;
  result: ScanResultStatus;
  productName?: string; // Snapshot of name at time of scan
  location?: string;
  aiTamperAnalysis?: string; // Optional AI insight
}

export interface ScanResult {
  status: ScanResultStatus;
  product: Product | null;
  scannedCode: string;
  aiAnalysis?: string;
}