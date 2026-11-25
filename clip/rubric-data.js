window.SB_NOV_RUBRIC = {
  "version": "sonicbench-clip/2611",
  "groups": [
    {
      "key": "musicality",
      "label": "1. 音乐性表现",
      "dimensions": [
        "melody",
        "harmony",
        "rhythm",
        "structure",
        "arrangement",
        "ending",
        "lyrics_melody_relation",
        "musicality_overall"
      ]
    },
    {
      "key": "acoustics",
      "label": "2. 音质与声学表现",
      "dimensions": [
        "audio_quality",
        "instrument_realism",
        "mix_master",
        "technical_consistency",
        "acoustics_overall"
      ]
    },
    {
      "key": "vocals",
      "label": "3. 人声演唱表现（仅vocal）",
      "dimensions": [
        "vocal_quality",
        "singing_performance",
        "emotional_expression",
        "vocals_overall"
      ]
    },
    {
      "key": "instruction",
      "label": "4. CLIP 指令遵循",
      "dimensions": [
        "instruction_genre",
        "instruction_tempo_rhythm",
        "instruction_mood",
        "instruction_instrumentation",
        "instruction_vocal",
        "instruction_scene",
        "instruction_duration",
        "instruction_section_structure",
        "instruction_overall"
      ]
    },
    {
      "key": "overall",
      "label": "5. 总体评分",
      "dimensions": [
        "overall"
      ]
    }
  ],
  "dimensions": [
    {
      "key": "melody",
      "label": "旋律/动机",
      "groupKey": "musicality",
      "options": [
        {
          "id": "MELODY_01",
          "label": "核心动机难以辨认"
        },
        {
          "id": "MELODY_02",
          "label": "片段内乐句碎裂/句法不成立"
        },
        {
          "id": "MELODY_03",
          "label": "动机发展不足"
        },
        {
          "id": "MELODY_04",
          "label": "机械重复/素材堆砌"
        },
        {
          "id": "MELODY_05",
          "label": "旋律走向生硬"
        },
        {
          "id": "MELODY_06",
          "label": "弱旋律类型缺少核心音型/纹理动机"
        },
        {
          "id": "MELODY_07",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "harmony",
      "label": "和声",
      "groupKey": "musicality",
      "options": [
        {
          "id": "HARMONY_01",
          "label": "调性/和弦关系混乱"
        },
        {
          "id": "HARMONY_02",
          "label": "与旋律/动机冲突"
        },
        {
          "id": "HARMONY_03",
          "label": "和声连接生硬"
        },
        {
          "id": "HARMONY_04",
          "label": "不符合目标风格语汇"
        },
        {
          "id": "HARMONY_05",
          "label": "色彩或层次不足"
        },
        {
          "id": "HARMONY_06",
          "label": "局部错和弦/异常音"
        },
        {
          "id": "HARMONY_07",
          "label": "片段内和声停滞"
        },
        {
          "id": "HARMONY_08",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "rhythm",
      "label": "节奏/律动",
      "groupKey": "musicality",
      "options": [
        {
          "id": "RHYTHM_01",
          "label": "拍点不稳/节拍错乱"
        },
        {
          "id": "RHYTHM_02",
          "label": "重音关系失衡"
        },
        {
          "id": "RHYTHM_03",
          "label": "律动僵硬"
        },
        {
          "id": "RHYTHM_04",
          "label": "切分或变化生硬"
        },
        {
          "id": "RHYTHM_05",
          "label": "推进缺少呼吸"
        },
        {
          "id": "RHYTHM_06",
          "label": "目标风格律动不成立"
        },
        {
          "id": "RHYTHM_07",
          "label": "片段内节奏缺少变化"
        },
        {
          "id": "RHYTHM_08",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "structure",
      "label": "结构与推进",
      "groupKey": "musicality",
      "options": [
        {
          "id": "STRUCTURE_01",
          "label": "片段内部关系混乱"
        },
        {
          "id": "STRUCTURE_02",
          "label": "乐句/段落衔接突兀"
        },
        {
          "id": "STRUCTURE_03",
          "label": "推进缺少音乐依据"
        },
        {
          "id": "STRUCTURE_04",
          "label": "变化不足/发展停滞"
        },
        {
          "id": "STRUCTURE_05",
          "label": "转折或能量变化生硬"
        },
        {
          "id": "STRUCTURE_06",
          "label": "片段所处阶段交代不清"
        },
        {
          "id": "STRUCTURE_07",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "arrangement",
      "label": "编曲",
      "groupKey": "musicality",
      "options": [
        {
          "id": "ARRANGEMENT_01",
          "label": "主次关系不清"
        },
        {
          "id": "ARRANGEMENT_02",
          "label": "配器互相冲突"
        },
        {
          "id": "ARRANGEMENT_03",
          "label": "层次或密度失衡"
        },
        {
          "id": "ARRANGEMENT_04",
          "label": "动态铺陈不合理"
        },
        {
          "id": "ARRANGEMENT_05",
          "label": "未服务片段主题/情绪"
        },
        {
          "id": "ARRANGEMENT_06",
          "label": "声部进入退出生硬"
        },
        {
          "id": "ARRANGEMENT_07",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "ending",
      "observations": [{"id":"ENDING_LYRICS_UNFINISHED","label":"存在歌词未唱完的情况"}],
      "label": "收尾与结束处理",
      "groupKey": "musicality",
      "options": [
        {
          "id": "ENDING_01",
          "label": "突然截断/无任何收束动作"
        },
        {
          "id": "ENDING_02",
          "label": "收尾仓促/像硬切后的余音"
        },
        {
          "id": "ENDING_03",
          "label": "乐句未完成、和声悬置"
        },
        {
          "id": "ENDING_04",
          "label": "淡出或渐弱生硬/拖尾不自然"
        },
        {
          "id": "ENDING_05",
          "label": "收束方式与音乐本身不吻合"
        },
        {
          "id": "ENDING_06",
          "label": "结束落点与片段发展脱节"
        },
        {
          "id": "ENDING_07",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "lyrics_melody_relation",
      "label": "词曲关系（仅 Vocal）",
      "groupKey": "musicality",
      "options": [
        {
          "id": "LYRICS_MELODY_RELATION_01",
          "label": "歌词与旋律/节奏错位"
        },
        {
          "id": "LYRICS_MELODY_RELATION_02",
          "label": "语义重音位置错误"
        },
        {
          "id": "LYRICS_MELODY_RELATION_03",
          "label": "断句破坏词义"
        },
        {
          "id": "LYRICS_MELODY_RELATION_04",
          "label": "字密度与旋律不匹配"
        },
        {
          "id": "LYRICS_MELODY_RELATION_05",
          "label": "韵律唱感生硬"
        },
        {
          "id": "LYRICS_MELODY_RELATION_06",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "musicality_overall",
      "label": "音乐性整体分",
      "groupKey": "musicality",
      "options": [],
      "scoreLabel": "整体分",
      "issueLabel": "",
      "noteLabel": "备注（3 分及以下必填）",
      "allowNA": true,
      "issueRule": "none",
      "noteRule": "low3"
    },
    {
      "key": "audio_quality",
      "label": "基础音质",
      "groupKey": "acoustics",
      "options": [
        {
          "id": "AUDIO_QUALITY_01",
          "label": "清晰度不足/整体偏糊"
        },
        {
          "id": "AUDIO_QUALITY_02",
          "label": "低频残缺或轰头"
        },
        {
          "id": "AUDIO_QUALITY_03",
          "label": "中频拥堵/顶耳"
        },
        {
          "id": "AUDIO_QUALITY_04",
          "label": "高频毛刺/刺耳"
        },
        {
          "id": "AUDIO_QUALITY_05",
          "label": "频段明显不完整"
        },
        {
          "id": "AUDIO_QUALITY_06",
          "label": "质感薄硬/发干"
        },
        {
          "id": "AUDIO_QUALITY_07",
          "label": "整体发闷/混浊"
        },
        {
          "id": "AUDIO_QUALITY_08",
          "label": "耐听度差"
        },
        {
          "id": "AUDIO_QUALITY_09",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "instrument_realism",
      "label": "乐器音色真实度",
      "groupKey": "acoustics",
      "options": [
        {
          "id": "INSTRUMENT_REALISM_01",
          "label": "乐器类别难辨"
        },
        {
          "id": "INSTRUMENT_REALISM_02",
          "label": "材质感发假/塑料感"
        },
        {
          "id": "INSTRUMENT_REALISM_03",
          "label": "起音尾音/包络不自然"
        },
        {
          "id": "INSTRUMENT_REALISM_04",
          "label": "音高或谐波异常"
        },
        {
          "id": "INSTRUMENT_REALISM_05",
          "label": "演奏质感机械"
        },
        {
          "id": "INSTRUMENT_REALISM_06",
          "label": "电子音色设定不自洽"
        },
        {
          "id": "INSTRUMENT_REALISM_07",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "mix_master",
      "label": "混音与母带完成度",
      "groupKey": "acoustics",
      "options": [
        {
          "id": "MIX_MASTER_01",
          "label": "主次比例失衡"
        },
        {
          "id": "MIX_MASTER_02",
          "label": "声部打架/分离度差"
        },
        {
          "id": "MIX_MASTER_03",
          "label": "主体被遮挡"
        },
        {
          "id": "MIX_MASTER_04",
          "label": "空间扁平/纵深不足"
        },
        {
          "id": "MIX_MASTER_05",
          "label": "响度处理不当"
        },
        {
          "id": "MIX_MASTER_06",
          "label": "动态被压扁/抽吸"
        },
        {
          "id": "MIX_MASTER_07",
          "label": "整段电平不稳（忽大忽小）"
        },
        {
          "id": "MIX_MASTER_08",
          "label": "成品感不足"
        },
        {
          "id": "MIX_MASTER_09",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "technical_consistency",
      "label": "技术瑕疵与片段一致性",
      "groupKey": "acoustics",
      "options": [
        {
          "id": "TECHNICAL_CONSISTENCY_01",
          "label": "持续底噪/电流声"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_02",
          "label": "爆音/破音/削波"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_03",
          "label": "失真/发毛"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_04",
          "label": "卡顿/掉音/断裂"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_05",
          "label": "突然静音"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_06",
          "label": "编码或压缩伪影"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_07",
          "label": "音色或电平无音乐原因突变"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_08",
          "label": "空间/混响前后不一致"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_09",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "acoustics_overall",
      "label": "音质与声学整体分",
      "groupKey": "acoustics",
      "options": [],
      "scoreLabel": "整体分",
      "issueLabel": "",
      "noteLabel": "备注（3 分及以下必填）",
      "allowNA": true,
      "issueRule": "none",
      "noteRule": "low3"
    },
    {
      "key": "vocal_quality",
      "label": "人声音频质量",
      "groupKey": "vocals",
      "options": [
        {
          "id": "VOCAL_QUALITY_01",
          "label": "人声失真/刺耳"
        },
        {
          "id": "VOCAL_QUALITY_02",
          "label": "机械感或合成痕迹重"
        },
        {
          "id": "VOCAL_QUALITY_03",
          "label": "声线不稳定/音色跳变"
        },
        {
          "id": "VOCAL_QUALITY_04",
          "label": "齿音/尾音异常"
        },
        {
          "id": "VOCAL_QUALITY_05",
          "label": "噪声或毛刺"
        },
        {
          "id": "VOCAL_QUALITY_06",
          "label": "异常断裂（非正常换气/截取边界）"
        },
        {
          "id": "VOCAL_QUALITY_07",
          "label": "非预期拼接感"
        },
        {
          "id": "VOCAL_QUALITY_08",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "singing_performance",
      "label": "演唱表现",
      "groupKey": "vocals",
      "options": [
        {
          "id": "SINGING_PERFORMANCE_01",
          "label": "音准不稳"
        },
        {
          "id": "SINGING_PERFORMANCE_02",
          "label": "节奏落点不准"
        },
        {
          "id": "SINGING_PERFORMANCE_03",
          "label": "气息或支撑不足"
        },
        {
          "id": "SINGING_PERFORMANCE_04",
          "label": "换气位置不当"
        },
        {
          "id": "SINGING_PERFORMANCE_05",
          "label": "咬字/发音不清"
        },
        {
          "id": "SINGING_PERFORMANCE_06",
          "label": "断句或重音不合理"
        },
        {
          "id": "SINGING_PERFORMANCE_07",
          "label": "力度/技巧失控"
        },
        {
          "id": "SINGING_PERFORMANCE_08",
          "label": "语流/唱感生硬"
        },
        {
          "id": "SINGING_PERFORMANCE_09",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "emotional_expression",
      "label": "情感表达",
      "groupKey": "vocals",
      "options": [
        {
          "id": "EMOTIONAL_EXPRESSION_01",
          "label": "情绪空洞/感染力弱"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_02",
          "label": "情绪方向与歌词或曲风背离"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_03",
          "label": "起伏层次不足"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_04",
          "label": "关键句表达不到位"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_05",
          "label": "情绪转折生硬"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_06",
          "label": "表达过度/失真"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_07",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（低分/勾选问题必填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "low3"
    },
    {
      "key": "vocals_overall",
      "label": "人声演唱表现整体分",
      "groupKey": "vocals",
      "options": [],
      "scoreLabel": "整体分",
      "issueLabel": "",
      "noteLabel": "备注（3 分及以下必填）",
      "allowNA": true,
      "issueRule": "none",
      "noteRule": "low3"
    },
    {
      "key": "instruction_overall",
      "label": "CLIP 指令遵循整体分",
      "groupKey": "instruction",
      "options": [],
      "scoreLabel": "评分",
      "issueLabel": "",
      "noteLabel": "偏差说明（非 5 分必填）",
      "allowNA": true,
      "issueRule": "none",
      "noteRule": "below5"
    },
    {
      "key": "instruction_genre",
      "label": "曲风/流派遵循",
      "groupKey": "instruction",
      "options": [
        {
          "id": "INSTRUCTION_GENRE_01",
          "label": "整体曲风方向不符合要求"
        },
        {
          "id": "INSTRUCTION_GENRE_02",
          "label": "曲风特征不够明确"
        },
        {
          "id": "INSTRUCTION_GENRE_03",
          "label": "指定细分/融合/年代/地域特征未体现"
        },
        {
          "id": "INSTRUCTION_GENRE_04",
          "label": "多曲风主次或融合比例不符"
        },
        {
          "id": "INSTRUCTION_GENRE_05",
          "label": "出现未要求的明显曲风"
        },
        {
          "id": "INSTRUCTION_GENRE_06",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（非 5 分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_tempo_rhythm",
      "label": "速度与节奏属性遵循",
      "groupKey": "instruction",
      "options": [
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_01",
          "label": "整体速度/BPM明显偏离"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_02",
          "label": "BPM偏差超出容差（单点±5%/近似±10%）"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_03",
          "label": "快慢感与要求不符"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_04",
          "label": "拍号不符"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_05",
          "label": "基础节奏型不符"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_06",
          "label": "律动/groove与描述不符"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_07",
          "label": "半拍/倍拍计拍差异（需说明）"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_08",
          "label": "BPM不可确认（需说明）"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_09",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（非 5 分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_mood",
      "label": "心情与情绪遵循",
      "groupKey": "instruction",
      "options": [
        {
          "id": "INSTRUCTION_MOOD_01",
          "label": "主导情绪方向相反"
        },
        {
          "id": "INSTRUCTION_MOOD_02",
          "label": "情绪强度或色彩偏差"
        },
        {
          "id": "INSTRUCTION_MOOD_03",
          "label": "整体氛围不符"
        },
        {
          "id": "INSTRUCTION_MOOD_04",
          "label": "情绪不稳定"
        },
        {
          "id": "INSTRUCTION_MOOD_05",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（非 5 分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_instrumentation",
      "label": "乐器与编制遵循",
      "groupKey": "instruction",
      "options": [
        {
          "id": "INSTRUCTION_INSTRUMENTATION_01",
          "label": "核心乐器缺失/被替代"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_02",
          "label": "整体编制不符"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_03",
          "label": "指定乐器被遮蔽"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_04",
          "label": "主奏/伴奏角色错误"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_05",
          "label": "要求不出现的乐器出现了"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_06",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（非 5 分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_vocal",
      "label": "人声属性遵循",
      "groupKey": "instruction",
      "options": [
        {
          "id": "INSTRUCTION_VOCAL_01",
          "label": "应有人声但无人声"
        },
        {
          "id": "INSTRUCTION_VOCAL_02",
          "label": "应纯器乐但出现人声"
        },
        {
          "id": "INSTRUCTION_VOCAL_03",
          "label": "主唱性别不符"
        },
        {
          "id": "INSTRUCTION_VOCAL_04",
          "label": "人数或声部组合不符"
        },
        {
          "id": "INSTRUCTION_VOCAL_05",
          "label": "人声形态/音色不符"
        },
        {
          "id": "INSTRUCTION_VOCAL_06",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（非 5 分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_scene",
      "label": "主题与场景遵循",
      "groupKey": "instruction",
      "options": [
        {
          "id": "INSTRUCTION_SCENE_01",
          "label": "主题语义偏离"
        },
        {
          "id": "INSTRUCTION_SCENE_02",
          "label": "场景/使用语境不符"
        },
        {
          "id": "INSTRUCTION_SCENE_03",
          "label": "内容角色不符"
        },
        {
          "id": "INSTRUCTION_SCENE_04",
          "label": "整体氛围偏离"
        },
        {
          "id": "INSTRUCTION_SCENE_05",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（非 5 分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_duration",
      "observations": [
        {"id":"DURATION_MET_LYRICS_UNFINISHED","label":"存在时长遵循但歌词未唱完的情况"},
        {"id":"DURATION_MISSED_LYRICS_UNFINISHED","label":"时长未遵循歌词也未唱完"}
      ],
      "label": "总时长遵循",
      "groupKey": "instruction",
      "options": [
        {
          "id": "INSTRUCTION_DURATION_01",
          "label": "超出目标时长未在目标内结束"
        },
        {
          "id": "INSTRUCTION_DURATION_02",
          "label": "时长明显不足"
        },
        {
          "id": "INSTRUCTION_DURATION_03",
          "label": "超出默认容差（>2%/>5%）"
        },
        {
          "id": "INSTRUCTION_DURATION_04",
          "label": "需裁切或补偿才能使用"
        },
        {
          "id": "INSTRUCTION_DURATION_05",
          "label": "时长不可确认"
        },
        {
          "id": "INSTRUCTION_DURATION_06",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（非 5 分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_section_structure",
      "label": "片段段落结构遵循",
      "groupKey": "instruction",
      "options": [
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_01",
          "label": "指定段落缺失"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_02",
          "label": "段落顺序错误"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_03",
          "label": "段落数量不符"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_04",
          "label": "段落被合并/弱化"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_05",
          "label": "段落功能不符"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_06",
          "label": "出现未要求段落"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_07",
          "label": "其他"
        }
      ],
      "scoreLabel": "评分",
      "issueLabel": "低分/未遵循问题（多选）",
      "noteLabel": "备注（非 5 分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "overall",
      "label": "总体评分",
      "groupKey": "overall",
      "options": [],
      "scoreLabel": "总体评分",
      "issueLabel": "",
      "noteLabel": "总体说明（任意分值必填）",
      "allowNA": false,
      "issueRule": "none",
      "noteRule": "always"
    }
  ],
  "nonVocalExcludedDimensions": [
    "lyrics_melody_relation",
    "vocal_quality",
    "singing_performance",
    "emotional_expression",
    "vocals_overall"
  ],
  "rankingDimensions": []
};
