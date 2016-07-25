
(function (t) {
	"use strict";
	var h = {
		version: "0.4.11"
	};
	var n, e, C;

	function S(t) {
		this.owner = t
	};

	function L(t, e) {
		if (Object.create) {
			e.prototype = Object.create(t.prototype)
		} else {
			var i = function () {
			};
			i.prototype = t.prototype;
			e.prototype = new i()
		}
		;
		e.prototype.constructor = e;
		return e
	};

	function v(t) {
		var e = this.internal = new b(this);
		e.load(t);
		e.beforeInit(t);
		e.init();
		e.afterInit(t);
		(function i(t, e, n) {
			Object.keys(t).forEach(function (a) {
				e[a] = t[a].bind(n);
				if (Object.keys(t[a]).length > 0) {
					i(t[a], e[a], n)
				}
			})
		})(n, this, this)
	};

	function b(e) {
		var i = this;
		i.d3 = t.d3 ? t.d3 : typeof require !== "undefined" ? require("d3") : undefined;
		i.api = e;
		i.config = i.getDefaultConfig();
		i.data = {};
		i.cache = {};
		i.axes = {}
	};
	h.generate = function (t) {
		return new v(t)
	};
	h.chart = {
		fn: v.prototype,
		internal: {
			fn: b.prototype,
			axis: {
				fn: a.prototype
			}
		}
	};
	n = h.chart.fn;
	e = h.chart.internal.fn;
	C = h.chart.internal.axis.fn;
	e.beforeInit = function () {
	};
	e.afterInit = function () {
	};
	e.init = function () {
		var e = this,
			t = e.config;
		e.initParams();
		if (t.data_url) {
			e.convertUrlToData(t.data_url, t.data_mimeType, t.data_headers, t.data_keys, e.initWithData)
		} else if (t.data_json) {
			e.initWithData(e.convertJsonToData(t.data_json, t.data_keys))
		} else if (t.data_rows) {
			e.initWithData(e.convertRowsToData(t.data_rows))
		} else if (t.data_columns) {
			e.initWithData(e.convertColumnsToData(t.data_columns))
		} else {
			throw Error("url or json or rows or columns is required.")
		}
	};
	e.initParams = function () {
		var t = this,
			i = t.d3,
			e = t.config;
		t.clipId = "c3-" + (+new Date()) + "-clip", t.clipIdForXAxis = t.clipId + "-xaxis", t.clipIdForYAxis = t.clipId + "-yaxis", t.clipIdForGrid = t.clipId + "-grid", t.clipIdForSubchart = t.clipId + "-subchart", t.clipPath = t.getClipPath(t.clipId), t.clipPathForXAxis = t.getClipPath(t.clipIdForXAxis), t.clipPathForYAxis = t.getClipPath(t.clipIdForYAxis);
		t.clipPathForGrid = t.getClipPath(t.clipIdForGrid), t.clipPathForSubchart = t.getClipPath(t.clipIdForSubchart), t.dragStart = null;
		t.dragging = !1;
		t.flowing = !1;
		t.cancelClick = !1;
		t.mouseover = !1;
		t.transiting = !1;
		t.color = t.generateColor();
		t.levelColor = t.generateLevelColor();
		t.dataTimeFormat = e.data_xLocaltime ? i.time.format : i.time.format.utc;
		t.axisTimeFormat = e.axis_x_localtime ? i.time.format : i.time.format.utc;
		t.defaultAxisTimeFormat = t.axisTimeFormat.multi([
			[".%L", function (t) {
				return t.getMilliseconds()
			}],
			[":%S", function (t) {
				return t.getSeconds()
			}],
			["%I:%M", function (t) {
				return t.getMinutes()
			}],
			["%I %p", function (t) {
				return t.getHours()
			}],
			["%-m/%-d", function (t) {
				return t.getDay() && t.getDate() !== 1
			}],
			["%-m/%-d", function (t) {
				return t.getDate() !== 1
			}],
			["%-m/%-d", function (t) {
				return t.getMonth()
			}],
			["%Y/%-m/%-d", function () {
				return !0
			}]
		]);
		t.hiddenTargetIds = [];
		t.hiddenLegendIds = [];
		t.focusedTargetIds = [];
		t.defocusedTargetIds = [];
		t.xOrient = e.axis_rotated ? "left" : "bottom";
		t.yOrient = e.axis_rotated ? (e.axis_y_inner ? "top" : "bottom") : (e.axis_y_inner ? "right" : "left");
		t.y2Orient = e.axis_rotated ? (e.axis_y2_inner ? "bottom" : "top") : (e.axis_y2_inner ? "left" : "right");
		t.subXOrient = e.axis_rotated ? "left" : "bottom";
		t.isLegendRight = e.legend_position === "right";
		t.isLegendInset = e.legend_position === "inset";
		t.isLegendTop = e.legend_inset_anchor === "top-left" || e.legend_inset_anchor === "top-right";
		t.isLegendLeft = e.legend_inset_anchor === "top-left" || e.legend_inset_anchor === "bottom-left";
		t.legendStep = 0;
		t.legendItemWidth = 0;
		t.legendItemHeight = 0;
		t.currentMaxTickWidths = {
			x: 0,
			y: 0,
			y2: 0
		};
		t.rotated_padding_left = 30;
		t.rotated_padding_right = e.axis_rotated && !e.axis_x_show ? 0 : 30;
		t.rotated_padding_top = 5;
		t.withoutFadeIn = {};
		t.intervalForObserveInserted = undefined;
		t.axes.subx = i.selectAll([])
	};
	e.initChartElements = function () {
		if (this.initBar) {
			this.initBar()
		}
		;
		if (this.initLine) {
			this.initLine()
		}
		;
		if (this.initArc) {
			this.initArc()
		}
		;
		if (this.initGauge) {
			this.initGauge()
		}
		;
		if (this.initText) {
			this.initText()
		}
	};
	e.initWithData = function (t) {
		var e = this,
			s = e.d3,
			n = e.config,
			r, o, c = !0;
		e.axis = new a(e);
		if (e.initPie) {
			e.initPie()
		}
		;
		if (e.initBrush) {
			e.initBrush()
		}
		;
		if (e.initZoom) {
			e.initZoom()
		}
		;
		if (!n.bindto) {
			e.selectChart = s.selectAll([])
		} else if (typeof n.bindto.node === "function") {
			e.selectChart = n.bindto
		} else {
			e.selectChart = s.select(n.bindto)
		}
		;
		if (e.selectChart.empty()) {
			e.selectChart = s.select(document.createElement("div")).style("opacity", 0);
			e.observeInserted(e.selectChart);
			c = !1
		}
		;
		e.selectChart.html("").classed("c3", !0);
		e.data.xs = {};
		e.data.targets = e.convertDataToTargets(t);
		if (n.data_filter) {
			e.data.targets = e.data.targets.filter(n.data_filter)
		}
		;
		if (n.data_hide) {
			e.addHiddenTargetIds(n.data_hide === !0 ? e.mapToIds(e.data.targets) : n.data_hide)
		}
		;
		if (n.legend_hide) {
			e.addHiddenLegendIds(n.legend_hide === !0 ? e.mapToIds(e.data.targets) : n.legend_hide)
		}
		;
		if (e.hasType("gauge")) {
			n.legend_show = !1
		}
		;
		e.updateSizes();
		e.updateScales();
		e.x.domain(s.extent(e.getXDomain(e.data.targets)));
		e.y.domain(e.getYDomain(e.data.targets, "y"));
		e.y2.domain(e.getYDomain(e.data.targets, "y2"));
		e.subX.domain(e.x.domain());
		e.subY.domain(e.y.domain());
		e.subY2.domain(e.y2.domain());
		e.orgXDomain = e.x.domain();
		if (e.brush) {
			e.brush.scale(e.subX)
		}
		;
		if (n.zoom_enabled) {
			e.zoom.scale(e.x)
		}
		;
		e.svg = e.selectChart.append("svg").style("overflow", "hidden").on("mouseenter", function () {
			return n.onmouseover.call(e)
		}).on("mouseleave", function () {
			return n.onmouseout.call(e)
		});
		if (e.config.svg_classname) {
			e.svg.attr("class", e.config.svg_classname)
		}
		;
		r = e.svg.append("defs");
		e.clipChart = e.appendClip(r, e.clipId);
		e.clipXAxis = e.appendClip(r, e.clipIdForXAxis);
		e.clipYAxis = e.appendClip(r, e.clipIdForYAxis);
		e.clipGrid = e.appendClip(r, e.clipIdForGrid);
		e.clipSubchart = e.appendClip(r, e.clipIdForSubchart);
		e.updateSvgSize();
		o = e.main = e.svg.append("g").attr("transform", e.getTranslate("main"));
		if (e.initSubchart) {
			e.initSubchart()
		}
		;
		if (e.initTooltip) {
			e.initTooltip()
		}
		;
		if (e.initLegend) {
			e.initLegend()
		}
		;
		if (e.initTitle) {
			e.initTitle()
		}
		;
		e.initRegion();
		e.initGrid();
		if (n.grid_lines_front) {
			e.initGridLines()
		}
		;
		o.append("text").attr("class", i.text + " " + i.empty).attr("text-anchor", "middle").attr("dominant-baseline", "middle");
		o.append("g").attr("clip-path", e.clipPath).attr("class", i.chart);
		e.initEventRect();
		e.initChartElements();
		o.insert("rect", n.zoom_privileged ? null : "g." + i.regions).attr("class", i.zoomRect).attr("width", e.width).attr("height", e.height).style("opacity", 0).on("dblclick.zoom", null);
		if (n.axis_x_extent) {
			e.brush.extent(e.getDefaultExtent())
		}
		;
		e.axis.init();
		e.updateTargets(e.data.targets);
		if (c) {
			e.updateDimension();
			e.config.oninit.call(e);
			e.redraw({
				withTransition: !1,
				withTransform: !0,
				withUpdateXDomain: !0,
				withUpdateOrgXDomain: !0,
				withTransitionForAxis: !1
			})
		}
		;
		e.bindResize();
		e.api.element = e.selectChart.node()
	};
	e.smoothLines = function (t, e) {
		var i = this;
		if (e === "grid") {
			t.each(function () {
				var t = i.d3.select(this),
					e = t.attr("x1"),
					n = t.attr("x2"),
					a = t.attr("y1"),
					r = t.attr("y2");
				t.attr({
					"x1": Math.ceil(e),
					"x2": Math.ceil(n),
					"y1": Math.ceil(a),
					"y2": Math.ceil(r)
				})
			})
		}
	};
	e.updateSizes = function () {
		var t = this,
			e = t.config,
			s = t.legend ? t.getLegendHeight() : 0,
			o = t.legend ? t.getLegendWidth() : 0,
			n = t.isLegendRight || t.isLegendInset ? 0 : s,
			i = t.hasArcType(),
			a = e.axis_rotated || i ? 0 : t.getHorizontalAxisHeight("x"),
			r = e.subchart_show && !i ? (e.subchart_size_height + a) : 0;
		t.currentWidth = t.getCurrentWidth();
		t.currentHeight = t.getCurrentHeight();
		t.margin = e.axis_rotated ? {
			top: t.getHorizontalAxisHeight("y2") + t.getCurrentPaddingTop(),
			right: i ? 0 : t.getCurrentPaddingRight(),
			bottom: t.getHorizontalAxisHeight("y") + n + t.getCurrentPaddingBottom(),
			left: r + (i ? 0 : t.getCurrentPaddingLeft())
		} : {
			top: 4 + t.getCurrentPaddingTop(),
			right: i ? 0 : t.getCurrentPaddingRight(),
			bottom: a + r + n + t.getCurrentPaddingBottom(),
			left: i ? 0 : t.getCurrentPaddingLeft()
		};
		t.margin2 = e.axis_rotated ? {
			top: t.margin.top,
			right: NaN,
			bottom: 20 + n,
			left: t.rotated_padding_left
		} : {
			top: t.currentHeight - r - n,
			right: NaN,
			bottom: a + n,
			left: t.margin.left
		};
		t.margin3 = {
			top: 0,
			right: NaN,
			bottom: 0,
			left: 0
		};
		if (t.updateSizeForLegend) {
			t.updateSizeForLegend(s, o)
		}
		;
		t.width = t.currentWidth - t.margin.left - t.margin.right;
		t.height = t.currentHeight - t.margin.top - t.margin.bottom;
		if (t.width < 0) {
			t.width = 0
		}
		;
		if (t.height < 0) {
			t.height = 0
		}
		;
		t.width2 = e.axis_rotated ? t.margin.left - t.rotated_padding_left - t.rotated_padding_right : t.width;
		t.height2 = e.axis_rotated ? t.height : t.currentHeight - t.margin2.top - t.margin2.bottom;
		if (t.width2 < 0) {
			t.width2 = 0
		}
		;
		if (t.height2 < 0) {
			t.height2 = 0
		}
		;
		t.arcWidth = t.width - (t.isLegendRight ? o + 10 : 0);
		t.arcHeight = t.height - (t.isLegendRight ? 0 : 10);
		if (t.hasType("gauge") && !e.gauge_fullCircle) {
			t.arcHeight += t.height - t.getGaugeLabelHeight()
		}
		;
		if (t.updateRadius) {
			t.updateRadius()
		}
		;
		if (t.isLegendRight && i) {
			t.margin3.left = t.arcWidth / 2 + t.radiusExpanded * 1.1
		}
	};
	e.updateTargets = function (t) {
		var e = this;
		e.updateTargetsForText(t);
		e.updateTargetsForBar(t);
		e.updateTargetsForLine(t);
		if (e.hasArcType() && e.updateTargetsForArc) {
			e.updateTargetsForArc(t)
		}
		;
		if (e.updateTargetsForSubchart) {
			e.updateTargetsForSubchart(t)
		}
		;
		e.showTargets()
	};
	e.showTargets = function () {
		var t = this;
		t.svg.selectAll("." + i.target).filter(function (e) {
			return t.isTargetToShow(e.id)
		}).transition().duration(t.config.transition_duration).style("opacity", 1)
	};
	e.redraw = function (t, e) {
		var n = this,
			L = n.main,
			w = n.d3,
			a = n.config,
			h = n.getShapeIndices(n.isAreaType),
			g = n.getShapeIndices(n.isBarType),
			f = n.getShapeIndices(n.isLineType),
			V, G, u, E, I, O, p, R, D, F, k, X, M, B = n.hasArcType(),
			x, y, m, S, v, o, c, H, P, b, r = n.filterTargetsToShow(n.data.targets),
			l, d, z, C, N = n.xv.bind(n),
			A, T;
		t = t || {};
		V = s(t, "withY", !0);
		G = s(t, "withSubchart", !0);
		u = s(t, "withTransition", !0);
		O = s(t, "withTransform", !1);
		p = s(t, "withUpdateXDomain", !1);
		R = s(t, "withUpdateOrgXDomain", !1);
		D = s(t, "withTrimXDomain", !0);
		M = s(t, "withUpdateXAxis", p);
		F = s(t, "withLegend", !1);
		k = s(t, "withEventRect", !0);
		X = s(t, "withDimension", !0);
		E = s(t, "withTransitionForExit", u);
		I = s(t, "withTransitionForAxis", u);
		o = u ? a.transition_duration : 0;
		c = E ? o : 0;
		H = I ? o : 0;
		e = e || n.axis.generateTransitions(H);
		if (F && a.legend_show) {
			n.updateLegend(n.mapToIds(n.data.targets), t, e)
		} else if (X) {
			n.updateDimension(!0)
		}
		;
		if (n.isCategorized() && r.length === 0) {
			n.x.domain([0, n.axes.x.selectAll(".tick").size()])
		}
		;
		if (r.length) {
			n.updateXDomain(r, p, R, D);
			if (!a.axis_x_tick_values) {
				l = n.axis.updateXAxisTickValues(r)
			}
		} else {
			n.xAxis.tickValues([]);
			n.subXAxis.tickValues([])
		}
		;
		if (a.zoom_rescale && !t.flow) {
			C = n.x.orgDomain()
		}
		;
		n.y.domain(n.getYDomain(r, "y", C));
		n.y2.domain(n.getYDomain(r, "y2", C));
		if (!a.axis_y_tick_values && a.axis_y_tick_count) {
			n.yAxis.tickValues(n.axis.generateTickValues(n.y.domain(), a.axis_y_tick_count))
		}
		;
		if (!a.axis_y2_tick_values && a.axis_y2_tick_count) {
			n.y2Axis.tickValues(n.axis.generateTickValues(n.y2.domain(), a.axis_y2_tick_count))
		}
		;
		n.axis.redraw(e, B);
		n.axis.updateLabels(u);
		if ((p || M) && r.length) {
			if (a.axis_x_tick_culling && l) {
				for (d = 1; d < l.length; d++) {
					if (l.length / d < a.axis_x_tick_culling_max) {
						z = d;
						break
					}
				}
				;
				n.svg.selectAll("." + i.axisX + " .tick text").each(function (t) {
					var e = l.indexOf(t);
					if (e >= 0) {
						w.select(this).style("display", e % z ? "none" : "block")
					}
				})
			} else {
				n.svg.selectAll("." + i.axisX + " .tick text").style("display", "block")
			}
		}
		;
		x = n.generateDrawArea ? n.generateDrawArea(h, !1) : undefined;
		y = n.generateDrawBar ? n.generateDrawBar(g) : undefined;
		m = n.generateDrawLine ? n.generateDrawLine(f, !1) : undefined;
		S = n.generateXYForText(h, g, f, !0);
		v = n.generateXYForText(h, g, f, !1);
		if (V) {
			n.subY.domain(n.getYDomain(r, "y"));
			n.subY2.domain(n.getYDomain(r, "y2"))
		}
		;
		n.updateXgridFocus();
		L.select("text." + i.text + "." + i.empty).attr("x", n.width / 2).attr("y", n.height / 2).text(a.data_empty_label_text).transition().style("opacity", r.length ? 0 : 1);
		n.updateGrid(o);
		n.updateRegion(o);
		n.updateBar(c);
		n.updateLine(c);
		n.updateArea(c);
		n.updateCircle();
		if (n.hasDataLabel()) {
			n.updateText(c)
		}
		;
		if (n.redrawTitle) {
			n.redrawTitle()
		}
		;
		if (n.redrawArc) {
			n.redrawArc(o, c, O)
		}
		;
		if (n.redrawSubchart) {
			n.redrawSubchart(G, e, o, c, h, g, f)
		}
		;
		L.selectAll("." + i.selectedCircles).filter(n.isBarType.bind(n)).selectAll("circle").remove();
		if (a.interaction_enabled && !t.flow && k) {
			n.redrawEventRect();
			if (n.updateZoom) {
				n.updateZoom()
			}
		}
		;
		n.updateCircleY();
		A = (n.config.axis_rotated ? n.circleY : n.circleX).bind(n);
		T = (n.config.axis_rotated ? n.circleX : n.circleY).bind(n);
		if (t.flow) {
			b = n.generateFlow({
				targets: r,
				flow: t.flow,
				duration: t.flow.duration,
				drawBar: y,
				drawLine: m,
				drawArea: x,
				cx: A,
				cy: T,
				xv: N,
				xForText: S,
				yForText: v
			})
		}
		;
		if ((o || b) && n.isTabVisible()) {
			w.transition().duration(o).each(function () {
				var e = [];
				[n.redrawBar(y, !0), n.redrawLine(m, !0), n.redrawArea(x, !0), n.redrawCircle(A, T, !0), n.redrawText(S, v, t.flow, !0), n.redrawRegion(!0), n.redrawGrid(!0),].forEach(function (t) {
					t.forEach(function (t) {
						e.push(t)
					})
				});
				P = n.generateWait();
				e.forEach(function (t) {
					P.add(t)
				})
			}).call(P, function () {
				if (b) {
					b()
				}
				;
				if (a.onrendered) {
					a.onrendered.call(n)
				}
			})
		} else {
			n.redrawBar(y);
			n.redrawLine(m);
			n.redrawArea(x);
			n.redrawCircle(A, T);
			n.redrawText(S, v, t.flow);
			n.redrawRegion();
			n.redrawGrid();
			if (a.onrendered) {
				a.onrendered.call(n)
			}
		}
		;
		n.mapToIds(n.data.targets).forEach(function (t) {
			n.withoutFadeIn[t] = !0
		})
	};
	e.updateAndRedraw = function (t) {
		var e = this,
			n = e.config,
			i;
		t = t || {};
		t.withTransition = s(t, "withTransition", !0);
		t.withTransform = s(t, "withTransform", !1);
		t.withLegend = s(t, "withLegend", !1);
		t.withUpdateXDomain = !0;
		t.withUpdateOrgXDomain = !0;
		t.withTransitionForExit = !1;
		t.withTransitionForTransform = s(t, "withTransitionForTransform", t.withTransition);
		e.updateSizes();
		if (!(t.withLegend && n.legend_show)) {
			i = e.axis.generateTransitions(t.withTransitionForAxis ? n.transition_duration : 0);
			e.updateScales();
			e.updateSvgSize();
			e.transformAll(t.withTransitionForTransform, i)
		}
		;
		e.redraw(t, i)
	};
	e.redrawWithoutRescale = function () {
		this.redraw({
			withY: !1,
			withSubchart: !1,
			withEventRect: !1,
			withTransitionForAxis: !1
		})
	};
	e.isTimeSeries = function () {
		return this.config.axis_x_type === "timeseries"
	};
	e.isCategorized = function () {
		return this.config.axis_x_type.indexOf("categor") >= 0
	};
	e.isCustomX = function () {
		var t = this,
			e = t.config;
		return !t.isTimeSeries() && (e.data_x || u(e.data_xs))
	};
	e.isTimeSeriesY = function () {
		return this.config.axis_y_type === "timeseries"
	};
	e.getTranslate = function (t) {
		var e = this,
			a = e.config,
			i, n;
		if (t === "main") {
			i = f(e.margin.left);
			n = f(e.margin.top)
		} else if (t === "context") {
			i = f(e.margin2.left);
			n = f(e.margin2.top)
		} else if (t === "legend") {
			i = e.margin3.left;
			n = e.margin3.top
		} else if (t === "x") {
			i = 0;
			n = a.axis_rotated ? 0 : e.height
		} else if (t === "y") {
			i = 0;
			n = a.axis_rotated ? e.height : 0
		} else if (t === "y2") {
			i = a.axis_rotated ? 0 : e.width;
			n = a.axis_rotated ? 1 : 0
		} else if (t === "subx") {
			i = 0;
			n = a.axis_rotated ? 0 : e.height2
		} else if (t === "arc") {
			i = e.arcWidth / 2;
			n = e.arcHeight / 2
		}
		;
		return "translate(" + i + "," + n + ")"
	};
	e.initialOpacity = function (t) {
		return t.value !== null && this.withoutFadeIn[t.id] ? 1 : 0
	};
	e.initialOpacityForCircle = function (t) {
		return t.value !== null && this.withoutFadeIn[t.id] ? this.opacityForCircle(t) : 0
	};
	e.opacityForCircle = function (t) {
		var e = this.config.point_show ? 1 : 0;
		return r(t.value) ? (this.isScatterType(t) ? 0.5 : e) : 0
	};
	e.opacityForText = function () {
		return this.hasDataLabel() ? 1 : 0
	};
	e.xx = function (t) {
		return t ? this.x(t.x) : null
	};
	e.xv = function (t) {
		var e = this,
			i = t.value;
		if (e.isTimeSeries()) {
			i = e.parseDate(t.value)
		} else if (e.isCategorized() && typeof t.value === "string") {
			i = e.config.axis_x_categories.indexOf(t.value)
		}
		;
		return Math.ceil(e.x(i))
	};
	e.yv = function (t) {
		var e = this,
			i = t.axis && t.axis === "y2" ? e.y2 : e.y;
		return Math.ceil(i(t.value))
	};
	e.subxx = function (t) {
		return t ? this.subX(t.x) : null
	};
	e.transformMain = function (t, e) {
		var n = this,
			a, r, s;
		if (e && e.axisX) {
			a = e.axisX
		} else {
			a = n.main.select("." + i.axisX);
			if (t) {
				a = a.transition()
			}
		}
		;
		if (e && e.axisY) {
			r = e.axisY
		} else {
			r = n.main.select("." + i.axisY);
			if (t) {
				r = r.transition()
			}
		}
		;
		if (e && e.axisY2) {
			s = e.axisY2
		} else {
			s = n.main.select("." + i.axisY2);
			if (t) {
				s = s.transition()
			}
		}
		(t ? n.main.transition() : n.main).attr("transform", n.getTranslate("main"));
		a.attr("transform", n.getTranslate("x"));
		r.attr("transform", n.getTranslate("y"));
		s.attr("transform", n.getTranslate("y2"));
		n.main.select("." + i.chartArcs).attr("transform", n.getTranslate("arc"))
	};
	e.transformAll = function (t, e) {
		var i = this;
		i.transformMain(t, e);
		if (i.config.subchart_show) {
			i.transformContext(t, e)
		}
		;
		if (i.legend) {
			i.transformLegend(t)
		}
	};
	e.updateSvgSize = function () {
		var t = this,
			e = t.svg.select(".c3-brush .background");
		t.svg.attr("width", t.currentWidth).attr("height", t.currentHeight);
		t.svg.selectAll(["#" + t.clipId, "#" + t.clipIdForGrid]).select("rect").attr("width", t.width).attr("height", t.height);
		t.svg.select("#" + t.clipIdForXAxis).select("rect").attr("x", t.getXAxisClipX.bind(t)).attr("y", t.getXAxisClipY.bind(t)).attr("width", t.getXAxisClipWidth.bind(t)).attr("height", t.getXAxisClipHeight.bind(t));
		t.svg.select("#" + t.clipIdForYAxis).select("rect").attr("x", t.getYAxisClipX.bind(t)).attr("y", t.getYAxisClipY.bind(t)).attr("width", t.getYAxisClipWidth.bind(t)).attr("height", t.getYAxisClipHeight.bind(t));
		t.svg.select("#" + t.clipIdForSubchart).select("rect").attr("width", t.width).attr("height", e.size() ? e.attr("height") : 0);
		t.svg.select("." + i.zoomRect).attr("width", t.width).attr("height", t.height);
		t.selectChart.style("max-height", t.currentHeight + "px")
	};
	e.updateDimension = function (t) {
		var e = this;
		if (!t) {
			if (e.config.axis_rotated) {
				e.axes.x.call(e.xAxis);
				e.axes.subx.call(e.subXAxis)
			} else {
				e.axes.y.call(e.yAxis);
				e.axes.y2.call(e.y2Axis)
			}
		}
		;
		e.updateSizes();
		e.updateScales();
		e.updateSvgSize();
		e.transformAll(!1)
	};
	e.observeInserted = function (e) {
		var i = this,
			n;
		if (typeof MutationObserver === "undefined") {
			t.console.error("MutationObserver not defined.");
			return
		}
		;
		n = new MutationObserver(function (a) {
			a.forEach(function (a) {
				if (a.type === "childList" && a.previousSibling) {
					n.disconnect();
					i.intervalForObserveInserted = t.setInterval(function () {
						if (e.node().parentNode) {
							t.clearInterval(i.intervalForObserveInserted);
							i.updateDimension();
							if (i.brush) {
								i.brush.update()
							}
							;
							i.config.oninit.call(i);
							i.redraw({
								withTransform: !0,
								withUpdateXDomain: !0,
								withUpdateOrgXDomain: !0,
								withTransition: !1,
								withTransitionForTransform: !1,
								withLegend: !0
							});
							e.transition().style("opacity", 1)
						}
					}, 10)
				}
			})
		});
		n.observe(e.node(), {
			attributes: !0,
			childList: !0,
			characterData: !0
		})
	};
	e.bindResize = function () {
		var e = this,
			n = e.config;
		e.resizeFunction = e.generateResize();
		e.resizeFunction.add(function () {
			n.onresize.call(e)
		});
		if (n.resize_auto) {
			e.resizeFunction.add(function () {
				if (e.resizeTimeout !== undefined) {
					t.clearTimeout(e.resizeTimeout)
				}
				;
				e.resizeTimeout = t.setTimeout(function () {
					delete e.resizeTimeout;
					e.api.flush()
				}, 100)
			})
		}
		;
		e.resizeFunction.add(function () {
			n.onresized.call(e)
		});
		if (t.attachEvent) {
			t.attachEvent("onresize", e.resizeFunction)
		} else if (t.addEventListener) {
			t.addEventListener("resize", e.resizeFunction, !1)
		} else {
			var i = t.onresize;
			if (!i) {
				i = e.generateResize()
			} else if (!i.add || !i.remove) {
				i = e.generateResize();
				i.add(t.onresize)
			}
			;
			i.add(e.resizeFunction);
			t.onresize = i
		}
	};
	e.generateResize = function () {
		var t = [];

		function e() {
			t.forEach(function (t) {
				t()
			})
		};
		e.add = function (e) {
			t.push(e)
		};
		e.remove = function (e) {
			for (var i = 0; i < t.length; i++) {
				if (t[i] === e) {
					t.splice(i, 1);
					break
				}
			}
		};
		return e
	};
	e.endall = function (t, e) {
		var i = 0;
		t.each(function () {
			++i
		}).each("end", function () {
			if (!--i) {
				e.apply(this, arguments)
			}
		})
	};
	e.generateWait = function () {
		var t = [],
			e = function (e, i) {
				var n = setInterval(function () {
					var e = 0;
					t.forEach(function (t) {
						if (t.empty()) {
							e += 1;
							return
						}
						;
						try {
							t.transition()
						} catch (i) {
							e += 1
						}
					});
					if (e === t.length) {
						clearInterval(n);
						if (i) {
							i()
						}
					}
				}, 10)
			};
		e.add = function (e) {
			t.push(e)
		};
		return e
	};
	e.parseDate = function (e) {
		var n = this,
			i;
		if (e instanceof Date) {
			i = e
		} else if (typeof e === "string") {
			i = n.dataTimeFormat(n.config.data_xFormat).parse(e)
		} else if (typeof e === "number" && !isNaN(e)) {
			i = new Date(+e)
		}
		;
		if (!i || isNaN(+i)) {
			t.console.error("Failed to parse x '" + e + "' to Date object")
		}
		;
		return i
	};
	e.isTabVisible = function () {
		var t;
		if (typeof document.hidden !== "undefined") {
			t = "hidden"
		} else if (typeof document.mozHidden !== "undefined") {
			t = "mozHidden"
		} else if (typeof document.msHidden !== "undefined") {
			t = "msHidden"
		} else if (typeof document.webkitHidden !== "undefined") {
			t = "webkitHidden"
		}
		;
		return document[t] ? !1 : !0
	};
	e.getDefaultConfig = function () {
		var t = {
			bindto: "#chart",
			svg_classname: undefined,
			size_width: undefined,
			size_height: undefined,
			padding_left: undefined,
			padding_right: undefined,
			padding_top: undefined,
			padding_bottom: undefined,
			resize_auto: !0,
			zoom_enabled: !1,
			zoom_extent: undefined,
			zoom_privileged: !1,
			zoom_rescale: !1,
			zoom_onzoom: function () {
			},
			zoom_onzoomstart: function () {
			},
			zoom_onzoomend: function () {
			},
			zoom_x_min: undefined,
			zoom_x_max: undefined,
			interaction_brighten: !0,
			interaction_enabled: !0,
			onmouseover: function () {
			},
			onmouseout: function () {
			},
			onresize: function () {
			},
			onresized: function () {
			},
			oninit: function () {
			},
			onrendered: function () {
			},
			transition_duration: 350,
			data_x: undefined,
			data_xs: {},
			data_xFormat: "%Y-%m-%d",
			data_xLocaltime: !0,
			data_xSort: !0,
			data_idConverter: function (t) {
				return t
			},
			data_names: {},
			data_classes: {},
			data_groups: [],
			data_axes: {},
			data_type: undefined,
			data_types: {},
			data_labels: {},
			data_order: "desc",
			data_regions: {},
			data_color: undefined,
			data_colors: {},
			data_hide: !1,
			data_filter: undefined,
			data_selection_enabled: !1,
			data_selection_grouped: !1,
			data_selection_isselectable: function () {
				return !0
			},
			data_selection_multiple: !0,
			data_selection_draggable: !1,
			data_onclick: function () {
			},
			data_onmouseover: function () {
			},
			data_onmouseout: function () {
			},
			data_onselected: function () {
			},
			data_onunselected: function () {
			},
			data_url: undefined,
			data_headers: undefined,
			data_json: undefined,
			data_rows: undefined,
			data_columns: undefined,
			data_mimeType: undefined,
			data_keys: undefined,
			data_empty_label_text: "",
			subchart_show: !1,
			subchart_size_height: 60,
			subchart_axis_x_show: !0,
			subchart_onbrush: function () {
			},
			color_pattern: [],
			color_threshold: {},
			legend_show: !0,
			legend_hide: !1,
			legend_position: "bottom",
			legend_inset_anchor: "top-left",
			legend_inset_x: 10,
			legend_inset_y: 0,
			legend_inset_step: undefined,
			legend_item_onclick: undefined,
			legend_item_onmouseover: undefined,
			legend_item_onmouseout: undefined,
			legend_equally: !1,
			legend_padding: 0,
			legend_item_tile_width: 10,
			legend_item_tile_height: 10,
			axis_rotated: !1,
			axis_x_show: !0,
			axis_x_type: "indexed",
			axis_x_localtime: !0,
			axis_x_categories: [],
			axis_x_tick_centered: !1,
			axis_x_tick_format: undefined,
			axis_x_tick_culling: {},
			axis_x_tick_culling_max: 10,
			axis_x_tick_count: undefined,
			axis_x_tick_fit: !0,
			axis_x_tick_values: null,
			axis_x_tick_rotate: 0,
			axis_x_tick_outer: !0,
			axis_x_tick_multiline: !0,
			axis_x_tick_width: null,
			axis_x_max: undefined,
			axis_x_min: undefined,
			axis_x_padding: {},
			axis_x_height: undefined,
			axis_x_extent: undefined,
			axis_x_label: {},
			axis_y_show: !0,
			axis_y_type: undefined,
			axis_y_max: undefined,
			axis_y_min: undefined,
			axis_y_inverted: !1,
			axis_y_center: undefined,
			axis_y_inner: undefined,
			axis_y_label: {},
			axis_y_tick_format: undefined,
			axis_y_tick_outer: !0,
			axis_y_tick_values: null,
			axis_y_tick_rotate: 0,
			axis_y_tick_count: undefined,
			axis_y_tick_time_value: undefined,
			axis_y_tick_time_interval: undefined,
			axis_y_padding: {},
			axis_y_default: undefined,
			axis_y2_show: !1,
			axis_y2_max: undefined,
			axis_y2_min: undefined,
			axis_y2_inverted: !1,
			axis_y2_center: undefined,
			axis_y2_inner: undefined,
			axis_y2_label: {},
			axis_y2_tick_format: undefined,
			axis_y2_tick_outer: !0,
			axis_y2_tick_values: null,
			axis_y2_tick_count: undefined,
			axis_y2_padding: {},
			axis_y2_default: undefined,
			grid_x_show: !1,
			grid_x_type: "tick",
			grid_x_lines: [],
			grid_y_show: !1,
			grid_y_lines: [],
			grid_y_ticks: 10,
			grid_focus_show: !0,
			grid_lines_front: !0,
			point_show: !0,
			point_r: 2.5,
			point_sensitivity: 10,
			point_focus_expand_enabled: !0,
			point_focus_expand_r: undefined,
			point_select_r: undefined,
			line_connectNull: !1,
			line_step_type: "step",
			bar_width: undefined,
			bar_width_ratio: 0.6,
			bar_width_max: undefined,
			bar_zerobased: !0,
			area_zerobased: !0,
			area_above: !1,
			pie_label_show: !0,
			pie_label_format: undefined,
			pie_label_threshold: 0.05,
			pie_label_ratio: undefined,
			pie_expand: {},
			pie_expand_duration: 50,
			gauge_fullCircle: !1,
			gauge_label_show: !0,
			gauge_label_format: undefined,
			gauge_min: 0,
			gauge_max: 100,
			gauge_startingAngle: -1 * Math.PI / 2,
			gauge_units: undefined,
			gauge_width: undefined,
			gauge_expand: {},
			gauge_expand_duration: 50,
			donut_label_show: !0,
			donut_label_format: undefined,
			donut_label_threshold: 0.05,
			donut_label_ratio: undefined,
			donut_width: undefined,
			donut_title: "",
			donut_expand: {},
			donut_expand_duration: 50,
			spline_interpolation_type: "cardinal",
			regions: [],
			tooltip_show: !0,
			tooltip_grouped: !0,
			tooltip_format_title: undefined,
			tooltip_format_name: undefined,
			tooltip_format_value: undefined,
			tooltip_position: undefined,
			tooltip_contents: function (t, e, i, n) {
				return this.getTooltipContent ? this.getTooltipContent(t, e, i, n) : ""
			},
			tooltip_init_show: !1,
			tooltip_init_x: 0,
			tooltip_init_position: {
				top: "0px",
				left: "50px"
			},
			tooltip_onshow: function () {
			},
			tooltip_onhide: function () {
			},
			title_text: undefined,
			title_padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},
			title_position: "top-center",
		};
		Object.keys(this.additionalConfig).forEach(function (e) {
			t[e] = this.additionalConfig[e]
		}, this);
		return t
	};
	e.additionalConfig = {};
	e.load = function (t) {
		var n = this.config,
			e, a, i;

		function r() {
			var t = a.shift();
			if (t && e && typeof e === "object" && t in e) {
				e = e[t];
				return r()
			} else if (!t) {
				return e
			} else {
				return undefined
			}
		};
		Object.keys(n).forEach(function (s) {
			e = t;
			a = s.split("_");
			i = r();
			if (o(i)) {
				n[s] = i
			}
		})
	};
	e.getScale = function (t, e, i) {
		return (i ? this.d3.time.scale() : this.d3.scale.linear()).range([t, e])
	};
	e.getX = function (t, e, i, n) {
		var s = this,
			a = s.getScale(t, e, s.isTimeSeries()),
			r = i ? a.domain(i) : a,
			o;
		if (s.isCategorized()) {
			n = n || function () {
					return 0
				};
			a = function (t, e) {
				var i = r(t) + n(t);
				return e ? i : Math.ceil(i)
			}
		} else {
			a = function (t, e) {
				var i = r(t);
				return e ? i : Math.ceil(i)
			}
		}
		;
		for (o in r) {
			a[o] = r[o]
		}
		;
		a.orgDomain = function () {
			return r.domain()
		};
		if (s.isCategorized()) {
			a.domain = function (t) {
				if (!arguments.length) {
					t = this.orgDomain();
					return [t[0], t[1] + 1]
				}
				;
				r.domain(t);
				return a
			}
		}
		;
		return a
	};
	e.getY = function (t, e, i) {
		var n = this.getScale(t, e, this.isTimeSeriesY());
		if (i) {
			n.domain(i)
		}
		;
		return n
	};
	e.getYScale = function (t) {
		return this.axis.getId(t) === "y2" ? this.y2 : this.y
	};
	e.getSubYScale = function (t) {
		return this.axis.getId(t) === "y2" ? this.subY2 : this.subY
	};
	e.updateScales = function () {
		var t = this,
			e = t.config,
			i = !t.x;
		t.xMin = e.axis_rotated ? 1 : 0;
		t.xMax = e.axis_rotated ? t.height : t.width;
		t.yMin = e.axis_rotated ? 0 : t.height;
		t.yMax = e.axis_rotated ? t.width : 1;
		t.subXMin = t.xMin;
		t.subXMax = t.xMax;
		t.subYMin = e.axis_rotated ? 0 : t.height2;
		t.subYMax = e.axis_rotated ? t.width2 : 1;
		t.x = t.getX(t.xMin, t.xMax, i ? undefined : t.x.orgDomain(), function () {
			return t.xAxis.tickOffset()
		});
		t.y = t.getY(t.yMin, t.yMax, i ? e.axis_y_default : t.y.domain());
		t.y2 = t.getY(t.yMin, t.yMax, i ? e.axis_y2_default : t.y2.domain());
		t.subX = t.getX(t.xMin, t.xMax, t.orgXDomain, function (e) {
			return e % 1 ? 0 : t.subXAxis.tickOffset()
		});
		t.subY = t.getY(t.subYMin, t.subYMax, i ? e.axis_y_default : t.subY.domain());
		t.subY2 = t.getY(t.subYMin, t.subYMax, i ? e.axis_y2_default : t.subY2.domain());
		t.xAxisTickFormat = t.axis.getXAxisTickFormat();
		t.xAxisTickValues = t.axis.getXAxisTickValues();
		t.yAxisTickValues = t.axis.getYAxisTickValues();
		t.y2AxisTickValues = t.axis.getY2AxisTickValues();
		t.xAxis = t.axis.getXAxis(t.x, t.xOrient, t.xAxisTickFormat, t.xAxisTickValues, e.axis_x_tick_outer);
		t.subXAxis = t.axis.getXAxis(t.subX, t.subXOrient, t.xAxisTickFormat, t.xAxisTickValues, e.axis_x_tick_outer);
		t.yAxis = t.axis.getYAxis(t.y, t.yOrient, e.axis_y_tick_format, t.yAxisTickValues, e.axis_y_tick_outer);
		t.y2Axis = t.axis.getYAxis(t.y2, t.y2Orient, e.axis_y2_tick_format, t.y2AxisTickValues, e.axis_y2_tick_outer);
		if (!i) {
			if (t.brush) {
				t.brush.scale(t.subX)
			}
			;
			if (e.zoom_enabled) {
				t.zoom.scale(t.x)
			}
		}
		;
		if (t.updateArc) {
			t.updateArc()
		}
	};
	e.getYDomainMin = function (t) {
		var i = this,
			c = i.config,
			l = i.mapToIds(t),
			e = i.getValuesAsIdKeyed(t),
			r, s, n, a, o, u;
		if (c.data_groups.length > 0) {
			u = i.hasNegativeValueInTargets(t);
			for (r = 0; r < c.data_groups.length; r++) {
				a = c.data_groups[r].filter(function (t) {
					return l.indexOf(t) >= 0
				});
				if (a.length === 0) {
					continue
				}
				;
				n = a[0];
				if (u && e[n]) {
					e[n].forEach(function (t, i) {
						e[n][i] = t < 0 ? t : 0
					})
				}
				;
				for (s = 1; s < a.length; s++) {
					o = a[s];
					if (!e[o]) {
						continue
					}
					;
					e[o].forEach(function (t, a) {
						if (i.axis.getId(o) === i.axis.getId(n) && e[n] && !(u && +t > 0)) {
							e[n][a] += +t
						}
					})
				}
			}
		}
		;
		return i.d3.min(Object.keys(e).map(function (t) {
			return i.d3.min(e[t])
		}))
	};
	e.getYDomainMax = function (t) {
		var i = this,
			c = i.config,
			l = i.mapToIds(t),
			e = i.getValuesAsIdKeyed(t),
			r, s, n, a, o, u;
		if (c.data_groups.length > 0) {
			u = i.hasPositiveValueInTargets(t);
			for (r = 0; r < c.data_groups.length; r++) {
				a = c.data_groups[r].filter(function (t) {
					return l.indexOf(t) >= 0
				});
				if (a.length === 0) {
					continue
				}
				;
				n = a[0];
				if (u && e[n]) {
					e[n].forEach(function (t, i) {
						e[n][i] = t > 0 ? t : 0
					})
				}
				;
				for (s = 1; s < a.length; s++) {
					o = a[s];
					if (!e[o]) {
						continue
					}
					;
					e[o].forEach(function (t, a) {
						if (i.axis.getId(o) === i.axis.getId(n) && e[n] && !(u && +t < 0)) {
							e[n][a] += +t
						}
					})
				}
			}
		}
		;
		return i.d3.max(Object.keys(e).map(function (t) {
			return i.d3.max(e[t])
		}))
	};
	e.getYDomain = function (t, e, i) {
		var n = this,
			s = n.config,
			C = t.filter(function (t) {
				return n.axis.getId(t.id) === e
			}),
			y = i ? n.filterByXDomain(C, i) : C,
			f = e === "y2" ? s.axis_y2_min : s.axis_y_min,
			p = e === "y2" ? s.axis_y2_max : s.axis_y_max,
			a = n.getYDomainMin(y),
			o = n.getYDomainMax(y),
			v, c, L, l, d, b = e === "y2" ? s.axis_y2_center : s.axis_y_center,
			A, x, T, h, m, S, P = (n.hasType("bar", y) && s.bar_zerobased) || (n.hasType("area", y) && s.area_zerobased),
			w = e === "y2" ? s.axis_y2_inverted : s.axis_y_inverted,
			V = n.hasDataLabel() && s.axis_rotated,
			G = n.hasDataLabel() && !s.axis_rotated;
		a = r(f) ? f : r(p) ? (a < p ? a : p - 10) : a;
		o = r(p) ? p : r(f) ? (f < o ? o : f + 10) : o;
		if (y.length === 0) {
			return e === "y2" ? n.y2.domain() : n.y.domain()
		}
		;
		if (isNaN(a)) {
			a = 0
		}
		;
		if (isNaN(o)) {
			o = a
		}
		;
		if (a === o) {
			a < 0 ? o = 0 : a = 0
		}
		;
		m = a >= 0 && o >= 0;
		S = a <= 0 && o <= 0;
		if ((r(f) && m) || (r(p) && S)) {
			P = !1
		}
		;
		if (P) {
			if (m) {
				a = 0
			}
			;
			if (S) {
				o = 0
			}
		}
		;
		c = Math.abs(o - a);
		L = l = d = c * 0.1;
		if (typeof b !== "undefined") {
			A = Math.max(Math.abs(a), Math.abs(o));
			o = b + A;
			a = b - A
		}
		;
		if (V) {
			x = n.getDataLabelLength(a, o, "width");
			T = g(n.y.range());
			h = [x[0] / T, x[1] / T];
			l += c * (h[1] / (1 - h[0] - h[1]));
			d += c * (h[0] / (1 - h[0] - h[1]))
		} else if (G) {
			x = n.getDataLabelLength(a, o, "height");
			l += n.axis.convertPixelsToAxisPadding(x[1], c);
			d += n.axis.convertPixelsToAxisPadding(x[0], c)
		}
		;
		if (e === "y" && u(s.axis_y_padding)) {
			l = n.axis.getPadding(s.axis_y_padding, "top", l, c);
			d = n.axis.getPadding(s.axis_y_padding, "bottom", d, c)
		}
		;
		if (e === "y2" && u(s.axis_y2_padding)) {
			l = n.axis.getPadding(s.axis_y2_padding, "top", l, c);
			d = n.axis.getPadding(s.axis_y2_padding, "bottom", d, c)
		}
		;
		if (P) {
			if (m) {
				d = a
			}
			;
			if (S) {
				l = -o
			}
		}
		;
		v = [a - d, o + l];
		return w ? v.reverse() : v
	};
	e.getXDomainMin = function (t) {
		var e = this,
			i = e.config;
		return o(i.axis_x_min) ? (e.isTimeSeries() ? this.parseDate(i.axis_x_min) : i.axis_x_min) : e.d3.min(t, function (t) {
			return e.d3.min(t.values, function (t) {
				return t.x
			})
		})
	};
	e.getXDomainMax = function (t) {
		var e = this,
			i = e.config;
		return o(i.axis_x_max) ? (e.isTimeSeries() ? this.parseDate(i.axis_x_max) : i.axis_x_max) : e.d3.max(t, function (t) {
			return e.d3.max(t.values, function (t) {
				return t.x
			})
		})
	};
	e.getXDomainPadding = function (t) {
		var n = this,
			e = n.config,
			c = t[1] - t[0],
			o, i, a, s;
		if (n.isCategorized()) {
			i = 0
		} else if (n.hasType("bar")) {
			o = n.getMaxDataCount();
			i = o > 1 ? (c / (o - 1)) / 2 : 0.5
		} else {
			i = c * 0.01
		}
		;
		if (typeof e.axis_x_padding === "object" && u(e.axis_x_padding)) {
			a = r(e.axis_x_padding.left) ? e.axis_x_padding.left : i;
			s = r(e.axis_x_padding.right) ? e.axis_x_padding.right : i
		} else if (typeof e.axis_x_padding === "number") {
			a = s = e.axis_x_padding
		} else {
			a = s = i
		}
		;
		return {
			left: a,
			right: s
		}
	};
	e.getXDomain = function (t) {
		var n = this,
			r = [n.getXDomainMin(t), n.getXDomainMax(t)],
			e = r[0],
			i = r[1],
			a = n.getXDomainPadding(r),
			s = 0,
			o = 0;
		if ((e - i) === 0 && !n.isCategorized()) {
			if (n.isTimeSeries()) {
				e = new Date(e.getTime() * 0.5);
				i = new Date(i.getTime() * 1.5)
			} else {
				e = e === 0 ? 1 : (e * 0.5);
				i = i === 0 ? -1 : (i * 1.5)
			}
		}
		;
		if (e || e === 0) {
			s = n.isTimeSeries() ? new Date(e.getTime() - a.left) : e - a.left
		}
		;
		if (i || i === 0) {
			o = n.isTimeSeries() ? new Date(i.getTime() + a.right) : i + a.right
		}
		;
		return [s, o]
	};
	e.updateXDomain = function (t, e, i, n, r) {
		var a = this,
			s = a.config;
		if (i) {
			a.x.domain(r ? r : a.d3.extent(a.getXDomain(t)));
			a.orgXDomain = a.x.domain();
			if (s.zoom_enabled) {
				a.zoom.scale(a.x).updateScaleExtent()
			}
			;
			a.subX.domain(a.x.domain());
			if (a.brush) {
				a.brush.scale(a.subX)
			}
		}
		;
		if (e) {
			a.x.domain(r ? r : (!a.brush || a.brush.empty()) ? a.orgXDomain : a.brush.extent());
			if (s.zoom_enabled) {
				a.zoom.scale(a.x).updateScaleExtent()
			}
		}
		;
		if (n) {
			a.x.domain(a.trimXDomain(a.x.orgDomain()))
		}
		;
		return a.x.domain()
	};
	e.trimXDomain = function (t) {
		var n = this.getZoomDomain(),
			e = n[0],
			i = n[1];
		if (t[0] <= e) {
			t[1] = +t[1] + (e - t[0]);
			t[0] = e
		}
		;
		if (i <= t[1]) {
			t[0] = +t[0] - (t[1] - i);
			t[1] = i
		}
		;
		return t
	};
	e.isX = function (t) {
		var i = this,
			e = i.config;
		return (e.data_x && t === e.data_x) || (u(e.data_xs) && T(e.data_xs, t))
	};
	e.isNotX = function (t) {
		return !this.isX(t)
	};
	e.getXKey = function (t) {
		var i = this,
			e = i.config;
		return e.data_x ? e.data_x : u(e.data_xs) ? e.data_xs[t] : null
	};
	e.getXValuesOfXKey = function (t, e) {
		var i = this,
			n, a = e && u(e) ? i.mapToIds(e) : [];
		a.forEach(function (e) {
			if (i.getXKey(e) === t) {
				n = i.data.xs[e]
			}
		});
		return n
	};
	e.getIndexByX = function (t) {
		var e = this,
			i = e.filterByX(e.data.targets, t);
		return i.length ? i[0].index : null
	};
	e.getXValue = function (t, e) {
		var i = this;
		return t in i.data.xs && i.data.xs[t] && r(i.data.xs[t][e]) ? i.data.xs[t][e] : e
	};
	e.getOtherTargetXs = function () {
		var t = this,
			e = Object.keys(t.data.xs);
		return e.length ? t.data.xs[e[0]] : null
	};
	e.getOtherTargetX = function (t) {
		var e = this.getOtherTargetXs();
		return e && t < e.length ? e[t] : null
	};
	e.addXs = function (t) {
		var e = this;
		Object.keys(t).forEach(function (i) {
			e.config.data_xs[i] = t[i]
		})
	};
	e.hasMultipleX = function (t) {
		return this.d3.set(Object.keys(t).map(function (e) {
				return t[e]
			})).size() > 1
	};
	e.isMultipleX = function () {
		return u(this.config.data_xs) || !this.config.data_xSort || this.hasType("scatter")
	};
	e.addName = function (t) {
		var i = this,
			e;
		if (t) {
			e = i.config.data_names[t.id];
			t.name = e !== undefined ? e : t.id
		}
		;
		return t
	};
	e.getValueOnIndex = function (t, e) {
		var i = t.filter(function (t) {
			return t.index === e
		});
		return i.length ? i[0] : null
	};
	e.updateTargetX = function (t, e) {
		var i = this;
		t.forEach(function (t) {
			t.values.forEach(function (n, a) {
				n.x = i.generateTargetX(e[a], t.id, a)
			});
			i.data.xs[t.id] = e
		})
	};
	e.updateTargetXs = function (t, e) {
		var i = this;
		t.forEach(function (t) {
			if (e[t.id]) {
				i.updateTargetX([t], e[t.id])
			}
		})
	};
	e.generateTargetX = function (t, e, i) {
		var n = this,
			a;
		if (n.isTimeSeries()) {
			a = t ? n.parseDate(t) : n.parseDate(n.getXValue(e, i))
		} else if (n.isCustomX() && !n.isCategorized()) {
			a = r(t) ? +t : n.getXValue(e, i)
		} else {
			a = i
		}
		;
		return a
	};
	e.cloneTarget = function (t) {
		return {
			id: t.id,
			id_org: t.id_org,
			values: t.values.map(function (t) {
				return {
					x: t.x,
					value: t.value,
					id: t.id
				}
			})
		}
	};
	e.updateXs = function () {
		var t = this;
		if (t.data.targets.length) {
			t.xs = [];
			t.data.targets[0].values.forEach(function (e) {
				t.xs[e.index] = e.x
			})
		}
	};
	e.getPrevX = function (t) {
		var e = this.xs[t - 1];
		return typeof e !== "undefined" ? e : null
	};
	e.getNextX = function (t) {
		var e = this.xs[t + 1];
		return typeof e !== "undefined" ? e : null
	};
	e.getMaxDataCount = function () {
		var t = this;
		return t.d3.max(t.data.targets, function (t) {
			return t.values.length
		})
	};
	e.getMaxDataCountTarget = function (t) {
		var i = t.length,
			n = 0,
			e;
		if (i > 1) {
			t.forEach(function (t) {
				if (t.values.length > n) {
					e = t;
					n = t.values.length
				}
			})
		} else {
			e = i ? t[0] : null
		}
		;
		return e
	};
	e.getEdgeX = function (t) {
		var e = this;
		return !t.length ? [0, 0] : [e.d3.min(t, function (t) {
			return t.values[0].x
		}), e.d3.max(t, function (t) {
			return t.values[t.values.length - 1].x
		})]
	};
	e.mapToIds = function (t) {
		return t.map(function (t) {
			return t.id
		})
	};
	e.mapToTargetIds = function (t) {
		var e = this;
		return t ? [].concat(t) : e.mapToIds(e.data.targets)
	};
	e.hasTarget = function (t, e) {
		var n = this.mapToIds(t),
			i;
		for (i = 0; i < n.length; i++) {
			if (n[i] === e) {
				return !0
			}
		}
		;
		return !1
	};
	e.isTargetToShow = function (t) {
		return this.hiddenTargetIds.indexOf(t) < 0
	};
	e.isLegendToShow = function (t) {
		return this.hiddenLegendIds.indexOf(t) < 0
	};
	e.filterTargetsToShow = function (t) {
		var e = this;
		return t.filter(function (t) {
			return e.isTargetToShow(t.id)
		})
	};
	e.mapTargetsToUniqueXs = function (t) {
		var i = this,
			e = i.d3.set(i.d3.merge(t.map(function (t) {
				return t.values.map(function (t) {
					return +t.x
				})
			}))).values();
		e = i.isTimeSeries() ? e.map(function (t) {
			return new Date(+t)
		}) : e.map(function (t) {
			return +t
		});
		return e.sort(function (t, e) {
			return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
		})
	};
	e.addHiddenTargetIds = function (t) {
		this.hiddenTargetIds = this.hiddenTargetIds.concat(t)
	};
	e.removeHiddenTargetIds = function (t) {
		this.hiddenTargetIds = this.hiddenTargetIds.filter(function (e) {
			return t.indexOf(e) < 0
		})
	};
	e.addHiddenLegendIds = function (t) {
		this.hiddenLegendIds = this.hiddenLegendIds.concat(t)
	};
	e.removeHiddenLegendIds = function (t) {
		this.hiddenLegendIds = this.hiddenLegendIds.filter(function (e) {
			return t.indexOf(e) < 0
		})
	};
	e.getValuesAsIdKeyed = function (t) {
		var e = {};
		t.forEach(function (t) {
			e[t.id] = [];
			t.values.forEach(function (i) {
				e[t.id].push(i.value)
			})
		});
		return e
	};
	e.checkValueInTargets = function (t, e) {
		var r = Object.keys(t),
			i, n, a;
		for (i = 0; i < r.length; i++) {
			a = t[r[i]].values;
			for (n = 0; n < a.length; n++) {
				if (e(a[n].value)) {
					return !0
				}
			}
		}
		;
		return !1
	};
	e.hasNegativeValueInTargets = function (t) {
		return this.checkValueInTargets(t, function (t) {
			return t < 0
		})
	};
	e.hasPositiveValueInTargets = function (t) {
		return this.checkValueInTargets(t, function (t) {
			return t > 0
		})
	};
	e.isOrderDesc = function () {
		var t = this.config;
		return typeof(t.data_order) === "string" && t.data_order.toLowerCase() === "desc"
	};
	e.isOrderAsc = function () {
		var t = this.config;
		return typeof(t.data_order) === "string" && t.data_order.toLowerCase() === "asc"
	};
	e.orderTargets = function (t) {
		var e = this,
			i = e.config,
			n = e.isOrderAsc(),
			a = e.isOrderDesc();
		if (n || a) {
			t.sort(function (t, e) {
				var i = function (t, e) {
						return t + Math.abs(e.value)
					},
					a = t.values.reduce(i, 0),
					r = e.values.reduce(i, 0);
				return n ? r - a : a - r
			})
		} else if (d(i.data_order)) {
			t.sort(i.data_order)
		}
		;
		return t
	};
	e.filterByX = function (t, e) {
		return this.d3.merge(t.map(function (t) {
			return t.values
		})).filter(function (t) {
			return t.x - e === 0
		})
	};
	e.filterRemoveNull = function (t) {
		return t.filter(function (t) {
			return r(t.value)
		})
	};
	e.filterByXDomain = function (t, e) {
		return t.map(function (t) {
			return {
				id: t.id,
				id_org: t.id_org,
				values: t.values.filter(function (t) {
					return e[0] <= t.x && t.x <= e[1]
				})
			}
		})
	};
	e.hasDataLabel = function () {
		var t = this.config;
		if (typeof t.data_labels === "boolean" && t.data_labels) {
			return !0
		} else if (typeof t.data_labels === "object" && u(t.data_labels)) {
			return !0
		}
		;
		return !1
	};
	e.getDataLabelLength = function (t, e, i) {
		var n = this,
			a = [0, 0],
			r = 1.3;
		n.selectChart.select("svg").selectAll(".dummy").data([t, e]).enter().append("text").text(function (t) {
			return n.dataLabelFormat(t.id)(t)
		}).each(function (t, e) {
			a[e] = this.getBoundingClientRect()[i] * r
		}).remove();
		return a
	};
	e.isNoneArc = function (t) {
		return this.hasTarget(this.data.targets, t.id)
	}, e.isArc = function (t) {
		return "data" in t && this.hasTarget(this.data.targets, t.data.id)
	};
	e.findSameXOfValues = function (t, e) {
		var i, a = t[e].x,
			n = [];
		for (i = e - 1; i >= 0; i--) {
			if (a !== t[i].x) {
				break
			}
			;
			n.push(t[i])
		}
		;
		for (i = e; i < t.length; i++) {
			if (a !== t[i].x) {
				break
			}
			;
			n.push(t[i])
		}
		;
		return n
	};
	e.findClosestFromTargets = function (t, e) {
		var i = this,
			n;
		n = t.map(function (t) {
			return i.findClosest(t.values, e)
		});
		return i.findClosest(n, e)
	};
	e.findClosest = function (t, e) {
		var n = this,
			r = n.config.point_sensitivity,
			a;
		t.filter(function (t) {
			return t && n.isBarType(t.id)
		}).forEach(function (t) {
			var e = n.main.select("." + i.bars + n.getTargetSelectorSuffix(t.id) + " ." + i.bar + "-" + t.index).node();
			if (!a && n.isWithinBar(e)) {
				a = t
			}
		});
		t.filter(function (t) {
			return t && !n.isBarType(t.id)
		}).forEach(function (t) {
			var i = n.dist(t, e);
			if (i < r) {
				r = i;
				a = t
			}
		});
		return a
	};
	e.dist = function (t, e) {
		var i = this,
			n = i.config,
			a = n.axis_rotated ? 1 : 0,
			r = n.axis_rotated ? 0 : 1,
			s = i.circleY(t, t.index),
			o = i.x(t.x);
		return Math.sqrt(Math.pow(o - e[a], 2) + Math.pow(s - e[r], 2))
	};
	e.convertValuesToStep = function (t) {
		var e = [].concat(t),
			i;
		if (!this.isCategorized()) {
			return t
		}
		;
		for (i = t.length + 1; 0 < i; i--) {
			e[i] = e[i - 1]
		}
		;
		e[0] = {
			x: e[0].x - 1,
			value: e[0].value,
			id: e[0].id
		};
		e[t.length + 1] = {
			x: e[t.length].x + 1,
			value: e[t.length].value,
			id: e[t.length].id
		};
		return e
	};
	e.updateDataAttributes = function (t, e) {
		var n = this,
			a = n.config,
			i = a["data_" + t];
		if (typeof e === "undefined") {
			return i
		}
		;
		Object.keys(e).forEach(function (t) {
			i[t] = e[t]
		});
		n.redraw({
			withLegend: !0
		});
		return i
	};
	e.convertUrlToData = function (t, e, i, n, a) {
		var r = this,
			s = e ? e : "csv",
			o = r.d3.xhr(t);
		if (i) {
			Object.keys(i).forEach(function (t) {
				o.header(t, i[t])
			})
		}
		;
		o.get(function (t, e) {
			var i;
			if (!e) {
				throw new Error(t.responseURL + " " + t.status + " (" + t.statusText + ")")
			}
			;
			if (s === "json") {
				i = r.convertJsonToData(JSON.parse(e.response), n)
			} else if (s === "tsv") {
				i = r.convertTsvToData(e.response)
			} else {
				i = r.convertCsvToData(e.response)
			}
			;
			a.call(r, i)
		})
	};
	e.convertXsvToData = function (t, e) {
		var n = e.parseRows(t),
			i;
		if (n.length === 1) {
			i = [{}];
			n[0].forEach(function (t) {
				i[0][t] = null
			})
		} else {
			i = e.parse(t)
		}
		;
		return i
	};
	e.convertCsvToData = function (t) {
		return this.convertXsvToData(t, this.d3.csv)
	};
	e.convertTsvToData = function (t) {
		return this.convertXsvToData(t, this.d3.tsv)
	};
	e.convertJsonToData = function (t, e) {
		var n = this,
			i = [],
			a, r;
		if (e) {
			if (e.x) {
				a = e.value.concat(e.x);
				n.config.data_x = e.x
			} else {
				a = e.value
			}
			;
			i.push(a);
			t.forEach(function (t) {
				var e = [];
				a.forEach(function (i) {
					var a = n.findValueInJson(t, i);
					if (l(a)) {
						a = null
					}
					;
					e.push(a)
				});
				i.push(e)
			});
			r = n.convertRowsToData(i)
		} else {
			Object.keys(t).forEach(function (e) {
				i.push([e].concat(t[e]))
			});
			r = n.convertColumnsToData(i)
		}
		;
		return r
	};
	e.findValueInJson = function (t, e) {
		e = e.replace(/\[(\w+)\]/g, ".$1");
		e = e.replace(/^\./, "");
		var a = e.split(".");
		for (var i = 0; i < a.length; ++i) {
			var n = a[i];
			if (n in t) {
				t = t[n]
			} else {
				return
			}
		}
		;
		return t
	};
	e.convertRowsToData = function (t) {
		var r = t[0],
			n = {},
			a = [],
			e, i;
		for (e = 1; e < t.length; e++) {
			n = {};
			for (i = 0; i < t[e].length; i++) {
				if (l(t[e][i])) {
					throw new Error("Source data is missing a component at (" + e + "," + i + ")!")
				}
				;
				n[r[i]] = t[e][i]
			}
			;
			a.push(n)
		}
		;
		return a
	};
	e.convertColumnsToData = function (t) {
		var n = [],
			i, e, a;
		for (i = 0; i < t.length; i++) {
			a = t[i][0];
			for (e = 1; e < t[i].length; e++) {
				if (l(n[e - 1])) {
					n[e - 1] = {}
				}
				;
				if (l(t[i][e])) {
					throw new Error("Source data is missing a component at (" + i + "," + e + ")!")
				}
				;
				n[e - 1][a] = t[i][e]
			}
		}
		;
		return n
	};
	e.convertDataToTargets = function (t, e) {
		var i = this,
			n = i.config,
			s = i.d3.keys(t[0]).filter(i.isNotX, i),
			c = i.d3.keys(t[0]).filter(i.isX, i),
			a;
		s.forEach(function (a) {
			var s = i.getXKey(a);
			if (i.isCustomX() || i.isTimeSeries()) {
				if (c.indexOf(s) >= 0) {
					i.data.xs[a] = (e && i.data.xs[a] ? i.data.xs[a] : []).concat(t.map(function (t) {
						return t[s]
					}).filter(r).map(function (t, e) {
						return i.generateTargetX(t, a, e)
					}))
				} else if (n.data_x) {
					i.data.xs[a] = i.getOtherTargetXs()
				} else if (u(n.data_xs)) {
					i.data.xs[a] = i.getXValuesOfXKey(s, i.data.targets)
				}
			} else {
				i.data.xs[a] = t.map(function (t, e) {
					return e
				})
			}
		});
		s.forEach(function (t) {
			if (!i.data.xs[t]) {
				throw new Error("x is not defined for id = \"" + t + "\".")
			}
		});
		a = s.map(function (e, a) {
			var r = n.data_idConverter(e);
			return {
				id: r,
				id_org: e,
				values: t.map(function (t, s) {
					var u = i.getXKey(e),
						c = t[u],
						d = t[e] !== null && !isNaN(t[e]) ? +t[e] : null,
						o;
					if (i.isCustomX() && i.isCategorized() && a === 0 && !l(c)) {
						if (a === 0 && s === 0) {
							n.axis_x_categories = []
						}
						;
						o = n.axis_x_categories.indexOf(c);
						if (o === -1) {
							o = n.axis_x_categories.length;
							n.axis_x_categories.push(c)
						}
					} else {
						o = i.generateTargetX(c, e, s)
					}
					;
					if (l(t[e]) || i.data.xs[e].length <= s) {
						o = undefined
					}
					;
					return {
						x: o,
						value: d,
						id: r
					}
				}).filter(function (t) {
					return o(t.x)
				})
			}
		});
		a.forEach(function (t) {
			var e;
			if (n.data_xSort) {
				t.values = t.values.sort(function (t, e) {
					var i = t.x || t.x === 0 ? t.x : Infinity,
						n = e.x || e.x === 0 ? e.x : Infinity;
					return i - n
				})
			}
			;
			e = 0;
			t.values.forEach(function (t) {
				t.index = e++
			});
			i.data.xs[t.id].sort(function (t, e) {
				return t - e
			})
		});
		i.hasNegativeValue = i.hasNegativeValueInTargets(a);
		i.hasPositiveValue = i.hasPositiveValueInTargets(a);
		if (n.data_type) {
			i.setTargetType(i.mapToIds(a).filter(function (t) {
				return !(t in n.data_types)
			}), n.data_type)
		}
		;
		a.forEach(function (t) {
			i.addCache(t.id_org, t)
		});
		return a
	};
	e.load = function (t, e) {
		var i = this;
		if (t) {
			if (e.filter) {
				t = t.filter(e.filter)
			}
			;
			if (e.type || e.types) {
				t.forEach(function (t) {
					var n = e.types && e.types[t.id] ? e.types[t.id] : e.type;
					i.setTargetType(t.id, n)
				})
			}
			;
			i.data.targets.forEach(function (e) {
				for (var i = 0; i < t.length; i++) {
					if (e.id === t[i].id) {
						e.values = t[i].values;
						t.splice(i, 1);
						break
					}
				}
			});
			i.data.targets = i.data.targets.concat(t)
		}
		;
		i.updateTargets(i.data.targets);
		i.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		});
		if (e.done) {
			e.done()
		}
	};
	e.loadFromArgs = function (t) {
		var e = this;
		if (t.data) {
			e.load(e.convertDataToTargets(t.data), t)
		} else if (t.url) {
			e.convertUrlToData(t.url, t.mimeType, t.headers, t.keys, function (i) {
				e.load(e.convertDataToTargets(i), t)
			})
		} else if (t.json) {
			e.load(e.convertDataToTargets(e.convertJsonToData(t.json, t.keys)), t)
		} else if (t.rows) {
			e.load(e.convertDataToTargets(e.convertRowsToData(t.rows)), t)
		} else if (t.columns) {
			e.load(e.convertDataToTargets(e.convertColumnsToData(t.columns)), t)
		} else {
			e.load(null, t)
		}
	};
	e.unload = function (t, e) {
		var n = this;
		if (!e) {
			e = function () {
			}
		}
		;
		t = t.filter(function (t) {
			return n.hasTarget(n.data.targets, t)
		});
		if (!t || t.length === 0) {
			e();
			return
		}
		;
		n.svg.selectAll(t.map(function (t) {
			return n.selectorTarget(t)
		})).transition().style("opacity", 0).remove().call(n.endall, e);
		t.forEach(function (t) {
			n.withoutFadeIn[t] = !1;
			if (n.legend) {
				n.legend.selectAll("." + i.legendItem + n.getTargetSelectorSuffix(t)).remove()
			}
			;
			n.data.targets = n.data.targets.filter(function (e) {
				return e.id !== t
			})
		})
	};
	e.categoryName = function (t) {
		var e = this.config;
		return t < e.axis_x_categories.length ? e.axis_x_categories[t] : t
	};
	e.initEventRect = function () {
		var t = this;
		t.main.select("." + i.chart).append("g").attr("class", i.eventRects).style("fill-opacity", 0)
	};
	e.redrawEventRect = function () {
		var t = this,
			s = t.config,
			e, a, r = t.isMultipleX(),
			n = t.main.select("." + i.eventRects).style("cursor", s.zoom_enabled ? s.axis_rotated ? "ns-resize" : "ew-resize" : null).classed(i.eventRectsMultiple, r).classed(i.eventRectsSingle, !r);
		n.selectAll("." + i.eventRect).remove();
		t.eventRect = n.selectAll("." + i.eventRect);
		if (r) {
			e = t.eventRect.data([0]);
			t.generateEventRectsForMultipleXs(e.enter());
			t.updateEventRect(e)
		} else {
			a = t.getMaxDataCountTarget(t.data.targets);
			n.datum(a ? a.values : []);
			t.eventRect = n.selectAll("." + i.eventRect);
			e = t.eventRect.data(function (t) {
				return t
			});
			t.generateEventRectsForSingleX(e.enter());
			t.updateEventRect(e);
			e.exit().remove()
		}
	};
	e.updateEventRect = function (t) {
		var e = this,
			i = e.config,
			r, s, o, c, n, a;
		t = t || e.eventRect.data(function (t) {
				return t
			});
		if (e.isMultipleX()) {
			r = 0;
			s = 0;
			o = e.width;
			c = e.height
		} else {
			if ((e.isCustomX() || e.isTimeSeries()) && !e.isCategorized()) {
				e.updateXs();
				n = function (t) {
					var n = e.getPrevX(t.index),
						a = e.getNextX(t.index);
					if (n === null && a === null) {
						return i.axis_rotated ? e.height : e.width
					}
					;
					if (n === null) {
						n = e.x.domain()[0]
					}
					;
					if (a === null) {
						a = e.x.domain()[1]
					}
					;
					return Math.max(0, (e.x(a) - e.x(n)) / 2)
				};
				a = function (t) {
					var i = e.getPrevX(t.index),
						n = e.getNextX(t.index),
						a = e.data.xs[t.id][t.index];
					if (i === null && n === null) {
						return 0
					}
					;
					if (i === null) {
						i = e.x.domain()[0]
					}
					;
					return (e.x(a) + e.x(i)) / 2
				}
			} else {
				n = e.getEventRectWidth();
				a = function (t) {
					return e.x(t.x) - (n / 2)
				}
			}
			;
			r = i.axis_rotated ? 0 : a;
			s = i.axis_rotated ? a : 0;
			o = i.axis_rotated ? e.width : n;
			c = i.axis_rotated ? n : e.height
		}
		;
		t.attr("class", e.classEvent.bind(e)).attr("x", r).attr("y", s).attr("width", o).attr("height", c)
	};
	e.generateEventRectsForSingleX = function (t) {
		var e = this,
			a = e.d3,
			n = e.config;
		t.append("rect").attr("class", e.classEvent.bind(e)).style("cursor", n.data_selection_enabled && n.data_selection_grouped ? "pointer" : null).on("mouseover", function (t) {
			var a = t.index;
			if (e.dragging || e.flowing) {
				return
			}
			;
			if (e.hasArcType()) {
				return
			}
			;
			if (n.point_focus_expand_enabled) {
				e.expandCircles(a, null, !0)
			}
			;
			e.expandBars(a, null, !0);
			e.main.selectAll("." + i.shape + "-" + a).each(function (t) {
				n.data_onmouseover.call(e.api, t)
			})
		}).on("mouseout", function (t) {
			var a = t.index;
			if (!e.config) {
				return
			}
			;
			if (e.hasArcType()) {
				return
			}
			;
			e.hideXGridFocus();
			e.hideTooltip();
			e.unexpandCircles();
			e.unexpandBars();
			e.main.selectAll("." + i.shape + "-" + a).each(function (t) {
				n.data_onmouseout.call(e.api, t)
			})
		}).on("mousemove", function (t) {
			var s, r = t.index,
				o = e.svg.select("." + i.eventRect + "-" + r);
			if (e.dragging || e.flowing) {
				return
			}
			;
			if (e.hasArcType()) {
				return
			}
			;
			if (e.isStepType(t) && e.config.line_step_type === "step-after" && a.mouse(this)[0] < e.x(e.getXValue(t.id, r))) {
				r -= 1
			}
			;
			s = e.filterTargetsToShow(e.data.targets).map(function (t) {
				return e.addName(e.getValueOnIndex(t.values, r))
			});
			if (n.tooltip_grouped) {
				e.showTooltip(s, this);
				e.showXGridFocus(s)
			}
			;
			if (n.tooltip_grouped && (!n.data_selection_enabled || n.data_selection_grouped)) {
				return
			}
			;
			e.main.selectAll("." + i.shape + "-" + r).each(function () {
				a.select(this).classed(i.EXPANDED, !0);
				if (n.data_selection_enabled) {
					o.style("cursor", n.data_selection_grouped ? "pointer" : null)
				}
				;
				if (!n.tooltip_grouped) {
					e.hideXGridFocus();
					e.hideTooltip();
					if (!n.data_selection_grouped) {
						e.unexpandCircles(r);
						e.unexpandBars(r)
					}
				}
			}).filter(function (t) {
				return e.isWithinShape(this, t)
			}).each(function (t) {
				if (n.data_selection_enabled && (n.data_selection_grouped || n.data_selection_isselectable(t))) {
					o.style("cursor", "pointer")
				}
				;
				if (!n.tooltip_grouped) {
					e.showTooltip([t], this);
					e.showXGridFocus([t]);
					if (n.point_focus_expand_enabled) {
						e.expandCircles(r, t.id, !0)
					}
					;
					e.expandBars(r, t.id, !0)
				}
			})
		}).on("click", function (t) {
			var r = t.index;
			if (e.hasArcType() || !e.toggleShape) {
				return
			}
			;
			if (e.cancelClick) {
				e.cancelClick = !1;
				return
			}
			;
			if (e.isStepType(t) && n.line_step_type === "step-after" && a.mouse(this)[0] < e.x(e.getXValue(t.id, r))) {
				r -= 1
			}
			;
			e.main.selectAll("." + i.shape + "-" + r).each(function (t) {
				if (n.data_selection_grouped || e.isWithinShape(this, t)) {
					e.toggleShape(this, t, r);
					e.config.data_onclick.call(e.api, t, this)
				}
			})
		}).call(n.data_selection_draggable && e.drag ? (a.behavior.drag().origin(Object).on("drag", function () {
			e.drag(a.mouse(this))
		}).on("dragstart", function () {
			e.dragstart(a.mouse(this))
		}).on("dragend", function () {
			e.dragend()
		})) : function () {
		})
	};
	e.generateEventRectsForMultipleXs = function (t) {
		var e = this,
			a = e.d3,
			n = e.config;

		function r() {
			e.svg.select("." + i.eventRect).style("cursor", null);
			e.hideXGridFocus();
			e.hideTooltip();
			e.unexpandCircles();
			e.unexpandBars()
		};
		t.append("rect").attr("x", 0).attr("y", 0).attr("width", e.width).attr("height", e.height).attr("class", i.eventRect).on("mouseout", function () {
			if (!e.config) {
				return
			}
			;
			if (e.hasArcType()) {
				return
			}
			;
			r()
		}).on("mousemove", function () {
			var s = e.filterTargetsToShow(e.data.targets),
				o, t, c, u;
			if (e.dragging) {
				return
			}
			;
			if (e.hasArcType(s)) {
				return
			}
			;
			o = a.mouse(this);
			t = e.findClosestFromTargets(s, o);
			if (e.mouseover && (!t || t.id !== e.mouseover.id)) {
				n.data_onmouseout.call(e.api, e.mouseover);
				e.mouseover = undefined
			}
			;
			if (!t) {
				r();
				return
			}
			;
			if (e.isScatterType(t) || !n.tooltip_grouped) {
				c = [t]
			} else {
				c = e.filterByX(s, t.x)
			}
			;
			u = c.map(function (t) {
				return e.addName(t)
			});
			e.showTooltip(u, this);
			if (n.point_focus_expand_enabled) {
				e.expandCircles(t.index, t.id, !0)
			}
			;
			e.expandBars(t.index, t.id, !0);
			e.showXGridFocus(u);
			if (e.isBarType(t.id) || e.dist(t, o) < n.point_sensitivity) {
				e.svg.select("." + i.eventRect).style("cursor", "pointer");
				if (!e.mouseover) {
					n.data_onmouseover.call(e.api, t);
					e.mouseover = t
				}
			}
		}).on("click", function () {
			var s = e.filterTargetsToShow(e.data.targets),
				r, t;
			if (e.hasArcType(s)) {
				return
			}
			;
			r = a.mouse(this);
			t = e.findClosestFromTargets(s, r);
			if (!t) {
				return
			}
			;
			if (e.isBarType(t.id) || e.dist(t, r) < n.point_sensitivity) {
				e.main.selectAll("." + i.shapes + e.getTargetSelectorSuffix(t.id)).selectAll("." + i.shape + "-" + t.index).each(function () {
					if (n.data_selection_grouped || e.isWithinShape(this, t)) {
						e.toggleShape(this, t, t.index);
						e.config.data_onclick.call(e.api, t, this)
					}
				})
			}
		}).call(n.data_selection_draggable && e.drag ? (a.behavior.drag().origin(Object).on("drag", function () {
			e.drag(a.mouse(this))
		}).on("dragstart", function () {
			e.dragstart(a.mouse(this))
		}).on("dragend", function () {
			e.dragend()
		})) : function () {
		})
	};
	e.dispatchEvent = function (e, n, a) {
		var r = this,
			d = "." + i.eventRect + (!r.isMultipleX() ? "-" + n : ""),
			s = r.main.select(d).node(),
			o = s.getBoundingClientRect(),
			c = o.left + (a ? a[0] : 0),
			u = o.top + (a ? a[1] : 0),
			l = document.createEvent("MouseEvents");
		l.initMouseEvent(e, !0, !0, t, 0, c, u, c, u, !1, !1, !1, !1, 0, null);
		s.dispatchEvent(l)
	};
	e.getCurrentWidth = function () {
		var t = this,
			e = t.config;
		return e.size_width ? e.size_width : t.getParentWidth()
	};
	e.getCurrentHeight = function () {
		var t = this,
			e = t.config,
			i = e.size_height ? e.size_height : t.getParentHeight();
		return i > 0 ? i : 320 / (t.hasType("gauge") && !e.gauge_fullCircle ? 2 : 1)
	};
	e.getCurrentPaddingTop = function () {
		var t = this,
			e = t.config,
			i = r(e.padding_top) ? e.padding_top : 0;
		if (t.title && t.title.node()) {
			i += t.getTitlePadding()
		}
		;
		return i
	};
	e.getCurrentPaddingBottom = function () {
		var t = this.config;
		return r(t.padding_bottom) ? t.padding_bottom : 0
	};
	e.getCurrentPaddingLeft = function (t) {
		var i = this,
			e = i.config;
		if (r(e.padding_left)) {
			return e.padding_left
		} else if (e.axis_rotated) {
			return !e.axis_x_show ? 1 : Math.max(x(i.getAxisWidthByAxisId("x", t)), 40)
		} else if (!e.axis_y_show || e.axis_y_inner) {
			return i.axis.getYAxisLabelPosition().isOuter ? 30 : 1
		} else {
			return x(i.getAxisWidthByAxisId("y", t))
		}
	};
	e.getCurrentPaddingRight = function () {
		var t = this,
			e = t.config,
			n = 10,
			i = t.isLegendRight ? t.getLegendWidth() + 20 : 0;
		if (r(e.padding_right)) {
			return e.padding_right + 1
		} else if (e.axis_rotated) {
			return n + i
		} else if (!e.axis_y2_show || e.axis_y2_inner) {
			return 2 + i + (t.axis.getY2AxisLabelPosition().isOuter ? 20 : 0)
		} else {
			return x(t.getAxisWidthByAxisId("y2")) + i
		}
	};
	e.getParentRectValue = function (t) {
		var e = this.selectChart.node(),
			i;
		while (e && e.tagName !== "BODY") {
			try {
				i = e.getBoundingClientRect()[t]
			} catch (n) {
				if (t === "width") {
					i = e.offsetWidth
				}
			}
			;
			if (i) {
				break
			}
			;
			e = e.parentNode
		}
		;
		return i
	};
	e.getParentWidth = function () {
		return this.getParentRectValue("width")
	};
	e.getParentHeight = function () {
		var t = this.selectChart.style("height");
		return t.indexOf("px") > 0 ? +t.replace("px", "") : 0
	};
	e.getSvgLeft = function (t) {
		var e = this,
			n = e.config,
			s = n.axis_rotated || (!n.axis_rotated && !n.axis_y_inner),
			o = n.axis_rotated ? i.axisX : i.axisY,
			a = e.main.select("." + o).node(),
			c = a && s ? a.getBoundingClientRect() : {
				right: 0
			},
			u = e.selectChart.node().getBoundingClientRect(),
			l = e.hasArcType(),
			r = c.right - u.left - (l ? 0 : e.getCurrentPaddingLeft(t));
		return r > 0 ? r : 0
	};
	e.getAxisWidthByAxisId = function (t, e) {
		var i = this,
			n = i.axis.getLabelPositionById(t);
		return i.axis.getMaxTickWidth(t, e) + (n.isInner ? 20 : 40)
	};
	e.getHorizontalAxisHeight = function (t) {
		var i = this,
			e = i.config,
			n = 30;
		if (t === "x" && !e.axis_x_show) {
			return 8
		}
		;
		if (t === "x" && e.axis_x_height) {
			return e.axis_x_height
		}
		;
		if (t === "y" && !e.axis_y_show) {
			return e.legend_show && !i.isLegendRight && !i.isLegendInset ? 10 : 1
		}
		;
		if (t === "y2" && !e.axis_y2_show) {
			return i.rotated_padding_top
		}
		;
		if (t === "x" && !e.axis_rotated && e.axis_x_tick_rotate) {
			n = 30 + i.axis.getMaxTickWidth(t) * Math.cos(Math.PI * (90 - e.axis_x_tick_rotate) / 180)
		}
		;
		if (t === "y" && e.axis_rotated && e.axis_y_tick_rotate) {
			n = 30 + i.axis.getMaxTickWidth(t) * Math.cos(Math.PI * (90 - e.axis_y_tick_rotate) / 180)
		}
		;
		return n + (i.axis.getLabelPositionById(t).isInner ? 0 : 10) + (t === "y2" ? -10 : 0)
	};
	e.getEventRectWidth = function () {
		return Math.max(0, this.xAxis.tickInterval())
	};
	e.getShapeIndices = function (t) {
		var r = this,
			n = r.config,
			e = {},
			s = 0,
			i, a;
		r.filterTargetsToShow(r.data.targets.filter(t, r)).forEach(function (t) {
			for (i = 0; i < n.data_groups.length; i++) {
				if (n.data_groups[i].indexOf(t.id) < 0) {
					continue
				}
				;
				for (a = 0; a < n.data_groups[i].length; a++) {
					if (n.data_groups[i][a] in e) {
						e[t.id] = e[n.data_groups[i][a]];
						break
					}
				}
			}
			;
			if (l(e[t.id])) {
				e[t.id] = s++
			}
		});
		e.__max__ = s - 1;
		return e
	};
	e.getShapeX = function (t, e, i, n) {
		var a = this,
			r = n ? a.subX : a.x;
		return function (n) {
			var a = n.id in i ? i[n.id] : 0;
			return n.x || n.x === 0 ? r(n.x) - t * (e / 2 - a) : 0
		}
	};
	e.getShapeY = function (t) {
		var e = this;
		return function (i) {
			var n = t ? e.getSubYScale(i.id) : e.getYScale(i.id);
			return n(i.value)
		}
	};
	e.getShapeOffset = function (t, e, i) {
		var n = this,
			a = n.orderTargets(n.filterTargetsToShow(n.data.targets.filter(t, n))),
			r = a.map(function (t) {
				return t.id
			});
		return function (t, s) {
			var o = i ? n.getSubYScale(t.id) : n.getYScale(t.id),
				c = o(0),
				u = c;
			a.forEach(function (i) {
				var a = n.isStepType(t) ? n.convertValuesToStep(i.values) : i.values;
				if (i.id === t.id || e[i.id] !== e[t.id]) {
					return
				}
				;
				if (r.indexOf(i.id) < r.indexOf(t.id)) {
					if (typeof a[s] === "undefined" || +a[s].x !== +t.x) {
						s = -1;
						a.forEach(function (e, i) {
							if (e.x === t.x) {
								s = i
							}
						})
					}
					;
					if (s in a && a[s].value * t.value >= 0) {
						u += o(a[s].value) - c
					}
				}
			});
			return u
		}
	};
	e.isWithinShape = function (t, e) {
		var n = this,
			r = n.d3.select(t),
			a;
		if (!n.isTargetToShow(e.id)) {
			a = !1
		} else if (t.nodeName === "circle") {
			a = n.isStepType(e) ? n.isWithinStep(t, n.getYScale(e.id)(e.value)) : n.isWithinCircle(t, n.pointSelectR(e) * 1.5)
		} else if (t.nodeName === "path") {
			a = r.classed(i.bar) ? n.isWithinBar(t) : !0
		}
		;
		return a
	};
	e.getInterpolate = function (t) {
		var e = this,
			i = e.isInterpolationType(e.config.spline_interpolation_type) ? e.config.spline_interpolation_type : "cardinal";
		return e.isSplineType(t) ? i : e.isStepType(t) ? e.config.line_step_type : "linear"
	};
	e.initLine = function () {
		var t = this;
		t.main.select("." + i.chart).append("g").attr("class", i.chartLines)
	};
	e.updateTargetsForLine = function (t) {
		var e = this,
			s = e.config,
			a, n, r = e.classChartLine.bind(e),
			o = e.classLines.bind(e),
			c = e.classAreas.bind(e),
			u = e.classCircles.bind(e),
			l = e.classFocus.bind(e);
		a = e.main.select("." + i.chartLines).selectAll("." + i.chartLine).data(t).attr("class", function (t) {
			return r(t) + l(t)
		});
		n = a.enter().append("g").attr("class", r).style("opacity", 0).style("pointer-events", "none");
		n.append("g").attr("class", o);
		n.append("g").attr("class", c);
		n.append("g").attr("class", function (t) {
			return e.generateClass(i.selectedCircles, t.id)
		});
		n.append("g").attr("class", u).style("cursor", function (t) {
			return s.data_selection_isselectable(t) ? "pointer" : null
		});
		t.forEach(function (t) {
			e.main.selectAll("." + i.selectedCircles + e.getTargetSelectorSuffix(t.id)).selectAll("." + i.selectedCircle).each(function (e) {
				e.value = t.values[e.index].value
			})
		})
	};
	e.updateLine = function (t) {
		var e = this;
		e.mainLine = e.main.selectAll("." + i.lines).selectAll("." + i.line).data(e.lineData.bind(e));
		e.mainLine.enter().append("path").attr("class", e.classLine.bind(e)).style("stroke", e.color);
		e.mainLine.style("opacity", e.initialOpacity.bind(e)).style("shape-rendering", function (t) {
			return e.isStepType(t) ? "crispEdges" : ""
		}).attr("transform", null);
		e.mainLine.exit().transition().duration(t).style("opacity", 0).remove()
	};
	e.redrawLine = function (t, e) {
		return [(e ? this.mainLine.transition(Math.random().toString()) : this.mainLine).attr("d", t).style("stroke", this.color).style("opacity", 1)]
	};
	e.generateDrawLine = function (t, e) {
		var i = this,
			n = i.config,
			a = i.d3.svg.line(),
			c = i.generateGetLinePoints(t, e),
			r = e ? i.getSubYScale : i.getYScale,
			s = function (t) {
				return (e ? i.subxx : i.xx).call(i, t)
			},
			o = function (t, e) {
				return n.data_groups.length > 0 ? c(t, e)[0][1] : r.call(i, t.id)(t.value)
			};
		a = n.axis_rotated ? a.x(o).y(s) : a.x(s).y(o);
		if (!n.line_connectNull) {
			a = a.defined(function (t) {
				return t.value != null
			})
		}
		;
		return function (t) {
			var s = n.line_connectNull ? i.filterRemoveNull(t.values) : t.values,
				l = e ? i.x : i.subX,
				d = r.call(i, t.id),
				c = 0,
				u = 0,
				o;
			if (i.isLineType(t)) {
				if (n.data_regions[t.id]) {
					o = i.lineWithRegions(s, l, d, n.data_regions[t.id])
				} else {
					if (i.isStepType(t)) {
						s = i.convertValuesToStep(s)
					}
					;
					o = a.interpolate(i.getInterpolate(t))(s)
				}
			} else {
				if (s[0]) {
					c = l(s[0].x);
					u = d(s[0].value)
				}
				;
				o = n.axis_rotated ? "M " + u + " " + c : "M " + c + " " + u
			}
			;
			return o ? o : "M 0 0"
		}
	};
	e.generateGetLinePoints = function (t, e) {
		var i = this,
			n = i.config,
			a = t.__max__ + 1,
			r = i.getShapeX(0, a, t, !!e),
			s = i.getShapeY(!!e),
			o = i.getShapeOffset(i.isLineType, t, !!e),
			c = e ? i.getSubYScale : i.getYScale;
		return function (t, e) {
			var a = c.call(i, t.id)(0),
				l = o(t, e) || a,
				d = r(t),
				u = s(t);
			if (n.axis_rotated) {
				if ((0 < t.value && u < a) || (t.value < 0 && a < u)) {
					u = a
				}
			}
			;
			return [
				[d, u - (a - l)],
				[d, u - (a - l)],
				[d, u - (a - l)],
				[d, u - (a - l)]
			]
		}
	};
	e.lineWithRegions = function (t, e, i, n) {
		var r = this,
			d = r.config,
			P = -1,
			a, h, f = "M",
			p, u, s, x, y, m, g, S, v = r.isCategorized() ? 0.5 : 0,
			b, A, c = [];

		function C(t, e) {
			var i;
			for (i = 0; i < e.length; i++) {
				if (e[i].start < t && t <= e[i].end) {
					return !0
				}
			}
			;
			return !1
		};
		if (o(n)) {
			for (a = 0; a < n.length; a++) {
				c[a] = {};
				if (l(n[a].start)) {
					c[a].start = t[0].x
				} else {
					c[a].start = r.isTimeSeries() ? r.parseDate(n[a].start) : n[a].start
				}
				;
				if (l(n[a].end)) {
					c[a].end = t[t.length - 1].x
				} else {
					c[a].end = r.isTimeSeries() ? r.parseDate(n[a].end) : n[a].end
				}
			}
		}
		;
		b = d.axis_rotated ? function (t) {
			return i(t.value)
		} : function (t) {
			return e(t.x)
		};
		A = d.axis_rotated ? function (t) {
			return e(t.x)
		} : function (t) {
			return i(t.value)
		};

		function T(t) {
			return "M" + t[0][0] + " " + t[0][1] + " " + t[1][0] + " " + t[1][1]
		};
		if (r.isTimeSeries()) {
			p = function (t, n, a, r) {
				var c = t.x.getTime(),
					u = n.x - t.x,
					l = new Date(c + u * a),
					h = new Date(c + u * (a + r)),
					o;
				if (d.axis_rotated) {
					o = [
						[i(s(a)), e(l)],
						[i(s(a + r)), e(h)]
					]
				} else {
					o = [
						[e(l), i(s(a))],
						[e(h), i(s(a + r))]
					]
				}
				;
				return T(o)
			}
		} else {
			p = function (t, n, a, r) {
				var o;
				if (d.axis_rotated) {
					o = [
						[i(s(a), !0), e(u(a))],
						[i(s(a + r), !0), e(u(a + r))]
					]
				} else {
					o = [
						[e(u(a), !0), i(s(a))],
						[e(u(a + r), !0), i(s(a + r))]
					]
				}
				;
				return T(o)
			}
		}
		;
		for (a = 0; a < t.length; a++) {
			if (l(c) || !C(t[a].x, c)) {
				f += " " + b(t[a]) + " " + A(t[a])
			} else {
				u = r.getScale(t[a - 1].x + v, t[a].x + v, r.isTimeSeries());
				s = r.getScale(t[a - 1].value, t[a].value);
				x = e(t[a].x) - e(t[a - 1].x);
				y = i(t[a].value) - i(t[a - 1].value);
				m = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
				g = 2 / m;
				S = g * 2;
				for (h = g; h <= 1; h += S) {
					f += p(t[a - 1], t[a], h, g)
				}
			}
			;
			P = t[a].x
		}
		;
		return f
	};
	e.updateArea = function (t) {
		var e = this,
			n = e.d3;
		e.mainArea = e.main.selectAll("." + i.areas).selectAll("." + i.area).data(e.lineData.bind(e));
		e.mainArea.enter().append("path").attr("class", e.classArea.bind(e)).style("fill", e.color).style("opacity", function () {
			e.orgAreaOpacity = +n.select(this).style("opacity");
			return 0
		});
		e.mainArea.style("opacity", e.orgAreaOpacity);
		e.mainArea.exit().transition().duration(t).style("opacity", 0).remove()
	};
	e.redrawArea = function (t, e) {
		return [(e ? this.mainArea.transition(Math.random().toString()) : this.mainArea).attr("d", t).style("fill", this.color).style("opacity", this.orgAreaOpacity)]
	};
	e.generateDrawArea = function (t, e) {
		var i = this,
			n = i.config,
			a = i.d3.svg.area(),
			r = i.generateGetAreaPoints(t, e),
			s = e ? i.getSubYScale : i.getYScale,
			o = function (t) {
				return (e ? i.subxx : i.xx).call(i, t)
			},
			c = function (t, e) {
				return n.data_groups.length > 0 ? r(t, e)[0][1] : s.call(i, t.id)(i.getAreaBaseValue(t.id))
			},
			u = function (t, e) {
				return n.data_groups.length > 0 ? r(t, e)[1][1] : s.call(i, t.id)(t.value)
			};
		a = n.axis_rotated ? a.x0(c).x1(u).y(o) : a.x(o).y0(n.area_above ? 0 : c).y1(u);
		if (!n.line_connectNull) {
			a = a.defined(function (t) {
				return t.value !== null
			})
		}
		;
		return function (t) {
			var e = n.line_connectNull ? i.filterRemoveNull(t.values) : t.values,
				s = 0,
				o = 0,
				r;
			if (i.isAreaType(t)) {
				if (i.isStepType(t)) {
					e = i.convertValuesToStep(e)
				}
				;
				r = a.interpolate(i.getInterpolate(t))(e)
			} else {
				if (e[0]) {
					s = i.x(e[0].x);
					o = i.getYScale(t.id)(e[0].value)
				}
				;
				r = n.axis_rotated ? "M " + o + " " + s : "M " + s + " " + o
			}
			;
			return r ? r : "M 0 0"
		}
	};
	e.getAreaBaseValue = function () {
		return 0
	};
	e.generateGetAreaPoints = function (t, e) {
		var i = this,
			n = i.config,
			a = t.__max__ + 1,
			r = i.getShapeX(0, a, t, !!e),
			s = i.getShapeY(!!e),
			o = i.getShapeOffset(i.isAreaType, t, !!e),
			c = e ? i.getSubYScale : i.getYScale;
		return function (t, e) {
			var a = c.call(i, t.id)(0),
				l = o(t, e) || a,
				d = r(t),
				u = s(t);
			if (n.axis_rotated) {
				if ((0 < t.value && u < a) || (t.value < 0 && a < u)) {
					u = a
				}
			}
			;
			return [
				[d, l],
				[d, u - (a - l)],
				[d, u - (a - l)],
				[d, l]
			]
		}
	};
	e.updateCircle = function () {
		var t = this;
		t.mainCircle = t.main.selectAll("." + i.circles).selectAll("." + i.circle).data(t.lineOrScatterData.bind(t));
		t.mainCircle.enter().append("circle").attr("class", t.classCircle.bind(t)).attr("r", t.pointR.bind(t)).style("fill", t.color);
		t.mainCircle.style("opacity", t.initialOpacityForCircle.bind(t));
		t.mainCircle.exit().remove()
	};
	e.redrawCircle = function (t, e, n) {
		var a = this.main.selectAll("." + i.selectedCircle);
		return [(n ? this.mainCircle.transition(Math.random().toString()) : this.mainCircle).style("opacity", this.opacityForCircle.bind(this)).style("fill", this.color).attr("cx", t).attr("cy", e), (n ? a.transition(Math.random().toString()) : a).attr("cx", t).attr("cy", e)]
	};
	e.circleX = function (t) {
		return t.x || t.x === 0 ? this.x(t.x) : null
	};
	e.updateCircleY = function () {
		var t = this,
			e, i;
		if (t.config.data_groups.length > 0) {
			e = t.getShapeIndices(t.isLineType), i = t.generateGetLinePoints(e);
			t.circleY = function (t, e) {
				return i(t, e)[0][1]
			}
		} else {
			t.circleY = function (e) {
				return t.getYScale(e.id)(e.value)
			}
		}
	};
	e.getCircles = function (t, e) {
		var n = this;
		return (e ? n.main.selectAll("." + i.circles + n.getTargetSelectorSuffix(e)) : n.main).selectAll("." + i.circle + (r(t) ? "-" + t : ""))
	};
	e.expandCircles = function (t, e, n) {
		var a = this,
			r = a.pointExpandedR.bind(a);
		if (n) {
			a.unexpandCircles()
		}
		;
		a.getCircles(t, e).classed(i.EXPANDED, !0).attr("r", r)
	};
	e.unexpandCircles = function (t) {
		var e = this,
			n = e.pointR.bind(e);
		e.getCircles(t).filter(function () {
			return e.d3.select(this).classed(i.EXPANDED)
		}).classed(i.EXPANDED, !1).attr("r", n)
	};
	e.pointR = function (t) {
		var i = this,
			e = i.config;
		return i.isStepType(t) ? 0 : (d(e.point_r) ? e.point_r(t) : e.point_r)
	};
	e.pointExpandedR = function (t) {
		var e = this,
			i = e.config;
		return i.point_focus_expand_enabled ? (i.point_focus_expand_r ? i.point_focus_expand_r : e.pointR(t) * 1.75) : e.pointR(t)
	};
	e.pointSelectR = function (t) {
		var i = this,
			e = i.config;
		return d(e.point_select_r) ? e.point_select_r(t) : ((e.point_select_r) ? e.point_select_r : i.pointR(t) * 4)
	};
	e.isWithinCircle = function (t, e) {
		var i = this.d3,
			n = i.mouse(t),
			a = i.select(t),
			r = +a.attr("cx"),
			s = +a.attr("cy");
		return Math.sqrt(Math.pow(r - n[0], 2) + Math.pow(s - n[1], 2)) < e
	};
	e.isWithinStep = function (t, e) {
		return Math.abs(e - this.d3.mouse(t)[1]) < 30
	};
	e.initBar = function () {
		var t = this;
		t.main.select("." + i.chart).append("g").attr("class", i.chartBars)
	};
	e.updateTargetsForBar = function (t) {
		var e = this,
			s = e.config,
			n, a, r = e.classChartBar.bind(e),
			o = e.classBars.bind(e),
			c = e.classFocus.bind(e);
		n = e.main.select("." + i.chartBars).selectAll("." + i.chartBar).data(t).attr("class", function (t) {
			return r(t) + c(t)
		});
		a = n.enter().append("g").attr("class", r).style("opacity", 0).style("pointer-events", "none");
		a.append("g").attr("class", o).style("cursor", function (t) {
			return s.data_selection_isselectable(t) ? "pointer" : null
		})
	};
	e.updateBar = function (t) {
		var e = this,
			a = e.barData.bind(e),
			r = e.classBar.bind(e),
			s = e.initialOpacity.bind(e),
			n = function (t) {
				return e.color(t.id)
			};
		e.mainBar = e.main.selectAll("." + i.bars).selectAll("." + i.bar).data(a);
		e.mainBar.enter().append("path").attr("class", r).style("stroke", n).style("fill", n);
		e.mainBar.style("opacity", s);
		e.mainBar.exit().transition().duration(t).style("opacity", 0).remove()
	};
	e.redrawBar = function (t, e) {
		return [(e ? this.mainBar.transition(Math.random().toString()) : this.mainBar).attr("d", t).style("fill", this.color).style("opacity", 1)]
	};
	e.getBarW = function (t, e) {
		var a = this,
			i = a.config,
			n = typeof i.bar_width === "number" ? i.bar_width : e ? (t.tickInterval() * i.bar_width_ratio) / e : 0;
		return i.bar_width_max && n > i.bar_width_max ? i.bar_width_max : n
	};
	e.getBars = function (t, e) {
		var n = this;
		return (e ? n.main.selectAll("." + i.bars + n.getTargetSelectorSuffix(e)) : n.main).selectAll("." + i.bar + (r(t) ? "-" + t : ""))
	};
	e.expandBars = function (t, e, n) {
		var a = this;
		if (n) {
			a.unexpandBars()
		}
		;
		a.getBars(t, e).classed(i.EXPANDED, !0)
	};
	e.unexpandBars = function (t) {
		var e = this;
		e.getBars(t).classed(i.EXPANDED, !1)
	};
	e.generateDrawBar = function (t, e) {
		var i = this,
			n = i.config,
			a = i.generateGetBarPoints(t, e);
		return function (t, e) {
			var i = a(t, e),
				r = n.axis_rotated ? 1 : 0,
				s = n.axis_rotated ? 0 : 1,
				o = "M " + i[0][r] + "," + i[0][s] + " L" + i[1][r] + "," + i[1][s] + " L" + i[2][r] + "," + i[2][s] + " L" + i[3][r] + "," + i[3][s] + " z";
			return o
		}
	};
	e.generateGetBarPoints = function (t, e) {
		var i = this,
			r = e ? i.subXAxis : i.xAxis,
			a = t.__max__ + 1,
			n = i.getBarW(r, a),
			s = i.getShapeX(n, a, t, !!e),
			o = i.getShapeY(!!e),
			c = i.getShapeOffset(i.isBarType, t, !!e),
			u = e ? i.getSubYScale : i.getYScale;
		return function (t, e) {
			var a = u.call(i, t.id)(0),
				l = c(t, e) || a,
				d = s(t),
				r = o(t);
			if (i.config.axis_rotated) {
				if ((0 < t.value && r < a) || (t.value < 0 && a < r)) {
					r = a
				}
			}
			;
			return [
				[d, l],
				[d, r - (a - l)],
				[d + n, r - (a - l)],
				[d + n, l]
			]
		}
	};
	e.isWithinBar = function (t) {
		var e = this.d3.mouse(t),
			n = t.getBoundingClientRect(),
			a = t.pathSegList.getItem(0),
			r = t.pathSegList.getItem(1),
			s = Math.min(a.x, r.x),
			o = Math.min(a.y, r.y),
			c = n.width,
			u = n.height,
			i = 2,
			l = s - i,
			d = s + c + i,
			h = o + u + i,
			g = o - i;
		return l < e[0] && e[0] < d && g < e[1] && e[1] < h
	};
	e.initText = function () {
		var t = this;
		t.main.select("." + i.chart).append("g").attr("class", i.chartTexts);
		t.mainText = t.d3.selectAll([])
	};
	e.updateTargetsForText = function (t) {
		var e = this,
			n, a, r = e.classChartText.bind(e),
			s = e.classTexts.bind(e),
			o = e.classFocus.bind(e);
		n = e.main.select("." + i.chartTexts).selectAll("." + i.chartText).data(t).attr("class", function (t) {
			return r(t) + o(t)
		});
		a = n.enter().append("g").attr("class", r).style("opacity", 0).style("pointer-events", "none");
		a.append("g").attr("class", s)
	};
	e.updateText = function (t) {
		var e = this,
			n = e.config,
			a = e.barOrLineData.bind(e),
			r = e.classText.bind(e);
		e.mainText = e.main.selectAll("." + i.texts).selectAll("." + i.text).data(a);
		e.mainText.enter().append("text").attr("class", r).attr("text-anchor", function (t) {
			return n.axis_rotated ? (t.value < 0 ? "end" : "start") : "middle"
		}).style("stroke", "none").style("fill", function (t) {
			return e.color(t)
		}).style("fill-opacity", 0);
		e.mainText.text(function (t, i, n) {
			return e.dataLabelFormat(t.id)(t.value, t.id, i, n)
		});
		e.mainText.exit().transition().duration(t).style("fill-opacity", 0).remove()
	};
	e.redrawText = function (t, e, i, n) {
		return [(n ? this.mainText.transition() : this.mainText).attr("x", t).attr("y", e).style("fill", this.color).style("fill-opacity", i ? 0 : this.opacityForText.bind(this))]
	};
	e.getTextRect = function (t, e, i) {
		var n = this.d3.select("body").append("div").classed("c3", !0),
			r = n.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", 0).style("left", 0),
			s = this.d3.select(i).style("font"),
			a;
		r.selectAll(".dummy").data([t]).enter().append("text").classed(e ? e : "", !0).style("font", s).text(t).each(function () {
			a = this.getBoundingClientRect()
		});
		n.remove();
		return a
	};
	e.generateXYForText = function (t, e, i, n) {
		var a = this,
			r = a.generateGetAreaPoints(t, !1),
			s = a.generateGetBarPoints(e, !1),
			o = a.generateGetLinePoints(i, !1),
			c = n ? a.getXForText : a.getYForText;
		return function (t, e) {
			var i = a.isAreaType(t) ? r : a.isBarType(t) ? s : o;
			return c.call(a, i(t, e), t, this)
		}
	};
	e.getXForText = function (t, e, i) {
		var a = this,
			s = i.getBoundingClientRect(),
			n, r;
		if (a.config.axis_rotated) {
			r = a.isBarType(e) ? 4 : 6;
			n = t[2][1] + r * (e.value < 0 ? -1 : 1)
		} else {
			n = a.hasType("bar") ? (t[2][0] + t[0][0]) / 2 : t[0][0]
		}
		;
		if (e.value === null) {
			if (n > a.width) {
				n = a.width - s.width
			} else if (n < 0) {
				n = 4
			}
		}
		;
		return n
	};
	e.getYForText = function (t, e, i) {
		var a = this,
			r = i.getBoundingClientRect(),
			n;
		if (a.config.axis_rotated) {
			n = (t[0][0] + t[2][0] + r.height * 0.6) / 2
		} else {
			n = t[2][1];
			if (e.value < 0 || (e.value === 0 && !a.hasPositiveValue)) {
				n += r.height;
				if (a.isBarType(e) && a.isSafari()) {
					n -= 3
				} else if (!a.isBarType(e) && a.isChrome()) {
					n += 3
				}
			} else {
				n += a.isBarType(e) ? -3 : -6
			}
		}
		;
		if (e.value === null && !a.config.axis_rotated) {
			if (n < r.height) {
				n = r.height
			} else if (n > this.height) {
				n = this.height - 4
			}
		}
		;
		return n
	};
	e.setTargetType = function (t, e) {
		var i = this,
			n = i.config;
		i.mapToTargetIds(t).forEach(function (t) {
			i.withoutFadeIn[t] = (e === n.data_types[t]);
			n.data_types[t] = e
		});
		if (!t) {
			n.data_type = e
		}
	};
	e.hasType = function (t, e) {
		var a = this,
			i = a.config.data_types,
			n = !1;
		e = e || a.data.targets;
		if (e && e.length) {
			e.forEach(function (e) {
				var a = i[e.id];
				if ((a && a.indexOf(t) >= 0) || (!a && t === "line")) {
					n = !0
				}
			})
		} else if (Object.keys(i).length) {
			Object.keys(i).forEach(function (e) {
				if (i[e] === t) {
					n = !0
				}
			})
		} else {
			n = a.config.data_type === t
		}
		;
		return n
	};
	e.hasArcType = function (t) {
		return this.hasType("pie", t) || this.hasType("donut", t) || this.hasType("gauge", t)
	};
	e.isLineType = function (t) {
		var e = this.config,
			i = c(t) ? t : t.id;
		return !e.data_types[i] || ["line", "spline", "area", "area-spline", "step", "area-step"].indexOf(e.data_types[i]) >= 0
	};
	e.isStepType = function (t) {
		var e = c(t) ? t : t.id;
		return ["step", "area-step"].indexOf(this.config.data_types[e]) >= 0
	};
	e.isSplineType = function (t) {
		var e = c(t) ? t : t.id;
		return ["spline", "area-spline"].indexOf(this.config.data_types[e]) >= 0
	};
	e.isAreaType = function (t) {
		var e = c(t) ? t : t.id;
		return ["area", "area-spline", "area-step"].indexOf(this.config.data_types[e]) >= 0
	};
	e.isBarType = function (t) {
		var e = c(t) ? t : t.id;
		return this.config.data_types[e] === "bar"
	};
	e.isScatterType = function (t) {
		var e = c(t) ? t : t.id;
		return this.config.data_types[e] === "scatter"
	};
	e.isPieType = function (t) {
		var e = c(t) ? t : t.id;
		return this.config.data_types[e] === "pie"
	};
	e.isGaugeType = function (t) {
		var e = c(t) ? t : t.id;
		return this.config.data_types[e] === "gauge"
	};
	e.isDonutType = function (t) {
		var e = c(t) ? t : t.id;
		return this.config.data_types[e] === "donut"
	};
	e.isArcType = function (t) {
		return this.isPieType(t) || this.isDonutType(t) || this.isGaugeType(t)
	};
	e.lineData = function (t) {
		return this.isLineType(t) ? [t] : []
	};
	e.arcData = function (t) {
		return this.isArcType(t.data) ? [t] : []
	};
	e.barData = function (t) {
		return this.isBarType(t) ? t.values : []
	};
	e.lineOrScatterData = function (t) {
		return this.isLineType(t) || this.isScatterType(t) ? t.values : []
	};
	e.barOrLineData = function (t) {
		return this.isBarType(t) || this.isLineType(t) ? t.values : []
	};
	e.isInterpolationType = function (t) {
		return ["linear", "linear-closed", "basis", "basis-open", "basis-closed", "bundle", "cardinal", "cardinal-open", "cardinal-closed", "monotone"].indexOf(t) >= 0
	};
	e.initGrid = function () {
		var t = this,
			e = t.config,
			n = t.d3;
		t.grid = t.main.append("g").attr("clip-path", t.clipPathForGrid).attr("class", i.grid);
		if (e.grid_x_show) {
			t.grid.append("g").attr("class", i.xgrids)
		}
		;
		if (e.grid_y_show) {
			t.grid.append("g").attr("class", i.ygrids)
		}
		;
		if (e.grid_focus_show) {
			t.grid.append("g").attr("class", i.xgridFocus).append("line").attr("class", i.xgridFocus)
		}
		;
		t.xgrid = n.selectAll([]);
		if (!e.grid_lines_front) {
			t.initGridLines()
		}
	};
	e.initGridLines = function () {
		var t = this,
			e = t.d3;
		t.gridLines = t.main.append("g").attr("clip-path", t.clipPathForGrid).attr("class", i.grid + " " + i.gridLines);
		t.gridLines.append("g").attr("class", i.xgridLines);
		t.gridLines.append("g").attr("class", i.ygridLines);
		t.xgridLines = e.selectAll([])
	};
	e.updateXGrid = function (t) {
		var e = this,
			n = e.config,
			r = e.d3,
			s = e.generateGridData(n.grid_x_type, e.x),
			a = e.isCategorized() ? e.xAxis.tickOffset() : 0;
		e.xgridAttr = n.axis_rotated ? {
			"x1": 0,
			"x2": e.width,
			"y1": function (t) {
				return e.x(t) - a
			},
			"y2": function (t) {
				return e.x(t) - a
			}
		} : {
			"x1": function (t) {
				return e.x(t) + a
			},
			"x2": function (t) {
				return e.x(t) + a
			},
			"y1": 0,
			"y2": e.height
		};
		e.xgrid = e.main.select("." + i.xgrids).selectAll("." + i.xgrid).data(s);
		e.xgrid.enter().append("line").attr("class", i.xgrid);
		if (!t) {
			e.xgrid.attr(e.xgridAttr).style("opacity", function () {
				return +r.select(this).attr(n.axis_rotated ? "y1" : "x1") === (n.axis_rotated ? e.height : 0) ? 0 : 1
			})
		}
		;
		e.xgrid.exit().remove()
	};
	e.updateYGrid = function () {
		var t = this,
			e = t.config,
			n = t.yAxis.tickValues() || t.y.ticks(e.grid_y_ticks);
		t.ygrid = t.main.select("." + i.ygrids).selectAll("." + i.ygrid).data(n);
		t.ygrid.enter().append("line").attr("class", i.ygrid);
		t.ygrid.attr("x1", e.axis_rotated ? t.y : 0).attr("x2", e.axis_rotated ? t.y : t.width).attr("y1", e.axis_rotated ? 0 : t.y).attr("y2", e.axis_rotated ? t.height : t.y);
		t.ygrid.exit().remove();
		t.smoothLines(t.ygrid, "grid")
	};
	e.gridTextAnchor = function (t) {
		return t.position ? t.position : "end"
	};
	e.gridTextDx = function (t) {
		return t.position === "start" ? 4 : t.position === "middle" ? 0 : -4
	};
	e.xGridTextX = function (t) {
		return t.position === "start" ? -this.height : t.position === "middle" ? -this.height / 2 : 0
	};
	e.yGridTextX = function (t) {
		return t.position === "start" ? 0 : t.position === "middle" ? this.width / 2 : this.width
	};
	e.updateGrid = function (t) {
		var e = this,
			r = e.main,
			n = e.config,
			s, o, a;
		e.grid.style("visibility", e.hasArcType() ? "hidden" : "visible");
		r.select("line." + i.xgridFocus).style("visibility", "hidden");
		if (n.grid_x_show) {
			e.updateXGrid()
		}
		;
		e.xgridLines = r.select("." + i.xgridLines).selectAll("." + i.xgridLine).data(n.grid_x_lines);
		s = e.xgridLines.enter().append("g").attr("class", function (t) {
			return i.xgridLine + (t["class"] ? " " + t["class"] : "")
		});
		s.append("line").style("opacity", 0);
		s.append("text").attr("text-anchor", e.gridTextAnchor).attr("transform", n.axis_rotated ? "" : "rotate(-90)").attr("dx", e.gridTextDx).attr("dy", -5).style("opacity", 0);
		e.xgridLines.exit().transition().duration(t).style("opacity", 0).remove();
		if (n.grid_y_show) {
			e.updateYGrid()
		}
		;
		e.ygridLines = r.select("." + i.ygridLines).selectAll("." + i.ygridLine).data(n.grid_y_lines);
		o = e.ygridLines.enter().append("g").attr("class", function (t) {
			return i.ygridLine + (t["class"] ? " " + t["class"] : "")
		});
		o.append("line").style("opacity", 0);
		o.append("text").attr("text-anchor", e.gridTextAnchor).attr("transform", n.axis_rotated ? "rotate(-90)" : "").attr("dx", e.gridTextDx).attr("dy", -5).style("opacity", 0);
		a = e.yv.bind(e);
		e.ygridLines.select("line").transition().duration(t).attr("x1", n.axis_rotated ? a : 0).attr("x2", n.axis_rotated ? a : e.width).attr("y1", n.axis_rotated ? 0 : a).attr("y2", n.axis_rotated ? e.height : a).style("opacity", 1);
		e.ygridLines.select("text").transition().duration(t).attr("x", n.axis_rotated ? e.xGridTextX.bind(e) : e.yGridTextX.bind(e)).attr("y", a).text(function (t) {
			return t.text
		}).style("opacity", 1);
		e.ygridLines.exit().transition().duration(t).style("opacity", 0).remove()
	};
	e.redrawGrid = function (t) {
		var e = this,
			i = e.config,
			n = e.xv.bind(e),
			a = e.xgridLines.select("line"),
			r = e.xgridLines.select("text");
		return [(t ? a.transition() : a).attr("x1", i.axis_rotated ? 0 : n).attr("x2", i.axis_rotated ? e.width : n).attr("y1", i.axis_rotated ? n : 0).attr("y2", i.axis_rotated ? n : e.height).style("opacity", 1), (t ? r.transition() : r).attr("x", i.axis_rotated ? e.yGridTextX.bind(e) : e.xGridTextX.bind(e)).attr("y", n).text(function (t) {
			return t.text
		}).style("opacity", 1)]
	};
	e.showXGridFocus = function (t) {
		var e = this,
			n = e.config,
			o = t.filter(function (t) {
				return t && r(t.value)
			}),
			a = e.main.selectAll("line." + i.xgridFocus),
			s = e.xx.bind(e);
		if (!n.tooltip_show) {
			return
		}
		;
		if (e.hasType("scatter") || e.hasArcType()) {
			return
		}
		;
		a.style("visibility", "visible").data([o[0]]).attr(n.axis_rotated ? "y1" : "x1", s).attr(n.axis_rotated ? "y2" : "x2", s);
		e.smoothLines(a, "grid")
	};
	e.hideXGridFocus = function () {
		this.main.select("line." + i.xgridFocus).style("visibility", "hidden")
	};
	e.updateXgridFocus = function () {
		var t = this,
			e = t.config;
		t.main.select("line." + i.xgridFocus).attr("x1", e.axis_rotated ? 0 : -10).attr("x2", e.axis_rotated ? t.width : -10).attr("y1", e.axis_rotated ? -10 : 0).attr("y2", e.axis_rotated ? -10 : t.height)
	};
	e.generateGridData = function (t, e) {
		var s = this,
			n = [],
			r, o, c, a, u = s.main.select("." + i.axisX).selectAll(".tick").size();
		if (t === "year") {
			r = s.getXDomain();
			o = r[0].getFullYear();
			c = r[1].getFullYear();
			for (a = o; a <= c; a++) {
				n.push(new Date(a + "-01-01 00:00:00"))
			}
		} else {
			n = e.ticks(10);
			if (n.length > u) {
				n = n.filter(function (t) {
					return ("" + t).indexOf(".") < 0
				})
			}
		}
		;
		return n
	};
	e.getGridFilterToRemove = function (t) {
		return t ? function (e) {
			var i = !1;
			[].concat(t).forEach(function (t) {
				if ((("value" in t && e.value === t.value) || ("class" in t && e["class"] === t["class"]))) {
					i = !0
				}
			});
			return i
		} : function () {
			return !0
		}
	};
	e.removeGridLines = function (t, e) {
		var a = this,
			n = a.config,
			r = a.getGridFilterToRemove(t),
			s = function (t) {
				return !r(t)
			},
			o = e ? i.xgridLines : i.ygridLines,
			c = e ? i.xgridLine : i.ygridLine;
		a.main.select("." + o).selectAll("." + c).filter(r).transition().duration(n.transition_duration).style("opacity", 0).remove();
		if (e) {
			n.grid_x_lines = n.grid_x_lines.filter(s)
		} else {
			n.grid_y_lines = n.grid_y_lines.filter(s)
		}
	};
	e.initTooltip = function () {
		var t = this,
			e = t.config,
			n;
		t.tooltip = t.selectChart.style("position", "relative").append("div").attr("class", i.tooltipContainer).style("position", "absolute").style("pointer-events", "none").style("display", "none");
		if (e.tooltip_init_show) {
			if (t.isTimeSeries() && c(e.tooltip_init_x)) {
				e.tooltip_init_x = t.parseDate(e.tooltip_init_x);
				for (n = 0; n < t.data.targets[0].values.length; n++) {
					if ((t.data.targets[0].values[n].x - e.tooltip_init_x) === 0) {
						break
					}
				}
				;
				e.tooltip_init_x = n
			}
			;
			t.tooltip.html(e.tooltip_contents.call(t, t.data.targets.map(function (i) {
				return t.addName(i.values[e.tooltip_init_x])
			}), t.axis.getXAxisTickFormat(), t.getYFormat(t.hasArcType()), t.color));
			t.tooltip.style("top", e.tooltip_init_position.top).style("left", e.tooltip_init_position.left).style("display", "block")
		}
	};
	e.getTooltipContent = function (t, e, i, n) {
		var r = this,
			o = r.config,
			d = o.tooltip_format_title || e,
			p = o.tooltip_format_name || function (t) {
					return t
				},
			x = o.tooltip_format_value || i,
			s, a, c, u, h, g, f = r.isOrderAsc();
		if (o.data_groups.length === 0) {
			t.sort(function (t, e) {
				var i = t ? t.value : null,
					n = e ? e.value : null;
				return f ? i - n : n - i
			})
		} else {
			var l = r.orderTargets(r.data.targets).map(function (t) {
				return t.id
			});
			t.sort(function (t, e) {
				var i = t ? t.value : null,
					n = e ? e.value : null;
				if (i > 0 && n > 0) {
					i = t ? l.indexOf(t.id) : null;
					n = e ? l.indexOf(e.id) : null
				}
				;
				return f ? i - n : n - i
			})
		}
		;
		for (a = 0; a < t.length; a++) {
			if (!(t[a] && (t[a].value || t[a].value === 0))) {
				continue
			}
			;
			if (!s) {
				c = y(d ? d(t[a].x) : t[a].x);
				s = "<table class='" + r.CLASS.tooltip + "'>" + (c || c === 0 ? "<tr><th colspan='2'>" + c + "</th></tr>" : "")
			}
			;
			u = y(x(t[a].value, t[a].ratio, t[a].id, t[a].index, t));
			if (u !== undefined) {
				if (t[a].name === null) {
					continue
				}
				;
				h = y(p(t[a].name, t[a].ratio, t[a].id, t[a].index));
				g = r.levelColor ? r.levelColor(t[a].value) : n(t[a].id);
				s += "<tr class='" + r.CLASS.tooltipName + "-" + r.getTargetSelectorSuffix(t[a].id) + "'>";
				s += "<td class='name'><span style='background-color:" + g + "'></span>" + h + "</td>";
				s += "<td class='value'>" + u + "</td>";
				s += "</tr>"
			}
		}
		;
		return s + "</table>"
	};
	e.tooltipPosition = function (t, e, i, n) {
		var a = this,
			d = a.config,
			h = a.d3,
			o, s, c, r, u, g = a.hasArcType(),
			l = h.mouse(n);
		if (g) {
			s = ((a.width - (a.isLegendRight ? a.getLegendWidth() : 0)) / 2) + l[0];
			r = (a.height / 2) + l[1] + 20
		} else {
			o = a.getSvgLeft(!0);
			if (d.axis_rotated) {
				s = o + l[0] + 100;
				c = s + e;
				u = a.currentWidth - a.getCurrentPaddingRight();
				r = a.x(t[0].x) + 20
			} else {
				s = o + a.getCurrentPaddingLeft(!0) + a.x(t[0].x) + 20;
				c = s + e;
				u = o + a.currentWidth - a.getCurrentPaddingRight();
				r = l[1] + 15
			}
			;
			if (c > u) {
				s -= c - u + 20
			}
			;
			if (r + i > a.currentHeight) {
				r -= i + 30
			}
		}
		;
		if (r < 0) {
			r = 0
		}
		;
		return {
			top: r,
			left: s
		}
	};
	e.showTooltip = function (t, i) {
		var n = this,
			a = n.config,
			o, c, s, l = n.hasArcType(),
			u = t.filter(function (t) {
				return t && r(t.value)
			}),
			d = a.tooltip_position || e.tooltipPosition;
		if (u.length === 0 || !a.tooltip_show) {
			return
		}
		;
		n.tooltip.html(a.tooltip_contents.call(n, t, n.axis.getXAxisTickFormat(), n.getYFormat(l), n.color)).style("display", "block");
		o = n.tooltip.property("offsetWidth");
		c = n.tooltip.property("offsetHeight");
		s = d.call(this, u, o, c, i);
		n.tooltip.style("top", s.top + "px").style("left", s.left + "px")
	};
	e.hideTooltip = function () {
		this.tooltip.style("display", "none")
	};
	e.initLegend = function () {
		var t = this;
		t.legendItemTextBox = {};
		t.legendHasRendered = !1;
		t.legend = t.svg.append("g").attr("transform", t.getTranslate("legend"));
		if (!t.config.legend_show) {
			t.legend.style("visibility", "hidden");
			t.hiddenLegendIds = t.mapToIds(t.data.targets);
			return
		}
		;
		t.updateLegendWithDefaults()
	};
	e.updateLegendWithDefaults = function () {
		var t = this;
		t.updateLegend(t.mapToIds(t.data.targets), {
			withTransform: !1,
			withTransitionForTransform: !1,
			withTransition: !1
		})
	};
	e.updateSizeForLegend = function (t, e) {
		var i = this,
			n = i.config,
			a = {
				top: i.isLegendTop ? i.getCurrentPaddingTop() + n.legend_inset_y + 5.5 : i.currentHeight - t - i.getCurrentPaddingBottom() - n.legend_inset_y,
				left: i.isLegendLeft ? i.getCurrentPaddingLeft() + n.legend_inset_x + 0.5 : i.currentWidth - e - i.getCurrentPaddingRight() - n.legend_inset_x + 0.5
			};
		i.margin3 = {
			top: i.isLegendRight ? 0 : i.isLegendInset ? a.top : i.currentHeight - t,
			right: NaN,
			bottom: 0,
			left: i.isLegendRight ? i.currentWidth - e : i.isLegendInset ? a.left : 0
		}
	};
	e.transformLegend = function (t) {
		var e = this;
		(t ? e.legend.transition() : e.legend).attr("transform", e.getTranslate("legend"))
	};
	e.updateLegendStep = function (t) {
		this.legendStep = t
	};
	e.updateLegendItemWidth = function (t) {
		this.legendItemWidth = t
	};
	e.updateLegendItemHeight = function (t) {
		this.legendItemHeight = t
	};
	e.getLegendWidth = function () {
		var t = this;
		return t.config.legend_show ? t.isLegendRight || t.isLegendInset ? t.legendItemWidth * (t.legendStep + 1) : t.currentWidth : 0
	};
	e.getLegendHeight = function () {
		var t = this,
			e = 0;
		if (t.config.legend_show) {
			if (t.isLegendRight) {
				e = t.currentHeight
			} else {
				e = Math.max(20, t.legendItemHeight) * (t.legendStep + 1)
			}
		}
		;
		return e
	};
	e.opacityForLegend = function (t) {
		return t.classed(i.legendItemHidden) ? null : 1
	};
	e.opacityForUnfocusedLegend = function (t) {
		return t.classed(i.legendItemHidden) ? null : 0.3
	};
	e.toggleFocusLegend = function (t, e) {
		var n = this;
		t = n.mapToTargetIds(t);
		n.legend.selectAll("." + i.legendItem).filter(function (e) {
			return t.indexOf(e) >= 0
		}).classed(i.legendItemFocused, e).transition().duration(100).style("opacity", function () {
			var t = e ? n.opacityForLegend : n.opacityForUnfocusedLegend;
			return t.call(n, n.d3.select(this))
		})
	};
	e.revertLegend = function () {
		var t = this,
			e = t.d3;
		t.legend.selectAll("." + i.legendItem).classed(i.legendItemFocused, !1).transition().duration(100).style("opacity", function () {
			return t.opacityForLegend(e.select(this))
		})
	};
	e.showLegend = function (t) {
		var e = this,
			i = e.config;
		if (!i.legend_show) {
			i.legend_show = !0;
			e.legend.style("visibility", "visible");
			if (!e.legendHasRendered) {
				e.updateLegendWithDefaults()
			}
		}
		;
		e.removeHiddenLegendIds(t);
		e.legend.selectAll(e.selectorLegends(t)).style("visibility", "visible").transition().style("opacity", function () {
			return e.opacityForLegend(e.d3.select(this))
		})
	};
	e.hideLegend = function (t) {
		var e = this,
			i = e.config;
		if (i.legend_show && m(t)) {
			i.legend_show = !1;
			e.legend.style("visibility", "hidden")
		}
		;
		e.addHiddenLegendIds(t);
		e.legend.selectAll(e.selectorLegends(t)).style("opacity", 0).style("visibility", "hidden")
	};
	e.clearLegendItemTextBoxCache = function () {
		this.legendItemTextBox = {}
	};
	e.updateLegend = function (t, e, a) {
		var n = this,
			r = n.config,
			h, L, w, f, V, G, E, I, y, F = 4,
			k = 10,
			c = 0,
			l = 0,
			R = 10,
			X = r.legend_item_tile_width + 5,
			b, p = 0,
			m = {},
			S = {},
			v = {},
			A = [0],
			d = {},
			u = 0;
		var x, O, T, P, C, g;
		t = t.filter(function (t) {
			return !o(r.data_names[t]) || r.data_names[t] !== null
		});
		e = e || {};
		x = s(e, "withTransition", !0);
		O = s(e, "withTransitionForTransform", !0);

		function M(t, e) {
			if (!n.legendItemTextBox[e]) {
				n.legendItemTextBox[e] = n.getTextRect(t.textContent, i.legendItem, t)
			}
			;
			return n.legendItemTextBox[e]
		};

		function D(e, i, a) {
			var T = a === 0,
				P = a === t.length - 1,
				y = M(e, i),
				o = y.width + X + (P && !(n.isLegendRight || n.isLegendInset) ? 0 : k) + r.legend_padding,
				h = y.height + F,
				g = n.isLegendRight || n.isLegendInset ? h : o,
				f = n.isLegendRight || n.isLegendInset ? n.getLegendHeight() : n.getLegendWidth(),
				s, b;

			function x(t, e) {
				if (!e) {
					s = (f - p - g) / 2;
					if (s < R) {
						s = (f - g) / 2;
						p = 0;
						u++
					}
				}
				;
				d[t] = u;
				A[u] = n.isLegendInset ? 10 : s;
				m[t] = p;
				p += g
			};
			if (T) {
				p = 0;
				u = 0;
				c = 0;
				l = 0
			}
			;
			if (r.legend_show && !n.isLegendToShow(i)) {
				S[i] = v[i] = d[i] = m[i] = 0;
				return
			}
			;
			S[i] = o;
			v[i] = h;
			if (!c || o >= c) {
				c = o
			}
			;
			if (!l || h >= l) {
				l = h
			}
			;
			b = n.isLegendRight || n.isLegendInset ? l : c;
			if (r.legend_equally) {
				Object.keys(S).forEach(function (t) {
					S[t] = c
				});
				Object.keys(v).forEach(function (t) {
					v[t] = l
				});
				s = (f - b * t.length) / 2;
				if (s < R) {
					p = 0;
					u = 0;
					t.forEach(function (t) {
						x(t)
					})
				} else {
					x(i, !0)
				}
			} else {
				x(i)
			}
		};
		if (n.isLegendInset) {
			u = r.legend_inset_step ? r.legend_inset_step : t.length;
			n.updateLegendStep(u)
		}
		;
		if (n.isLegendRight) {
			h = function (t) {
				return c * d[t]
			};
			f = function (t) {
				return A[d[t]] + m[t]
			}
		} else if (n.isLegendInset) {
			h = function (t) {
				return c * d[t] + 10
			};
			f = function (t) {
				return A[d[t]] + m[t]
			}
		} else {
			h = function (t) {
				return A[d[t]] + m[t]
			};
			f = function (t) {
				return l * d[t]
			}
		}
		;
		L = function (t, e) {
			return h(t, e) + 4 + r.legend_item_tile_width
		};
		V = function (t, e) {
			return f(t, e) + 9
		};
		w = function (t, e) {
			return h(t, e)
		};
		G = function (t, e) {
			return f(t, e) - 5
		};
		E = function (t, e) {
			return h(t, e) - 2
		};
		I = function (t, e) {
			return h(t, e) - 2 + r.legend_item_tile_width
		};
		y = function (t, e) {
			return f(t, e) + 4
		};
		b = n.legend.selectAll("." + i.legendItem).data(t).enter().append("g").attr("class", function (t) {
			return n.generateClass(i.legendItem, t)
		}).style("visibility", function (t) {
			return n.isLegendToShow(t) ? "visible" : "hidden"
		}).style("cursor", "pointer").on("click", function (t) {
			if (r.legend_item_onclick) {
				r.legend_item_onclick.call(n, t)
			} else {
				if (n.d3.event.altKey) {
					n.api.hide();
					n.api.show(t)
				} else {
					n.api.toggle(t);
					n.isTargetToShow(t) ? n.api.focus(t) : n.api.revert()
				}
			}
		}).on("mouseover", function (t) {
			if (r.legend_item_onmouseover) {
				r.legend_item_onmouseover.call(n, t)
			} else {
				n.d3.select(this).classed(i.legendItemFocused, !0);
				if (!n.transiting && n.isTargetToShow(t)) {
					n.api.focus(t)
				}
			}
		}).on("mouseout", function (t) {
			if (r.legend_item_onmouseout) {
				r.legend_item_onmouseout.call(n, t)
			} else {
				n.d3.select(this).classed(i.legendItemFocused, !1);
				n.api.revert()
			}
		});
		b.append("text").text(function (t) {
			return o(r.data_names[t]) ? r.data_names[t] : t
		}).each(function (t, e) {
			D(this, t, e)
		}).style("pointer-events", "none").attr("x", n.isLegendRight || n.isLegendInset ? L : -200).attr("y", n.isLegendRight || n.isLegendInset ? -200 : V);
		b.append("rect").attr("class", i.legendItemEvent).style("fill-opacity", 0).attr("x", n.isLegendRight || n.isLegendInset ? w : -200).attr("y", n.isLegendRight || n.isLegendInset ? -200 : G);
		b.append("line").attr("class", i.legendItemTile).style("stroke", n.color).style("pointer-events", "none").attr("x1", n.isLegendRight || n.isLegendInset ? E : -200).attr("y1", n.isLegendRight || n.isLegendInset ? -200 : y).attr("x2", n.isLegendRight || n.isLegendInset ? I : -200).attr("y2", n.isLegendRight || n.isLegendInset ? -200 : y).attr("stroke-width", r.legend_item_tile_height);
		g = n.legend.select("." + i.legendBackground + " rect");
		if (n.isLegendInset && c > 0 && g.size() === 0) {
			g = n.legend.insert("g", "." + i.legendItem).attr("class", i.legendBackground).append("rect")
		}
		;
		T = n.legend.selectAll("text").data(t).text(function (t) {
			return o(r.data_names[t]) ? r.data_names[t] : t
		}).each(function (t, e) {
			D(this, t, e)
		});
		(x ? T.transition() : T).attr("x", L).attr("y", V);
		P = n.legend.selectAll("rect." + i.legendItemEvent).data(t);
		(x ? P.transition() : P).attr("width", function (t) {
			return S[t]
		}).attr("height", function (t) {
			return v[t]
		}).attr("x", w).attr("y", G);
		C = n.legend.selectAll("line." + i.legendItemTile).data(t);
		(x ? C.transition() : C).style("stroke", n.color).attr("x1", E).attr("y1", y).attr("x2", I).attr("y2", y);
		if (g) {
			(x ? g.transition() : g).attr("height", n.getLegendHeight() - 12).attr("width", c * (u + 1) + 10)
		}
		;
		n.legend.selectAll("." + i.legendItem).classed(i.legendItemHidden, function (t) {
			return !n.isTargetToShow(t)
		});
		n.updateLegendItemWidth(c);
		n.updateLegendItemHeight(l);
		n.updateLegendStep(u);
		n.updateSizes();
		n.updateScales();
		n.updateSvgSize();
		n.transformAll(O, a);
		n.legendHasRendered = !0
	};
	e.initTitle = function () {
		var t = this;
		t.title = t.svg.append("text").text(t.config.title_text).attr("class", t.CLASS.title)
	};
	e.redrawTitle = function () {
		var t = this;
		t.title.attr("x", t.xForTitle.bind(t)).attr("y", t.yForTitle.bind(t))
	};
	e.xForTitle = function () {
		var t = this,
			i = t.config,
			n = i.title_position || "left",
			e;
		if (n.indexOf("right") >= 0) {
			e = t.currentWidth - t.getTextRect(t.title.node().textContent, t.CLASS.title, t.title.node()).width - i.title_padding.right
		} else if (n.indexOf("center") >= 0) {
			e = (t.currentWidth - t.getTextRect(t.title.node().textContent, t.CLASS.title, t.title.node()).width) / 2
		} else {
			e = i.title_padding.left
		}
		;
		return e
	};
	e.yForTitle = function () {
		var t = this;
		return t.config.title_padding.top + t.getTextRect(t.title.node().textContent, t.CLASS.title, t.title.node()).height
	};
	e.getTitlePadding = function () {
		var t = this;
		return t.yForTitle() + t.config.title_padding.bottom
	};

	function a(t) {
		S.call(this, t)
	};
	L(S, a);
	a.prototype.init = function () {
		var t = this.owner,
			e = t.config,
			n = t.main;
		t.axes.x = n.append("g").attr("class", i.axis + " " + i.axisX).attr("clip-path", t.clipPathForXAxis).attr("transform", t.getTranslate("x")).style("visibility", e.axis_x_show ? "visible" : "hidden");
		t.axes.x.append("text").attr("class", i.axisXLabel).attr("transform", e.axis_rotated ? "rotate(-90)" : "").style("text-anchor", this.textAnchorForXAxisLabel.bind(this));
		t.axes.y = n.append("g").attr("class", i.axis + " " + i.axisY).attr("clip-path", e.axis_y_inner ? "" : t.clipPathForYAxis).attr("transform", t.getTranslate("y")).style("visibility", e.axis_y_show ? "visible" : "hidden");
		t.axes.y.append("text").attr("class", i.axisYLabel).attr("transform", e.axis_rotated ? "" : "rotate(-90)").style("text-anchor", this.textAnchorForYAxisLabel.bind(this));
		t.axes.y2 = n.append("g").attr("class", i.axis + " " + i.axisY2).attr("transform", t.getTranslate("y2")).style("visibility", e.axis_y2_show ? "visible" : "hidden");
		t.axes.y2.append("text").attr("class", i.axisY2Label).attr("transform", e.axis_rotated ? "" : "rotate(-90)").style("text-anchor", this.textAnchorForY2AxisLabel.bind(this))
	};
	a.prototype.getXAxis = function (t, e, i, n, a, r, s) {
		var o = this.owner,
			c = o.config,
			l = {
				isCategory: o.isCategorized(),
				withOuterTick: a,
				tickMultiline: c.axis_x_tick_multiline,
				tickWidth: c.axis_x_tick_width,
				tickTextRotate: s ? 0 : c.axis_x_tick_rotate,
				withoutTransition: r,
			},
			u = A(o.d3, l).scale(t).orient(e);
		if (o.isTimeSeries() && n && typeof n !== "function") {
			n = n.map(function (t) {
				return o.parseDate(t)
			})
		}
		;
		u.tickFormat(i).tickValues(n);
		if (o.isCategorized()) {
			u.tickCentered(c.axis_x_tick_centered);
			if (m(c.axis_x_tick_culling)) {
				c.axis_x_tick_culling = !1
			}
		}
		;
		return u
	};
	a.prototype.updateXAxisTickValues = function (t, e) {
		var i = this.owner,
			a = i.config,
			n;
		if (a.axis_x_tick_fit || a.axis_x_tick_count) {
			n = this.generateTickValues(i.mapTargetsToUniqueXs(t), a.axis_x_tick_count, i.isTimeSeries())
		}
		;
		if (e) {
			e.tickValues(n)
		} else {
			i.xAxis.tickValues(n);
			i.subXAxis.tickValues(n)
		}
		;
		return n
	};
	a.prototype.getYAxis = function (t, e, i, n, a, r, s) {
		var o = this.owner,
			c = o.config,
			l = {
				withOuterTick: a,
				withoutTransition: r,
				tickTextRotate: s ? 0 : c.axis_y_tick_rotate
			},
			u = A(o.d3, l).scale(t).orient(e).tickFormat(i);
		if (o.isTimeSeriesY()) {
			u.ticks(o.d3.time[c.axis_y_tick_time_value], c.axis_y_tick_time_interval)
		} else {
			u.tickValues(n)
		}
		;
		return u
	};
	a.prototype.getId = function (t) {
		var e = this.owner.config;
		return t in e.data_axes ? e.data_axes[t] : "y"
	};
	a.prototype.getXAxisTickFormat = function () {
		var t = this.owner,
			i = t.config,
			e = t.isTimeSeries() ? t.defaultAxisTimeFormat : t.isCategorized() ? t.categoryName : function (t) {
				return t < 0 ? t.toFixed(0) : t
			};
		if (i.axis_x_tick_format) {
			if (d(i.axis_x_tick_format)) {
				e = i.axis_x_tick_format
			} else if (t.isTimeSeries()) {
				e = function (e) {
					return e ? t.axisTimeFormat(i.axis_x_tick_format)(e) : ""
				}
			}
		}
		;
		return d(e) ? function (i) {
			return e.call(t, i)
		} : e
	};
	a.prototype.getTickValues = function (t, e) {
		return t ? t : e ? e.tickValues() : undefined
	};
	a.prototype.getXAxisTickValues = function () {
		return this.getTickValues(this.owner.config.axis_x_tick_values, this.owner.xAxis)
	};
	a.prototype.getYAxisTickValues = function () {
		return this.getTickValues(this.owner.config.axis_y_tick_values, this.owner.yAxis)
	};
	a.prototype.getY2AxisTickValues = function () {
		return this.getTickValues(this.owner.config.axis_y2_tick_values, this.owner.y2Axis)
	};
	a.prototype.getLabelOptionByAxisId = function (t) {
		var n = this.owner,
			i = n.config,
			e;
		if (t === "y") {
			e = i.axis_y_label
		} else if (t === "y2") {
			e = i.axis_y2_label
		} else if (t === "x") {
			e = i.axis_x_label
		}
		;
		return e
	};
	a.prototype.getLabelText = function (t) {
		var e = this.getLabelOptionByAxisId(t);
		return c(e) ? e : e ? e.text : null
	};
	a.prototype.setLabelText = function (t, e) {
		var a = this.owner,
			i = a.config,
			n = this.getLabelOptionByAxisId(t);
		if (c(n)) {
			if (t === "y") {
				i.axis_y_label = e
			} else if (t === "y2") {
				i.axis_y2_label = e
			} else if (t === "x") {
				i.axis_x_label = e
			}
		} else if (n) {
			n.text = e
		}
	};
	a.prototype.getLabelPosition = function (t, e) {
		var n = this.getLabelOptionByAxisId(t),
			i = (n && typeof n === "object" && n.position) ? n.position : e;
		return {
			isInner: i.indexOf("inner") >= 0,
			isOuter: i.indexOf("outer") >= 0,
			isLeft: i.indexOf("left") >= 0,
			isCenter: i.indexOf("center") >= 0,
			isRight: i.indexOf("right") >= 0,
			isTop: i.indexOf("top") >= 0,
			isMiddle: i.indexOf("middle") >= 0,
			isBottom: i.indexOf("bottom") >= 0
		}
	};
	a.prototype.getXAxisLabelPosition = function () {
		return this.getLabelPosition("x", this.owner.config.axis_rotated ? "inner-top" : "inner-right")
	};
	a.prototype.getYAxisLabelPosition = function () {
		return this.getLabelPosition("y", this.owner.config.axis_rotated ? "inner-right" : "inner-top")
	};
	a.prototype.getY2AxisLabelPosition = function () {
		return this.getLabelPosition("y2", this.owner.config.axis_rotated ? "inner-right" : "inner-top")
	};
	a.prototype.getLabelPositionById = function (t) {
		return t === "y2" ? this.getY2AxisLabelPosition() : t === "y" ? this.getYAxisLabelPosition() : this.getXAxisLabelPosition()
	};
	a.prototype.textForXAxisLabel = function () {
		return this.getLabelText("x")
	};
	a.prototype.textForYAxisLabel = function () {
		return this.getLabelText("y")
	};
	a.prototype.textForY2AxisLabel = function () {
		return this.getLabelText("y2")
	};
	a.prototype.xForAxisLabel = function (t, e) {
		var i = this.owner;
		if (t) {
			return e.isLeft ? 0 : e.isCenter ? i.width / 2 : i.width
		} else {
			return e.isBottom ? -i.height : e.isMiddle ? -i.height / 2 : 0
		}
	};
	a.prototype.dxForAxisLabel = function (t, e) {
		if (t) {
			return e.isLeft ? "0.5em" : e.isRight ? "-0.5em" : "0"
		} else {
			return e.isTop ? "-0.5em" : e.isBottom ? "0.5em" : "0"
		}
	};
	a.prototype.textAnchorForAxisLabel = function (t, e) {
		if (t) {
			return e.isLeft ? "start" : e.isCenter ? "middle" : "end"
		} else {
			return e.isBottom ? "start" : e.isMiddle ? "middle" : "end"
		}
	};
	a.prototype.xForXAxisLabel = function () {
		return this.xForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition())
	};
	a.prototype.xForYAxisLabel = function () {
		return this.xForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition())
	};
	a.prototype.xForY2AxisLabel = function () {
		return this.xForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition())
	};
	a.prototype.dxForXAxisLabel = function () {
		return this.dxForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition())
	};
	a.prototype.dxForYAxisLabel = function () {
		return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition())
	};
	a.prototype.dxForY2AxisLabel = function () {
		return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition())
	};
	a.prototype.dyForXAxisLabel = function () {
		var i = this.owner,
			t = i.config,
			e = this.getXAxisLabelPosition();
		if (t.axis_rotated) {
			return e.isInner ? "1.2em" : -25 - this.getMaxTickWidth("x")
		} else {
			return e.isInner ? "-0.5em" : t.axis_x_height ? t.axis_x_height - 10 : "3em"
		}
	};
	a.prototype.dyForYAxisLabel = function () {
		var t = this.owner,
			e = this.getYAxisLabelPosition();
		if (t.config.axis_rotated) {
			return e.isInner ? "-0.5em" : "3em"
		} else {
			return e.isInner ? "1.2em" : -10 - (t.config.axis_y_inner ? 0 : (this.getMaxTickWidth("y") + 10))
		}
	};
	a.prototype.dyForY2AxisLabel = function () {
		var t = this.owner,
			e = this.getY2AxisLabelPosition();
		if (t.config.axis_rotated) {
			return e.isInner ? "1.2em" : "-2.2em"
		} else {
			return e.isInner ? "-0.5em" : 15 + (t.config.axis_y2_inner ? 0 : (this.getMaxTickWidth("y2") + 15))
		}
	};
	a.prototype.textAnchorForXAxisLabel = function () {
		var t = this.owner;
		return this.textAnchorForAxisLabel(!t.config.axis_rotated, this.getXAxisLabelPosition())
	};
	a.prototype.textAnchorForYAxisLabel = function () {
		var t = this.owner;
		return this.textAnchorForAxisLabel(t.config.axis_rotated, this.getYAxisLabelPosition())
	};
	a.prototype.textAnchorForY2AxisLabel = function () {
		var t = this.owner;
		return this.textAnchorForAxisLabel(t.config.axis_rotated, this.getY2AxisLabelPosition())
	};
	a.prototype.getMaxTickWidth = function (t, e) {
		var i = this.owner,
			c = i.config,
			s = 0,
			a, n, r, o, u;
		if (e && i.currentMaxTickWidths[t]) {
			return i.currentMaxTickWidths[t]
		}
		;
		if (i.svg) {
			a = i.filterTargetsToShow(i.data.targets);
			if (t === "y") {
				n = i.y.copy().domain(i.getYDomain(a, "y"));
				r = this.getYAxis(n, i.yOrient, c.axis_y_tick_format, i.yAxisTickValues, !1, !0, !0)
			} else if (t === "y2") {
				n = i.y2.copy().domain(i.getYDomain(a, "y2"));
				r = this.getYAxis(n, i.y2Orient, c.axis_y2_tick_format, i.y2AxisTickValues, !1, !0, !0)
			} else {
				n = i.x.copy().domain(i.getXDomain(a));
				r = this.getXAxis(n, i.xOrient, i.xAxisTickFormat, i.xAxisTickValues, !1, !0, !0);
				this.updateXAxisTickValues(a, r)
			}
			;
			o = i.d3.select("body").append("div").classed("c3", !0);
			u = o.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", 0).style("left", 0), u.append("g").call(r).each(function () {
				i.d3.select(this).selectAll("text").each(function () {
					var t = this.getBoundingClientRect();
					if (s < t.width) {
						s = t.width
					}
				});
				o.remove()
			})
		}
		;
		i.currentMaxTickWidths[t] = s <= 0 ? i.currentMaxTickWidths[t] : s;
		return i.currentMaxTickWidths[t]
	};
	a.prototype.updateLabels = function (t) {
		var e = this.owner,
			n = e.main.select("." + i.axisX + " ." + i.axisXLabel),
			a = e.main.select("." + i.axisY + " ." + i.axisYLabel),
			r = e.main.select("." + i.axisY2 + " ." + i.axisY2Label);
		(t ? n.transition() : n).attr("x", this.xForXAxisLabel.bind(this)).attr("dx", this.dxForXAxisLabel.bind(this)).attr("dy", this.dyForXAxisLabel.bind(this)).text(this.textForXAxisLabel.bind(this));
		(t ? a.transition() : a).attr("x", this.xForYAxisLabel.bind(this)).attr("dx", this.dxForYAxisLabel.bind(this)).attr("dy", this.dyForYAxisLabel.bind(this)).text(this.textForYAxisLabel.bind(this));
		(t ? r.transition() : r).attr("x", this.xForY2AxisLabel.bind(this)).attr("dx", this.dxForY2AxisLabel.bind(this)).attr("dy", this.dyForY2AxisLabel.bind(this)).text(this.textForY2AxisLabel.bind(this))
	};
	a.prototype.getPadding = function (t, e, i, n) {
		var a = typeof t === "number" ? t : t[e];
		if (!r(a)) {
			return i
		}
		;
		if (t.unit === "ratio") {
			return t[e] * n
		}
		;
		return this.convertPixelsToAxisPadding(a, n)
	};
	a.prototype.convertPixelsToAxisPadding = function (t, e) {
		var i = this.owner,
			n = i.config.axis_rotated ? i.width : i.height;
		return e * (t / n)
	};
	a.prototype.generateTickValues = function (t, e, i) {
		var n = t,
			a, r, o, c, l, s, u;
		if (e) {
			a = d(e) ? e() : e;
			if (a === 1) {
				n = [t[0]]
			} else if (a === 2) {
				n = [t[0], t[t.length - 1]]
			} else if (a > 2) {
				c = a - 2;
				r = t[0];
				o = t[t.length - 1];
				l = (o - r) / (c + 1);
				n = [r];
				for (s = 0; s < c; s++) {
					u = +r + l * (s + 1);
					n.push(i ? new Date(u) : u)
				}
				;
				n.push(o)
			}
		}
		;
		if (!i) {
			n = n.sort(function (t, e) {
				return t - e
			})
		}
		;
		return n
	};
	a.prototype.generateTransitions = function (t) {
		var i = this.owner,
			e = i.axes;
		return {
			axisX: t ? e.x.transition().duration(t) : e.x,
			axisY: t ? e.y.transition().duration(t) : e.y,
			axisY2: t ? e.y2.transition().duration(t) : e.y2,
			axisSubX: t ? e.subx.transition().duration(t) : e.subx
		}
	};
	a.prototype.redraw = function (t, e) {
		var i = this.owner;
		i.axes.x.style("opacity", e ? 0 : 1);
		i.axes.y.style("opacity", e ? 0 : 1);
		i.axes.y2.style("opacity", e ? 0 : 1);
		i.axes.subx.style("opacity", e ? 0 : 1);
		t.axisX.call(i.xAxis);
		t.axisY.call(i.yAxis);
		t.axisY2.call(i.y2Axis);
		t.axisSubX.call(i.subXAxis)
	};
	e.getClipPath = function (e) {
		var i = t.navigator.appVersion.toLowerCase().indexOf("msie 9.") >= 0;
		return "url(" + (i ? "" : document.URL.split("#")[0]) + "#" + e + ")"
	};
	e.appendClip = function (t, e) {
		return t.append("clipPath").attr("id", e).append("rect")
	};
	e.getAxisClipX = function (t) {
		var e = Math.max(30, this.margin.left);
		return t ? -(1 + e) : -(e - 1)
	};
	e.getAxisClipY = function (t) {
		return t ? -20 : -this.margin.top
	};
	e.getXAxisClipX = function () {
		var t = this;
		return t.getAxisClipX(!t.config.axis_rotated)
	};
	e.getXAxisClipY = function () {
		var t = this;
		return t.getAxisClipY(!t.config.axis_rotated)
	};
	e.getYAxisClipX = function () {
		var t = this;
		return t.config.axis_y_inner ? -1 : t.getAxisClipX(t.config.axis_rotated)
	};
	e.getYAxisClipY = function () {
		var t = this;
		return t.getAxisClipY(t.config.axis_rotated)
	};
	e.getAxisClipWidth = function (t) {
		var e = this,
			i = Math.max(30, e.margin.left),
			n = Math.max(30, e.margin.right);
		return t ? e.width + 2 + i + n : e.margin.left + 20
	};
	e.getAxisClipHeight = function (t) {
		return (t ? this.margin.bottom : (this.margin.top + this.height)) + 20
	};
	e.getXAxisClipWidth = function () {
		var t = this;
		return t.getAxisClipWidth(!t.config.axis_rotated)
	};
	e.getXAxisClipHeight = function () {
		var t = this;
		return t.getAxisClipHeight(!t.config.axis_rotated)
	};
	e.getYAxisClipWidth = function () {
		var t = this;
		return t.getAxisClipWidth(t.config.axis_rotated) + (t.config.axis_y_inner ? 20 : 0)
	};
	e.getYAxisClipHeight = function () {
		var t = this;
		return t.getAxisClipHeight(t.config.axis_rotated)
	};
	e.initPie = function () {
		var t = this,
			e = t.d3,
			i = t.config;
		t.pie = e.layout.pie().value(function (t) {
			return t.values.reduce(function (t, e) {
				return t + e.value
			}, 0)
		});
		if (!i.data_order) {
			t.pie.sort(null)
		}
	};
	e.updateRadius = function () {
		var t = this,
			e = t.config,
			i = e.gauge_width || e.donut_width;
		t.radiusExpanded = Math.min(t.arcWidth, t.arcHeight) / 2;
		t.radius = t.radiusExpanded * 0.95;
		t.innerRadiusRatio = i ? (t.radius - i) / t.radius : 0.6;
		t.innerRadius = t.hasType("donut") || t.hasType("gauge") ? t.radius * t.innerRadiusRatio : 0
	};
	e.updateArc = function () {
		var t = this;
		t.svgArc = t.getSvgArc();
		t.svgArcExpanded = t.getSvgArcExpanded();
		t.svgArcExpandedSub = t.getSvgArcExpanded(0.98)
	};
	e.updateAngle = function (t) {
		var e = this,
			i = e.config,
			r = !1,
			s = 0,
			n, a, o, c;
		if (!i) {
			return null
		}
		;
		e.pie(e.filterTargetsToShow(e.data.targets)).forEach(function (e) {
			if (!r && e.data.id === t.data.id) {
				r = !0;
				t = e;
				t.index = s
			}
			;
			s++
		});
		if (isNaN(t.startAngle)) {
			t.startAngle = 0
		}
		;
		if (isNaN(t.endAngle)) {
			t.endAngle = t.startAngle
		}
		;
		if (e.isGaugeType(t.data)) {
			n = i.gauge_min;
			a = i.gauge_max;
			o = (Math.PI * (i.gauge_fullCircle ? 2 : 1)) / (a - n);
			c = t.value < n ? 0 : t.value < a ? t.value - n : (a - n);
			t.startAngle = i.gauge_startingAngle;
			t.endAngle = t.startAngle + o * c
		}
		;
		return r ? t : null
	};
	e.getSvgArc = function () {
		var t = this,
			e = t.d3.svg.arc().outerRadius(t.radius).innerRadius(t.innerRadius),
			i = function (i, n) {
				var a;
				if (n) {
					return e(i)
				}
				;
				a = t.updateAngle(i);
				return a ? e(a) : "M 0 0"
			};
		i.centroid = e.centroid;
		return i
	};
	e.getSvgArcExpanded = function (t) {
		var e = this,
			i = e.d3.svg.arc().outerRadius(e.radiusExpanded * (t ? t : 1)).innerRadius(e.innerRadius);
		return function (t) {
			var n = e.updateAngle(t);
			return n ? i(n) : "M 0 0"
		}
	};
	e.getArc = function (t, e, i) {
		return i || this.isArcType(t.data) ? this.svgArc(t, e) : "M 0 0"
	};
	e.transformForArcLabel = function (t) {
		var e = this,
			i = e.config,
			c = e.updateAngle(t),
			n, s, o, a, r, u = "";
		if (c && !e.hasType("gauge")) {
			n = this.svgArc.centroid(c);
			s = isNaN(n[0]) ? 0 : n[0];
			o = isNaN(n[1]) ? 0 : n[1];
			a = Math.sqrt(s * s + o * o);
			if (e.hasType("donut") && i.donut_label_ratio) {
				r = d(i.donut_label_ratio) ? i.donut_label_ratio(t, e.radius, a) : i.donut_label_ratio
			} else if (e.hasType("pie") && i.pie_label_ratio) {
				r = d(i.pie_label_ratio) ? i.pie_label_ratio(t, e.radius, a) : i.pie_label_ratio
			} else {
				r = e.radius && a ? (36 / e.radius > 0.375 ? 1.175 - 36 / e.radius : 0.8) * e.radius / a : 0
			}
			;
			u = "translate(" + (s * r) + "," + (o * r) + ")"
		}
		;
		return u
	};
	e.getArcRatio = function (t) {
		var e = this,
			i = e.config,
			n = Math.PI * (e.hasType("gauge") && !i.gauge_fullCircle ? 1 : 2);
		return t ? (t.endAngle - t.startAngle) / n : null
	};
	e.convertToArcData = function (t) {
		return this.addName({
			id: t.data.id,
			value: t.value,
			ratio: this.getArcRatio(t),
			index: t.index
		})
	};
	e.textForArcLabel = function (t) {
		var e = this,
			i, a, n, s, r;
		if (!e.shouldShowArcLabel()) {
			return ""
		}
		;
		i = e.updateAngle(t);
		a = i ? i.value : null;
		n = e.getArcRatio(i);
		s = t.data.id;
		if (!e.hasType("gauge") && !e.meetsArcLabelThreshold(n)) {
			return ""
		}
		;
		r = e.getArcLabelFormat();
		return r ? r(a, n, s) : e.defaultArcValueFormat(a, n)
	};
	e.expandArc = function (e) {
		var n = this,
			a;
		if (n.transiting) {
			a = t.setInterval(function () {
				if (!n.transiting) {
					t.clearInterval(a);
					if (n.legend.selectAll(".c3-legend-item-focused").size() > 0) {
						n.expandArc(e)
					}
				}
			}, 10);
			return
		}
		;
		e = n.mapToTargetIds(e);
		n.svg.selectAll(n.selectorTargets(e, "." + i.chartArc)).each(function (t) {
			if (!n.shouldExpand(t.data.id)) {
				return
			}
			;
			n.d3.select(this).selectAll("path").transition().duration(n.expandDuration(t.data.id)).attr("d", n.svgArcExpanded).transition().duration(n.expandDuration(t.data.id) * 2).attr("d", n.svgArcExpandedSub).each(function (t) {
				if (n.isDonutType(t.data)) {
				}
			})
		})
	};
	e.unexpandArc = function (t) {
		var e = this;
		if (e.transiting) {
			return
		}
		;
		t = e.mapToTargetIds(t);
		e.svg.selectAll(e.selectorTargets(t, "." + i.chartArc)).selectAll("path").transition().duration(function (t) {
			return e.expandDuration(t.data.id)
		}).attr("d", e.svgArc);
		e.svg.selectAll("." + i.arc).style("opacity", 1)
	};
	e.expandDuration = function (t) {
		var e = this,
			i = e.config;
		if (e.isDonutType(t)) {
			return i.donut_expand_duration
		} else if (e.isGaugeType(t)) {
			return i.gauge_expand_duration
		} else if (e.isPieType(t)) {
			return i.pie_expand_duration
		} else {
			return 50
		}
	};
	e.shouldExpand = function (t) {
		var e = this,
			i = e.config;
		return (e.isDonutType(t) && i.donut_expand) || (e.isGaugeType(t) && i.gauge_expand) || (e.isPieType(t) && i.pie_expand)
	};
	e.shouldShowArcLabel = function () {
		var t = this,
			i = t.config,
			e = !0;
		if (t.hasType("donut")) {
			e = i.donut_label_show
		} else if (t.hasType("pie")) {
			e = i.pie_label_show
		}
		;
		return e
	};
	e.meetsArcLabelThreshold = function (t) {
		var e = this,
			i = e.config,
			n = e.hasType("donut") ? i.donut_label_threshold : i.pie_label_threshold;
		return t >= n
	};
	e.getArcLabelFormat = function () {
		var t = this,
			e = t.config,
			i = e.pie_label_format;
		if (t.hasType("gauge")) {
			i = e.gauge_label_format
		} else if (t.hasType("donut")) {
			i = e.donut_label_format
		}
		;
		return i
	};
	e.getArcTitle = function () {
		var t = this;
		return t.hasType("donut") ? t.config.donut_title : ""
	};
	e.updateTargetsForArc = function (t) {
		var e = this,
			s = e.main,
			a, n, r = e.classChartArc.bind(e),
			o = e.classArcs.bind(e),
			c = e.classFocus.bind(e);
		a = s.select("." + i.chartArcs).selectAll("." + i.chartArc).data(e.pie(t)).attr("class", function (t) {
			return r(t) + c(t.data)
		});
		n = a.enter().append("g").attr("class", r);
		n.append("g").attr("class", o);
		n.append("text").attr("dy", e.hasType("gauge") ? "-.1em" : ".35em").style("opacity", 0).style("text-anchor", "middle").style("pointer-events", "none")
	};
	e.initArc = function () {
		var t = this;
		t.arcs = t.main.select("." + i.chart).append("g").attr("class", i.chartArcs).attr("transform", t.getTranslate("arc"));
		t.arcs.append("text").attr("class", i.chartArcsTitle).style("text-anchor", "middle").text(t.getArcTitle())
	};
	e.redrawArc = function (t, e, n) {
		var a = this,
			c = a.d3,
			r = a.config,
			o = a.main,
			s;
		s = o.selectAll("." + i.arcs).selectAll("." + i.arc).data(a.arcData.bind(a));
		s.enter().append("path").attr("class", a.classArc.bind(a)).style("fill", function (t) {
			return a.color(t.data)
		}).style("cursor", function (t) {
			return r.interaction_enabled && r.data_selection_isselectable(t) ? "pointer" : null
		}).style("opacity", 0).each(function (t) {
			if (a.isGaugeType(t.data)) {
				t.startAngle = t.endAngle = r.gauge_startingAngle
			}
			;
			this._current = t
		});
		s.attr("transform", function (t) {
			return !a.isGaugeType(t.data) && n ? "scale(0)" : ""
		}).style("opacity", function (t) {
			return t === this._current ? 0 : 1
		}).on("mouseover", r.interaction_enabled ? function (t) {
			var e, i;
			if (a.transiting) {
				return
			}
			;
			e = a.updateAngle(t);
			if (e) {
				i = a.convertToArcData(e);
				a.expandArc(e.data.id);
				a.api.focus(e.data.id);
				a.toggleFocusLegend(e.data.id, !0);
				a.config.data_onmouseover(i, this)
			}
		} : null).on("mousemove", r.interaction_enabled ? function (t) {
			var e = a.updateAngle(t),
				i, n;
			if (e) {
				i = a.convertToArcData(e), n = [i];
				a.showTooltip(n, this)
			}
		} : null).on("mouseout", r.interaction_enabled ? function (t) {
			var e, i;
			if (a.transiting) {
				return
			}
			;
			e = a.updateAngle(t);
			if (e) {
				i = a.convertToArcData(e);
				a.unexpandArc(e.data.id);
				a.api.revert();
				a.revertLegend();
				a.hideTooltip();
				a.config.data_onmouseout(i, this)
			}
		} : null).on("click", r.interaction_enabled ? function (t, e) {
			var n = a.updateAngle(t),
				i;
			if (n) {
				i = a.convertToArcData(n);
				if (a.toggleShape) {
					a.toggleShape(this, i, e)
				}
				;
				a.config.data_onclick.call(a.api, i, this)
			}
		} : null).each(function () {
			a.transiting = !0
		}).transition().duration(t).attrTween("d", function (t) {
			var i = a.updateAngle(t),
				e;
			if (!i) {
				return function () {
					return "M 0 0"
				}
			}
			;
			if (isNaN(this._current.startAngle)) {
				this._current.startAngle = 0
			}
			;
			if (isNaN(this._current.endAngle)) {
				this._current.endAngle = this._current.startAngle
			}
			;
			e = c.interpolate(this._current, i);
			this._current = e(0);
			return function (i) {
				var n = e(i);
				n.data = t.data;
				return a.getArc(n, !0)
			}
		}).attr("transform", n ? "scale(1)" : "").style("fill", function (t) {
			return a.levelColor ? a.levelColor(t.data.values[0].value) : a.color(t.data.id)
		}).style("opacity", 1).call(a.endall, function () {
			a.transiting = !1
		});
		s.exit().transition().duration(e).style("opacity", 0).remove();
		o.selectAll("." + i.chartArc).select("text").style("opacity", 0).attr("class", function (t) {
			return a.isGaugeType(t.data) ? i.gaugeValue : ""
		}).text(a.textForArcLabel.bind(a)).attr("transform", a.transformForArcLabel.bind(a)).style("font-size", function (t) {
			return a.isGaugeType(t.data) ? Math.round(a.radius / 5) + "px" : ""
		}).transition().duration(t).style("opacity", function (t) {
			return a.isTargetToShow(t.data.id) && a.isArcType(t.data) ? 1 : 0
		});
		o.select("." + i.chartArcsTitle).style("opacity", a.hasType("donut") || a.hasType("gauge") ? 1 : 0);
		if (a.hasType("gauge")) {
			a.arcs.select("." + i.chartArcsBackground).attr("d", function () {
				var t = {
					data: [{
						value: r.gauge_max
					}],
					startAngle: r.gauge_startingAngle,
					endAngle: -1 * r.gauge_startingAngle
				};
				return a.getArc(t, !0, !0)
			});
			a.arcs.select("." + i.chartArcsGaugeUnit).attr("dy", ".75em").text(r.gauge_label_show ? r.gauge_units : "");
			a.arcs.select("." + i.chartArcsGaugeMin).attr("dx", -1 * (a.innerRadius + ((a.radius - a.innerRadius) / (r.gauge_fullCircle ? 1 : 2))) + "px").attr("dy", "1.2em").text(r.gauge_label_show ? r.gauge_min : "");
			a.arcs.select("." + i.chartArcsGaugeMax).attr("dx", a.innerRadius + ((a.radius - a.innerRadius) / (r.gauge_fullCircle ? 1 : 2)) + "px").attr("dy", "1.2em").text(r.gauge_label_show ? r.gauge_max : "")
		}
	};
	e.initGauge = function () {
		var t = this.arcs;
		if (this.hasType("gauge")) {
			t.append("path").attr("class", i.chartArcsBackground);
			t.append("text").attr("class", i.chartArcsGaugeUnit).style("text-anchor", "middle").style("pointer-events", "none");
			t.append("text").attr("class", i.chartArcsGaugeMin).style("text-anchor", "middle").style("pointer-events", "none");
			t.append("text").attr("class", i.chartArcsGaugeMax).style("text-anchor", "middle").style("pointer-events", "none")
		}
	};
	e.getGaugeLabelHeight = function () {
		return this.config.gauge_label_show ? 20 : 0
	};
	e.initRegion = function () {
		var t = this;
		t.region = t.main.append("g").attr("clip-path", t.clipPath).attr("class", i.regions)
	};
	e.updateRegion = function (t) {
		var e = this,
			n = e.config;
		e.region.style("visibility", e.hasArcType() ? "hidden" : "visible");
		e.mainRegion = e.main.select("." + i.regions).selectAll("." + i.region).data(n.regions);
		e.mainRegion.enter().append("g").append("rect").style("fill-opacity", 0);
		e.mainRegion.attr("class", e.classRegion.bind(e));
		e.mainRegion.exit().transition().duration(t).style("opacity", 0).remove()
	};
	e.redrawRegion = function (t) {
		var e = this,
			i = e.mainRegion.selectAll("rect").each(function () {
				var t = e.d3.select(this.parentNode).datum();
				e.d3.select(this).datum(t)
			}),
			n = e.regionX.bind(e),
			a = e.regionY.bind(e),
			s = e.regionWidth.bind(e),
			o = e.regionHeight.bind(e);
		return [(t ? i.transition() : i).attr("x", n).attr("y", a).attr("width", s).attr("height", o).style("fill-opacity", function (t) {
			return r(t.opacity) ? t.opacity : 0.1
		})]
	};
	e.regionX = function (t) {
		var e = this,
			n = e.config,
			i, a = t.axis === "y" ? e.y : e.y2;
		if (t.axis === "y" || t.axis === "y2") {
			i = n.axis_rotated ? ("start" in t ? a(t.start) : 0) : 0
		} else {
			i = n.axis_rotated ? 0 : ("start" in t ? e.x(e.isTimeSeries() ? e.parseDate(t.start) : t.start) : 0)
		}
		;
		return i
	};
	e.regionY = function (t) {
		var e = this,
			n = e.config,
			i, a = t.axis === "y" ? e.y : e.y2;
		if (t.axis === "y" || t.axis === "y2") {
			i = n.axis_rotated ? 0 : ("end" in t ? a(t.end) : 0)
		} else {
			i = n.axis_rotated ? ("start" in t ? e.x(e.isTimeSeries() ? e.parseDate(t.start) : t.start) : 0) : 0
		}
		;
		return i
	};
	e.regionWidth = function (t) {
		var e = this,
			n = e.config,
			a = e.regionX(t),
			i, r = t.axis === "y" ? e.y : e.y2;
		if (t.axis === "y" || t.axis === "y2") {
			i = n.axis_rotated ? ("end" in t ? r(t.end) : e.width) : e.width
		} else {
			i = n.axis_rotated ? e.width : ("end" in t ? e.x(e.isTimeSeries() ? e.parseDate(t.end) : t.end) : e.width)
		}
		;
		return i < a ? 0 : i - a
	};
	e.regionHeight = function (t) {
		var e = this,
			n = e.config,
			a = this.regionY(t),
			i, r = t.axis === "y" ? e.y : e.y2;
		if (t.axis === "y" || t.axis === "y2") {
			i = n.axis_rotated ? e.height : ("start" in t ? r(t.start) : e.height)
		} else {
			i = n.axis_rotated ? ("end" in t ? e.x(e.isTimeSeries() ? e.parseDate(t.end) : t.end) : e.height) : e.height
		}
		;
		return i < a ? 0 : i - a
	};
	e.isRegionOnX = function (t) {
		return !t.axis || t.axis === "x"
	};
	e.drag = function (t) {
		var e = this,
			n = e.config,
			h = e.main,
			g = e.d3,
			c, u, l, d, a, s, r, o;
		if (e.hasArcType()) {
			return
		}
		;
		if (!n.data_selection_enabled) {
			return
		}
		;
		if (n.zoom_enabled && !e.zoom.altDomain) {
			return
		}
		;
		if (!n.data_selection_multiple) {
			return
		}
		;
		c = e.dragStart[0];
		u = e.dragStart[1];
		l = t[0];
		d = t[1];
		a = Math.min(c, l);
		s = Math.max(c, l);
		r = (n.data_selection_grouped) ? e.margin.top : Math.min(u, d);
		o = (n.data_selection_grouped) ? e.height : Math.max(u, d);
		h.select("." + i.dragarea).attr("x", a).attr("y", r).attr("width", s - a).attr("height", o - r);
		h.selectAll("." + i.shapes).selectAll("." + i.shape).filter(function (t) {
			return n.data_selection_isselectable(t)
		}).each(function (t, n) {
			var c = g.select(this),
				p = c.classed(i.SELECTED),
				x = c.classed(i.INCLUDED),
				u, l, y, m, h, f = !1,
				d;
			if (c.classed(i.circle)) {
				u = c.attr("cx") * 1;
				l = c.attr("cy") * 1;
				h = e.togglePoint;
				f = a < u && u < s && r < l && l < o
			} else if (c.classed(i.bar)) {
				d = P(this);
				u = d.x;
				l = d.y;
				y = d.width;
				m = d.height;
				h = e.togglePath;
				f = !(s < u || u + y < a) && !(o < l || l + m < r)
			} else {
				return
			}
			;
			if (f ^ x) {
				c.classed(i.INCLUDED, !x);
				c.classed(i.SELECTED, !p);
				h.call(e, !p, c, t, n)
			}
		})
	};
	e.dragstart = function (t) {
		var e = this,
			n = e.config;
		if (e.hasArcType()) {
			return
		}
		;
		if (!n.data_selection_enabled) {
			return
		}
		;
		e.dragStart = t;
		e.main.select("." + i.chart).append("rect").attr("class", i.dragarea).style("opacity", 0.1);
		e.dragging = !0
	};
	e.dragend = function () {
		var t = this,
			e = t.config;
		if (t.hasArcType()) {
			return
		}
		;
		if (!e.data_selection_enabled) {
			return
		}
		;
		t.main.select("." + i.dragarea).transition().duration(100).style("opacity", 0).remove();
		t.main.selectAll("." + i.shape).classed(i.INCLUDED, !1);
		t.dragging = !1
	};
	e.selectPoint = function (t, e, n) {
		var a = this,
			r = a.config,
			s = (r.axis_rotated ? a.circleY : a.circleX).bind(a),
			o = (r.axis_rotated ? a.circleX : a.circleY).bind(a),
			c = a.pointSelectR.bind(a);
		r.data_onselected.call(a.api, e, t.node());
		a.main.select("." + i.selectedCircles + a.getTargetSelectorSuffix(e.id)).selectAll("." + i.selectedCircle + "-" + n).data([e]).enter().append("circle").attr("class", function () {
			return a.generateClass(i.selectedCircle, n)
		}).attr("cx", s).attr("cy", o).attr("stroke", function () {
			return a.color(e)
		}).attr("r", function (t) {
			return a.pointSelectR(t) * 1.4
		}).transition().duration(100).attr("r", c)
	};
	e.unselectPoint = function (t, e, n) {
		var a = this;
		a.config.data_onunselected.call(a.api, e, t.node());
		a.main.select("." + i.selectedCircles + a.getTargetSelectorSuffix(e.id)).selectAll("." + i.selectedCircle + "-" + n).transition().duration(100).attr("r", 0).remove()
	};
	e.togglePoint = function (t, e, i, n) {
		t ? this.selectPoint(e, i, n) : this.unselectPoint(e, i, n)
	};
	e.selectPath = function (t, e) {
		var i = this;
		i.config.data_onselected.call(i, e, t.node());
		if (i.config.interaction_brighten) {
			t.transition().duration(100).style("fill", function () {
				return i.d3.rgb(i.color(e)).brighter(0.75)
			})
		}
	};
	e.unselectPath = function (t, e) {
		var i = this;
		i.config.data_onunselected.call(i, e, t.node());
		if (i.config.interaction_brighten) {
			t.transition().duration(100).style("fill", function () {
				return i.color(e)
			})
		}
	};
	e.togglePath = function (t, e, i, n) {
		t ? this.selectPath(e, i, n) : this.unselectPath(e, i, n)
	};
	e.getToggle = function (t, e) {
		var n = this,
			i;
		if (t.nodeName === "circle") {
			if (n.isStepType(e)) {
				i = function () {
				}
			} else {
				i = n.togglePoint
			}
		} else if (t.nodeName === "path") {
			i = n.togglePath
		}
		;
		return i
	};
	e.toggleShape = function (t, e, n) {
		var a = this,
			o = a.d3,
			r = a.config,
			s = o.select(t),
			c = s.classed(i.SELECTED),
			u = a.getToggle(t, e).bind(a);
		if (r.data_selection_enabled && r.data_selection_isselectable(e)) {
			if (!r.data_selection_multiple) {
				a.main.selectAll("." + i.shapes + (r.data_selection_grouped ? a.getTargetSelectorSuffix(e.id) : "")).selectAll("." + i.shape).each(function (t, e) {
					var n = o.select(this);
					if (n.classed(i.SELECTED)) {
						u(!1, n.classed(i.SELECTED, !1), t, e)
					}
				})
			}
			;
			s.classed(i.SELECTED, !c);
			u(!c, s, e, n)
		}
	};
	e.initBrush = function () {
		var t = this,
			e = t.d3;
		t.brush = e.svg.brush().on("brush", function () {
			t.redrawForBrush()
		});
		t.brush.update = function () {
			if (t.context) {
				t.context.select("." + i.brush).call(this)
			}
			;
			return this
		};
		t.brush.scale = function (e) {
			return t.config.axis_rotated ? this.y(e) : this.x(e)
		}
	};
	e.initSubchart = function () {
		var t = this,
			n = t.config,
			e = t.context = t.svg.append("g").attr("transform", t.getTranslate("context")),
			a = n.subchart_show ? "visible" : "hidden";
		e.style("visibility", a);
		e.append("g").attr("clip-path", t.clipPathForSubchart).attr("class", i.chart);
		e.select("." + i.chart).append("g").attr("class", i.chartBars);
		e.select("." + i.chart).append("g").attr("class", i.chartLines);
		e.append("g").attr("clip-path", t.clipPath).attr("class", i.brush).call(t.brush);
		t.axes.subx = e.append("g").attr("class", i.axisX).attr("transform", t.getTranslate("subx")).attr("clip-path", n.axis_rotated ? "" : t.clipPathForXAxis).style("visibility", n.subchart_axis_x_show ? a : "hidden")
	};
	e.updateTargetsForSubchart = function (t) {
		var e = this,
			n = e.context,
			a = e.config,
			r, s, o, c, u = e.classChartBar.bind(e),
			d = e.classBars.bind(e),
			l = e.classChartLine.bind(e),
			h = e.classLines.bind(e),
			g = e.classAreas.bind(e);
		if (a.subchart_show) {
			c = n.select("." + i.chartBars).selectAll("." + i.chartBar).data(t).attr("class", u);
			o = c.enter().append("g").style("opacity", 0).attr("class", u);
			o.append("g").attr("class", d);
			s = n.select("." + i.chartLines).selectAll("." + i.chartLine).data(t).attr("class", l);
			r = s.enter().append("g").style("opacity", 0).attr("class", l);
			r.append("g").attr("class", h);
			r.append("g").attr("class", g);
			n.selectAll("." + i.brush + " rect").attr(a.axis_rotated ? "width" : "height", a.axis_rotated ? e.width2 : e.height2)
		}
	};
	e.updateBarForSubchart = function (t) {
		var e = this;
		e.contextBar = e.context.selectAll("." + i.bars).selectAll("." + i.bar).data(e.barData.bind(e));
		e.contextBar.enter().append("path").attr("class", e.classBar.bind(e)).style("stroke", "none").style("fill", e.color);
		e.contextBar.style("opacity", e.initialOpacity.bind(e));
		e.contextBar.exit().transition().duration(t).style("opacity", 0).remove()
	};
	e.redrawBarForSubchart = function (t, e, i) {
		(e ? this.contextBar.transition(Math.random().toString()).duration(i) : this.contextBar).attr("d", t).style("opacity", 1)
	};
	e.updateLineForSubchart = function (t) {
		var e = this;
		e.contextLine = e.context.selectAll("." + i.lines).selectAll("." + i.line).data(e.lineData.bind(e));
		e.contextLine.enter().append("path").attr("class", e.classLine.bind(e)).style("stroke", e.color);
		e.contextLine.style("opacity", e.initialOpacity.bind(e));
		e.contextLine.exit().transition().duration(t).style("opacity", 0).remove()
	};
	e.redrawLineForSubchart = function (t, e, i) {
		(e ? this.contextLine.transition(Math.random().toString()).duration(i) : this.contextLine).attr("d", t).style("opacity", 1)
	};
	e.updateAreaForSubchart = function (t) {
		var e = this,
			n = e.d3;
		e.contextArea = e.context.selectAll("." + i.areas).selectAll("." + i.area).data(e.lineData.bind(e));
		e.contextArea.enter().append("path").attr("class", e.classArea.bind(e)).style("fill", e.color).style("opacity", function () {
			e.orgAreaOpacity = +n.select(this).style("opacity");
			return 0
		});
		e.contextArea.style("opacity", 0);
		e.contextArea.exit().transition().duration(t).style("opacity", 0).remove()
	};
	e.redrawAreaForSubchart = function (t, e, i) {
		(e ? this.contextArea.transition(Math.random().toString()).duration(i) : this.contextArea).attr("d", t).style("fill", this.color).style("opacity", this.orgAreaOpacity)
	};
	e.redrawSubchart = function (t, e, i, n, a, s, o) {
		var r = this,
			c = r.d3,
			u = r.config,
			l, d, h;
		r.context.style("visibility", u.subchart_show ? "visible" : "hidden");
		if (u.subchart_show) {
			if (c.event && c.event.type === "zoom") {
				r.brush.extent(r.x.orgDomain()).update()
			}
			;
			if (t) {
				if (!r.brush.empty()) {
					r.brush.extent(r.x.orgDomain()).update()
				}
				;
				l = r.generateDrawArea(a, !0);
				d = r.generateDrawBar(s, !0);
				h = r.generateDrawLine(o, !0);
				r.updateBarForSubchart(i);
				r.updateLineForSubchart(i);
				r.updateAreaForSubchart(i);
				r.redrawBarForSubchart(d, i, i);
				r.redrawLineForSubchart(h, i, i);
				r.redrawAreaForSubchart(l, i, i)
			}
		}
	};
	e.redrawForBrush = function () {
		var t = this,
			e = t.x;
		t.redraw({
			withTransition: !1,
			withY: t.config.zoom_rescale,
			withSubchart: !1,
			withUpdateXDomain: !0,
			withDimension: !1
		});
		t.config.subchart_onbrush.call(t.api, e.orgDomain())
	};
	e.transformContext = function (t, e) {
		var a = this,
			n;
		if (e && e.axisSubX) {
			n = e.axisSubX
		} else {
			n = a.context.select("." + i.axisX);
			if (t) {
				n = n.transition()
			}
		}
		;
		a.context.attr("transform", a.getTranslate("context"));
		n.attr("transform", a.getTranslate("subx"))
	};
	e.getDefaultExtent = function () {
		var t = this,
			i = t.config,
			e = d(i.axis_x_extent) ? i.axis_x_extent(t.getXDomain(t.data.targets)) : i.axis_x_extent;
		if (t.isTimeSeries()) {
			e = [t.parseDate(e[0]), t.parseDate(e[1])]
		}
		;
		return e
	};
	e.initZoom = function () {
		var t = this,
			e = t.d3,
			i = t.config,
			n;
		t.zoom = e.behavior.zoom().on("zoomstart", function () {
			n = e.event.sourceEvent;
			t.zoom.altDomain = e.event.sourceEvent.altKey ? t.x.orgDomain() : null;
			i.zoom_onzoomstart.call(t.api, e.event.sourceEvent)
		}).on("zoom", function () {
			t.redrawForZoom.call(t)
		}).on("zoomend", function () {
			var a = e.event.sourceEvent;
			if (a && n.clientX === a.clientX && n.clientY === a.clientY) {
				return
			}
			;
			t.redrawEventRect();
			t.updateZoom();
			i.zoom_onzoomend.call(t.api, t.x.orgDomain())
		});
		t.zoom.scale = function (t) {
			return i.axis_rotated ? this.y(t) : this.x(t)
		};
		t.zoom.orgScaleExtent = function () {
			var e = i.zoom_extent ? i.zoom_extent : [1, 10];
			return [e[0], Math.max(t.getMaxDataCount() / e[1], e[1])]
		};
		t.zoom.updateScaleExtent = function () {
			var e = g(t.x.orgDomain()) / g(t.getZoomDomain()),
				i = this.orgScaleExtent();
			this.scaleExtent([i[0] * e, i[1] * e]);
			return this
		}
	};
	e.getZoomDomain = function () {
		var t = this,
			e = t.config,
			i = t.d3,
			n = i.min([t.orgXDomain[0], e.zoom_x_min]),
			a = i.max([t.orgXDomain[1], e.zoom_x_max]);
		return [n, a]
	};
	e.updateZoom = function () {
		var t = this,
			e = t.config.zoom_enabled ? t.zoom : function () {
			};
		t.main.select("." + i.zoomRect).call(e).on("dblclick.zoom", null);
		t.main.selectAll("." + i.eventRect).call(e).on("dblclick.zoom", null)
	};
	e.redrawForZoom = function () {
		var t = this,
			a = t.d3,
			i = t.config,
			n = t.zoom,
			e = t.x;
		if (!i.zoom_enabled) {
			return
		}
		;
		if (t.filterTargetsToShow(t.data.targets).length === 0) {
			return
		}
		;
		if (a.event.sourceEvent.type === "mousemove" && n.altDomain) {
			e.domain(n.altDomain);
			n.scale(e).updateScaleExtent();
			return
		}
		;
		if (t.isCategorized() && e.orgDomain()[0] === t.orgXDomain[0]) {
			e.domain([t.orgXDomain[0] - 1e-10, e.orgDomain()[1]])
		}
		;
		t.redraw({
			withTransition: !1,
			withY: i.zoom_rescale,
			withSubchart: !1,
			withEventRect: !1,
			withDimension: !1
		});
		if (a.event.sourceEvent.type === "mousemove") {
			t.cancelClick = !0
		}
		;
		i.zoom_onzoom.call(t.api, e.orgDomain())
	};
	e.generateColor = function () {
		var n = this,
			e = n.config,
			s = n.d3,
			t = e.data_colors,
			a = u(e.color_pattern) ? e.color_pattern : s.scale.category10().range(),
			r = e.data_color,
			i = [];
		return function (e) {
			var n = e.id || (e.data && e.data.id) || e,
				s;
			if (t[n] instanceof Function) {
				s = t[n](e)
			} else if (t[n]) {
				s = t[n]
			} else {
				if (i.indexOf(n) < 0) {
					i.push(n)
				}
				;
				s = a[i.indexOf(n) % a.length];
				t[n] = s
			}
			;
			return r instanceof Function ? r(s, e) : s
		}
	};
	e.generateLevelColor = function () {
		var a = this,
			e = a.config,
			i = e.color_pattern,
			t = e.color_threshold,
			r = t.unit === "value",
			n = t.values && t.values.length ? t.values : [],
			s = t.max || 100;
		return u(e.color_threshold) ? function (t) {
			var e, a, o = i[i.length - 1];
			for (e = 0; e < n.length; e++) {
				a = r ? t : (t * 100 / s);
				if (a < n[e]) {
					o = i[e];
					break
				}
			}
			;
			return o
		} : null
	};
	e.getYFormat = function (t) {
		var e = this,
			i = t && !e.hasType("gauge") ? e.defaultArcValueFormat : e.yFormat,
			n = t && !e.hasType("gauge") ? e.defaultArcValueFormat : e.y2Format;
		return function (t, a, r) {
			var s = e.axis.getId(r) === "y2" ? n : i;
			return s.call(e, t, a)
		}
	};
	e.yFormat = function (t) {
		var e = this,
			i = e.config,
			n = i.axis_y_tick_format ? i.axis_y_tick_format : e.defaultValueFormat;
		return n(t)
	};
	e.y2Format = function (t) {
		var e = this,
			i = e.config,
			n = i.axis_y2_tick_format ? i.axis_y2_tick_format : e.defaultValueFormat;
		return n(t)
	};
	e.defaultValueFormat = function (t) {
		return r(t) ? +t : ""
	};
	e.defaultArcValueFormat = function (t, e) {
		return (e * 100).toFixed(1) + "%"
	};
	e.dataLabelFormat = function (t) {
		var a = this,
			e = a.config.data_labels,
			i, n = function (t) {
				return r(t) ? +t : ""
			};
		if (typeof e.format === "function") {
			i = e.format
		} else if (typeof e.format === "object") {
			if (e.format[t]) {
				i = e.format[t] === !0 ? n : e.format[t]
			} else {
				i = function () {
					return ""
				}
			}
		} else {
			i = n
		}
		;
		return i
	};
	e.hasCaches = function (t) {
		for (var e = 0; e < t.length; e++) {
			if (!(t[e] in this.cache)) {
				return !1
			}
		}
		;
		return !0
	};
	e.addCache = function (t, e) {
		this.cache[t] = this.cloneTarget(e)
	};
	e.getCaches = function (t) {
		var i = [],
			e;
		for (e = 0; e < t.length; e++) {
			if (t[e] in this.cache) {
				i.push(this.cloneTarget(this.cache[t[e]]))
			}
		}
		;
		return i
	};
	var i = e.CLASS = {
		target: "c3-target",
		chart: "c3-chart",
		chartLine: "c3-chart-line",
		chartLines: "c3-chart-lines",
		chartBar: "c3-chart-bar",
		chartBars: "c3-chart-bars",
		chartText: "c3-chart-text",
		chartTexts: "c3-chart-texts",
		chartArc: "c3-chart-arc",
		chartArcs: "c3-chart-arcs",
		chartArcsTitle: "c3-chart-arcs-title",
		chartArcsBackground: "c3-chart-arcs-background",
		chartArcsGaugeUnit: "c3-chart-arcs-gauge-unit",
		chartArcsGaugeMax: "c3-chart-arcs-gauge-max",
		chartArcsGaugeMin: "c3-chart-arcs-gauge-min",
		selectedCircle: "c3-selected-circle",
		selectedCircles: "c3-selected-circles",
		eventRect: "c3-event-rect",
		eventRects: "c3-event-rects",
		eventRectsSingle: "c3-event-rects-single",
		eventRectsMultiple: "c3-event-rects-multiple",
		zoomRect: "c3-zoom-rect",
		brush: "c3-brush",
		focused: "c3-focused",
		defocused: "c3-defocused",
		region: "c3-region",
		regions: "c3-regions",
		title: "c3-title",
		tooltipContainer: "c3-tooltip-container",
		tooltip: "c3-tooltip",
		tooltipName: "c3-tooltip-name",
		shape: "c3-shape",
		shapes: "c3-shapes",
		line: "c3-line",
		lines: "c3-lines",
		bar: "c3-bar",
		bars: "c3-bars",
		circle: "c3-circle",
		circles: "c3-circles",
		arc: "c3-arc",
		arcs: "c3-arcs",
		area: "c3-area",
		areas: "c3-areas",
		empty: "c3-empty",
		text: "c3-text",
		texts: "c3-texts",
		gaugeValue: "c3-gauge-value",
		grid: "c3-grid",
		gridLines: "c3-grid-lines",
		xgrid: "c3-xgrid",
		xgrids: "c3-xgrids",
		xgridLine: "c3-xgrid-line",
		xgridLines: "c3-xgrid-lines",
		xgridFocus: "c3-xgrid-focus",
		ygrid: "c3-ygrid",
		ygrids: "c3-ygrids",
		ygridLine: "c3-ygrid-line",
		ygridLines: "c3-ygrid-lines",
		axis: "c3-axis",
		axisX: "c3-axis-x",
		axisXLabel: "c3-axis-x-label",
		axisY: "c3-axis-y",
		axisYLabel: "c3-axis-y-label",
		axisY2: "c3-axis-y2",
		axisY2Label: "c3-axis-y2-label",
		legendBackground: "c3-legend-background",
		legendItem: "c3-legend-item",
		legendItemEvent: "c3-legend-item-event",
		legendItemTile: "c3-legend-item-tile",
		legendItemHidden: "c3-legend-item-hidden",
		legendItemFocused: "c3-legend-item-focused",
		dragarea: "c3-dragarea",
		EXPANDED: "_expanded_",
		SELECTED: "_selected_",
		INCLUDED: "_included_"
	};
	e.generateClass = function (t, e) {
		return " " + t + " " + t + this.getTargetSelectorSuffix(e)
	};
	e.classText = function (t) {
		return this.generateClass(i.text, t.index)
	};
	e.classTexts = function (t) {
		return this.generateClass(i.texts, t.id)
	};
	e.classShape = function (t) {
		return this.generateClass(i.shape, t.index)
	};
	e.classShapes = function (t) {
		return this.generateClass(i.shapes, t.id)
	};
	e.classLine = function (t) {
		return this.classShape(t) + this.generateClass(i.line, t.id)
	};
	e.classLines = function (t) {
		return this.classShapes(t) + this.generateClass(i.lines, t.id)
	};
	e.classCircle = function (t) {
		return this.classShape(t) + this.generateClass(i.circle, t.index)
	};
	e.classCircles = function (t) {
		return this.classShapes(t) + this.generateClass(i.circles, t.id)
	};
	e.classBar = function (t) {
		return this.classShape(t) + this.generateClass(i.bar, t.index)
	};
	e.classBars = function (t) {
		return this.classShapes(t) + this.generateClass(i.bars, t.id)
	};
	e.classArc = function (t) {
		return this.classShape(t.data) + this.generateClass(i.arc, t.data.id)
	};
	e.classArcs = function (t) {
		return this.classShapes(t.data) + this.generateClass(i.arcs, t.data.id)
	};
	e.classArea = function (t) {
		return this.classShape(t) + this.generateClass(i.area, t.id)
	};
	e.classAreas = function (t) {
		return this.classShapes(t) + this.generateClass(i.areas, t.id)
	};
	e.classRegion = function (t, e) {
		return this.generateClass(i.region, e) + " " + ("class" in t ? t["class"] : "")
	};
	e.classEvent = function (t) {
		return this.generateClass(i.eventRect, t.index)
	};
	e.classTarget = function (t) {
		var e = this,
			n = e.config.data_classes[t],
			a = "";
		if (n) {
			a = " " + i.target + "-" + n
		}
		;
		return e.generateClass(i.target, t) + a
	};
	e.classFocus = function (t) {
		return this.classFocused(t) + this.classDefocused(t)
	};
	e.classFocused = function (t) {
		return " " + (this.focusedTargetIds.indexOf(t.id) >= 0 ? i.focused : "")
	};
	e.classDefocused = function (t) {
		return " " + (this.defocusedTargetIds.indexOf(t.id) >= 0 ? i.defocused : "")
	};
	e.classChartText = function (t) {
		return i.chartText + this.classTarget(t.id)
	};
	e.classChartLine = function (t) {
		return i.chartLine + this.classTarget(t.id)
	};
	e.classChartBar = function (t) {
		return i.chartBar + this.classTarget(t.id)
	};
	e.classChartArc = function (t) {
		return i.chartArc + this.classTarget(t.data.id)
	};
	e.getTargetSelectorSuffix = function (t) {
		return t || t === 0 ? ("-" + t).replace(/[\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, "-") : ""
	};
	e.selectorTarget = function (t, e) {
		return (e || "") + "." + i.target + this.getTargetSelectorSuffix(t)
	};
	e.selectorTargets = function (t, e) {
		var i = this;
		t = t || [];
		return t.length ? t.map(function (t) {
			return i.selectorTarget(t, e)
		}) : null
	};
	e.selectorLegend = function (t) {
		return "." + i.legendItem + this.getTargetSelectorSuffix(t)
	};
	e.selectorLegends = function (t) {
		var e = this;
		return t && t.length ? t.map(function (t) {
			return e.selectorLegend(t)
		}) : null
	};
	var r = e.isValue = function (t) {
			return t || t === 0
		},
		d = e.isFunction = function (t) {
			return typeof t === "function"
		},
		c = e.isString = function (t) {
			return typeof t === "string"
		},
		l = e.isUndefined = function (t) {
			return typeof t === "undefined"
		},
		o = e.isDefined = function (t) {
			return typeof t !== "undefined"
		},
		x = e.ceil10 = function (t) {
			return Math.ceil(t / 10) * 10
		},
		f = e.asHalfPixel = function (t) {
			return Math.ceil(t) + 0.5
		},
		g = e.diffDomain = function (t) {
			return t[1] - t[0]
		},
		m = e.isEmpty = function (t) {
			return typeof t === "undefined" || t === null || (c(t) && t.length === 0) || (typeof t === "object" && Object.keys(t).length === 0)
		},
		u = e.notEmpty = function (t) {
			return !e.isEmpty(t)
		},
		s = e.getOption = function (t, e, i) {
			return o(t[e]) ? t[e] : i
		},
		T = e.hasValue = function (t, e) {
			var i = !1;
			Object.keys(t).forEach(function (n) {
				if (t[n] === e) {
					i = !0
				}
			});
			return i
		},
		y = e.sanitise = function (t) {
			return typeof t === "string" ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;") : t
		},
		P = e.getPathBox = function (t) {
			var i = t.getBoundingClientRect(),
				e = [t.pathSegList.getItem(0), t.pathSegList.getItem(1)],
				n = e[0].x,
				a = Math.min(e[0].y, e[1].y);
			return {
				x: n,
				y: a,
				width: i.width,
				height: i.height
			}
		};
	n.focus = function (t) {
		var e = this.internal,
			n;
		t = e.mapToTargetIds(t);
		n = e.svg.selectAll(e.selectorTargets(t.filter(e.isTargetToShow, e))), this.revert();
		this.defocus();
		n.classed(i.focused, !0).classed(i.defocused, !1);
		if (e.hasArcType()) {
			e.expandArc(t)
		}
		;
		e.toggleFocusLegend(t, !0);
		e.focusedTargetIds = t;
		e.defocusedTargetIds = e.defocusedTargetIds.filter(function (e) {
			return t.indexOf(e) < 0
		})
	};
	n.defocus = function (t) {
		var e = this.internal,
			n;
		t = e.mapToTargetIds(t);
		n = e.svg.selectAll(e.selectorTargets(t.filter(e.isTargetToShow, e))), n.classed(i.focused, !1).classed(i.defocused, !0);
		if (e.hasArcType()) {
			e.unexpandArc(t)
		}
		;
		e.toggleFocusLegend(t, !1);
		e.focusedTargetIds = e.focusedTargetIds.filter(function (e) {
			return t.indexOf(e) < 0
		});
		e.defocusedTargetIds = t
	};
	n.revert = function (t) {
		var e = this.internal,
			n;
		t = e.mapToTargetIds(t);
		n = e.svg.selectAll(e.selectorTargets(t));
		n.classed(i.focused, !1).classed(i.defocused, !1);
		if (e.hasArcType()) {
			e.unexpandArc(t)
		}
		;
		if (e.config.legend_show) {
			e.showLegend(t.filter(e.isLegendToShow.bind(e)));
			e.legend.selectAll(e.selectorLegends(t)).filter(function () {
				return e.d3.select(this).classed(i.legendItemFocused)
			}).classed(i.legendItemFocused, !1)
		}
		;
		e.focusedTargetIds = [];
		e.defocusedTargetIds = []
	};
	n.show = function (t, e) {
		var i = this.internal,
			n;
		t = i.mapToTargetIds(t);
		e = e || {};
		i.removeHiddenTargetIds(t);
		n = i.svg.selectAll(i.selectorTargets(t));
		n.transition().style("opacity", 1, "important").call(i.endall, function () {
			n.style("opacity", null).style("opacity", 1)
		});
		if (e.withLegend) {
			i.showLegend(t)
		}
		;
		i.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		})
	};
	n.hide = function (t, e) {
		var i = this.internal,
			n;
		t = i.mapToTargetIds(t);
		e = e || {};
		i.addHiddenTargetIds(t);
		n = i.svg.selectAll(i.selectorTargets(t));
		n.transition().style("opacity", 0, "important").call(i.endall, function () {
			n.style("opacity", null).style("opacity", 0)
		});
		if (e.withLegend) {
			i.hideLegend(t)
		}
		;
		i.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		})
	};
	n.toggle = function (t, e) {
		var i = this,
			n = this.internal;
		n.mapToTargetIds(t).forEach(function (t) {
			n.isTargetToShow(t) ? i.hide(t, e) : i.show(t, e)
		})
	};
	n.zoom = function (t) {
		var e = this.internal;
		if (t) {
			if (e.isTimeSeries()) {
				t = t.map(function (t) {
					return e.parseDate(t)
				})
			}
			;
			e.brush.extent(t);
			e.redraw({
				withUpdateXDomain: !0,
				withY: e.config.zoom_rescale
			});
			e.config.zoom_onzoom.call(this, e.x.orgDomain())
		}
		;
		return e.brush.extent()
	};
	n.zoom.enable = function (t) {
		var e = this.internal;
		e.config.zoom_enabled = t;
		e.updateAndRedraw()
	};
	n.unzoom = function () {
		var t = this.internal;
		t.brush.clear().update();
		t.redraw({
			withUpdateXDomain: !0
		})
	};
	n.zoom.max = function (t) {
		var e = this.internal,
			i = e.config,
			n = e.d3;
		if (t === 0 || t) {
			i.zoom_x_max = n.max([e.orgXDomain[1], t])
		} else {
			return i.zoom_x_max
		}
	};
	n.zoom.min = function (t) {
		var e = this.internal,
			i = e.config,
			n = e.d3;
		if (t === 0 || t) {
			i.zoom_x_min = n.min([e.orgXDomain[0], t])
		} else {
			return i.zoom_x_min
		}
	};
	n.zoom.range = function (t) {
		if (arguments.length) {
			if (o(t.max)) {
				this.domain.max(t.max)
			}
			;
			if (o(t.min)) {
				this.domain.min(t.min)
			}
		} else {
			return {
				max: this.domain.max(),
				min: this.domain.min()
			}
		}
	};
	n.load = function (t) {
		var e = this.internal,
			i = e.config;
		if (t.xs) {
			e.addXs(t.xs)
		}
		;
		if ("names" in t) {
			n.data.names.bind(this)(t.names)
		}
		;
		if ("classes" in t) {
			Object.keys(t.classes).forEach(function (e) {
				i.data_classes[e] = t.classes[e]
			})
		}
		;
		if ("categories" in t && e.isCategorized()) {
			i.axis_x_categories = t.categories
		}
		;
		if ("axes" in t) {
			Object.keys(t.axes).forEach(function (e) {
				i.data_axes[e] = t.axes[e]
			})
		}
		;
		if ("colors" in t) {
			Object.keys(t.colors).forEach(function (e) {
				i.data_colors[e] = t.colors[e]
			})
		}
		;
		if ("cacheIds" in t && e.hasCaches(t.cacheIds)) {
			e.load(e.getCaches(t.cacheIds), t.done);
			return
		}
		;
		if ("unload" in t) {
			e.unload(e.mapToTargetIds((typeof t.unload === "boolean" && t.unload) ? null : t.unload), function () {
				e.loadFromArgs(t)
			})
		} else {
			e.loadFromArgs(t)
		}
	};
	n.unload = function (t) {
		var e = this.internal;
		t = t || {};
		if (t instanceof Array) {
			t = {
				ids: t
			}
		} else if (typeof t === "string") {
			t = {
				ids: [t]
			}
		}
		;
		e.unload(e.mapToTargetIds(t.ids), function () {
			e.redraw({
				withUpdateOrgXDomain: !0,
				withUpdateXDomain: !0,
				withLegend: !0
			});
			if (t.done) {
				t.done()
			}
		})
	};
	n.flow = function (t) {
		var e = this.internal,
			i, l, g = [],
			d = e.getMaxDataCount(),
			p, h, s, a, c = 0,
			n = 0,
			u, f;
		if (t.json) {
			l = e.convertJsonToData(t.json, t.keys)
		} else if (t.rows) {
			l = e.convertRowsToData(t.rows)
		} else if (t.columns) {
			l = e.convertColumnsToData(t.columns)
		} else {
			return
		}
		;
		i = e.convertDataToTargets(l, !0);
		e.data.targets.forEach(function (t) {
			var s = !1,
				a, r;
			for (a = 0; a < i.length; a++) {
				if (t.id === i[a].id) {
					s = !0;
					if (t.values[t.values.length - 1]) {
						n = t.values[t.values.length - 1].index + 1
					}
					;
					c = i[a].values.length;
					for (r = 0; r < c; r++) {
						i[a].values[r].index = n + r;
						if (!e.isTimeSeries()) {
							i[a].values[r].x = n + r
						}
					}
					;
					t.values = t.values.concat(i[a].values);
					i.splice(a, 1);
					break
				}
			}
			;
			if (!s) {
				g.push(t.id)
			}
		});
		e.data.targets.forEach(function (t) {
			var a, i;
			for (a = 0; a < g.length; a++) {
				if (t.id === g[a]) {
					n = t.values[t.values.length - 1].index + 1;
					for (i = 0; i < c; i++) {
						t.values.push({
							id: t.id,
							index: n + i,
							x: e.isTimeSeries() ? e.getOtherTargetX(n + i) : n + i,
							value: null
						})
					}
				}
			}
		});
		if (e.data.targets.length) {
			i.forEach(function (t) {
				var i, a = [];
				for (i = e.data.targets[0].values[0].index; i < n; i++) {
					a.push({
						id: t.id,
						index: i,
						x: e.isTimeSeries() ? e.getOtherTargetX(i) : i,
						value: null
					})
				}
				;
				t.values.forEach(function (t) {
					t.index += n;
					if (!e.isTimeSeries()) {
						t.x += n
					}
				});
				t.values = a.concat(t.values)
			})
		}
		;
		e.data.targets = e.data.targets.concat(i);
		p = e.getMaxDataCount();
		s = e.data.targets[0];
		a = s.values[0];
		if (o(t.to)) {
			c = 0;
			f = e.isTimeSeries() ? e.parseDate(t.to) : t.to;
			s.values.forEach(function (t) {
				if (t.x < f) {
					c++
				}
			})
		} else if (o(t.length)) {
			c = t.length
		}
		;
		if (!d) {
			if (e.isTimeSeries()) {
				if (s.values.length > 1) {
					u = s.values[s.values.length - 1].x - a.x
				} else {
					u = a.x - e.getXDomain(e.data.targets)[0]
				}
			} else {
				u = 1
			}
			;
			h = [a.x - u, a.x];
			e.updateXDomain(null, !0, !0, !1, h)
		} else if (d === 1) {
			if (e.isTimeSeries()) {
				u = (s.values[s.values.length - 1].x - a.x) / 2;
				h = [new Date(+a.x - u), new Date(+a.x + u)];
				e.updateXDomain(null, !0, !0, !1, h)
			}
		}
		;
		e.updateTargets(e.data.targets);
		e.redraw({
			flow: {
				index: a.index,
				length: c,
				duration: r(t.duration) ? t.duration : e.config.transition_duration,
				done: t.done,
				orgDataCount: d,
			},
			withLegend: !0,
			withTransition: d > 1,
			withTrimXDomain: !1,
			withUpdateXAxis: !0,
		})
	};
	e.generateFlow = function (t) {
		var e = this,
			a = e.config,
			n = e.d3;
		return function () {
			var L = t.targets,
				c = t.flow,
				w = t.drawBar,
				V = t.drawLine,
				G = t.drawArea,
				E = t.cx,
				I = t.cy,
				y = t.xv,
				O = t.xForText,
				R = t.yForText,
				D = t.duration,
				o, S = 1,
				s, l = c.index,
				f = c.length,
				d = e.getValueOnIndex(e.data.targets[0].values, l),
				h = e.getValueOnIndex(e.data.targets[0].values, l + f),
				p = e.x.domain(),
				u, F = c.duration || D,
				k = c.done || function () {
					},
				r = e.generateWait(),
				v = e.xgrid || n.selectAll([]),
				x = e.xgridLines || n.selectAll([]),
				m = e.mainRegion || n.selectAll([]),
				b = e.mainText || n.selectAll([]),
				A = e.mainBar || n.selectAll([]),
				T = e.mainLine || n.selectAll([]),
				P = e.mainArea || n.selectAll([]),
				C = e.mainCircle || n.selectAll([]);
			e.flowing = !0;
			e.data.targets.forEach(function (t) {
				t.values.splice(0, f)
			});
			u = e.updateXDomain(L, !0, !0);
			if (e.updateXGrid) {
				e.updateXGrid(!0)
			}
			;
			if (!c.orgDataCount) {
				if (e.data.targets[0].values.length !== 1) {
					o = e.x(p[0]) - e.x(u[0])
				} else {
					if (e.isTimeSeries()) {
						d = e.getValueOnIndex(e.data.targets[0].values, 0);
						h = e.getValueOnIndex(e.data.targets[0].values, e.data.targets[0].values.length - 1);
						o = e.x(d.x) - e.x(h.x)
					} else {
						o = g(u) / 2
					}
				}
			} else if (c.orgDataCount === 1 || (d && d.x) === (h && h.x)) {
				o = e.x(p[0]) - e.x(u[0])
			} else {
				if (e.isTimeSeries()) {
					o = (e.x(p[0]) - e.x(u[0]))
				} else {
					o = (e.x(d.x) - e.x(h.x))
				}
			}
			;
			S = (g(p) / g(u));
			s = "translate(" + o + ",0) scale(" + S + ",1)";
			e.hideXGridFocus();
			n.transition().ease("linear").duration(F).each(function () {
				r.add(e.axes.x.transition().call(e.xAxis));
				r.add(A.transition().attr("transform", s));
				r.add(T.transition().attr("transform", s));
				r.add(P.transition().attr("transform", s));
				r.add(C.transition().attr("transform", s));
				r.add(b.transition().attr("transform", s));
				r.add(m.filter(e.isRegionOnX).transition().attr("transform", s));
				r.add(v.transition().attr("transform", s));
				r.add(x.transition().attr("transform", s))
			}).call(r, function () {
				var t, n = [],
					r = [],
					s = [];
				if (f) {
					for (t = 0; t < f; t++) {
						n.push("." + i.shape + "-" + (l + t));
						r.push("." + i.text + "-" + (l + t));
						s.push("." + i.eventRect + "-" + (l + t))
					}
					;
					e.svg.selectAll("." + i.shapes).selectAll(n).remove();
					e.svg.selectAll("." + i.texts).selectAll(r).remove();
					e.svg.selectAll("." + i.eventRects).selectAll(s).remove();
					e.svg.select("." + i.xgrid).remove()
				}
				;
				v.attr("transform", null).attr(e.xgridAttr);
				x.attr("transform", null);
				x.select("line").attr("x1", a.axis_rotated ? 0 : y).attr("x2", a.axis_rotated ? e.width : y);
				x.select("text").attr("x", a.axis_rotated ? e.width : 0).attr("y", y);
				A.attr("transform", null).attr("d", w);
				T.attr("transform", null).attr("d", V);
				P.attr("transform", null).attr("d", G);
				C.attr("transform", null).attr("cx", E).attr("cy", I);
				b.attr("transform", null).attr("x", O).attr("y", R).style("fill-opacity", e.opacityForText.bind(e));
				m.attr("transform", null);
				m.select("rect").filter(e.isRegionOnX).attr("x", e.regionX.bind(e)).attr("width", e.regionWidth.bind(e));
				if (a.interaction_enabled) {
					e.redrawEventRect()
				}
				;
				k();
				e.flowing = !1
			})
		}
	};
	n.selected = function (t) {
		var e = this.internal,
			n = e.d3;
		return n.merge(e.main.selectAll("." + i.shapes + e.getTargetSelectorSuffix(t)).selectAll("." + i.shape).filter(function () {
			return n.select(this).classed(i.SELECTED)
		}).map(function (t) {
			return t.map(function (t) {
				var e = t.__data__;
				return e.data ? e.data : e
			})
		}))
	};
	n.select = function (t, e, n) {
		var a = this.internal,
			s = a.d3,
			r = a.config;
		if (!r.data_selection_enabled) {
			return
		}
		;
		a.main.selectAll("." + i.shapes).selectAll("." + i.shape).each(function (c, u) {
			var l = s.select(this),
				g = c.data ? c.data.id : c.id,
				d = a.getToggle(this, c).bind(a),
				f = r.data_selection_grouped || !t || t.indexOf(g) >= 0,
				p = !e || e.indexOf(u) >= 0,
				h = l.classed(i.SELECTED);
			if (l.classed(i.line) || l.classed(i.area)) {
				return
			}
			;
			if (f && p) {
				if (r.data_selection_isselectable(c) && !h) {
					d(!0, l.classed(i.SELECTED, !0), c, u)
				}
			} else if (o(n) && n) {
				if (h) {
					d(!1, l.classed(i.SELECTED, !1), c, u)
				}
			}
		})
	};
	n.unselect = function (t, e) {
		var n = this.internal,
			r = n.d3,
			a = n.config;
		if (!a.data_selection_enabled) {
			return
		}
		;
		n.main.selectAll("." + i.shapes).selectAll("." + i.shape).each(function (s, o) {
			var c = r.select(this),
				u = s.data ? s.data.id : s.id,
				l = n.getToggle(this, s).bind(n),
				d = a.data_selection_grouped || !t || t.indexOf(u) >= 0,
				h = !e || e.indexOf(o) >= 0,
				g = c.classed(i.SELECTED);
			if (c.classed(i.line) || c.classed(i.area)) {
				return
			}
			;
			if (d && h) {
				if (a.data_selection_isselectable(s)) {
					if (g) {
						l(!1, c.classed(i.SELECTED, !1), s, o)
					}
				}
			}
		})
	};
	n.transform = function (t, e) {
		var i = this.internal,
			n = ["pie", "donut"].indexOf(t) >= 0 ? {
				withTransform: !0
			} : null;
		i.transformTo(e, t, n)
	};
	e.transformTo = function (t, e, i) {
		var n = this,
			r = !n.hasArcType(),
			a = i || {
					withTransitionForAxis: r
				};
		a.withTransitionForTransform = !1;
		n.transiting = !1;
		n.setTargetType(t, e);
		n.updateTargets(n.data.targets);
		n.updateAndRedraw(a)
	};
	n.groups = function (t) {
		var i = this.internal,
			e = i.config;
		if (l(t)) {
			return e.data_groups
		}
		;
		e.data_groups = t;
		i.redraw();
		return e.data_groups
	};
	n.xgrids = function (t) {
		var i = this.internal,
			e = i.config;
		if (!t) {
			return e.grid_x_lines
		}
		;
		e.grid_x_lines = t;
		i.redrawWithoutRescale();
		return e.grid_x_lines
	};
	n.xgrids.add = function (t) {
		var e = this.internal;
		return this.xgrids(e.config.grid_x_lines.concat(t ? t : []))
	};
	n.xgrids.remove = function (t) {
		var e = this.internal;
		e.removeGridLines(t, !0)
	};
	n.ygrids = function (t) {
		var i = this.internal,
			e = i.config;
		if (!t) {
			return e.grid_y_lines
		}
		;
		e.grid_y_lines = t;
		i.redrawWithoutRescale();
		return e.grid_y_lines
	};
	n.ygrids.add = function (t) {
		var e = this.internal;
		return this.ygrids(e.config.grid_y_lines.concat(t ? t : []))
	};
	n.ygrids.remove = function (t) {
		var e = this.internal;
		e.removeGridLines(t, !1)
	};
	n.regions = function (t) {
		var i = this.internal,
			e = i.config;
		if (!t) {
			return e.regions
		}
		;
		e.regions = t;
		i.redrawWithoutRescale();
		return e.regions
	};
	n.regions.add = function (t) {
		var i = this.internal,
			e = i.config;
		if (!t) {
			return e.regions
		}
		;
		e.regions = e.regions.concat(t);
		i.redrawWithoutRescale();
		return e.regions
	};
	n.regions.remove = function (t) {
		var e = this.internal,
			n = e.config,
			a, r, s;
		t = t || {};
		a = e.getOption(t, "duration", n.transition_duration);
		r = e.getOption(t, "classes", [i.region]);
		s = e.main.select("." + i.regions).selectAll(r.map(function (t) {
			return "." + t
		}));
		(a ? s.transition().duration(a) : s).style("opacity", 0).remove();
		n.regions = n.regions.filter(function (t) {
			var e = !1;
			if (!t["class"]) {
				return !0
			}
			;
			t["class"].split(" ").forEach(function (t) {
				if (r.indexOf(t) >= 0) {
					e = !0
				}
			});
			return !e
		});
		return n.regions
	};
	n.data = function (t) {
		var e = this.internal.data.targets;
		return typeof t === "undefined" ? e : e.filter(function (e) {
			return [].concat(t).indexOf(e.id) >= 0
		})
	};
	n.data.shown = function (t) {
		return this.internal.filterTargetsToShow(this.data(t))
	};
	n.data.values = function (t) {
		var e, i = null;
		if (t) {
			e = this.data(t);
			i = e[0] ? e[0].values.map(function (t) {
				return t.value
			}) : null
		}
		;
		return i
	};
	n.data.names = function (t) {
		this.internal.clearLegendItemTextBoxCache();
		return this.internal.updateDataAttributes("names", t)
	};
	n.data.colors = function (t) {
		return this.internal.updateDataAttributes("colors", t)
	};
	n.data.axes = function (t) {
		return this.internal.updateDataAttributes("axes", t)
	};
	n.category = function (t, e) {
		var i = this.internal,
			n = i.config;
		if (arguments.length > 1) {
			n.axis_x_categories[t] = e;
			i.redraw()
		}
		;
		return n.axis_x_categories[t]
	};
	n.categories = function (t) {
		var i = this.internal,
			e = i.config;
		if (!arguments.length) {
			return e.axis_x_categories
		}
		;
		e.axis_x_categories = t;
		i.redraw();
		return e.axis_x_categories
	};
	n.color = function (t) {
		var e = this.internal;
		return e.color(t)
	};
	n.x = function (t) {
		var e = this.internal;
		if (arguments.length) {
			e.updateTargetX(e.data.targets, t);
			e.redraw({
				withUpdateOrgXDomain: !0,
				withUpdateXDomain: !0
			})
		}
		;
		return e.data.xs
	};
	n.xs = function (t) {
		var e = this.internal;
		if (arguments.length) {
			e.updateTargetXs(e.data.targets, t);
			e.redraw({
				withUpdateOrgXDomain: !0,
				withUpdateXDomain: !0
			})
		}
		;
		return e.data.xs
	};
	n.axis = function () {
	};
	n.axis.labels = function (t) {
		var e = this.internal;
		if (arguments.length) {
			Object.keys(t).forEach(function (i) {
				e.axis.setLabelText(i, t[i])
			});
			e.axis.updateLabels()
		}
	};
	n.axis.max = function (t) {
		var i = this.internal,
			e = i.config;
		if (arguments.length) {
			if (typeof t === "object") {
				if (r(t.x)) {
					e.axis_x_max = t.x
				}
				;
				if (r(t.y)) {
					e.axis_y_max = t.y
				}
				;
				if (r(t.y2)) {
					e.axis_y2_max = t.y2
				}
			} else {
				e.axis_y_max = e.axis_y2_max = t
			}
			;
			i.redraw({
				withUpdateOrgXDomain: !0,
				withUpdateXDomain: !0
			})
		} else {
			return {
				x: e.axis_x_max,
				y: e.axis_y_max,
				y2: e.axis_y2_max
			}
		}
	};
	n.axis.min = function (t) {
		var i = this.internal,
			e = i.config;
		if (arguments.length) {
			if (typeof t === "object") {
				if (r(t.x)) {
					e.axis_x_min = t.x
				}
				;
				if (r(t.y)) {
					e.axis_y_min = t.y
				}
				;
				if (r(t.y2)) {
					e.axis_y2_min = t.y2
				}
			} else {
				e.axis_y_min = e.axis_y2_min = t
			}
			;
			i.redraw({
				withUpdateOrgXDomain: !0,
				withUpdateXDomain: !0
			})
		} else {
			return {
				x: e.axis_x_min,
				y: e.axis_y_min,
				y2: e.axis_y2_min
			}
		}
	};
	n.axis.range = function (t) {
		if (arguments.length) {
			if (o(t.max)) {
				this.axis.max(t.max)
			}
			;
			if (o(t.min)) {
				this.axis.min(t.min)
			}
		} else {
			return {
				max: this.axis.max(),
				min: this.axis.min()
			}
		}
	};
	n.legend = function () {
	};
	n.legend.show = function (t) {
		var e = this.internal;
		e.showLegend(e.mapToTargetIds(t));
		e.updateAndRedraw({
			withLegend: !0
		})
	};
	n.legend.hide = function (t) {
		var e = this.internal;
		e.hideLegend(e.mapToTargetIds(t));
		e.updateAndRedraw({
			withLegend: !0
		})
	};
	n.resize = function (t) {
		var i = this.internal,
			e = i.config;
		e.size_width = t ? t.width : null;
		e.size_height = t ? t.height : null;
		this.flush()
	};
	n.flush = function () {
		var t = this.internal;
		t.updateAndRedraw({
			withLegend: !0,
			withTransition: !1,
			withTransitionForTransform: !1
		})
	};
	n.destroy = function () {
		var e = this.internal;
		t.clearInterval(e.intervalForObserveInserted);
		if (e.resizeTimeout !== undefined) {
			t.clearTimeout(e.resizeTimeout)
		}
		;
		if (t.detachEvent) {
			t.detachEvent("onresize", e.resizeFunction)
		} else if (t.removeEventListener) {
			t.removeEventListener("resize", e.resizeFunction)
		} else {
			var i = t.onresize;
			if (i && i.add && i.remove) {
				i.remove(e.resizeFunction)
			}
		}
		;
		e.selectChart.classed("c3", !1).html("");
		Object.keys(e).forEach(function (t) {
			e[t] = null
		});
		return null
	};
	n.tooltip = function () {
	};
	n.tooltip.show = function (t) {
		var e = this.internal,
			i, n;
		if (t.mouse) {
			n = t.mouse
		}
		;
		if (t.data) {
			if (e.isMultipleX()) {
				n = [e.x(t.data.x), e.getYScale(t.data.id)(t.data.value)];
				i = null
			} else {
				i = r(t.data.index) ? t.data.index : e.getIndexByX(t.data.x)
			}
		} else if (typeof t.x !== "undefined") {
			i = e.getIndexByX(t.x)
		} else if (typeof t.index !== "undefined") {
			i = t.index
		}
		;
		e.dispatchEvent("mouseover", i, n);
		e.dispatchEvent("mousemove", i, n);
		e.config.tooltip_onshow.call(e, t.data)
	};
	n.tooltip.hide = function () {
		this.internal.dispatchEvent("mouseout", 0);
		this.internal.config.tooltip_onhide.call(this)
	};
	var p;

	function A(t, e) {
		var n = t.scale.linear(),
			o = "bottom",
			r = 6,
			a, m = 3,
			c = null,
			l, h, s = 0,
			g = !0,
			u;
		e = e || {};
		a = e.withOuterTick ? 6 : 0;

		function f(t, e) {
			t.attr("transform", function (t) {
				return "translate(" + Math.ceil(e(t) + s) + ", 0)"
			})
		};

		function x(t, e) {
			t.attr("transform", function (t) {
				return "translate(0," + Math.ceil(e(t)) + ")"
			})
		};

		function S(t) {
			var e = t[0],
				i = t[t.length - 1];
			return e < i ? [e, i] : [i, e]
		};

		function v(t) {
			var i, n, e = [];
			if (t.ticks) {
				return t.ticks.apply(t, h)
			}
			;
			n = t.domain();
			for (i = Math.ceil(n[0]); i < n[1]; i++) {
				e.push(i)
			}
			;
			if (e.length > 0 && e[0] > 0) {
				e.unshift(e[0] - (e[1] - e[0]))
			}
			;
			return e
		};

		function b() {
			var i = n.copy(),
				t;
			if (e.isCategory) {
				t = n.domain();
				i.domain([t[0], t[1] - 1])
			}
			;
			return i
		};

		function d(t) {
			var e = l ? l(t) : t;
			return typeof e !== "undefined" ? e : ""
		};

		function A(t) {
			if (p) {
				return p
			}
			;
			var e = {
				h: 11.5,
				w: 5.5
			};
			t.select("text").text(d).each(function (t) {
				var i = this.getBoundingClientRect(),
					n = d(t),
					a = i.height,
					r = n ? (i.width / n.length) : undefined;
				if (a && r) {
					e.h = a;
					e.w = r
				}
			}).text("");
			p = e;
			return e
		};

		function y(i) {
			return e.withoutTransition ? i : t.transition(i)
		};

		function i(l) {
			l.each(function () {
				var k = i.g = t.select(this),
					I = this.__chart__ || n,
					l = this.__chart__ = b(),
					X = c ? c : v(l),
					O = k.selectAll(".tick").data(X, l),
					C = O.enter().insert("g", ".domain").attr("class", "tick").style("opacity", 1e-6),
					W = O.exit().remove(),
					M = y(O).style("opacity", 1),
					T, R, H, g = n.rangeExtent ? n.rangeExtent() : S(n.range()),
					Y = k.selectAll(".domain").data([0]),
					D = (Y.enter().append("path").attr("class", "domain"), y(Y));
				C.append("line");
				C.append("text");
				var w = C.select("line"),
					V = M.select("line"),
					G = C.select("text"),
					E = M.select("text");
				if (e.isCategory) {
					s = Math.ceil((l(1) - l(0)) / 2);
					R = u ? 0 : s;
					H = u ? s : 0
				} else {
					s = R = 0
				}
				;
				var P, p, F = A(k.select(".tick")),
					N = [],
					h = Math.max(r, 0) + m,
					U = o === "left" || o === "right";

				function Q(t, i) {
					var a = d(t),
						r, n, s, c = [];
					if (Object.prototype.toString.call(a) === "[object Array]") {
						return a
					}
					;
					if (!i || i <= 0) {
						i = U ? 95 : e.isCategory ? (Math.ceil(l(X[1]) - l(X[0])) - 12) : 110
					}
					;

					function o(t, e) {
						n = undefined;
						for (var a = 1; a < e.length; a++) {
							if (e.charAt(a) === " ") {
								n = a
							}
							;
							r = e.substr(0, a + 1);
							s = F.w * r.length;
							if (i < s) {
								return o(t.concat(e.substr(0, n ? n : a)), e.slice(n ? n + 1 : a))
							}
						}
						;
						return t.concat(e)
					};
					return o(c, a + "")
				};

				function z(t, e) {
					var i = F.h;
					if (e === 0) {
						if (o === "left" || o === "right") {
							i = -((N[t.index] - 1) * (F.h / 2) - 3)
						} else {
							i = ".71em"
						}
					}
					;
					return i
				};

				function Z(t) {
					var e = n(t) + (u ? 0 : s);
					return g[0] < e && e < g[1] ? r : 0
				};
				P = O.select("text");
				p = P.selectAll("tspan").data(function (t, i) {
					var n = e.tickMultiline ? Q(t, e.tickWidth) : [].concat(d(t));
					N[i] = n.length;
					return n.map(function (t) {
						return {
							index: i,
							splitted: t
						}
					})
				});
				p.enter().append("tspan");
				p.exit().remove();
				p.text(function (t) {
					return t.splitted
				});
				var L = e.tickTextRotate;

				function K(t) {
					if (!t) {
						return "middle"
					}
					;
					return t > 0 ? "start" : "end"
				};

				function q(t) {
					if (!t) {
						return ""
					}
					;
					return "rotate(" + t + ")"
				};

				function J(t) {
					if (!t) {
						return 0
					}
					;
					return 8 * Math.sin(Math.PI * (t / 180))
				};

				function tt(t) {
					if (!t) {
						return h
					}
					;
					return 11.5 - 2.5 * (t / 15) * (t > 0 ? 1 : -1)
				};
				switch (o) {
					case "bottom":
					{
						T = f;
						w.attr("y2", r);
						G.attr("y", h);
						V.attr("x1", R).attr("x2", R).attr("y2", Z);
						E.attr("x", 0).attr("y", tt(L)).style("text-anchor", K(L)).attr("transform", q(L));
						p.attr("x", 0).attr("dy", z).attr("dx", J(L));
						D.attr("d", "M" + g[0] + "," + a + "V0H" + g[1] + "V" + a);
						break
					}
						;
					case "top":
					{
						T = f;
						w.attr("y2", -r);
						G.attr("y", -h);
						V.attr("x2", 0).attr("y2", -r);
						E.attr("x", 0).attr("y", -h);
						P.style("text-anchor", "middle");
						p.attr("x", 0).attr("dy", "0em");
						D.attr("d", "M" + g[0] + "," + -a + "V0H" + g[1] + "V" + -a);
						break
					}
						;
					case "left":
					{
						T = x;
						w.attr("x2", -r);
						G.attr("x", -h);
						V.attr("x2", -r).attr("y1", H).attr("y2", H);
						E.attr("x", -h).attr("y", s);
						P.style("text-anchor", "end");
						p.attr("x", -h).attr("dy", z);
						D.attr("d", "M" + -a + "," + g[0] + "H0V" + g[1] + "H" + -a);
						break
					}
						;
					case "right":
					{
						T = x;
						w.attr("x2", r);
						G.attr("x", h);
						V.attr("x2", r).attr("y2", 0);
						E.attr("x", h).attr("y", 0);
						P.style("text-anchor", "start");
						p.attr("x", h).attr("dy", z);
						D.attr("d", "M" + a + "," + g[0] + "H0V" + g[1] + "H" + a);
						break
					}
				}
				;
				if (l.rangeBand) {
					var B = l,
						j = B.rangeBand() / 2;
					I = l = function (t) {
						return B(t) + j
					}
				} else if (I.rangeBand) {
					I = l
				} else {
					W.call(T, l)
				}
				;
				C.call(T, I);
				M.call(T, l)
			})
		};
		i.scale = function (t) {
			if (!arguments.length) {
				return n
			}
			;
			n = t;
			return i
		};
		i.orient = function (t) {
			if (!arguments.length) {
				return o
			}
			;
			var e = {
				top: 1,
				right: 1,
				bottom: 1,
				left: 1
			};
			o = t in e ? t + "" : "bottom";
			return i
		};
		i.tickFormat = function (t) {
			if (!arguments.length) {
				return l
			}
			;
			l = t;
			return i
		};
		i.tickCentered = function (t) {
			if (!arguments.length) {
				return u
			}
			;
			u = t;
			return i
		};
		i.tickOffset = function () {
			return s
		};
		i.tickInterval = function () {
			var t, n;
			if (e.isCategory) {
				t = s * 2
			} else {
				n = i.g.select("path.domain").node().getTotalLength() - a * 2;
				t = n / i.g.selectAll("line").size()
			}
			;
			return t === Infinity ? 0 : t
		};
		i.ticks = function () {
			if (!arguments.length) {
				return h
			}
			;
			h = arguments;
			return i
		};
		i.tickCulling = function (t) {
			if (!arguments.length) {
				return g
			}
			;
			g = t;
			return i
		};
		i.tickValues = function (t) {
			if (typeof t === "function") {
				c = function () {
					return t(n.domain())
				}
			} else {
				if (!arguments.length) {
					return c
				}
				;
				c = t
			}
			;
			return i
		};
		return i
	};
	e.isSafari = function () {
		var e = t.navigator.userAgent;
		return e.indexOf("Safari") >= 0 && e.indexOf("Chrome") < 0
	};
	e.isChrome = function () {
		var e = t.navigator.userAgent;
		return e.indexOf("Chrome") >= 0
	};
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (t) {
			if (typeof this !== "function") {
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
			}
			;
			var n = Array.prototype.slice.call(arguments, 1),
				a = this,
				e = function () {
				},
				i = function () {
					return a.apply(this instanceof e ? this : t, n.concat(Array.prototype.slice.call(arguments)))
				};
			e.prototype = this.prototype;
			i.prototype = new e();
			return i
		}
	}
	(function () {
		"use strict";
		if (!("SVGPathSeg" in t)) {
			t.SVGPathSeg = function (t, e, i) {
				this.pathSegType = t;
				this.pathSegTypeAsLetter = e;
				this._owningPathSegList = i
			};
			SVGPathSeg.PATHSEG_UNKNOWN = 0;
			SVGPathSeg.PATHSEG_CLOSEPATH = 1;
			SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
			SVGPathSeg.PATHSEG_MOVETO_REL = 3;
			SVGPathSeg.PATHSEG_LINETO_ABS = 4;
			SVGPathSeg.PATHSEG_LINETO_REL = 5;
			SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
			SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
			SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
			SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
			SVGPathSeg.PATHSEG_ARC_ABS = 10;
			SVGPathSeg.PATHSEG_ARC_REL = 11;
			SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
			SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
			SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
			SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
			SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
			SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
			SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
			SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;
			SVGPathSeg.prototype._segmentChanged = function () {
				if (this._owningPathSegList) this._owningPathSegList.segmentChanged(this)
			};
			t.SVGPathSegClosePath = function (t) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CLOSEPATH, "z", t)
			};
			SVGPathSegClosePath.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegClosePath.prototype.toString = function () {
				return "[object SVGPathSegClosePath]"
			};
			SVGPathSegClosePath.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter
			};
			SVGPathSegClosePath.prototype.clone = function () {
				return new SVGPathSegClosePath(undefined)
			};
			t.SVGPathSegMovetoAbs = function (t, e, i) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_ABS, "M", t);
				this._x = e;
				this._y = i
			};
			SVGPathSegMovetoAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegMovetoAbs.prototype.toString = function () {
				return "[object SVGPathSegMovetoAbs]"
			};
			SVGPathSegMovetoAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
			};
			SVGPathSegMovetoAbs.prototype.clone = function () {
				return new SVGPathSegMovetoAbs(undefined, this._x, this._y)
			};
			Object.defineProperty(SVGPathSegMovetoAbs.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegMovetoAbs.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegMovetoRel = function (t, e, i) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_REL, "m", t);
				this._x = e;
				this._y = i
			};
			SVGPathSegMovetoRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegMovetoRel.prototype.toString = function () {
				return "[object SVGPathSegMovetoRel]"
			};
			SVGPathSegMovetoRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
			};
			SVGPathSegMovetoRel.prototype.clone = function () {
				return new SVGPathSegMovetoRel(undefined, this._x, this._y)
			};
			Object.defineProperty(SVGPathSegMovetoRel.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegMovetoRel.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegLinetoAbs = function (t, e, i) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_ABS, "L", t);
				this._x = e;
				this._y = i
			};
			SVGPathSegLinetoAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegLinetoAbs.prototype.toString = function () {
				return "[object SVGPathSegLinetoAbs]"
			};
			SVGPathSegLinetoAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
			};
			SVGPathSegLinetoAbs.prototype.clone = function () {
				return new SVGPathSegLinetoAbs(undefined, this._x, this._y)
			};
			Object.defineProperty(SVGPathSegLinetoAbs.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegLinetoAbs.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegLinetoRel = function (t, e, i) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_REL, "l", t);
				this._x = e;
				this._y = i
			};
			SVGPathSegLinetoRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegLinetoRel.prototype.toString = function () {
				return "[object SVGPathSegLinetoRel]"
			};
			SVGPathSegLinetoRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
			};
			SVGPathSegLinetoRel.prototype.clone = function () {
				return new SVGPathSegLinetoRel(undefined, this._x, this._y)
			};
			Object.defineProperty(SVGPathSegLinetoRel.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegLinetoRel.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegCurvetoCubicAbs = function (t, e, i, n, a, r, s) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", t);
				this._x = e;
				this._y = i;
				this._x1 = n;
				this._y1 = a;
				this._x2 = r;
				this._y2 = s
			};
			SVGPathSegCurvetoCubicAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegCurvetoCubicAbs.prototype.toString = function () {
				return "[object SVGPathSegCurvetoCubicAbs]"
			};
			SVGPathSegCurvetoCubicAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
			};
			SVGPathSegCurvetoCubicAbs.prototype.clone = function () {
				return new SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2)
			};
			Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x1", {
				get: function () {
					return this._x1
				},
				set: function (t) {
					this._x1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y1", {
				get: function () {
					return this._y1
				},
				set: function (t) {
					this._y1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x2", {
				get: function () {
					return this._x2
				},
				set: function (t) {
					this._x2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y2", {
				get: function () {
					return this._y2
				},
				set: function (t) {
					this._y2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegCurvetoCubicRel = function (t, e, i, n, a, r, s) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", t);
				this._x = e;
				this._y = i;
				this._x1 = n;
				this._y1 = a;
				this._x2 = r;
				this._y2 = s
			};
			SVGPathSegCurvetoCubicRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegCurvetoCubicRel.prototype.toString = function () {
				return "[object SVGPathSegCurvetoCubicRel]"
			};
			SVGPathSegCurvetoCubicRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
			};
			SVGPathSegCurvetoCubicRel.prototype.clone = function () {
				return new SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2)
			};
			Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x1", {
				get: function () {
					return this._x1
				},
				set: function (t) {
					this._x1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y1", {
				get: function () {
					return this._y1
				},
				set: function (t) {
					this._y1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x2", {
				get: function () {
					return this._x2
				},
				set: function (t) {
					this._x2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y2", {
				get: function () {
					return this._y2
				},
				set: function (t) {
					this._y2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegCurvetoQuadraticAbs = function (t, e, i, n, a) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", t);
				this._x = e;
				this._y = i;
				this._x1 = n;
				this._y1 = a
			};
			SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegCurvetoQuadraticAbs.prototype.toString = function () {
				return "[object SVGPathSegCurvetoQuadraticAbs]"
			};
			SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
			};
			SVGPathSegCurvetoQuadraticAbs.prototype.clone = function () {
				return new SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1)
			};
			Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {
				get: function () {
					return this._x1
				},
				set: function (t) {
					this._x1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {
				get: function () {
					return this._y1
				},
				set: function (t) {
					this._y1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegCurvetoQuadraticRel = function (t, e, i, n, a) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", t);
				this._x = e;
				this._y = i;
				this._x1 = n;
				this._y1 = a
			};
			SVGPathSegCurvetoQuadraticRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegCurvetoQuadraticRel.prototype.toString = function () {
				return "[object SVGPathSegCurvetoQuadraticRel]"
			};
			SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
			};
			SVGPathSegCurvetoQuadraticRel.prototype.clone = function () {
				return new SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1)
			};
			Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "x1", {
				get: function () {
					return this._x1
				},
				set: function (t) {
					this._x1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "y1", {
				get: function () {
					return this._y1
				},
				set: function (t) {
					this._y1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegArcAbs = function (t, e, i, n, a, r, s, o) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_ABS, "A", t);
				this._x = e;
				this._y = i;
				this._r1 = n;
				this._r2 = a;
				this._angle = r;
				this._largeArcFlag = s;
				this._sweepFlag = o
			};
			SVGPathSegArcAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegArcAbs.prototype.toString = function () {
				return "[object SVGPathSegArcAbs]"
			};
			SVGPathSegArcAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
			};
			SVGPathSegArcAbs.prototype.clone = function () {
				return new SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag)
			};
			Object.defineProperty(SVGPathSegArcAbs.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcAbs.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcAbs.prototype, "r1", {
				get: function () {
					return this._r1
				},
				set: function (t) {
					this._r1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcAbs.prototype, "r2", {
				get: function () {
					return this._r2
				},
				set: function (t) {
					this._r2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcAbs.prototype, "angle", {
				get: function () {
					return this._angle
				},
				set: function (t) {
					this._angle = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcAbs.prototype, "largeArcFlag", {
				get: function () {
					return this._largeArcFlag
				},
				set: function (t) {
					this._largeArcFlag = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcAbs.prototype, "sweepFlag", {
				get: function () {
					return this._sweepFlag
				},
				set: function (t) {
					this._sweepFlag = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegArcRel = function (t, e, i, n, a, r, s, o) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_REL, "a", t);
				this._x = e;
				this._y = i;
				this._r1 = n;
				this._r2 = a;
				this._angle = r;
				this._largeArcFlag = s;
				this._sweepFlag = o
			};
			SVGPathSegArcRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegArcRel.prototype.toString = function () {
				return "[object SVGPathSegArcRel]"
			};
			SVGPathSegArcRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
			};
			SVGPathSegArcRel.prototype.clone = function () {
				return new SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag)
			};
			Object.defineProperty(SVGPathSegArcRel.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcRel.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcRel.prototype, "r1", {
				get: function () {
					return this._r1
				},
				set: function (t) {
					this._r1 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcRel.prototype, "r2", {
				get: function () {
					return this._r2
				},
				set: function (t) {
					this._r2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcRel.prototype, "angle", {
				get: function () {
					return this._angle
				},
				set: function (t) {
					this._angle = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcRel.prototype, "largeArcFlag", {
				get: function () {
					return this._largeArcFlag
				},
				set: function (t) {
					this._largeArcFlag = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegArcRel.prototype, "sweepFlag", {
				get: function () {
					return this._sweepFlag
				},
				set: function (t) {
					this._sweepFlag = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegLinetoHorizontalAbs = function (t, e) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", t);
				this._x = e
			};
			SVGPathSegLinetoHorizontalAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegLinetoHorizontalAbs.prototype.toString = function () {
				return "[object SVGPathSegLinetoHorizontalAbs]"
			};
			SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x
			};
			SVGPathSegLinetoHorizontalAbs.prototype.clone = function () {
				return new SVGPathSegLinetoHorizontalAbs(undefined, this._x)
			};
			Object.defineProperty(SVGPathSegLinetoHorizontalAbs.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegLinetoHorizontalRel = function (t, e) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", t);
				this._x = e
			};
			SVGPathSegLinetoHorizontalRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegLinetoHorizontalRel.prototype.toString = function () {
				return "[object SVGPathSegLinetoHorizontalRel]"
			};
			SVGPathSegLinetoHorizontalRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x
			};
			SVGPathSegLinetoHorizontalRel.prototype.clone = function () {
				return new SVGPathSegLinetoHorizontalRel(undefined, this._x)
			};
			Object.defineProperty(SVGPathSegLinetoHorizontalRel.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegLinetoVerticalAbs = function (t, e) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", t);
				this._y = e
			};
			SVGPathSegLinetoVerticalAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegLinetoVerticalAbs.prototype.toString = function () {
				return "[object SVGPathSegLinetoVerticalAbs]"
			};
			SVGPathSegLinetoVerticalAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._y
			};
			SVGPathSegLinetoVerticalAbs.prototype.clone = function () {
				return new SVGPathSegLinetoVerticalAbs(undefined, this._y)
			};
			Object.defineProperty(SVGPathSegLinetoVerticalAbs.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegLinetoVerticalRel = function (t, e) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", t);
				this._y = e
			};
			SVGPathSegLinetoVerticalRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegLinetoVerticalRel.prototype.toString = function () {
				return "[object SVGPathSegLinetoVerticalRel]"
			};
			SVGPathSegLinetoVerticalRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._y
			};
			SVGPathSegLinetoVerticalRel.prototype.clone = function () {
				return new SVGPathSegLinetoVerticalRel(undefined, this._y)
			};
			Object.defineProperty(SVGPathSegLinetoVerticalRel.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegCurvetoCubicSmoothAbs = function (t, e, i, n, a) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", t);
				this._x = e;
				this._y = i;
				this._x2 = n;
				this._y2 = a
			};
			SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function () {
				return "[object SVGPathSegCurvetoCubicSmoothAbs]"
			};
			SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
			};
			SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function () {
				return new SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2)
			};
			Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {
				get: function () {
					return this._x2
				},
				set: function (t) {
					this._x2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {
				get: function () {
					return this._y2
				},
				set: function (t) {
					this._y2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegCurvetoCubicSmoothRel = function (t, e, i, n, a) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", t);
				this._x = e;
				this._y = i;
				this._x2 = n;
				this._y2 = a
			};
			SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function () {
				return "[object SVGPathSegCurvetoCubicSmoothRel]"
			};
			SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
			};
			SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function () {
				return new SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2)
			};
			Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {
				get: function () {
					return this._x2
				},
				set: function (t) {
					this._x2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {
				get: function () {
					return this._y2
				},
				set: function (t) {
					this._y2 = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegCurvetoQuadraticSmoothAbs = function (t, e, i) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", t);
				this._x = e;
				this._y = i
			};
			SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function () {
				return "[object SVGPathSegCurvetoQuadraticSmoothAbs]"
			};
			SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
			};
			SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function () {
				return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y)
			};
			Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			t.SVGPathSegCurvetoQuadraticSmoothRel = function (t, e, i) {
				SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", t);
				this._x = e;
				this._y = i
			};
			SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
			SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function () {
				return "[object SVGPathSegCurvetoQuadraticSmoothRel]"
			};
			SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function () {
				return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
			};
			SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function () {
				return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y)
			};
			Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {
				get: function () {
					return this._x
				},
				set: function (t) {
					this._x = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {
				get: function () {
					return this._y
				},
				set: function (t) {
					this._y = t;
					this._segmentChanged()
				},
				enumerable: !0
			});
			SVGPathElement.prototype.createSVGPathSegClosePath = function () {
				return new SVGPathSegClosePath(undefined)
			};
			SVGPathElement.prototype.createSVGPathSegMovetoAbs = function (t, e) {
				return new SVGPathSegMovetoAbs(undefined, t, e)
			};
			SVGPathElement.prototype.createSVGPathSegMovetoRel = function (t, e) {
				return new SVGPathSegMovetoRel(undefined, t, e)
			};
			SVGPathElement.prototype.createSVGPathSegLinetoAbs = function (t, e) {
				return new SVGPathSegLinetoAbs(undefined, t, e)
			};
			SVGPathElement.prototype.createSVGPathSegLinetoRel = function (t, e) {
				return new SVGPathSegLinetoRel(undefined, t, e)
			};
			SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function (t, e, i, n, a, r) {
				return new SVGPathSegCurvetoCubicAbs(undefined, t, e, i, n, a, r)
			};
			SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function (t, e, i, n, a, r) {
				return new SVGPathSegCurvetoCubicRel(undefined, t, e, i, n, a, r)
			};
			SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function (t, e, i, n) {
				return new SVGPathSegCurvetoQuadraticAbs(undefined, t, e, i, n)
			};
			SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function (t, e, i, n) {
				return new SVGPathSegCurvetoQuadraticRel(undefined, t, e, i, n)
			};
			SVGPathElement.prototype.createSVGPathSegArcAbs = function (t, e, i, n, a, r, s) {
				return new SVGPathSegArcAbs(undefined, t, e, i, n, a, r, s)
			};
			SVGPathElement.prototype.createSVGPathSegArcRel = function (t, e, i, n, a, r, s) {
				return new SVGPathSegArcRel(undefined, t, e, i, n, a, r, s)
			};
			SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function (t) {
				return new SVGPathSegLinetoHorizontalAbs(undefined, t)
			};
			SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function (t) {
				return new SVGPathSegLinetoHorizontalRel(undefined, t)
			};
			SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function (t) {
				return new SVGPathSegLinetoVerticalAbs(undefined, t)
			};
			SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function (t) {
				return new SVGPathSegLinetoVerticalRel(undefined, t)
			};
			SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function (t, e, i, n) {
				return new SVGPathSegCurvetoCubicSmoothAbs(undefined, t, e, i, n)
			};
			SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function (t, e, i, n) {
				return new SVGPathSegCurvetoCubicSmoothRel(undefined, t, e, i, n)
			};
			SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function (t, e) {
				return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, t, e)
			};
			SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function (t, e) {
				return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, t, e)
			}
		}
		;
		if (!("SVGPathSegList" in t)) {
			t.SVGPathSegList = function (t) {
				this._pathElement = t;
				this._list = this._parsePath(this._pathElement.getAttribute("d"));
				this._mutationObserverConfig = {
					"attributes": !0,
					"attributeFilter": ["d"]
				};
				this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
				this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
			};
			Object.defineProperty(SVGPathSegList.prototype, "numberOfItems", {
				get: function () {
					this._checkPathSynchronizedToList();
					return this._list.length
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathElement.prototype, "pathSegList", {
				get: function () {
					if (!this._pathSegList) this._pathSegList = new SVGPathSegList(this);
					return this._pathSegList
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathElement.prototype, "normalizedPathSegList", {
				get: function () {
					return this.pathSegList
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathElement.prototype, "animatedPathSegList", {
				get: function () {
					return this.pathSegList
				},
				enumerable: !0
			});
			Object.defineProperty(SVGPathElement.prototype, "animatedNormalizedPathSegList", {
				get: function () {
					return this.pathSegList
				},
				enumerable: !0
			});
			SVGPathSegList.prototype._checkPathSynchronizedToList = function () {
				this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords())
			};
			SVGPathSegList.prototype._updateListFromPathMutations = function (t) {
				if (!this._pathElement) return;
				var e = !1;
				t.forEach(function (t) {
					if (t.attributeName == "d") e = !0
				});
				if (e) this._list = this._parsePath(this._pathElement.getAttribute("d"))
			};
			SVGPathSegList.prototype._writeListToPath = function () {
				this._pathElementMutationObserver.disconnect();
				this._pathElement.setAttribute("d", SVGPathSegList._pathSegArrayAsString(this._list));
				this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
			};
			SVGPathSegList.prototype.segmentChanged = function (t) {
				this._writeListToPath()
			};
			SVGPathSegList.prototype.clear = function () {
				this._checkPathSynchronizedToList();
				this._list.forEach(function (t) {
					t._owningPathSegList = null
				});
				this._list = [];
				this._writeListToPath()
			};
			SVGPathSegList.prototype.initialize = function (t) {
				this._checkPathSynchronizedToList();
				this._list = [t];
				t._owningPathSegList = this;
				this._writeListToPath();
				return t
			};
			SVGPathSegList.prototype._checkValidIndex = function (t) {
				if (isNaN(t) || t < 0 || t >= this.numberOfItems) throw "INDEX_SIZE_ERR"
			};
			SVGPathSegList.prototype.getItem = function (t) {
				this._checkPathSynchronizedToList();
				this._checkValidIndex(t);
				return this._list[t]
			};
			SVGPathSegList.prototype.insertItemBefore = function (t, e) {
				this._checkPathSynchronizedToList();
				if (e > this.numberOfItems) e = this.numberOfItems;
				if (t._owningPathSegList) {
					t = t.clone()
				}
				;
				this._list.splice(e, 0, t);
				t._owningPathSegList = this;
				this._writeListToPath();
				return t
			};
			SVGPathSegList.prototype.replaceItem = function (t, e) {
				this._checkPathSynchronizedToList();
				if (t._owningPathSegList) {
					t = t.clone()
				}
				;
				this._checkValidIndex(e);
				this._list[e] = t;
				t._owningPathSegList = this;
				this._writeListToPath();
				return t
			};
			SVGPathSegList.prototype.removeItem = function (t) {
				this._checkPathSynchronizedToList();
				this._checkValidIndex(t);
				var e = this._list[t];
				this._list.splice(t, 1);
				this._writeListToPath();
				return e
			};
			SVGPathSegList.prototype.appendItem = function (t) {
				this._checkPathSynchronizedToList();
				if (t._owningPathSegList) {
					t = t.clone()
				}
				;
				this._list.push(t);
				t._owningPathSegList = this;
				this._writeListToPath();
				return t
			};
			SVGPathSegList._pathSegArrayAsString = function (t) {
				var e = "",
					i = !0;
				t.forEach(function (t) {
					if (i) {
						i = !1;
						e += t._asPathString()
					} else {
						e += " " + t._asPathString()
					}
				});
				return e
			};
			SVGPathSegList.prototype._parsePath = function (t) {
				if (!t || t.length == 0) return [];
				var e = this,
					s = function () {
						this.pathSegList = []
					};
				s.prototype.appendSegment = function (t) {
					this.pathSegList.push(t)
				};
				var i = function (t) {
					this._string = t;
					this._currentIndex = 0;
					this._endIndex = this._string.length;
					this._previousCommand = SVGPathSeg.PATHSEG_UNKNOWN;
					this._skipOptionalSpaces()
				};
				i.prototype._isCurrentSpace = function () {
					var t = this._string[this._currentIndex];
					return t <= " " && (t == " " || t == "\n" || t == "\t" || t == "\r" || t == "\f")
				};
				i.prototype._skipOptionalSpaces = function () {
					while (this._currentIndex < this._endIndex && this._isCurrentSpace()) this._currentIndex++;
					return this._currentIndex < this._endIndex
				};
				i.prototype._skipOptionalSpacesOrDelimiter = function () {
					if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",") return !1;
					if (this._skipOptionalSpaces()) {
						if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
							this._currentIndex++;
							this._skipOptionalSpaces()
						}
					}
					;
					return this._currentIndex < this._endIndex
				};
				i.prototype.hasMoreData = function () {
					return this._currentIndex < this._endIndex
				};
				i.prototype.peekSegmentType = function () {
					var t = this._string[this._currentIndex];
					return this._pathSegTypeFromChar(t)
				};
				i.prototype._pathSegTypeFromChar = function (t) {
					switch (t) {
						case "Z":
						case "z":
							return SVGPathSeg.PATHSEG_CLOSEPATH;
						case "M":
							return SVGPathSeg.PATHSEG_MOVETO_ABS;
						case "m":
							return SVGPathSeg.PATHSEG_MOVETO_REL;
						case "L":
							return SVGPathSeg.PATHSEG_LINETO_ABS;
						case "l":
							return SVGPathSeg.PATHSEG_LINETO_REL;
						case "C":
							return SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
						case "c":
							return SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
						case "Q":
							return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
						case "q":
							return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
						case "A":
							return SVGPathSeg.PATHSEG_ARC_ABS;
						case "a":
							return SVGPathSeg.PATHSEG_ARC_REL;
						case "H":
							return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
						case "h":
							return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
						case "V":
							return SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
						case "v":
							return SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
						case "S":
							return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
						case "s":
							return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
						case "T":
							return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
						case "t":
							return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
						default:
							return SVGPathSeg.PATHSEG_UNKNOWN
					}
				};
				i.prototype._nextCommandHelper = function (t, e) {
					if ((t == "+" || t == "-" || t == "." || (t >= "0" && t <= "9")) && e != SVGPathSeg.PATHSEG_CLOSEPATH) {
						if (e == SVGPathSeg.PATHSEG_MOVETO_ABS) return SVGPathSeg.PATHSEG_LINETO_ABS;
						if (e == SVGPathSeg.PATHSEG_MOVETO_REL) return SVGPathSeg.PATHSEG_LINETO_REL;
						return e
					}
					;
					return SVGPathSeg.PATHSEG_UNKNOWN
				};
				i.prototype.initialCommandIsMoveTo = function () {
					if (!this.hasMoreData()) return !0;
					var t = this.peekSegmentType();
					return t == SVGPathSeg.PATHSEG_MOVETO_ABS || t == SVGPathSeg.PATHSEG_MOVETO_REL
				};
				i.prototype._parseNumber = function () {
					var t = 0,
						r = 0,
						l = 1,
						s = 0,
						o = 1,
						c = 1,
						u = this._currentIndex;
					this._skipOptionalSpaces();
					if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+") this._currentIndex++;
					else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
						this._currentIndex++;
						o = -1
					}
					;
					if (this._currentIndex == this._endIndex || ((this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != ".")) return undefined;
					var a = this._currentIndex;
					while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") this._currentIndex++;
					if (this._currentIndex != a) {
						var i = this._currentIndex - 1,
							n = 1;
						while (i >= a) {
							r += n * (this._string.charAt(i--) - "0");
							n *= 10
						}
					}
					;
					if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
						this._currentIndex++;
						if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return undefined;
						while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") s += (this._string.charAt(this._currentIndex++) - "0") * (l *= 0.1)
					}
					;
					if (this._currentIndex != u && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && (this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m")) {
						this._currentIndex++;
						if (this._string.charAt(this._currentIndex) == "+") {
							this._currentIndex++
						} else if (this._string.charAt(this._currentIndex) == "-") {
							this._currentIndex++;
							c = -1
						}
						;
						if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return undefined;
						while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
							t *= 10;
							t += (this._string.charAt(this._currentIndex) - "0");
							this._currentIndex++
						}
					}
					;
					var e = r + s;
					e *= o;
					if (t) e *= Math.pow(10, c * t);
					if (u == this._currentIndex) return undefined;
					this._skipOptionalSpacesOrDelimiter();
					return e
				};
				i.prototype._parseArcFlag = function () {
					if (this._currentIndex >= this._endIndex) return undefined;
					var t = !1,
						e = this._string.charAt(this._currentIndex++);
					if (e == "0") t = !1;
					else if (e == "1") t = !0;
					else return undefined;
					this._skipOptionalSpacesOrDelimiter();
					return t
				};
				i.prototype.parseSegment = function () {
					var n = this._string[this._currentIndex],
						i = this._pathSegTypeFromChar(n);
					if (i == SVGPathSeg.PATHSEG_UNKNOWN) {
						if (this._previousCommand == SVGPathSeg.PATHSEG_UNKNOWN) return null;
						i = this._nextCommandHelper(n, this._previousCommand);
						if (i == SVGPathSeg.PATHSEG_UNKNOWN) return null
					} else {
						this._currentIndex++
					}
					;
					this._previousCommand = i;
					switch (i) {
						case SVGPathSeg.PATHSEG_MOVETO_REL:
							return new SVGPathSegMovetoRel(e, this._parseNumber(), this._parseNumber());
						case SVGPathSeg.PATHSEG_MOVETO_ABS:
							return new SVGPathSegMovetoAbs(e, this._parseNumber(), this._parseNumber());
						case SVGPathSeg.PATHSEG_LINETO_REL:
							return new SVGPathSegLinetoRel(e, this._parseNumber(), this._parseNumber());
						case SVGPathSeg.PATHSEG_LINETO_ABS:
							return new SVGPathSegLinetoAbs(e, this._parseNumber(), this._parseNumber());
						case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
							return new SVGPathSegLinetoHorizontalRel(e, this._parseNumber());
						case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
							return new SVGPathSegLinetoHorizontalAbs(e, this._parseNumber());
						case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
							return new SVGPathSegLinetoVerticalRel(e, this._parseNumber());
						case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
							return new SVGPathSegLinetoVerticalAbs(e, this._parseNumber());
						case SVGPathSeg.PATHSEG_CLOSEPATH:
							this._skipOptionalSpaces();
							return new SVGPathSegClosePath(e);
						case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
							var t = {
								x1: this._parseNumber(),
								y1: this._parseNumber(),
								x2: this._parseNumber(),
								y2: this._parseNumber(),
								x: this._parseNumber(),
								y: this._parseNumber()
							};
							return new SVGPathSegCurvetoCubicRel(e, t.x, t.y, t.x1, t.y1, t.x2, t.y2);
						case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
							var t = {
								x1: this._parseNumber(),
								y1: this._parseNumber(),
								x2: this._parseNumber(),
								y2: this._parseNumber(),
								x: this._parseNumber(),
								y: this._parseNumber()
							};
							return new SVGPathSegCurvetoCubicAbs(e, t.x, t.y, t.x1, t.y1, t.x2, t.y2);
						case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
							var t = {
								x2: this._parseNumber(),
								y2: this._parseNumber(),
								x: this._parseNumber(),
								y: this._parseNumber()
							};
							return new SVGPathSegCurvetoCubicSmoothRel(e, t.x, t.y, t.x2, t.y2);
						case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
							var t = {
								x2: this._parseNumber(),
								y2: this._parseNumber(),
								x: this._parseNumber(),
								y: this._parseNumber()
							};
							return new SVGPathSegCurvetoCubicSmoothAbs(e, t.x, t.y, t.x2, t.y2);
						case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
							var t = {
								x1: this._parseNumber(),
								y1: this._parseNumber(),
								x: this._parseNumber(),
								y: this._parseNumber()
							};
							return new SVGPathSegCurvetoQuadraticRel(e, t.x, t.y, t.x1, t.y1);
						case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
							var t = {
								x1: this._parseNumber(),
								y1: this._parseNumber(),
								x: this._parseNumber(),
								y: this._parseNumber()
							};
							return new SVGPathSegCurvetoQuadraticAbs(e, t.x, t.y, t.x1, t.y1);
						case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
							return new SVGPathSegCurvetoQuadraticSmoothRel(e, this._parseNumber(), this._parseNumber());
						case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
							return new SVGPathSegCurvetoQuadraticSmoothAbs(e, this._parseNumber(), this._parseNumber());
						case SVGPathSeg.PATHSEG_ARC_REL:
							var t = {
								x1: this._parseNumber(),
								y1: this._parseNumber(),
								arcAngle: this._parseNumber(),
								arcLarge: this._parseArcFlag(),
								arcSweep: this._parseArcFlag(),
								x: this._parseNumber(),
								y: this._parseNumber()
							};
							return new SVGPathSegArcRel(e, t.x, t.y, t.x1, t.y1, t.arcAngle, t.arcLarge, t.arcSweep);
						case SVGPathSeg.PATHSEG_ARC_ABS:
							var t = {
								x1: this._parseNumber(),
								y1: this._parseNumber(),
								arcAngle: this._parseNumber(),
								arcLarge: this._parseArcFlag(),
								arcSweep: this._parseArcFlag(),
								x: this._parseNumber(),
								y: this._parseNumber()
							};
							return new SVGPathSegArcAbs(e, t.x, t.y, t.x1, t.y1, t.arcAngle, t.arcLarge, t.arcSweep);
						default:
							throw "Unknown path seg type."
					}
				};
				var r = new s(),
					n = new i(t);
				if (!n.initialCommandIsMoveTo()) return [];
				while (n.hasMoreData()) {
					var a = n.parseSegment();
					if (!a) return [];
					r.appendSegment(a)
				}
				;
				return r.pathSegList
			}
		}
	}());
	if (typeof define === "function" && define.amd) {
		define("c3", ["d3"], function () {
			return h
		})
	} else if ("undefined" !== typeof exports && "undefined" !== typeof module) {
		module.exports = h
	} else {
		t.c3 = h
	}
})(window);
