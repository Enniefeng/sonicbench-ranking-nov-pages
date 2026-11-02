window.SB_NOV_RUBRIC = {
  "version": "sonicbench-rubric/2026-11-v2",
  "groups": [
    {
      "key": "musicality",
      "label": "1.音乐性表现",
      "dimensions": [
        "melody",
        "harmony",
        "structure",
        "rhythm",
        "lyrics_melody_relation",
        "arrangement",
        "musicality_overall"
      ]
    },
    {
      "key": "acoustics",
      "label": "2.音质与声学表现",
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
      "label": "3.Vocals",
      "dimensions": [
        "vocal_quality",
        "singing_performance",
        "emotional_expression",
        "vocals_overall"
      ]
    },
    {
      "key": "instruction",
      "label": "4.指令遵循（整体分＋7个诊断子维度）",
      "labelByCase": {
        "vocal": "4.指令遵循（整体分＋7个诊断子维度）",
        "non_vocal": "3.指令遵循（整体分＋7个诊断子维度）"
      },
      "dimensions": [
        "instruction_genre",
        "instruction_vocal",
        "instruction_tempo_rhythm",
        "instruction_instrumentation",
        "instruction_mood",
        "instruction_scene",
        "instruction_section_structure",
        "instruction_overall"
      ]
    },
    {
      "key": "overall",
      "label": "总体评分",
      "dimensions": [
        "overall"
      ]
    }
  ],
  "dimensions": [
    {
      "key": "melody",
      "label": "旋律",
      "labelByCase": null,
      "groupKey": "musicality",
      "groupLabel": "音乐性表现",
      "options": [
        {
          "id": "MELODY_01",
          "label": "主旋律不清楚或难以辨认"
        },
        {
          "id": "MELODY_02",
          "label": "旋律走向混乱"
        },
        {
          "id": "MELODY_03",
          "label": "乐句不完整或突然中断"
        },
        {
          "id": "MELODY_04",
          "label": "旋律重复过多"
        },
        {
          "id": "MELODY_05",
          "label": "旋律片段堆砌，缺少连贯发展和重点"
        },
        {
          "id": "MELODY_06",
          "label": "旋律进行不自然"
        },
        {
          "id": "MELODY_07",
          "label": "旋律与作品整体风格不协调"
        },
        {
          "id": "MELODY_08",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "harmony",
      "label": "和声",
      "labelByCase": null,
      "groupKey": "musicality",
      "groupLabel": "音乐性表现",
      "options": [
        {
          "id": "HARMONY_01",
          "label": "和弦与调性关系混乱"
        },
        {
          "id": "HARMONY_02",
          "label": "和声与旋律明显冲突"
        },
        {
          "id": "HARMONY_03",
          "label": "和弦衔接生硬"
        },
        {
          "id": "HARMONY_04",
          "label": "局部出现明显和弦错误"
        },
        {
          "id": "HARMONY_05",
          "label": "和声与作品风格不协调"
        },
        {
          "id": "HARMONY_06",
          "label": "和声长期不变，造成明显单调"
        },
        {
          "id": "HARMONY_07",
          "label": "转调突兀或不自然"
        },
        {
          "id": "HARMONY_08",
          "label": "和声层次过满或过空"
        },
        {
          "id": "HARMONY_09",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "structure",
      "label": "结构",
      "labelByCase": null,
      "groupKey": "musicality",
      "groupLabel": "音乐性表现",
      "options": [
        {
          "id": "STRUCTURE_01",
          "label": "作品结构不完整"
        },
        {
          "id": "STRUCTURE_02",
          "label": "段落层次或功能不清，整体结构难以辨认"
        },
        {
          "id": "STRUCTURE_03",
          "label": "段落顺序或组织不合理"
        },
        {
          "id": "STRUCTURE_04",
          "label": "段落之间缺少对比"
        },
        {
          "id": "STRUCTURE_05",
          "label": "段落过渡生硬"
        },
        {
          "id": "STRUCTURE_06",
          "label": "内容推进停滞"
        },
        {
          "id": "STRUCTURE_07",
          "label": "段落或素材重复过多"
        },
        {
          "id": "STRUCTURE_08",
          "label": "高潮缺失或位置不合理"
        },
        {
          "id": "STRUCTURE_09",
          "label": "开头内容拖沓或无效重复，导致结构推进受阻"
        },
        {
          "id": "STRUCTURE_10",
          "label": "结尾过于仓促"
        },
        {
          "id": "STRUCTURE_11",
          "label": "结尾突然中断"
        },
        {
          "id": "STRUCTURE_12",
          "label": "结尾内容拖沓或无效重复，导致作品迟迟无法收束"
        },
        {
          "id": "STRUCTURE_13",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "rhythm",
      "label": "节奏",
      "labelByCase": null,
      "groupKey": "musicality",
      "groupLabel": "音乐性表现",
      "options": [
        {
          "id": "RHYTHM_01",
          "label": "节拍不稳定或出现错拍"
        },
        {
          "id": "RHYTHM_02",
          "label": "整体律动僵硬"
        },
        {
          "id": "RHYTHM_03",
          "label": "重音位置不自然"
        },
        {
          "id": "RHYTHM_04",
          "label": "切分节奏处理生硬"
        },
        {
          "id": "RHYTHM_05",
          "label": "节奏变化突兀"
        },
        {
          "id": "RHYTHM_06",
          "label": "节奏长期重复，造成明显单调"
        },
        {
          "id": "RHYTHM_07",
          "label": "不同声部节奏配合不齐"
        },
        {
          "id": "RHYTHM_08",
          "label": "速度忽快忽慢且缺乏合理过渡"
        },
        {
          "id": "RHYTHM_09",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "lyrics_melody_relation",
      "label": "词曲关系",
      "labelByCase": null,
      "groupKey": "musicality",
      "groupLabel": "音乐性表现",
      "options": [
        {
          "id": "LYRICS_MELODY_RELATION_01",
          "label": "歌词与旋律节奏错位"
        },
        {
          "id": "LYRICS_MELODY_RELATION_02",
          "label": "歌词重音与旋律重音不一致"
        },
        {
          "id": "LYRICS_MELODY_RELATION_03",
          "label": "断句位置不自然"
        },
        {
          "id": "LYRICS_MELODY_RELATION_04",
          "label": "字数与旋律空间不匹配"
        },
        {
          "id": "LYRICS_MELODY_RELATION_05",
          "label": "歌词被强行拉长或压缩"
        },
        {
          "id": "LYRICS_MELODY_RELATION_06",
          "label": "一句歌词被不合理拆开"
        },
        {
          "id": "LYRICS_MELODY_RELATION_07",
          "label": "歌词情绪与旋律表达不协调"
        },
        {
          "id": "LYRICS_MELODY_RELATION_08",
          "label": "副歌或重点歌词没有得到突出"
        },
        {
          "id": "LYRICS_MELODY_RELATION_09",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "arrangement",
      "label": "编曲",
      "labelByCase": null,
      "groupKey": "musicality",
      "groupLabel": "音乐性表现",
      "options": [
        {
          "id": "ARRANGEMENT_01",
          "label": "主次不清楚"
        },
        {
          "id": "ARRANGEMENT_02",
          "label": "伴奏遮挡主旋律或人声"
        },
        {
          "id": "ARRANGEMENT_03",
          "label": "声部过多，听感拥挤"
        },
        {
          "id": "ARRANGEMENT_04",
          "label": "声部过少，听感空洞"
        },
        {
          "id": "ARRANGEMENT_05",
          "label": "乐器之间配合不协调"
        },
        {
          "id": "ARRANGEMENT_06",
          "label": "配器层次不清楚"
        },
        {
          "id": "ARRANGEMENT_07",
          "label": "编曲长期不变，缺少推进"
        },
        {
          "id": "ARRANGEMENT_08",
          "label": "乐器进入或退出突兀"
        },
        {
          "id": "ARRANGEMENT_09",
          "label": "段落间编曲变化不合理"
        },
        {
          "id": "ARRANGEMENT_10",
          "label": "编曲与作品整体风格不协调"
        },
        {
          "id": "ARRANGEMENT_11",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "musicality_overall",
      "label": "1.音乐性表现整体分",
      "labelByCase": null,
      "groupKey": "musicality",
      "groupLabel": "音乐性表现",
      "options": [],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "",
      "noteLabel": "整体定性评价（≤3分必填）",
      "allowNA": true,
      "issueRule": "none",
      "noteRule": "low3"
    },
    {
      "key": "audio_quality",
      "label": "基础音质",
      "labelByCase": null,
      "groupKey": "acoustics",
      "groupLabel": "音质与声学表现",
      "options": [
        {
          "id": "AUDIO_QUALITY_01",
          "label": "整体声音模糊或清晰度不足"
        },
        {
          "id": "AUDIO_QUALITY_02",
          "label": "底噪或杂音明显，影响声音干净度"
        },
        {
          "id": "AUDIO_QUALITY_03",
          "label": "爆音、卡顿或断裂明显，影响正常聆听"
        },
        {
          "id": "AUDIO_QUALITY_04",
          "label": "高频刺耳"
        },
        {
          "id": "AUDIO_QUALITY_05",
          "label": "低频浑浊"
        },
        {
          "id": "AUDIO_QUALITY_06",
          "label": "中频拥挤或闷堵"
        },
        {
          "id": "AUDIO_QUALITY_07",
          "label": "声音过薄，细节或厚度不足"
        },
        {
          "id": "AUDIO_QUALITY_08",
          "label": "整体音色不自然"
        },
        {
          "id": "AUDIO_QUALITY_09",
          "label": "整体声音存在明显失真"
        },
        {
          "id": "AUDIO_QUALITY_10",
          "label": "不同段落清晰度明显不一致，影响整体听感统一"
        },
        {
          "id": "AUDIO_QUALITY_11",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "instrument_realism",
      "label": "乐器音色真实度",
      "labelByCase": null,
      "groupKey": "acoustics",
      "groupLabel": "音质与声学表现",
      "options": [
        {
          "id": "INSTRUMENT_REALISM_01",
          "label": "乐器音色明显不像真实乐器"
        },
        {
          "id": "INSTRUMENT_REALISM_02",
          "label": "乐器音色塑料感或合成感过强"
        },
        {
          "id": "INSTRUMENT_REALISM_03",
          "label": "起音不自然"
        },
        {
          "id": "INSTRUMENT_REALISM_04",
          "label": "延音或衰减不自然"
        },
        {
          "id": "INSTRUMENT_REALISM_05",
          "label": "力度变化不自然"
        },
        {
          "id": "INSTRUMENT_REALISM_06",
          "label": "同一乐器音色前后不一致"
        },
        {
          "id": "INSTRUMENT_REALISM_07",
          "label": "乐器在音区变化时音色突变"
        },
        {
          "id": "INSTRUMENT_REALISM_08",
          "label": "演奏技法不符合该乐器常见表现"
        },
        {
          "id": "INSTRUMENT_REALISM_09",
          "label": "出现不合理的杂音或共振"
        },
        {
          "id": "INSTRUMENT_REALISM_10",
          "label": "技术异常导致乐器音色失真或不稳定"
        },
        {
          "id": "INSTRUMENT_REALISM_11",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "mix_master",
      "label": "混音与母带完成度",
      "labelByCase": null,
      "groupKey": "acoustics",
      "groupLabel": "音质与声学表现",
      "options": [
        {
          "id": "MIX_MASTER_01",
          "label": "人声与伴奏音量不平衡"
        },
        {
          "id": "MIX_MASTER_02",
          "label": "不同乐器之间音量不平衡"
        },
        {
          "id": "MIX_MASTER_03",
          "label": "某些声部被明显遮挡"
        },
        {
          "id": "MIX_MASTER_04",
          "label": "声像位置不自然或左右失衡"
        },
        {
          "id": "MIX_MASTER_05",
          "label": "空间感过窄或拥挤"
        },
        {
          "id": "MIX_MASTER_06",
          "label": "混响过多，声音发糊"
        },
        {
          "id": "MIX_MASTER_07",
          "label": "混响过少，声音过干且不协调"
        },
        {
          "id": "MIX_MASTER_08",
          "label": "整体动态被过度压缩"
        },
        {
          "id": "MIX_MASTER_09",
          "label": "音量变化过大，影响正常聆听"
        },
        {
          "id": "MIX_MASTER_10",
          "label": "整体响度过低"
        },
        {
          "id": "MIX_MASTER_11",
          "label": "整体响度过高并产生失真"
        },
        {
          "id": "MIX_MASTER_12",
          "label": "各段落响度明显不一致"
        },
        {
          "id": "MIX_MASTER_13",
          "label": "技术异常破坏了整体声部平衡或空间表现"
        },
        {
          "id": "MIX_MASTER_14",
          "label": "人声与和声或伴奏分离度不足、明显黏连"
        },
        {
          "id": "MIX_MASTER_15",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": {
        "vocal": [
          {
            "id": "MIX_MASTER_01",
            "label": "人声与伴奏音量不平衡"
          },
          {
            "id": "MIX_MASTER_02",
            "label": "不同乐器之间音量不平衡"
          },
          {
            "id": "MIX_MASTER_03",
            "label": "某些声部被明显遮挡"
          },
          {
            "id": "MIX_MASTER_04",
            "label": "声像位置不自然或左右失衡"
          },
          {
            "id": "MIX_MASTER_05",
            "label": "空间感过窄或拥挤"
          },
          {
            "id": "MIX_MASTER_06",
            "label": "混响过多，声音发糊"
          },
          {
            "id": "MIX_MASTER_07",
            "label": "混响过少，声音过干且不协调"
          },
          {
            "id": "MIX_MASTER_08",
            "label": "整体动态被过度压缩"
          },
          {
            "id": "MIX_MASTER_09",
            "label": "音量变化过大，影响正常聆听"
          },
          {
            "id": "MIX_MASTER_10",
            "label": "整体响度过低"
          },
          {
            "id": "MIX_MASTER_11",
            "label": "整体响度过高并产生失真"
          },
          {
            "id": "MIX_MASTER_12",
            "label": "各段落响度明显不一致"
          },
          {
            "id": "MIX_MASTER_13",
            "label": "技术异常破坏了整体声部平衡或空间表现"
          },
          {
            "id": "MIX_MASTER_14",
            "label": "人声与和声或伴奏分离度不足、明显黏连"
          },
          {
            "id": "MIX_MASTER_15",
            "label": "其他低分问题"
          }
        ],
        "non_vocal": [
          {
            "id": "MIX_MASTER_01",
            "label": "人声与伴奏音量不平衡"
          },
          {
            "id": "MIX_MASTER_02",
            "label": "不同乐器之间音量不平衡"
          },
          {
            "id": "MIX_MASTER_03",
            "label": "某些声部被明显遮挡"
          },
          {
            "id": "MIX_MASTER_04",
            "label": "声像位置不自然或左右失衡"
          },
          {
            "id": "MIX_MASTER_05",
            "label": "空间感过窄或拥挤"
          },
          {
            "id": "MIX_MASTER_06",
            "label": "混响过多，声音发糊"
          },
          {
            "id": "MIX_MASTER_07",
            "label": "混响过少，声音过干且不协调"
          },
          {
            "id": "MIX_MASTER_08",
            "label": "整体动态被过度压缩"
          },
          {
            "id": "MIX_MASTER_09",
            "label": "音量变化过大，影响正常聆听"
          },
          {
            "id": "MIX_MASTER_10",
            "label": "整体响度过低"
          },
          {
            "id": "MIX_MASTER_11",
            "label": "整体响度过高并产生失真"
          },
          {
            "id": "MIX_MASTER_12",
            "label": "各段落响度明显不一致"
          },
          {
            "id": "MIX_MASTER_13",
            "label": "技术异常破坏了整体声部平衡或空间表现"
          },
          {
            "id": "MIX_MASTER_15",
            "label": "其他低分问题"
          }
        ]
      },
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "technical_consistency",
      "label": "单曲内部一致性与技术瑕疵",
      "labelByCase": null,
      "groupKey": "acoustics",
      "groupLabel": "音质与声学表现",
      "options": [
        {
          "id": "TECHNICAL_CONSISTENCY_01",
          "label": "持续存在明显底噪或异常噪声"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_02",
          "label": "底噪或异常噪声突然出现或消失"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_03",
          "label": "爆音或削波声"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_04",
          "label": "点击声、断裂声或电流杂音"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_05",
          "label": "局部出现卡顿、重复或跳帧感"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_06",
          "label": "音频突然中断"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_07",
          "label": "局部音量突然跳变"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_08",
          "label": "局部清晰度突然变化"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_09",
          "label": "局部音色突然变化"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_10",
          "label": "声道突然偏移或左右不一致"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_11",
          "label": "片段之间拼接痕迹明显"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_12",
          "label": "人声或乐器突然消失"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_13",
          "label": "出现与作品无关的异常声音"
        },
        {
          "id": "TECHNICAL_CONSISTENCY_14",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "acoustics_overall",
      "label": "2.音质与声学表现整体分",
      "labelByCase": null,
      "groupKey": "acoustics",
      "groupLabel": "音质与声学表现",
      "options": [],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "",
      "noteLabel": "整体定性评价（≤3分必填）",
      "allowNA": true,
      "issueRule": "none",
      "noteRule": "low3"
    },
    {
      "key": "vocal_quality",
      "label": "人声音质",
      "labelByCase": null,
      "groupKey": "vocals",
      "groupLabel": "Vocals",
      "options": [
        {
          "id": "VOCAL_QUALITY_01",
          "label": "人声音色不自然"
        },
        {
          "id": "VOCAL_QUALITY_02",
          "label": "人声自然度不足"
        },
        {
          "id": "VOCAL_QUALITY_03",
          "label": "人声清晰度不足"
        },
        {
          "id": "VOCAL_QUALITY_04",
          "label": "人声稳定性不足，前后音色或质感不一致"
        },
        {
          "id": "VOCAL_QUALITY_05",
          "label": "人声存在明显失真"
        },
        {
          "id": "VOCAL_QUALITY_06",
          "label": "人声噪声或沙噪明显"
        },
        {
          "id": "VOCAL_QUALITY_07",
          "label": "人声存在毛刺、爆裂音或异常伪影"
        },
        {
          "id": "VOCAL_QUALITY_08",
          "label": "人声断裂、尾音异常截断或异常拖尾"
        },
        {
          "id": "VOCAL_QUALITY_09",
          "label": "人声机械感或合成感明显"
        },
        {
          "id": "VOCAL_QUALITY_10",
          "label": "气息声本身存在噪声或失真"
        },
        {
          "id": "VOCAL_QUALITY_11",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "singing_performance",
      "label": "演唱表现",
      "labelByCase": null,
      "groupKey": "vocals",
      "groupLabel": "Vocals",
      "options": [
        {
          "id": "SINGING_PERFORMANCE_01",
          "label": "音准不稳或跑调"
        },
        {
          "id": "SINGING_PERFORMANCE_02",
          "label": "演唱节奏不稳，存在抢拍、拖拍或节奏错位"
        },
        {
          "id": "SINGING_PERFORMANCE_03",
          "label": "气息控制不足或断气明显"
        },
        {
          "id": "SINGING_PERFORMANCE_04",
          "label": "换气位置不合理"
        },
        {
          "id": "SINGING_PERFORMANCE_05",
          "label": "乐句组织或断句不自然"
        },
        {
          "id": "SINGING_PERFORMANCE_06",
          "label": "力度控制或强弱处理不当"
        },
        {
          "id": "SINGING_PERFORMANCE_07",
          "label": "高低音区控制不稳或明显吃力"
        },
        {
          "id": "SINGING_PERFORMANCE_08",
          "label": "真假声切换生硬"
        },
        {
          "id": "SINGING_PERFORMANCE_09",
          "label": "颤音、转音等演唱技巧使用不自然"
        },
        {
          "id": "SINGING_PERFORMANCE_10",
          "label": "咬字或吐字不清晰"
        },
        {
          "id": "SINGING_PERFORMANCE_11",
          "label": "发音不自然"
        },
        {
          "id": "SINGING_PERFORMANCE_12",
          "label": "语流不流畅"
        },
        {
          "id": "SINGING_PERFORMANCE_13",
          "label": "主唱与和声配合不齐"
        },
        {
          "id": "SINGING_PERFORMANCE_14",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "emotional_expression",
      "label": "情感表达",
      "labelByCase": null,
      "groupKey": "vocals",
      "groupLabel": "Vocals",
      "options": [
        {
          "id": "EMOTIONAL_EXPRESSION_01",
          "label": "整体情感过于平淡"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_02",
          "label": "情感方向与歌词不协调"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_03",
          "label": "情感强度与段落不匹配"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_04",
          "label": "不同段落情感变化不足"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_05",
          "label": "情感变化过度或突兀"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_06",
          "label": "重点歌词没有得到突出"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_07",
          "label": "高潮段情感没有提升"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_08",
          "label": "情感表达前后不一致"
        },
        {
          "id": "EMOTIONAL_EXPRESSION_09",
          "label": "其他低分问题"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "低分问题（≤3分需勾选，可多选）",
      "noteLabel": "补充说明（选填）",
      "allowNA": true,
      "issueRule": "low3",
      "noteRule": "optional"
    },
    {
      "key": "vocals_overall",
      "label": "3.Vocals整体分",
      "labelByCase": null,
      "groupKey": "vocals",
      "groupLabel": "Vocals",
      "options": [],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "",
      "noteLabel": "整体定性评价（≤3分必填）",
      "allowNA": true,
      "issueRule": "none",
      "noteRule": "low3"
    },
    {
      "key": "instruction_genre",
      "label": "曲风流派",
      "labelByCase": null,
      "groupKey": "instruction",
      "groupLabel": "指令遵循",
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
          "label": "部分指定曲风特征未体现"
        },
        {
          "id": "INSTRUCTION_GENRE_04",
          "label": "多种曲风主次或融合比例不符合要求"
        },
        {
          "id": "INSTRUCTION_GENRE_05",
          "label": "出现未要求的明显曲风"
        },
        {
          "id": "INSTRUCTION_GENRE_06",
          "label": "其他偏差"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "指令偏差（非5分需勾选，可多选）",
      "noteLabel": "偏差说明（非5分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_vocal",
      "label": "人声属性",
      "labelByCase": null,
      "groupKey": "instruction",
      "groupLabel": "指令遵循",
      "options": [
        {
          "id": "INSTRUCTION_VOCAL_01",
          "label": "要求有人声但实际没有"
        },
        {
          "id": "INSTRUCTION_VOCAL_02",
          "label": "要求无人声但出现明显人声"
        },
        {
          "id": "INSTRUCTION_VOCAL_03",
          "label": "人声性别不符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_04",
          "label": "独唱、合唱或对唱形式不符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_05",
          "label": "歌手人数不符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_06",
          "label": "音色或声线不符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_07",
          "label": "年龄感不符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_08",
          "label": "演唱方式不符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_09",
          "label": "演唱情绪不符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_10",
          "label": "和声或伴唱配置不符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_11",
          "label": "人声只在局部符合要求"
        },
        {
          "id": "INSTRUCTION_VOCAL_12",
          "label": "其他偏差"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "指令偏差（非5分需勾选，可多选）",
      "noteLabel": "偏差说明（非5分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_tempo_rhythm",
      "label": "速度与节奏",
      "labelByCase": null,
      "groupKey": "instruction",
      "groupLabel": "指令遵循",
      "options": [
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_01",
          "label": "整体速度快慢不符合要求"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_02",
          "label": "指定BPM明显不符合"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_03",
          "label": "节拍或拍号不符合要求"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_04",
          "label": "律动类型不符合要求"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_05",
          "label": "节奏密度不符合要求"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_06",
          "label": "重音位置不符合要求"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_07",
          "label": "速度变化没有按要求实现"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_08",
          "label": "指定的节奏型没有出现"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_09",
          "label": "只在局部符合速度或节奏要求"
        },
        {
          "id": "INSTRUCTION_TEMPO_RHYTHM_10",
          "label": "其他偏差"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "指令偏差（非5分需勾选，可多选）",
      "noteLabel": "偏差说明（非5分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_instrumentation",
      "label": "乐器编制",
      "labelByCase": null,
      "groupKey": "instruction",
      "groupLabel": "指令遵循",
      "options": [
        {
          "id": "INSTRUCTION_INSTRUMENTATION_01",
          "label": "指定乐器缺失"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_02",
          "label": "指定主奏乐器不突出"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_03",
          "label": "主奏与伴奏角色不符合要求"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_04",
          "label": "出现明确禁止的乐器"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_05",
          "label": "乐器编制规模不符合要求"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_06",
          "label": "电子或原声属性不符合要求"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_07",
          "label": "指定乐器只在局部出现"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_08",
          "label": "要求的乐器组合没有实现"
        },
        {
          "id": "INSTRUCTION_INSTRUMENTATION_09",
          "label": "其他偏差"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "指令偏差（非5分需勾选，可多选）",
      "noteLabel": "偏差说明（非5分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_mood",
      "label": "情绪氛围",
      "labelByCase": null,
      "groupKey": "instruction",
      "groupLabel": "指令遵循",
      "options": [
        {
          "id": "INSTRUCTION_MOOD_01",
          "label": "主情绪方向不符合要求"
        },
        {
          "id": "INSTRUCTION_MOOD_02",
          "label": "情绪强度不符合要求"
        },
        {
          "id": "INSTRUCTION_MOOD_03",
          "label": "整体氛围不符合要求"
        },
        {
          "id": "INSTRUCTION_MOOD_04",
          "label": "情绪发展没有按要求变化"
        },
        {
          "id": "INSTRUCTION_MOOD_05",
          "label": "要求的多种情绪未同时体现"
        },
        {
          "id": "INSTRUCTION_MOOD_06",
          "label": "情绪只在局部符合要求"
        },
        {
          "id": "INSTRUCTION_MOOD_07",
          "label": "出现与要求相反的情绪"
        },
        {
          "id": "INSTRUCTION_MOOD_08",
          "label": "其他偏差"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "指令偏差（非5分需勾选，可多选）",
      "noteLabel": "偏差说明（非5分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_scene",
      "label": "主题场景适配",
      "labelByCase": null,
      "groupKey": "instruction",
      "groupLabel": "指令遵循",
      "options": [
        {
          "id": "INSTRUCTION_SCENE_01",
          "label": "整体氛围与指定主题场景不符"
        },
        {
          "id": "INSTRUCTION_SCENE_02",
          "label": "情绪或能量状态不适合指定主题场景"
        },
        {
          "id": "INSTRUCTION_SCENE_03",
          "label": "曲风或编曲不适合指定主题场景"
        },
        {
          "id": "INSTRUCTION_SCENE_04",
          "label": "曲目不适合在指定主题场景下播放或使用"
        },
        {
          "id": "INSTRUCTION_SCENE_05",
          "label": "曲目呈现与指定主题场景明显冲突"
        },
        {
          "id": "INSTRUCTION_SCENE_06",
          "label": "其他偏差"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "指令偏差（非5分需勾选，可多选）",
      "noteLabel": "偏差说明（非5分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_section_structure",
      "label": "段落结构",
      "labelByCase": null,
      "groupKey": "instruction",
      "groupLabel": "指令遵循",
      "options": [
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_01",
          "label": "指定段落缺失"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_02",
          "label": "出现了不应出现的段落"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_03",
          "label": "段落顺序不符合要求"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_04",
          "label": "段落时长或占比不符合要求（若有明确要求）"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_05",
          "label": "段落重复次数不符合要求"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_06",
          "label": "高潮或副歌位置不符合要求"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_07",
          "label": "开头方式不符合要求"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_08",
          "label": "结尾方式不符合要求"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_09",
          "label": "指定段落只实现了一部分"
        },
        {
          "id": "INSTRUCTION_SECTION_STRUCTURE_10",
          "label": "其他偏差"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "指令偏差（非5分需勾选，可多选）",
      "noteLabel": "偏差说明（非5分必填）",
      "allowNA": true,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "instruction_overall",
      "label": "指令遵循整体判断",
      "labelByCase": null,
      "groupKey": "instruction",
      "groupLabel": "指令遵循",
      "options": [
        {
          "id": "INSTRUCTION_OVERALL_01",
          "label": "曲风流派存在偏差"
        },
        {
          "id": "INSTRUCTION_OVERALL_02",
          "label": "人声属性存在偏差"
        },
        {
          "id": "INSTRUCTION_OVERALL_03",
          "label": "速度与节奏存在偏差"
        },
        {
          "id": "INSTRUCTION_OVERALL_04",
          "label": "乐器编制存在偏差"
        },
        {
          "id": "INSTRUCTION_OVERALL_05",
          "label": "情绪氛围存在偏差"
        },
        {
          "id": "INSTRUCTION_OVERALL_06",
          "label": "主题场景适配存在偏差"
        },
        {
          "id": "INSTRUCTION_OVERALL_07",
          "label": "段落结构存在偏差"
        },
        {
          "id": "INSTRUCTION_OVERALL_08",
          "label": "多个核心要求同时偏离"
        },
        {
          "id": "INSTRUCTION_OVERALL_09",
          "label": "其他偏差"
        }
      ],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "主要偏差",
      "noteLabel": "偏差说明",
      "allowNA": false,
      "issueRule": "below5",
      "noteRule": "below5"
    },
    {
      "key": "overall",
      "label": "总体评分",
      "labelByCase": null,
      "groupKey": "overall",
      "groupLabel": "总体评分",
      "options": [],
      "optionsByCase": null,
      "scoreLabel": "评分",
      "issueLabel": "",
      "noteLabel": "整体定性评价（任意分值均需简要填写）",
      "allowNA": false,
      "issueRule": "none",
      "noteRule": "always"
    }
  ],
  "rankingDimensions": [
    {
      "key": "musicality",
      "label": "音乐性",
      "scoreKey": "musicality_overall"
    },
    {
      "key": "acoustics",
      "label": "音质与声学",
      "scoreKey": "acoustics_overall"
    },
    {
      "key": "vocals",
      "label": "Vocals",
      "scoreKey": "vocals_overall",
      "vocalOnly": true
    },
    {
      "key": "overall",
      "label": "总体",
      "scoreKey": "overall"
    }
  ],
  "nonVocalExcludedDimensions": [
    "lyrics_melody_relation",
    "vocal_quality",
    "singing_performance",
    "emotional_expression",
    "vocals_overall"
  ]
};
