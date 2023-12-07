import { globalConfig } from '@/configs';
import Head from 'next/head';
import type { FC } from 'react';

interface Props {
    title?: string;
}


const SeoComponent: FC<Props> = props => {
    const { title } = props;

    const fullTitle = title ? title + ' | ' : '';

    return (
        <Head>
            <title>{fullTitle}{globalConfig.appName}</title>
        </Head>
    );
};

export default SeoComponent;