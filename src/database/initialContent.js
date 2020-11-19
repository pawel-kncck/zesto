import { makeCustomId } from '../utils/generators'

export const initialQuizWithGapFill = {
    title: 'Untilted quiz',
    description: 'Quiz description',
    hasManySections: false,
    sections: [
        {
            position: 1,
            exercises: [
                {
                    id: makeCustomId(8),
                    type: 'gap_fill',
                    title: 'Fill the gaps in the following sentences:',
                    subtitle: '',
                    hasSubtitle: false,
                    isNumbered: true,
                    paragraphs: [
                        {
                            id: makeCustomId(8),
                            position: 1,
                            type: 'list_item',
                            elements: [
                                {
                                    type: 'text_run',
                                    content: ''
                                }
                            ]
                        }
                    ],
                }
            ]
        }
    ]
}