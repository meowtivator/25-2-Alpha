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

  // ===== COLD 질환 =====

  // 저체온증 (Hypothermia)
  '저체온증': {
    ko: {
      definition: '심부체온이 35℃ 미만으로 떨어진 상태를 말합니다.\n- 심부체온(core temperature)은 내부 장기/근육의 체온으로 주로 직장체온으로 측정합니다.',
      symptoms: [
        '성인: 몸떨림, 피로감, 착란, 어눌한 말투, 기억 상실, 졸림/기면',
        '유아: 발광과 차가운 피부, 축 처짐',
      ],
      advice: [
        '체온이 35℃ 미만이거나 의식 소실 시 즉시 119에 신고하여 의료기관으로 이송합니다.',
        '119 구급대가 오기 전까지는 다음을 시행합니다.',
        '가능한 빨리 따뜻한 장소로 이동합니다.',
        '젖은 옷을 벗기고 마른 담요/옷으로 몸을 감싸 보온합니다.',
        '환자가 혼란스러워도 억지로 움직이게 하지 않고 안정시키며 따뜻하게 합니다.',
        '의식이 있는 경우에만 따뜻한 음료(알코올 금지)를 천천히 마시게 합니다.',
        '의식이 없는 환자에게 음료를 먹이는 것은 금지합니다.',
        '맥박이 멈추거나 호흡이 없는 것 같으면 119 구급대 도착 전까지 심폐소생술(CPR)을 시행합니다.',
      ],
    },
    en: {
      definition: 'A condition where core body temperature drops below 35℃.\n- Core temperature refers to the temperature of internal organs/muscles, typically measured rectally.',
      symptoms: [
        'Adults: Shivering, fatigue, confusion, slurred speech, memory loss, drowsiness/lethargy',
        'Infants: Bright red and cold skin, limpness',
      ],
      advice: [
        'If body temperature is below 35℃ or consciousness is lost, immediately call emergency services and transport to a medical facility.',
        'Until emergency services arrive, do the following:',
        'Move to a warm place as soon as possible.',
        'Remove wet clothing and wrap the body with dry blankets/clothing for warmth.',
        'Even if the patient is confused, do not force movement; keep them calm and warm.',
        'Only if conscious, slowly give warm drinks (no alcohol).',
        'Never give drinks to unconscious patients.',
        'If pulse stops or breathing appears absent, perform CPR until emergency services arrive.',
      ],
    },
    vi: {
      definition: 'Tình trạng nhiệt độ cơ thể trung tâm giảm xuống dưới 35℃.\n- Nhiệt độ trung tâm (core temperature) là nhiệt độ của các cơ quan/cơ nội tạng, thường được đo qua trực tràng.',
      symptoms: [
        'Người lớn: Run rẩy, mệt mỏi, lẫn lộn, nói khó, mất trí nhớ, buồn ngủ/li bì',
        'Trẻ em: Da đỏ sáng và lạnh, mềm nhũn',
      ],
      advice: [
        'Nếu nhiệt độ cơ thể dưới 35℃ hoặc mất ý thức, ngay lập tức gọi 119 và đưa đến cơ sở y tế.',
        'Cho đến khi đội cứu thương đến, thực hiện các bước sau:',
        'Di chuyển đến nơi ấm càng sớm càng tốt.',
        'Cởi quần áo ướt và quấn cơ thể bằng chăn/quần áo khô để giữ ấm.',
        'Ngay cả khi bệnh nhân bối rối, không ép di chuyển; giữ bình tĩnh và ấm áp.',
        'Chỉ khi còn ý thức, cho uống từ từ đồ uống ấm (không rượu).',
        'Tuyệt đối không cho bệnh nhân bất tỉnh uống nước.',
        'Nếu ngừng mạch hoặc không thở, thực hiện hô hấp nhân tạo (CPR) cho đến khi đội cứu thương đến.',
      ],
    },
    ja: {
      definition: '深部体温が35℃未満に下がった状態を指します。\n- 深部体温（core temperature）は内部臓器/筋肉の体温で、主に直腸温で測定します。',
      symptoms: [
        '成人：震え、疲労感、錯乱、ろれつが回らない、記憶喪失、眠気/昏睡',
        '乳児：明るい赤と冷たい皮膚、ぐったり',
      ],
      advice: [
        '体温が35℃未満または意識喪失の場合は、直ちに119に通報し医療機関に搬送します。',
        '119救急隊が到着するまで、次のことを行います。',
        'できるだけ早く暖かい場所に移動します。',
        '濡れた服を脱がせ、乾いた毛布/服で体を包んで保温します。',
        '患者が混乱していても無理に動かさず、安静にして暖かくします。',
        '意識がある場合のみ、温かい飲み物（アルコール禁止）をゆっくり飲ませます。',
        '意識のない患者に飲み物を与えることは禁止です。',
        '脈拍が止まったり呼吸がないようであれば、119救急隊到着まで心肺蘇生法（CPR）を行います。',
      ],
    },
    zh: {
      definition: '核心体温降至35℃以下的状态。\n- 核心体温（core temperature）是指内部器官/肌肉的体温，通常通过直肠温度测量。',
      symptoms: [
        '成人：颤抖、疲劳、混乱、口齿不清、记忆丧失、嗜睡/昏睡',
        '婴儿：鲜红色且冰冷的皮肤、软弱无力',
      ],
      advice: [
        '如果体温低于35℃或失去意识，立即拨打119并送往医疗机构。',
        '在119急救队到达之前，执行以下操作：',
        '尽快移至温暖的地方。',
        '脱掉湿衣服，用干毛毯/衣物包裹身体保温。',
        '即使患者混乱，也不要强行移动；保持安静并保暖。',
        '仅在有意识时，缓慢饮用温热饮料（禁止酒精）。',
        '禁止给无意识患者喝水。',
        '如果脉搏停止或似乎没有呼吸，在119急救队到达前进行心肺复苏（CPR）。',
      ],
    },
  },

  // 동상 (Frostbite)
  '동상': {
    ko: {
      definition: '강한 한파에 노출됨으로써 피부 및 피하조직이 동결되는 손상입니다.\n- 주로 코, 귀, 뺨, 손가락, 발가락 등 말단에 나타납니다.\n- 심한 경우 절단이 필요할 수도 있는 질환입니다.',
      symptoms: [
        '피부색이 창백/푸르스름/회색으로 변함',
        '피부 촉감이 비정상적으로 단단해짐',
        '피부 감각 저하(무감각) 또는 저림/통증',
        '물집',
      ],
      advice: [
        '가능하면 신속히 의료기관을 방문하여 치료받는 것이 가장 중요합니다.',
        '즉각적 치료가 어렵다면 다음을 시행합니다.',
        '동상 부위를 문지르거나 비비지 않습니다. (조직 손상 위험)',
        '반지/시계 등 조이는 물건이 있으면 제거합니다.',
        '37~39℃의 따뜻한 물에 20~40분 담가 서서히 해동합니다.',
        '해동 중 물이 식지 않도록 유지합니다(뜨겁게 하지 않기).',
        '재동결 위험이 있으면 해동(따뜻한 물 담금)을 시도하지 않습니다.',
        '해동 후에는 깨끗한 거즈로 느슨하게 덮고, 가능한 한 움직임을 줄입니다.',
      ],
    },
    en: {
      definition: 'Damage caused by freezing of skin and subcutaneous tissue due to exposure to severe cold.\n- Commonly affects extremities such as nose, ears, cheeks, fingers, and toes.\n- In severe cases, amputation may be necessary.',
      symptoms: [
        'Skin color turns pale/bluish/gray',
        'Skin feels abnormally hard to touch',
        'Reduced skin sensation (numbness) or tingling/pain',
        'Blisters',
      ],
      advice: [
        'Most importantly, visit a medical facility promptly for treatment if possible.',
        'If immediate treatment is not available, do the following:',
        'Do not rub or massage frostbitten areas (risk of tissue damage).',
        'Remove tight items such as rings/watches.',
        'Gradually thaw by soaking in warm water at 37~39℃ for 20~40 minutes.',
        'Keep water warm during thawing (do not make it hot).',
        'Do not attempt thawing if there is risk of refreezing.',
        'After thawing, cover loosely with clean gauze and minimize movement.',
      ],
    },
    vi: {
      definition: 'Tổn thương do đông lạnh da và mô dưới da khi tiếp xúc với giá lạnh khắc nghiệt.\n- Thường ảnh hưởng đến các đầu mút như mũi, tai, má, ngón tay, ngón chân.\n- Trong trường hợp nghiêm trọng, có thể cần phải cắt cụt.',
      symptoms: [
        'Màu da chuyển sang nhạt/xanh tím/xám',
        'Da cảm giác cứng bất thường khi chạm',
        'Giảm cảm giác da (tê) hoặc tê/đau',
        'Phồng rộp',
      ],
      advice: [
        'Quan trọng nhất là nhanh chóng đến cơ sở y tế để điều trị nếu có thể.',
        'Nếu không thể điều trị ngay, thực hiện các bước sau:',
        'Không chà xát hoặc mát-xa vùng bị đóng băng (nguy cơ tổn thương mô).',
        'Tháo các vật thắt chặt như nhẫn/đồng hồ.',
        'Từ từ rã đông bằng cách ngâm trong nước ấm 37~39℃ trong 20~40 phút.',
        'Giữ nước ấm trong quá trình rã đông (không làm nóng).',
        'Không cố gắng rã đông nếu có nguy cơ đóng băng lại.',
        'Sau khi rã đông, che lỏng lẻo bằng gạc sạch và giảm thiểu chuyển động.',
      ],
    },
    ja: {
      definition: '強い寒波にさらされることで皮膚および皮下組織が凍結する損傷です。\n- 主に鼻、耳、頬、指、足指などの末端に現れます。\n- 重症の場合、切断が必要になることもある疾患です。',
      symptoms: [
        '皮膚の色が青白い/青みがかった/灰色に変わる',
        '皮膚の触感が異常に硬くなる',
        '皮膚感覚の低下（無感覚）またはしびれ/痛み',
        '水ぶくれ',
      ],
      advice: [
        '可能であれば速やかに医療機関を訪れて治療を受けることが最も重要です。',
        '即座の治療が難しい場合は、次のことを行います。',
        '凍傷部位をこすったりマッサージしたりしない（組織損傷の危険）。',
        '指輪/時計など締め付けるものがあれば取り除く。',
        '37~39℃の温かい水に20~40分浸してゆっくり解凍する。',
        '解凍中は水が冷めないように保つ（熱くしない）。',
        '再凍結のリスクがある場合は解凍（温かい水に浸す）を試みない。',
        '解凍後は清潔なガーゼで緩く覆い、できるだけ動きを減らす。',
      ],
    },
    zh: {
      definition: '暴露于严寒导致皮肤和皮下组织冻结的损伤。\n- 主要影响鼻子、耳朵、脸颊、手指、脚趾等末端部位。\n- 严重情况下可能需要截肢的疾病。',
      symptoms: [
        '皮肤颜色变为苍白/发蓝/灰色',
        '皮肤触感异常坚硬',
        '皮肤感觉降低（麻木）或刺痛/疼痛',
        '水泡',
      ],
      advice: [
        '最重要的是如果可能尽快去医疗机构接受治疗。',
        '如果无法立即治疗，请执行以下操作：',
        '不要摩擦或按摩冻伤部位（有组织损伤风险）。',
        '如有戒指/手表等紧束物品请取下。',
        '在37~39℃的温水中浸泡20~40分钟逐渐解冻。',
        '解冻期间保持水温（不要过热）。',
        '如有再冻结风险，不要尝试解冻（温水浸泡）。',
        '解冻后用干净纱布松散覆盖，尽量减少移动。',
      ],
    },
  },

  // 침족병 및 침수병 (Trench Foot / Immersion Foot)
  '침족병 및 침수병': {
    ko: {
      definition: '10℃ 이하의 물 또는 젖은 환경에 손/발이 장시간 노출되어 피부와 조직이 손상되는 상태입니다.',
      symptoms: [
        '초기: 저림/무감각, 차갑고 둔한 통증',
        '진행: 붓기, 피부색 변화',
        '물집/피부 손상',
      ],
      advice: [
        '젖은 신발/양말을 벗고 발(또는 손)을 말립니다.',
        '따뜻한 물로 조심스럽게 씻은 뒤 완전히 건조합니다.',
        '보온하고, 압박되는 신발은 피합니다.',
        '물집/피부손상/통증이 심하면 의료기관 진료를 받습니다.',
      ],
    },
    en: {
      definition: 'A condition where skin and tissue are damaged due to prolonged exposure of hands/feet to water below 10℃ or wet environments.',
      symptoms: [
        'Early: Tingling/numbness, cold and dull pain',
        'Progression: Swelling, skin color changes',
        'Blisters/skin damage',
      ],
      advice: [
        'Remove wet shoes/socks and dry feet (or hands).',
        'Carefully wash with warm water and dry completely.',
        'Keep warm and avoid tight shoes.',
        'Seek medical attention if blisters/skin damage/pain is severe.',
      ],
    },
    vi: {
      definition: 'Tình trạng da và mô bị tổn thương do tay/chân tiếp xúc lâu với nước dưới 10℃ hoặc môi trường ẩm ướt.',
      symptoms: [
        'Giai đoạn đầu: Tê/tê liệt, đau lạnh và đần độn',
        'Tiến triển: Sưng, thay đổi màu da',
        'Phồng rộp/tổn thương da',
      ],
      advice: [
        'Cởi giày/tất ướt và lau khô chân (hoặc tay).',
        'Rửa cẩn thận bằng nước ấm và làm khô hoàn toàn.',
        'Giữ ấm và tránh giày chặt.',
        'Đến cơ sở y tế nếu phồng rộp/tổn thương da/đau nghiêm trọng.',
      ],
    },
    ja: {
      definition: '10℃以下の水または湿った環境に手/足が長時間さらされて皮膚と組織が損傷する状態です。',
      symptoms: [
        '初期：しびれ/無感覚、冷たく鈍い痛み',
        '進行：腫れ、皮膚色の変化',
        '水ぶくれ/皮膚損傷',
      ],
      advice: [
        '濡れた靴/靴下を脱いで足（または手）を乾かします。',
        '温かい水で慎重に洗った後、完全に乾燥させます。',
        '保温し、圧迫する靴は避けます。',
        '水ぶくれ/皮膚損傷/痛みが激しい場合は医療機関の診療を受けます。',
      ],
    },
    zh: {
      definition: '手/脚长时间暴露于10℃以下的水或潮湿环境而导致皮肤和组织损伤的状态。',
      symptoms: [
        '早期：刺痛/麻木、冰冷和钝痛',
        '进展：肿胀、皮肤颜色变化',
        '水泡/皮肤损伤',
      ],
      advice: [
        '脱掉湿鞋/袜子并擦干脚（或手）。',
        '用温水小心清洗后完全干燥。',
        '保暖，避免紧身鞋。',
        '如果水泡/皮肤损伤/疼痛严重，请就医。',
      ],
    },
  },

  // 동창 (Chilblains)
  '동창': {
    ko: {
      definition: '다습하고 가벼운 추위(약 0~10℃)에 반복적으로 노출되어 피부/피하조직에 염증 반응이 생긴 상태입니다.\n- 심하면 물집이나 궤양, 피부색 변화가 생길 수 있습니다.',
      symptoms: [
        '국소 부위 가려움',
        '붓기',
        '붉어짐/통증',
        '따뜻한 곳에 가면 가려움이 심해짐',
      ],
      advice: [
        '해당 부위를 따뜻하고 건조하게 유지합니다.',
        '갑자기 뜨겁게 하거나 강하게 마사지하지 않습니다.',
        '피부를 청결히 유지하고 보습합니다.',
        '물집/궤양/통증이 심하거나 반복되면 의료기관 상담을 권장합니다.',
      ],
    },
    en: {
      definition: 'Inflammatory reaction in skin/subcutaneous tissue due to repeated exposure to humid and mild cold (approximately 0~10℃).\n- In severe cases, blisters, ulcers, or skin color changes may occur.',
      symptoms: [
        'Localized itching',
        'Swelling',
        'Redness/pain',
        'Itching worsens in warm places',
      ],
      advice: [
        'Keep the affected area warm and dry.',
        'Do not suddenly heat or massage vigorously.',
        'Keep skin clean and moisturized.',
        'Consult a medical facility if blisters/ulcers/pain is severe or recurring.',
      ],
    },
    vi: {
      definition: 'Phản ứng viêm ở da/mô dưới da do tiếp xúc lặp đi lặp lại với lạnh ẩm nhẹ (khoảng 0~10℃).\n- Trong trường hợp nghiêm trọng, có thể xuất hiện phồng rộp, loét hoặc thay đổi màu da.',
      symptoms: [
        'Ngứa khu vực cục bộ',
        'Sưng',
        'Đỏ/đau',
        'Ngứa trầm trọng hơn ở nơi ấm',
      ],
      advice: [
        'Giữ vùng bị ảnh hưởng ấm và khô.',
        'Không đột ngột làm nóng hoặc mát-xa mạnh.',
        'Giữ da sạch sẽ và giữ ẩm.',
        'Tư vấn cơ sở y tế nếu phồng rộp/loét/đau nghiêm trọng hoặc tái phát.',
      ],
    },
    ja: {
      definition: '湿った軽い寒さ（約0~10℃）に繰り返しさらされて皮膚/皮下組織に炎症反応が生じた状態です。\n- 重症の場合、水ぶくれや潰瘍、皮膚色の変化が生じることがあります。',
      symptoms: [
        '局所部位のかゆみ',
        '腫れ',
        '赤み/痛み',
        '暖かい場所に行くとかゆみが悪化',
      ],
      advice: [
        '該当部位を暖かく乾燥した状態に保ちます。',
        '急に熱くしたり強くマッサージしたりしません。',
        '皮膚を清潔に保ち、保湿します。',
        '水ぶくれ/潰瘍/痛みが激しいか繰り返す場合は医療機関の相談をお勧めします。',
      ],
    },
    zh: {
      definition: '反复暴露于潮湿轻度寒冷（约0~10℃）导致皮肤/皮下组织产生炎症反应的状态。\n- 严重情况下可能出现水泡、溃疡或皮肤颜色变化。',
      symptoms: [
        '局部瘙痒',
        '肿胀',
        '发红/疼痛',
        '在温暖的地方瘙痒加剧',
      ],
      advice: [
        '保持患处温暖干燥。',
        '不要突然加热或用力按摩。',
        '保持皮肤清洁和保湿。',
        '如果水泡/溃疡/疼痛严重或反复出现，建议咨询医疗机构。',
      ],
    },
  },
};
