

const { createApp, ref, computed } = Vue

createApp({
    setup() {
        
        const baseUrl = 'https://paper-demo.oss-cn-hongkong.aliyuncs.com/'
        
        const keys = [{ title: 'sample_3', sent: 'Her shoes were like fishes.' }, { title: 'sample_2', sent: 'And what are doves. And what are doves.' }]
        const selectedKeyTitle = ref('sample_3')

        const mos = {
            'sample_3': {
                'MixedEmotion': baseUrl + 'egtts/MOS/Mel_62_ref_Angry_TTS.wav',
                'EmoDiff': baseUrl + 'egtts/MOS/0015-Angry_000362.wav',
                'Ours': baseUrl + 'egtts/Guidance_Distortion/Angry_/w1_A1.0/sample_3_20.wav',
                'GT': baseUrl + 'egtts/MOS/0015_000362.wav',
            }, 
            'sample_2': {
                'MixedEmotion': baseUrl + 'egtts/MOS/Mel_72_ref_Sad_TTS.wav',
                'EmoDiff': baseUrl + 'egtts/MOS/0015-Sad_001072.wav',
                'Ours': baseUrl + 'egtts/Guidance_Distortion/Sad_/w1_S1.0/sample_2_20.wav',
                'GT': baseUrl + 'egtts/MOS/0015_001072.wav',
            }
        }
        
        const existing_emos = ['Neutral', 'Angry', 'Happy', 'Sad', 'Surprise']
        const guidance_scales = [...Array.from({ length: 21 }, (_, i) => i), ...[30, 40, 50]] 
        // egtts/Guidance Distortion/Angry_/w0_A1.0/sample_2_20.wav
        const guidance_distortion = {'sample_2': {}, 'sample_3': {}}
        for (const ee of existing_emos) {
            for (const gs of guidance_scales) {
                for (const gd in guidance_distortion) {
                    const link = baseUrl + 'egtts/Guidance_Distortion/' + ee + '_/w' + gs + '_' + ee[0] + '1.0/' + gd + '_20.wav'
                    if (guidance_distortion[gd][ee]) {
                        guidance_distortion[gd][ee].push({link, gs})
                    } else {
                        guidance_distortion[gd][ee] = [{link, gs}]
                    }    
                }
            }
        }
        
        const nl_emos = ['Angry and sad', 'Excited', 'Joyful', 'Objective', 'Outraged', 'Shocked', 'a bit sad', 'in a happy tone']
        const nlc = {'sample_2': [], 'sample_3': []}
        for (const ne of nl_emos) {
            for (const n in nlc) {
                const link = baseUrl + 'egtts/DESC_Comparison/' + ne + '_/w1_' + ne[0] + '1.0/' + n + '_20.wav'
                nlc[n].push({ link, ne })
            }
        }
        
        const mixed_emos = ['Happy_Angry', 'Sad_Angry', 'Surprise_Angry', 'Happy_Surprise', 'Sad_Surprise']
        const mixed = {'sample_2': {}, 'sample_3': {}}
        for (const me of mixed_emos) {
            for (let i = 0; i <= 1; i += 0.1) {
                for (const m in mixed) {
                    const link = baseUrl + 'egtts/Mixed_Emotion_Perception/' + me + '_/w3_' + me[0] + i.toFixed(1) + me.split('_')[1][0] + (1-i).toFixed(1) + '/' + m + '_10.wav'
                    if (mixed[m][me]) {
                        mixed[m][me].push({ link, i })
                    } else {
                        mixed[m][me] = [{ link, i }]
                    }    
                }
            }
        }

        function changeKeyTitle(title) {
            selectedKeyTitle.value = title
        }

        return {
            selectedKeyTitle,
            keys,
            mos,
            guidance_distortion,
            nlc,
            mixed,
            changeKeyTitle
        }
    }
}).mount('#app')

