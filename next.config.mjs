let userConfig = undefined;
try {
  userConfig = await import('./v0-user-next.config');
} catch (e) {
  // Ignore error if config doesn't exist
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) return nextConfig;

  return Object.keys(userConfig).reduce((acc, key) => {
    if (
      typeof userConfig[key] === 'object' &&
      !Array.isArray(userConfig[key]) &&
      nextConfig[key] &&
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      acc[key] = { ...nextConfig[key], ...userConfig[key] };
    } else {
      acc[key] = userConfig[key];
    }
    return acc;
  }, { ...nextConfig });
}

// Merge userConfig into nextConfig if userConfig exists
export default mergeConfig(nextConfig, userConfig);
