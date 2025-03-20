// src/common/enums.ts

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
}

export enum NotificationType {
  BOOKING_CONFIRMATION = 'BOOKING_CONFIRMATION',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  GENERAL = 'GENERAL',
}
