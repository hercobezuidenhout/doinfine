

import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    50: { value: '#ffe5e5' },
                    100: { value: '#fbbcbc' },
                    200: { value: '#f69292' },
                    300: { value: '#f16868' },
                    400: { value: '#ec3e3e' },
                    500: { value: '#e71414' },
                    600: { value: '#b31010' },
                    700: { value: '#7f0c0c' },
                    800: { value: '#4b0808' },
                    900: { value: '#180303' },
                },
                accent: {
                    500: { value: '#ffd600' }, // yellow
                    600: { value: '#00b2ff' }, // blue
                    700: { value: '#00c853' }, // green
                },
            },
            fonts: {
                heading: { value: 'Nunito, sans-serif' },
                body: { value: 'Nunito, sans-serif' },
            },
            radii: {
                md: { value: '16px' },
                lg: { value: '24px' },
                xl: { value: '32px' },
            },
        },
        semanticTokens: {
            colors: {
                brand: {
                    solid: { value: '{colors.brand.500}' },
                    contrast: { value: '{colors.brand.100}' },
                    fg: { value: { _light: '{colors.brand.700}', _dark: '{colors.brand.600}' } },
                    muted: { value: '{colors.brand.100}' },
                    subtle: { value: '{colors.brand.200}' },
                    emphasized: { value: '{colors.brand.300}' },
                    focusRing: { value: '{colors.brand.500}' },
                },
            },
        },
    },
});

export const system = createSystem(defaultConfig, config);
