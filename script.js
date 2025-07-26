document.addEventListener('DOMContentLoaded', function() {
    const englishText = document.getElementById('englishText');
    const eldarinOutput = document.getElementById('eldarinOutput');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // قاموس التحويل
    const eldarinDict = {
        // الحروف الأساسية
        'a': 'ᚪᛖ', 'b': 'ᛒᛁ', 'c': 'ᚳᛁ', 'd': 'ᛞᛁ', 'e': 'ᛖᛁ',
        'f': 'ᚠᛁ', 'g': 'ᚷᛁ', 'h': 'ᚻᛁ', 'i': 'ᛁᛁ', 'j': 'ᛡᛁ',
        'k': 'ᚲᛁ', 'l': 'ᛚᛁ', 'm': 'ᛗᛁ', 'n': 'ᚾᛁ', 'o': 'ᚭᛖ',
        'p': 'ᛕᛁ', 'q': 'ᛩᛁ', 'r': 'ᚱᛁ', 's': 'ᛊᛁ', 't': 'ᛏᛁ',
        'u': 'ᚢᛁ', 'v': 'ᚡᛁ', 'w': 'ᚥᛁ', 'x': 'ᛪᛁ', 'y': 'ᚤᛁ', 'z': 'ᛎᛁ',
        
        // الحروف المركبة (يجب أن تكون قبل الحروف الأساسية في التحويل)
        'th': 'ᚧ', 'sh': 'ᛇᚷ', 'ch': 'ᛤᚸ', 'gh': 'ᛝᚸ', 'ph': 'ᛕᚸ',
        
        // علامات الترقيم
        '.': '᛫', ',': '᛭', '!': 'ⵑ', '?': 'ⵙ', '-': ' ',
        '"': '⁕', "'": 'Ꞌ', '(': '❨', ')': '❩'
    };

    // دالة التحويل
    function convertToEldarin(text) {
        text = text.toLowerCase();
        let result = '';
        let i = 0;
        
        while (i < text.length) {
            let found = false;
            
            // التحقق من الحروف المركبة أولاً
            for (let compound in eldarinDict) {
                if (compound.length > 1 && text.substr(i, compound.length) === compound) {
                    result += eldarinDict[compound];
                    i += compound.length;
                    found = true;
                    break;
                }
            }
            
            if (found) continue;
            
            // التحقق من الحروف الفردية
            const char = text[i];
            result += eldarinDict[char] || char;
            i++;
        }
        
        return result;
    }

    // أحداث الأزرار
    convertBtn.addEventListener('click', function() {
        const text = englishText.value;
        eldarinOutput.textContent = convertToEldarin(text);
    });

    copyBtn.addEventListener('click', function() {
        const range = document.createRange();
        range.selectNode(eldarinOutput);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        
        // تغيير نص الزر مؤقتاً للإشارة إلى النسخ
        copyBtn.textContent = 'تم النسخ!';
        setTimeout(() => {
            copyBtn.textContent = 'نسخ النص';
        }, 2000);
    });

    clearBtn.addEventListener('click', function() {
        englishText.value = '';
        eldarinOutput.textContent = '';
    });

    // تحويل تلقائي عند الكتابة (اختياري)
    englishText.addEventListener('input', function() {
        eldarinOutput.textContent = convertToEldarin(englishText.value);
    });
});
