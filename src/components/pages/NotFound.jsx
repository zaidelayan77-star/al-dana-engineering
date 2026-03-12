import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('not_found.title')}</h1>
        </div>
    );
}