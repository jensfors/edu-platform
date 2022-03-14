import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export const createWCAGs = async () => {
    await prisma.wCAGPrinciple.create({
        data: {
            name: 'Perceivable',
            number: 1,
            color: '#8AEFFF',
            description: 'Information and user interface components must be presentable to users in ways they can perceive.',
            link: 'https://www.w3.org/TR/WCAG21/#perceivable',
            criteria: {
                create: [
                    {
                        number: '1.1.1',
                        name: 'Non-text Content',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#non-text-content'
                    },
                    {
                        number: '1.2.1',
                        name: 'Audio-only and Video-only (Prerecorded)',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded'
                    },
                    {
                        number: '1.2.2',
                        name: 'Captions (Prerecorded)',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#captions-prerecorded'
                    },
                    {
                        number: '1.2.3',
                        name: 'Audio Description or Media Alternative (Prerecorded)',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded'
                    },
                    {
                        number: '1.2.4',
                        name: 'Captions (Live)',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#captions-live'
                    },
                    {
                        number: '1.2.5',
                        name: 'Audio Description (Prerecorded)',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#audio-description-prerecorded'
                    },
                    {
                        number: '1.2.6',
                        name: 'Sign Language (Prerecorded)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#sign-language-prerecorded'
                    },
                    {
                        number: '1.2.7',
                        name: 'Extended Audio Description (Prerecorded)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#extended-audio-description-prerecorded'
                    },
                    {
                        number: '1.2.8',
                        name: 'Media Alternative (Prerecorded)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#media-alternative-prerecorded'
                    },
                    {
                        number: '1.2.9',
                        name: 'Audio-only (Live)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#audio-only-live'
                    },
                    {
                        number: '1.3.1',
                        name: 'Info and Relationships',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#info-and-relationships'
                    },
                    {
                        number: '1.3.2',
                        name: 'Meaningful Sequence',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#meaningful-sequence'
                    },
                    {
                        number: '1.3.3',
                        name: 'Sensory Characteristics',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#sensory-characteristics'
                    },
                    {
                        number: '1.3.4',
                        name: 'Orientation',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#orientation'
                    },
                    {
                        number: '1.3.5',
                        name: 'Identify Input Purpose',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#identify-input-purpose'
                    },
                    {
                        number: '1.3.6',
                        name: 'Identify Purpose',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#identify-purpose'
                    },
                    {
                        number: '1.4.1',
                        name: 'Use of Color',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#use-of-color'
                    },
                    {
                        number: '1.4.2',
                        name: 'Audio Control',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#audio-control'
                    },
                    {
                        number: '1.4.3',
                        name: 'Contrast (Minimum)',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#contrast-minimum'
                    },
                    {
                        number: '1.4.4',
                        name: 'Resize text',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#resize-text'
                    },
                    {
                        number: '1.4.5',
                        name: 'Images of Text',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#images-of-text'
                    },
                    {
                        number: '1.4.6',
                        name: 'Contrast (Enhanced)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#contrast-enhanced'
                    },
                    {
                        number: '1.4.7',
                        name: 'Low or No Background Audio',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#low-or-no-background-audio'
                    },
                    {
                        number: '1.4.8',
                        name: 'Visual Presentation',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#visual-presentation'
                    },
                    {
                        number: '1.4.9',
                        name: 'Images of Text (No Exception)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#images-of-text-no-exception'
                    },
                    {
                        number: '1.4.10',
                        name: 'Reflow',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#reflow'
                    },
                    {
                        number: '1.4.11',
                        name: 'Non-text Contrast',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#non-text-contrast'
                    },
                    {
                        number: '1.4.12',
                        name: 'Text Spacing',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#text-spacing'
                    },
                    {
                        number: '1.4.13',
                        name: 'Content on Hover or Focus',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus'
                    },
                ],
            },
        },
    })

    await prisma.wCAGPrinciple.create({
        data: {
            name: 'Operable',
            number: 2,
            color: '#89C33E',
            description: 'User interface components and navigation must be operable.',
            link: 'https://www.w3.org/TR/WCAG21/#operable',
            criteria: {
                create: [
                    {
                        number: '2.1.1',
                        name: 'Keyboard',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#keyboard'
                    },
                    {
                        number: '2.1.2',
                        name: 'No Keyboard Trap',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#no-keyboard-trap'
                    },
                    {
                        number: '2.1.3',
                        name: 'Keyboard (No Exception)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#keyboard-no-exception'
                    },
                    {
                        number: '2.1.4',
                        name: 'Character Key Shortcuts',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#character-key-shortcuts'
                    },
                    {
                        number: '2.2.1',
                        name: 'Timing Adjustable',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#timing-adjustable'
                    },
                    {
                        number: '2.2.2',
                        name: 'Pause, Stop, Hide',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#pause-stop-hide'
                    },
                    {
                        number: '2.2.3',
                        name: 'No Timing',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#no-timing'
                    },
                    {
                        number: '2.2.4',
                        name: 'Interruptions',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#interruptions'
                    },
                    {
                        number: '2.2.5',
                        name: 'Re-authenticating',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#re-authenticating'
                    },
                    {
                        number: '2.2.6',
                        name: 'Timeouts',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#timeouts'
                    },
                    {
                        number: '2.3.1',
                        name: 'Three Flashes or Below Threshold',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold'
                    },
                    {
                        number: '2.3.2',
                        name: 'Three Flashes',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#three-flashes'
                    },
                    {
                        number: '2.3.3',
                        name: 'Animation from Interactions',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#animation-from-interactions'
                    },
                    {
                        number: '2.4.1',
                        name: 'Bypass Blocks',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#bypass-blocks'
                    },
                    {
                        number: '2.4.2',
                        name: 'Page Titled',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#page-titled'
                    },
                    {
                        number: '2.4.3',
                        name: 'Focus Order',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#focus-order'
                    },
                    {
                        number: '2.4.4',
                        name: 'Link Purpose (In Context)',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#link-purpose-in-context'
                    },
                    {
                        number: '2.4.5',
                        name: 'Multiple Ways',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#multiple-ways'
                    },
                    {
                        number: '2.4.6',
                        name: 'Headings and Labels',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#headings-and-labels'
                    },
                    {
                        number: '2.4.7',
                        name: 'Focus Visible',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#focus-visible'
                    },
                    {
                        number: '2.4.8',
                        name: 'Location',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#location'
                    },
                    {
                        number: '2.4.9',
                        name: 'Link Purpose (Link Only)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#link-purpose-link-only'
                    },
                    {
                        number: '2.4.10',
                        name: 'Section Headings',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#section-headings'
                    },
                    {
                        number: '2.5.1',
                        name: 'Pointer Gestures',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#pointer-gestures'
                    },
                    {
                        number: '2.5.2',
                        name: 'Pointer Cancellation',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#pointer-cancellation'
                    },
                    {
                        number: '2.5.3',
                        name: 'Label in Name',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#label-in-name'
                    },
                    {
                        number: '2.5.4',
                        name: 'Motion Actuation',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#motion-actuation'
                    },
                    {
                        number: '2.5.5',
                        name: 'Target Size',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#target-size'
                    },
                    {
                        number: '2.5.6',
                        name: 'Concurrent Input Mechanisms',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#concurrent-input-mechanisms'
                    },
                ],
            },
        },
    })

    await prisma.wCAGPrinciple.create({
        data: {
            name: 'Understandable',
            number: 3,
            color: '#AA83D8',
            description: 'Information and the operation of user interface must be understandable.',
            link: 'https://www.w3.org/TR/WCAG21/#understandable',
            criteria: {
                create: [
                    {
                        number: '3.1.1',
                        name: 'Language of Page',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#language-of-page'
                    },
                    {
                        number: '3.1.2',
                        name: 'Language of Parts',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#language-of-parts'
                    },
                    {
                        number: '3.1.3',
                        name: 'Unusual Words',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#unusual-words'
                    },
                    {
                        number: '3.1.4',
                        name: 'Abbreviations',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#abbreviations'
                    },
                    {
                        number: '3.1.5',
                        name: 'Reading Level',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#reading-level'
                    },
                    {
                        number: '3.1.6',
                        name: 'Section Headings',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#pronunciation'
                    },
                    {
                        number: '3.2.1',
                        name: 'On Focus',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#on-focus'
                    },
                    {
                        number: '3.2.2',
                        name: 'On Input',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#on-input'
                    },
                    {
                        number: '3.2.3',
                        name: 'Consistent Navigation',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#consistent-navigation'
                    },
                    {
                        number: '3.2.4',
                        name: 'Consistent Identification',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#consistent-identification'
                    },
                    {
                        number: '3.2.5',
                        name: 'Change on Request',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#change-on-request'
                    },
                    {
                        number: '3.3.1',
                        name: 'Error Identification',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#error-identification'
                    },
                    {
                        number: '3.3.2',
                        name: 'Labels or Instructions',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#labels-or-instructions'
                    },
                    {
                        number: '3.3.3',
                        name: 'Error Suggestion',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#error-suggestion'
                    },
                    {
                        number: '3.3.4',
                        name: 'Error Prevention (Legal, Financial, Data)',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#error-prevention-legal-financial-data'
                    },
                    {
                        number: '3.3.5',
                        name: 'Help',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#help'
                    },
                    {
                        number: '3.3.6',
                        name: 'Error Prevention (All)',
                        conformance: 'AAA',
                        link: 'https://www.w3.org/TR/WCAG21/#error-prevention-all'
                    },
                ],
            },
        },
    })

    await prisma.wCAGPrinciple.create({
        data: {
            name: 'Robust',
            number: 4,
            color: '#DC0F44',
            description: 'Content must be robust enough that it can be interpreted by by a wide variety of user agents, including assistive technologies.',
            link: 'https://www.w3.org/TR/WCAG21/#robust',
            criteria: {
                create: [
                    {
                        number: '4.1.1',
                        name: 'Parsing',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#parsing'
                    },
                    {
                        number: '4.1.2',
                        name: 'Name, Role, Value',
                        conformance: 'A',
                        link: 'https://www.w3.org/TR/WCAG21/#name-role-value'
                    },
                    {
                        number: '4.1.3',
                        name: 'Status Messages',
                        conformance: 'AA',
                        link: 'https://www.w3.org/TR/WCAG21/#status-messages'
                    },
                ],
            },
        },
    })
}; 
