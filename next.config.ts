import type { NextConfig } from "next";

// transpilePackages: ["three"] and optimizePackageImports for @react-three/*
// lived here for the v1 hero's WebGL canvas. Nothing has imported those
// packages since Act I was rebuilt as type, and the packages themselves are
// gone from package.json, so the config referenced nothing.
const nextConfig: NextConfig = {};

export default nextConfig;
