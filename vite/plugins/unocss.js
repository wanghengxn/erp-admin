import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'

export default function createUnocss() {
    return Unocss({
        presets: [
            presetIcons({
                extraProperties: {
                    'display': 'inline-block'
                }
            })
        ]
    })
}
