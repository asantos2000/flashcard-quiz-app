/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Marcar DuckDB como external para não incluir no bundle
      config.externals = config.externals || [];
      config.externals.push('duckdb');
    }
    
    // Ignorar arquivos HTML do node-pre-gyp
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.html$/,
      loader: 'ignore-loader'
    });
    
    return config;
  },
  // Desabilitar minificação do DuckDB (atualizado para Next.js 15)
  serverExternalPackages: ['duckdb']
};

export default nextConfig;
