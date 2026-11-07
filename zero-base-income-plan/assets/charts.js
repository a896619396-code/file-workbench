(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  /* ---------- Mermaid ---------- */
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: 'loose',
      theme: 'base',
      fontFamily: "'Instrument Sans', 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      flowchart: { curve: 'basis', padding: 14, nodeSpacing: 34, rankSpacing: 40 },
      themeVariables: {
        background: bg2,
        primaryColor: '#FFFFFF',
        primaryTextColor: ink,
        primaryBorderColor: accent,
        secondaryColor: '#F1EDE5',
        secondaryTextColor: ink,
        secondaryBorderColor: rule,
        tertiaryColor: '#F7F5F0',
        tertiaryTextColor: ink,
        lineColor: '#9A9287',
        textColor: ink,
        mainBkg: '#FFFFFF',
        nodeBorder: accent,
        clusterBkg: '#F7F5F0',
        edgeLabelBackground: bg2,
        fontSize: '14px'
      }
    });
  }

  /* ---------- Chart: income ramp ---------- */
  var el = document.getElementById('chart-income');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    animation: false,
    color: [accent, accent2, muted],
    grid: { left: 8, right: 24, top: 64, bottom: 8, containLabel: true },
    legend: {
      top: 4,
      left: 0,
      itemWidth: 18,
      itemHeight: 3,
      itemGap: 22,
      textStyle: { color: muted, fontSize: 12, fontFamily: "'Instrument Sans', 'PingFang SC', sans-serif" }
    },
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: '#FFFFFF',
      borderColor: rule,
      borderWidth: 1,
      textStyle: { color: ink, fontSize: 12 },
      valueFormatter: function (v) { return v + ' 元'; }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['第 1 月', '第 2 月', '第 3 月', '第 4 月', '第 5 月', '第 6 月'],
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '月收入（元）',
      nameTextStyle: { color: muted, fontSize: 11, padding: [0, 0, 8, 0] },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 12 }
    },
    series: [
      {
        name: 'A · 表格文档类',
        type: 'line',
        smooth: 0.3,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5 },
        areaStyle: { opacity: 0.05 },
        data: [0, 0, 150, 500, 1000, 1800]
      },
      {
        name: 'B · 短视频剪辑',
        type: 'line',
        smooth: 0.3,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5 },
        data: [0, 0, 0, 300, 700, 1200]
      },
      {
        name: 'C · 图文内容号',
        type: 'line',
        smooth: 0.3,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2, type: 'dashed' },
        data: [0, 0, 0, 0, 100, 300]
      }
    ]
  });

  window.addEventListener('resize', function () { chart.resize(); });
})();
