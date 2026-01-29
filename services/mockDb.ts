import { User, UserRole } from '../types';

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  sku: string;
}

interface ScanLog {
  id: string;
  name: string;
  manufacturer: string;
  authentic: boolean;
  confidence: number;
  timestamp: Date;
  details: string;
}

class MockDatabase {
  private currentUser: User | null = null;
  private products: Product[] = [
    {
      id: 'PROD001',
      name: 'Premium Phone',
      manufacturer: 'TechCorp',
      sku: 'TC-PH-001'
    },
    {
      id: 'PROD002',
      name: 'Wireless Headphones',
      manufacturer: 'AudioMax',
      sku: 'AM-WH-002'
    }
  ];
  private scanLogs: ScanLog[] = [];

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(user: User | null): void {
    this.currentUser = user;
  }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  getScanLogs(): ScanLog[] {
    return this.scanLogs;
  }

  addScanLog(log: ScanLog): void {
    this.scanLogs.push(log);
  }

  clearScanLogs(): void {
    this.scanLogs = [];
  }
}

export const mockDb = new MockDatabase();
