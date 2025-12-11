import { Back, PageHeader, Section } from "./GetStarted";

export function GetStartedWithVue() {
    return (
        <>
            <Back/>
            <PageHeader
                title='JSOC x Vue'
                subtitle='This page will guide you through how to use JSOC in your
                                Vue app.'
            />

            <Section title='Installation'>
                JSOC for Vue will be available soon.
            </Section>
        </>
    );
}