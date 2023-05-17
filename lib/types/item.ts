import { CheckDataItem } from './list';

export enum Category {
  LIST = 'LIST',
}

export enum ItemType {
  GENERAL = 'GENERAL',
  ASSIGNMENT = 'ASSIGNMENT',
  REMINDER = 'REMINDER',
  NOTE = 'NOTE',
  MEETING = 'MEETING',
  PROJECT = 'PROJECT',
  TEST = 'TEST',
}

export enum AccessLevel {
  ADMIN = 'ADMIN',
  PUBLIC = 'PUBLIC',
}

export enum VisibilityLevel {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export type Item = {
  id: number;
  name: string;
  description: string;
  category?: Category;
  categoryId: number;
  itemType: ItemType;
  dateTzSensitive?: Date;
  dateTzSensitiveEnd?: Date;
  timeSensitiveFlag: boolean;
  dateRangeFlag: boolean;
  dateTzInsensitive?: string;
  dateTzInsensitiveEnd?: string;
  permissionLevel: VisibilityLevel;
  createdById: number;
  lastModifiedById: number;
  createdAt: Date;
};

export type ItemPermission = {
  id: number;
  itemId: number;
  userId: number;
  createdAt?: Date;
};

export type CreateItem = {
  name: string;
  description?: string;
  category?: Category;
  categoryId?: number;
  itemType: ItemType;
  dateTzSensitive?: Date;
  dateTzSensitiveEnd?: Date;
  timeSensitiveFlag: boolean;
  dateRangeFlag: boolean;
  dateTzInsensitive?: string;
  dateTzInsensitiveEnd?: string;
  lastModifiedBy: number;
  permissionLevel: VisibilityLevel;
  itemPermissions?: CheckDataItem[];
};

export type EditItem = {
  id: number;
  name: string;
  description?: string;
  category?: Category;
  categoryId?: number;
  itemType: ItemType;
  dateTzSensitive?: Date;
  dateTzSensitiveEnd?: Date;
  timeSensitiveFlag: boolean;
  dateRangeFlag: boolean;
  dateTzInsensitive?: string;
  dateTzInsensitiveEnd?: string;
  permissionLevel: VisibilityLevel;
  itemPermissions: CheckDataItem[];
  active: boolean;
};

export type ItemSafe = {
  id: number;
  name: string;
  description?: string;
  category?: Category;
  categoryId?: number;
  itemType: ItemType;
  dateTzSensitive?: Date;
  dateTzSensitiveEnd?: Date;
  timeSensitiveFlag: boolean;
  dateRangeFlag: boolean;
  dateTzInsensitive?: string;
  dateTzInsensitiveEnd?: string;
  permissionLevel: VisibilityLevel;
  createdById: number;
  lastModifiedById: number;
  active: boolean;
};

export type ItemSafeState = {
  id?: number;
  name?: string;
  description?: string;
  category?: Category;
  categoryId?: number;
  itemType?: ItemType;
  dateTzSensitive?: Date;
  dateTzSensitiveEnd?: Date;
  timeSensitiveFlag?: boolean;
  dateRangeFlag?: boolean;
  dateTzInsensitive?: string;
  dateTzInsensitiveEnd?: string;
  permissionLevel?: VisibilityLevel;
  createdById?: number;
  lastModifiedById?: number;
};

export type ItemYupValidationError = {
  name: boolean;
  category: boolean;
  categoryId: boolean;
  itemType: boolean;
  permissionLevel: boolean;
  description: boolean;
  dateTzSensitive: boolean;
  dateTzSensitiveEnd: boolean;
  timeTzSensitive: boolean;
  timeTzSensitiveEnd: boolean;
  timeSensitiveFlag: boolean;
  dateRangeFlag: boolean;
  dateTzInsensitive: boolean;
  dateTzInsensitiveEnd: boolean;
  lastModifiedById: boolean;
};

export type ItemEditYupValidationError = {
  id: boolean;
  name: boolean;
  category: boolean;
  categoryId: boolean;
  itemType: boolean;
  permissionLevel: boolean;
  description: boolean;
  dateTzSensitive: boolean;
  dateTzSensitiveEnd: boolean;
  timeTzSensitive: boolean;
  timeTzSensitiveEnd: boolean;
  timeSensitiveFlag: boolean;
  dateRangeFlag: boolean;
  dateTzInsensitive: boolean;
  dateTzInsensitiveEnd: boolean;
  lastModifiedById: boolean;
};
