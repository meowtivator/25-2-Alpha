// src/data/symptomGuideData.ts
// 온열질환 가이드 데이터 - 백엔드가 Accept-Language를 지원하지 않아 프론트엔드에서 관리

export interface GuideData {
  definition: string;
  symptoms: string[];
  advice: string[];
}

export const symptomGuideData: Record<string, Record<string, GuideData>> = {
  // 열경련 (Heat Cramps)
  '열경련': {
    ko: {
      definition: '땀을 많이 흘릴 경우, 체내 염분 또는 칼륨·마그네슘 등이 부족하여 근육경련이 발생하는 질환입니다.',
      symptoms: ['근육통(경련)', '발열/발한'],
      advice: [
        '물을 섭취하여 수분을 보충한다.',
        '증상이 1시간 이상 지속되거나 회복되지 않을 경우 의료기관에 내원하여 적절한 진료를 받는다.',
        '경련이 일어난 근육은 무리하게 마사지하지 않는다.',
      ],
    },
    en: {
      definition: 'Muscle cramps that occur due to loss of salt, potassium, or magnesium through excessive sweating.',
      symptoms: ['Muscle pain (cramps)', 'Fever/Sweating'],
      advice: [
        'Drink water to replenish fluids.',
        'Seek medical attention if symptoms persist for more than an hour or do not improve.',
        'Do not massage cramped muscles excessively.',
      ],
    },
    vi: {
      definition: 'Bệnh chuột rút cơ do thiếu muối, kali, magiê trong cơ thể khi đổ mồ hôi nhiều.',
      symptoms: ['Đau cơ (chuột rút)', 'Sốt/Đổ mồ hôi'],
      advice: [
        'Uống nước để bổ sung nước.',
        'Đến cơ sở y tế nếu triệu chứng kéo dài hơn 1 giờ hoặc không thuyên giảm.',
        'Không massage mạnh vùng cơ bị chuột rút.',
      ],
    },
    ja: {
      definition: '大量の汗をかいた場合、体内の塩分やカリウム・マグネシウムなどが不足して筋肉けいれんが発生する疾患です。',
      symptoms: ['筋肉痛（けいれん）', '発熱/発汗'],
      advice: [
        '水を摂取して水分を補給する。',
        '症状が1時間以上続くか回復しない場合は医療機関を受診し適切な治療を受ける。',
        'けいれんが起こった筋肉を無理にマッサージしない。',
      ],
    },
    zh: {
      definition: '大量出汗时，体内盐分或钾、镁等不足而发生肌肉痉挛的疾病。',
      symptoms: ['肌肉疼痛（痉挛）', '发热/出汗'],
      advice: [
        '喝水补充水分。',
        '如症状持续1小时以上或未恢复，应就医接受适当治疗。',
        '不要过度按摩痉挛的肌肉。',
      ],
    },
  },

  // 열탈진 (Heat Exhaustion)
  '열탈진': {
    ko: {
      definition: '땀을 많이 흘려 수분과 염분이 적절히 공급되지 못하는 경우 발생하는 질환입니다.',
      symptoms: ['발열/발한', '심한 두통', '구토 및 설사', '빈혈/빈호흡/저혈압'],
      advice: [
        '물을 섭취하여 수분을 보충한다.',
        '시원한 곳 또는 에어컨이 있는 장소에서 휴식한다.',
        '증상이 1시간 이상 지속되거나 회복되지 않을 경우 의료기관에 내원하여 적절한 진료를 받는다.',
      ],
    },
    en: {
      definition: 'Occurs when water and salt are not adequately replenished after excessive sweating.',
      symptoms: ['Fever/Sweating', 'Severe headache', 'Nausea and vomiting', 'Anemia/Rapid breathing/Low blood pressure'],
      advice: [
        'Drink water to replenish fluids.',
        'Rest in a cool place or air-conditioned area.',
        'Seek medical attention if symptoms persist for more than an hour or do not improve.',
      ],
    },
    vi: {
      definition: 'Bệnh xảy ra khi nước và muối không được bổ sung đầy đủ do đổ mồ hôi nhiều.',
      symptoms: ['Sốt/Đổ mồ hôi', 'Đau đầu dữ dội', 'Nôn và tiêu chảy', 'Thiếu máu/Thở nhanh/Huyết áp thấp'],
      advice: [
        'Uống nước để bổ sung nước.',
        'Nghỉ ngơi ở nơi mát hoặc có máy lạnh.',
        'Đến cơ sở y tế nếu triệu chứng kéo dài hơn 1 giờ hoặc không thuyên giảm.',
      ],
    },
    ja: {
      definition: '大量の汗をかいて水分と塩分が適切に補給されない場合に発生する疾患です。',
      symptoms: ['発熱/発汗', '激しい頭痛', '嘔吐および下痢', '貧血/頻呼吸/低血圧'],
      advice: [
        '水を摂取して水分を補給する。',
        '涼しい場所またはエアコンのある場所で休憩する。',
        '症状が1時間以上続くか回復しない場合は医療機関を受診し適切な治療を受ける。',
      ],
    },
    zh: {
      definition: '大量出汗后水分和盐分未得到充分补充时发生的疾病。',
      symptoms: ['发热/出汗', '严重头痛', '呕吐和腹泻', '贫血/呼吸急促/低血压'],
      advice: [
        '喝水补充水分。',
        '在阴凉处或有空调的地方休息。',
        '如症状持续1小时以上或未恢复，应就医接受适当治疗。',
      ],
    },
  },

  // 열실신 (Heat Syncope)
  '열실신': {
    ko: {
      definition: '체온이 높아지면 열을 외부로 방출하기 위해 체표면의 혈액량을 늘리는데, 이때 심부 혈액량이 감소하여 일시적으로 의식을 잃는 상태입니다.',
      symptoms: ['빈혈/빈호흡/저혈압', '열실신'],
      advice: [
        '환자를 시원한 장소로 옮긴다.',
        '다리를 머리보다 높은 곳에 둔다.',
        '옷을 느슨하게 하고 몸에 시원한 물을 적셔 부채나 선풍기 등으로 몸을 식힌다.',
        '의식이 없는 환자에게 음료를 마시게 하는 것은 절대 금지한다.',
      ],
    },
    en: {
      definition: 'Temporary loss of consciousness due to decreased blood flow to the brain when body temperature rises and blood is redirected to the skin surface to release heat.',
      symptoms: ['Anemia/Rapid breathing/Low blood pressure', 'Fainting'],
      advice: [
        'Move the patient to a cool location.',
        'Elevate the legs above the head.',
        'Loosen clothing and apply cool water to the body, using a fan to cool down.',
        'Never give fluids to an unconscious patient.',
      ],
    },
    vi: {
      definition: 'Tình trạng mất ý thức tạm thời do lượng máu ở não giảm khi nhiệt độ cơ thể tăng và máu tăng lên bề mặt da để tản nhiệt.',
      symptoms: ['Thiếu máu/Thở nhanh/Huyết áp thấp', 'Ngất xỉu'],
      advice: [
        'Đưa bệnh nhân đến nơi mát.',
        'Nâng chân cao hơn đầu.',
        'Nới lỏng quần áo và thấm nước mát lên cơ thể, dùng quạt để làm mát.',
        'Tuyệt đối không cho bệnh nhân bất tỉnh uống nước.',
      ],
    },
    ja: {
      definition: '体温が上がると熱を外部に放出するため体表面の血液量を増やすが、このとき深部の血液量が減少して一時的に意識を失う状態です。',
      symptoms: ['貧血/頻呼吸/低血圧', '失神'],
      advice: [
        '患者を涼しい場所に移動する。',
        '足を頭より高い位置に置く。',
        '服を緩めて体に冷たい水をかけ、うちわや扇風機などで体を冷やす。',
        '意識のない患者に飲み物を飲ませることは絶対に禁止。',
      ],
    },
    zh: {
      definition: '体温升高时，为向外散热而增加体表血液量，此时深部血液量减少而暂时失去意识的状态。',
      symptoms: ['贫血/呼吸急促/低血压', '晕厥'],
      advice: [
        '将患者移至阴凉处。',
        '将腿抬高至头部以上。',
        '松开衣物，用凉水浸湿身体，用扇子或风扇降温。',
        '绝对禁止给无意识患者喝水。',
      ],
    },
  },

  // 열발진 (Heat Rash)
  '열발진': {
    ko: {
      definition: '땀구멍이 막혀 땀이 제대로 배출되지 못하면서 피부에 작은 발진과 물집이 발생하는 질환입니다.',
      symptoms: ['발진/땀띠'],
      advice: [
        '물을 섭취하여 수분을 보충한다.',
        '환부를 시원하고 건조하게 유지한다.',
      ],
    },
    en: {
      definition: 'Small rashes and blisters that occur on the skin when sweat pores are blocked and sweat cannot be properly released.',
      symptoms: ['Rash/Heat rash'],
      advice: [
        'Drink water to replenish fluids.',
        'Keep the affected area cool and dry.',
      ],
    },
    vi: {
      definition: 'Bệnh nổi phát ban và mụn nước nhỏ trên da do lỗ chân lông bị tắc, mồ hôi không thoát được.',
      symptoms: ['Phát ban/Mụn nhiệt'],
      advice: [
        'Uống nước để bổ sung nước.',
        'Giữ vùng bị ảnh hưởng mát mẻ và khô ráo.',
      ],
    },
    ja: {
      definition: '汗の穴が詰まって汗が適切に排出されず、皮膚に小さな発疹と水ぶくれが発生する疾患です。',
      symptoms: ['発疹/あせも'],
      advice: [
        '水を摂取して水分を補給する。',
        '患部を涼しく乾燥した状態に保つ。',
      ],
    },
    zh: {
      definition: '汗孔堵塞，汗液无法正常排出而在皮肤上出现小疹子和水泡的疾病。',
      symptoms: ['皮疹/痱子'],
      advice: [
        '喝水补充水分。',
        '保持患处凉爽干燥。',
      ],
    },
  },

  // 일광화상 (Sunburn)
  '일광화상': {
    ko: {
      definition: '햇빛(자외선)에 오래 노출되어 피부가 붉어지고 염증 반응이 생기는 증상입니다.',
      symptoms: ['부종/물집', '발열/발한'],
      advice: [
        '물을 섭취하여 수분을 보충한다.',
        '햇볕에 탄 부위를 시원한 물에 적셔 목욕한다.',
        '보습연고를 사용하고 물집은 터트리지 않는다.',
      ],
    },
    en: {
      definition: 'Redness and inflammation of the skin caused by prolonged exposure to sunlight (UV rays).',
      symptoms: ['Swelling/Blisters', 'Fever/Sweating'],
      advice: [
        'Drink water to replenish fluids.',
        'Bathe sunburned areas with cool water.',
        'Use moisturizing ointment and do not pop blisters.',
      ],
    },
    vi: {
      definition: 'Triệu chứng da đỏ và viêm do tiếp xúc lâu với ánh nắng mặt trời (tia UV).',
      symptoms: ['Sưng/Phồng rộp', 'Sốt/Đổ mồ hôi'],
      advice: [
        'Uống nước để bổ sung nước.',
        'Tắm vùng bị cháy nắng bằng nước mát.',
        'Sử dụng thuốc mỡ dưỡng ẩm và không làm vỡ mụn nước.',
      ],
    },
    ja: {
      definition: '日光（紫外線）に長時間さらされて皮膚が赤くなり、炎症反応が起こる症状です。',
      symptoms: ['腫れ/水ぶくれ', '発熱/発汗'],
      advice: [
        '水を摂取して水分を補給する。',
        '日焼けした部位を冷たい水で浸して入浴する。',
        '保湿軟膏を使用し、水ぶくれは潰さない。',
      ],
    },
    zh: {
      definition: '长时间暴露在阳光（紫外线）下导致皮肤发红并产生炎症反应的症状。',
      symptoms: ['水肿/水泡', '发热/出汗'],
      advice: [
        '喝水补充水分。',
        '用凉水浸泡晒伤部位洗澡。',
        '使用保湿软膏，不要弄破水泡。',
      ],
    },
  },

  // 열사병 (Heat Stroke)
  '열사병': {
    ko: {
      definition: '체온을 조절하는 신경계(체온조절 중추)가 외부의 열 자극을 견디지 못해 그 기능을 상실한 질환으로, 열 관련 질환 중 가장 위급한 상태입니다.',
      symptoms: ['발열/발한', '심한 두통', '구토 및 설사', '빈혈/빈호흡/저혈압', '열실신'],
      advice: [
        '환자를 시원한 장소로 옮긴다.',
        '다리를 머리보다 높은 곳에 둔다.',
        '옷을 느슨하게 하고 몸에 시원한 물을 적셔 부채나 선풍기 등으로 몸을 식힌다.',
        '의식이 없는 환자에게 음료를 마시게 하는 것은 절대 금지한다.',
      ],
    },
    en: {
      definition: 'The most critical heat-related condition where the thermoregulatory system fails to cope with external heat stimulation and loses its function.',
      symptoms: ['Fever/Sweating', 'Severe headache', 'Nausea and vomiting', 'Anemia/Rapid breathing/Low blood pressure', 'Fainting'],
      advice: [
        'Move the patient to a cool location.',
        'Elevate the legs above the head.',
        'Loosen clothing and apply cool water to the body, using a fan to cool down.',
        'Never give fluids to an unconscious patient.',
      ],
    },
    vi: {
      definition: 'Bệnh nguy hiểm nhất liên quan đến nhiệt, khi hệ thống điều hòa nhiệt độ cơ thể không chịu nổi kích thích nhiệt từ bên ngoài và mất chức năng.',
      symptoms: ['Sốt/Đổ mồ hôi', 'Đau đầu dữ dội', 'Nôn và tiêu chảy', 'Thiếu máu/Thở nhanh/Huyết áp thấp', 'Ngất xỉu'],
      advice: [
        'Đưa bệnh nhân đến nơi mát.',
        'Nâng chân cao hơn đầu.',
        'Nới lỏng quần áo và thấm nước mát lên cơ thể, dùng quạt để làm mát.',
        'Tuyệt đối không cho bệnh nhân bất tỉnh uống nước.',
      ],
    },
    ja: {
      definition: '体温を調節する神経系（体温調節中枢）が外部の熱刺激に耐えられず機能を失った疾患で、熱関連疾患の中で最も危険な状態です。',
      symptoms: ['発熱/発汗', '激しい頭痛', '嘔吐および下痢', '貧血/頻呼吸/低血圧', '失神'],
      advice: [
        '患者を涼しい場所に移動する。',
        '足を頭より高い位置に置く。',
        '服を緩めて体に冷たい水をかけ、うちわや扇風機などで体を冷やす。',
        '意識のない患者に飲み物を飲ませることは絶対に禁止。',
      ],
    },
    zh: {
      definition: '调节体温的神经系统（体温调节中枢）无法承受外部热刺激而丧失功能的疾病，是与热相关疾病中最危急的状态。',
      symptoms: ['发热/出汗', '严重头痛', '呕吐和腹泻', '贫血/呼吸急促/低血压', '晕厥'],
      advice: [
        '将患者移至阴凉处。',
        '将腿抬高至头部以上。',
        '松开衣物，用凉水浸湿身体，用扇子或风扇降温。',
        '绝对禁止给无意识患者喝水。',
      ],
    },
  },

  // 열부종 (Heat Edema)
  '열부종': {
    ko: {
      definition: '체온이 높아지면 열을 외부로 방출하기 위해 체표면의 혈액량을 늘리면서 부종이 발생하는 질환입니다.',
      symptoms: ['부종/물집'],
      advice: [
        '물을 섭취하여 수분을 보충한다.',
        '시원한 곳 또는 에어컨이 있는 장소에서 휴식한다.',
      ],
    },
    en: {
      definition: 'Swelling that occurs as blood flow to the skin surface increases to release heat when body temperature rises.',
      symptoms: ['Swelling/Blisters'],
      advice: [
        'Drink water to replenish fluids.',
        'Rest in a cool place or air-conditioned area.',
      ],
    },
    vi: {
      definition: 'Bệnh phù do tăng lượng máu ở bề mặt da để tỏa nhiệt khi nhiệt độ cơ thể tăng.',
      symptoms: ['Sưng/Phồng rộp'],
      advice: [
        'Uống nước để bổ sung nước.',
        'Nghỉ ngơi ở nơi mát hoặc có máy lạnh.',
      ],
    },
    ja: {
      definition: '体温が上がると熱を外部に放出するため体表面の血液量を増やすことで浮腫が発生する疾患です。',
      symptoms: ['腫れ/水ぶくれ'],
      advice: [
        '水を摂取して水分を補給する。',
        '涼しい場所またはエアコンのある場所で休憩する。',
      ],
    },
    zh: {
      definition: '体温升高时为向外散热而增加体表血液量从而产生水肿的疾病。',
      symptoms: ['水肿/水泡'],
      advice: [
        '喝水补充水分。',
        '在阴凉处或有空调的地方休息。',
      ],
    },
  },
};
