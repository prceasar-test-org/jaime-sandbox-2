import React from 'react';
import dynamic from 'next/dynamic';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop/BackToTop'));
import { Page } from '@jaime-sandbox-2/graphql-sdk/dist';

const PageGeneral = ({ header, hero, contents, footer, disableBackToTop }: Page & { __typename: string }) => {
  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}
      {hero ? <ContentModule {...(hero as any)} /> : null}
      {contents?.map((content: any) => (
        <ContentModule key={content?.id} {...content} component="section" />
      ))}
      {!disableBackToTop ? <BackToTop /> : null}
      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};
export default PageGeneral;
