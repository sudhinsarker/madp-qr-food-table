export type Role = 'owner' | 'manager' | 'staff';
export type MenuItem = { id: string; name: string; description: string; category: string; price: number; available: boolean; note: string };
export type Table = { id: string; name: string; token: string; seats: number };
export type Line = { id: string; menuId: string; name: string; price: number; quantity: number; status: 'pending' | 'accepted' | 'preparing' | 'served'; batch: number; unavailable?: boolean; replaces?: string };
export type Order = { id: number; tableId: string; opened: string; lines: Line[]; paid: boolean; payment: 'none' | 'staff' | 'phone'; note?: string };
export type Session = { name: string; role: Role };
export const total = (lines: Line[]) => lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
