import { makeCustomId } from '../utils/generators'

export const initialQuizWithGapFill = {
    title: "Untilted quiz",
    description: 'Quiz description',
    has_many_sections: false,
    sections: [
        {
            position: 1,
            exercises: [
                {
                    id: makeCustomId(8),
                    type: 'gap_fill',
                    title: 'Fill the gaps in the following sentences:',
                    subtitle: '',
                    has_subtitle: false,
                    is_numbered: true,
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