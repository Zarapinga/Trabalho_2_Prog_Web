declare module "vitest";
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
/// <reference types="vitest" />

// Provide lightweight module declarations for test libs and JSX runtime
declare module "vitest";
declare module "@testing-library/react";
declare module "@testing-library/user-event";
declare module "react/jsx-runtime";

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
