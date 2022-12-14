/*! Extended friendlist v1.3.23 | (c) 2014 Kurtextrem, Pun1a | CC BY-NC-ND 3.0 http://creativecommons.org/licenses/by-nc-nd/3.0/deed.de */
/* Modified by Horrible to get rid of the welcome alert window */
$.fn.ready(function() {
    var a = {
        id: "horrible-extended-friends-plugin",
        name: "Horrible Extended Friendlist",
        version: "1.0",
        translations: {
            en: {
                "fix.exp": "EXP Event Banner Fix",
                "fix.exp.tooltip": "Fixes the EXP Event banner, to better fit the main page.",
                "fix.showAll": "Show 'All' everytime in the Game Activity window.",
                firstStepText1: "Extended Friendlist Information",
                firstStepText2: "Welcome!",
                firstStepText3: "In order to add someone to the extended friendlist visit his profile and press the yellow 'Add to ext. friendlist' button.",
                firstStepText4: "The extended friendlist is displayed below the offline friendlist.",
                firstStepText5: "If you want to refresh the list, press the refresh button next to the search button in the 'COM Center' line.",
                firstStepText6: "Please report bugs in the BBL Forum.",
                firstStepText7: "New in this version:",
                firstStepText8: "Fix for new Battlelog. See wrong nicknames in the FL.",
                buttonTooltip: "Add this player to your extended friendlist.",
                buttonRemoveTooltip: "Remove this player from your extended friendlist.",
                refreshTooltip: "Last update:",
                showFriends: "Show Friends",
                away: "Away",
                remove: "Remove!",
                unknown: "Unknown."
            },
            de: {
                "fix.exp": "EXP Event Banner Fix",
                "fix.exp.tooltip": "Ver\xe4ndert den Event Banner, damit weniger Platz beansprucht wird.",
                "fix.showAll": "Immer 'Alles' anzeigen in der Spiel Aktivit\xe4t.",
                firstStepText1: "Erweiterte Freundesliste Informationen",
                firstStepText2: "Willkommen!",
                firstStepText3: "Um jemanden zu deiner erweiterten Freundesliste hinzuzuf\xfcgen, musst du sein Profil besuchen und den gelben 'Add to ext. friendlist' klicken.",
                firstStepText4: "Die erweiterte Freundesliste ist unter der Offline Freundesliste.",
                firstStepText5: "Wenn du die erweiterte Freundesliste aktualisieren willst, musst du das aktualisieren Icon in neben dem Suche Icon in der 'COM Center' Zeile dr\xfccken.",
                firstStepText6: "Melde Fehler bitte im Forum.",
                firstStepText7: "Neu in dieser Version:",
                firstStepText8: "Funktionsf\xe4hig nach Battlelog Update. Falsche Namen sind in der Liste sichtbar.",
                buttonTooltip: "Spieler zur erweiterten Freundesliste hinzuf\xfcgen.",
                buttonRemoveTooltip: "Spieler von der erweiterten Freundesliste entfernen.",
                refreshTooltip: "Letzte Aktualisierung:",
                showFriends: "Freunde anzeigen",
                away: "Abwesend",
                remove: "Entfernen!",
                unknown: "Unbekannt."
            },
            pt: {
                "fix.exp": "Ajuste do Banner Evendo de Experi\xeancia Dobrada",
                "fix.exp.tooltip": "Ajusta o Banner Evento de Experi\xeancia Dobrada para melhor pagina\xe7\xe3o.",
                "fix.showAll": "Mostrar 'TUDO' na janela de Atividade de Jogo.",
                firstStepText1: "Informa\xe7\xe3o da Lista Estendida de Amigos",
                firstStepText2: "Bem-vindo!",
                firstStepText3: "Para adicionar amigos \xe0 sua lista estendida acesse o perfil requerido e clique em 'Ad. \xe0 lista estendida'.",
                firstStepText4: "A lista estendida \xe9 mostrada abaixo da lista de amigos offline.",
                firstStepText5: "Se desejar atualizar a lista pressione o bot\xe3o 'Atualizar' pr\xf3ximo \xe0 caixa de procura",
                firstStepText6: "Por favor, reporte erros no F\xf3rum do BBLog",
                firstStepText7: "O que h\xe1 de novo:",
                firstStepText8: "Ajuste ao novo Battlelog ao mostrar nome errados na lista estendida.",
                buttonTooltip: "Adicione este soldado \xe0 lista estendida",
                buttonRemoveTooltip: "Remover este soldado da lista estendida",
                refreshTooltip: "\xdaltima Atualiza\xe7\xe3o:",
                showFriends: "Mostrar Amigos",
                away: "Ocupado",
                remove: "Remover!",
                unknown: "Desconhecido."
            }
        },
        configFlags: [["fix.exp", 1], ["fix.showAll", 1], ["showFriends", 1, function(a) {
            a.showFriends()
        }
        ]],
        instance: {},
        extendedFriends: ["LegendaryTipper"],
        optedOut: ["l_like_Chocolate"],
        htmlCache: "",
        lastUpdate: 0,
        updating: !1,
        languageAddition: "",
        init: function(a) {
            this.instance = a,
            this.languageAddition = "en" === BBLog.cache("language") ? "" : "/" + BBLog.cache("language"),
            this.extendedFriends = this.instance.storage("plugin.extendedfriends") || [],
            this.htmlCache = window.localStorage["extfriends.htmlCache"] || "",
            this.lastUpdate = window.localStorage["extfriends.lastUpdate"] || 0,
            this.languageAddition !== window.localStorage["extfriends.languageAddition"] && (this.lastUpdate = 0,
            window.localStorage["extfriends.languageAddition"] = this.languageAddition),
            ($.now() - this.lastUpdate) / 1e3 > 120 && (this.htmlCache = ""),
            this.handler(),
            this.addRefreshButton(),
            this.addAjaxListener(),
            "" === this.htmlCache && (this.addSeparator(),
            this.addList());
            var b = "FirstStep111"
              , c = $(".main-loggedin-leftcolumn-activity-filter");
            window.setTimeout(function() {
                c.find("li:first-of-type").hasClass("selected") && a.storage("fix.showAll") && c.find("li:last-of-type").click()
            }, 1e3)/*,
                        a.storage(b) || this.alert("welcomealert", this.instance.t("firstStepText1") + " v" + this.version, "<strong>" + this.instance.t("firstStepText2") + "</strong><p>" + this.instance.t("firstStepText3") + "</p><p>" + this.instance.t("firstStepText4") + "</p><p>" + this.instance.t("firstStepText5") + "</p><p>" + this.instance.t("firstStepText6") + "</p><p><strong>" + this.instance.t("firstStepText7") + "</strong> " + this.instance.t("firstStepText8") + "</p>", function() {
                a.storage(b, !0)
            })*/
        },
        domchange: function() {
            this.handler()
        },
        handler: function() {
            var a = $("html")
              , b = "bf4" === BBLog.cache("mode") ? ".user-container .username span" : ".username > h1"
              , c = a.find(b).first().length
              , d = a.find("#comcenter-extfl-separator").length;
            1 === c && (c = a.find("#extendedFriendsButton").length,
            0 === c && this.addButton()),
            0 === d && ($("#comcenter-offline-separator").parent().after(this.htmlCache),
            $("#comcenter-tab-friends-content").jScrollPane({
                horizontalGutter: -7,
                verticalGutter: -7
            }),
            this.updating ? this.spinner(!0) : $("#comcenterExtFlFriends > span").append("<i> -Cache-</i>")),
            this.instance.storage("fix.exp") && ($(".main-loggedin-premium-scoremultiplier").css("position", "absolute").css("right", 0),
            $("#main-loggedin-premium-scoremultiplier-icon").css("top", "5px"))
        },
        addButton: function() {
            var a = $('<span class="bblog-button" id="extendedFriendsButton" data-tooltip="' + this.instance.t("buttonTooltip") + '" style="position:absolute;top:15px;white-space:nowrap;left:100%;margin-left:5%">Add to ext. friendlist</span>')
              , b = window.location.href.match(/\/user\/([^\/]+)/)[1]
              , c = "#profile-header .interact";
            this.isOptedOut(b) || (-1 !== this.extendedFriends.indexOf(b) && a.text("Remove from ext. friendlist").attr("data-tooltip", this.instance.t("buttonRemoveTooltip")),
            "bf4" === BBLog.cache("mode") && (c = ".user-container .interact .box-content",
            a.removeClass(".bblog-button").addClass("btn btn-primary btn-tiny"),
            a.css("position", "static")),
            $(c).append(a),
            a.click(function() {
                this.toggleName(b)
            }
            .bind(this)))
        },
        toggleName: function(a, b) {
            this.extendedFriends = this.instance.storage("plugin.extendedfriends") || [];
            var c = this.extendedFriends.indexOf(a);
            -1 === c ? this.extendedFriends.push(a) : this.extendedFriends.splice(c, 1),
            this.instance.storage("plugin.extendedfriends", this.extendedFriends),
            b || this.refresh()
        },
        refresh: function() {
            $("#extendedFriendsButton").remove(),
            $("#comcenter-extfl-separator").parent().remove(),
            $(".extFlPlaying, .extFlOnline").remove(),
            this.addSeparator(),
            this.addList()
        },
        addList: function() {
            if (!this.updating) {
                var a = this.extendedFriends.length;
                a > 0 && (this.spinner(!0),
                this.updating = !0),
                $(this.extendedFriends).each(function(b, c) {
                    var d = c
                      , e = "/bf" + ("bf4" === BBLog.cache("mode") ? "4" : "3") + this.languageAddition + "/user/" + d;
                    $.ajax(e, {
                        type: "GET",
                        headers: {
                            "X-AjaxNavigation": 1
                        },
                        success: function(a) {
                            if (!a || !a.context || "undefined" == typeof a.context.profileCommon)
                                return this.buildTemplate(d);
                            if (a.context.profileCommon.user.presence.isOnline) {
                                var b = a.context.profileCommon
                                  , c = a.globalContext.profileUserId
                                  , f = ""
                                  , g = "http://www.gravatar.com/avatar/" + b.user.gravatarMd5 + "?s=36&d=http%3A%2F%2Fbattlelog-cdn.battlefield.com%2Fcdnprefix%2Favatar1%2Fpublic%2Fbase%2Fshared%2Fdefault-avatar-36.png";
                                if (("undefined" != typeof b.user.presence.isAway || 65537 === typeof b.user.presence.presenceState) && (f = this.instance.t("away")),
                                "undefined" != typeof b.user.presence.isPlaying && "undefined" != typeof b.user.presence.playingMp) {
                                    var h = b.user.presence.playingMp.serverGuid
                                      , i = b.user.presence.playingMp.serverName
                                      , j = b.user.presence.playingMp.game
                                      , k = "/bf" + (2048 === j ? "4" : "3") + this.languageAddition + "/servers/show/pc/" + h + "/"
                                      , l = b.user.presence.playingMp.platform
                                      , m = b.user.presence.playingMp.personalId;
                                    return this.buildTemplate(d, c, e, g, !1, "", !0, j, l, i, k, h, m)
                                }
                                return this.buildTemplate(d, c, e, g, f)
                            }
                        }
                        .bind(this),
                        error: function() {
                            this.buildTemplate(d)
                        }
                        .bind(this)
                    }).done(function() {
                        b === a - 1 && window.setTimeout(function() {
                            this.updating = !1,
                            this.spinner(!1),
                            this.lastUpdate = $.now(),
                            window.localStorage["extfriends.lastUpdate"] = this.lastUpdate,
                            $("#comcenter-tab-friends-content").jScrollPane({
                                horizontalGutter: -7,
                                verticalGutter: -7
                            })
                        }
                        .bind(this), 1e3)
                    }
                    .bind(this))
                }
                .bind(this)),
                $(document).on("click", ".removeExtFl", function(a) {
                    var b = $(a.target);
                    b.parents(".comcenter-friend").fadeOut(5e3),
                    this.toggleName(b.data("nick"), !0),
                    a.preventDefault()
                }
                .bind(this))
            }
        },
        buildTemplate: function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
            var n = ""
              , o = ""
              , p = ""
              , q = ""
              , r = ""
              , s = "online";
            return "undefined" == typeof b && (b = $.now(),
            c = "#",
            d = "http://battlelog-cdn.battlefield.com/cdnprefix/avatar1/public/base/shared/default-avatar-36.png",
            e = this.instance.t("remove"),
            f = 'style="background-color:rgba(255,0,0,.55)"',
            n = !0),
            "undefined" == typeof g && (g = ""),
            e && (p = '<div class="comcenter-username-away">' + e + "</div>",
            n && (p = '<div class="comcenter-username-away"><span class="bblog-button tiny removeExtFl" data-nick="' + a + '">' + e + "</span></div>"),
            e = " comcenter-username-idle"),
            g && (e = "",
            q = " comcenter-friend-playing",
            s = "playing",
            null === k && null === j && (k = "#",
            j = this.instance.t("unkown")),
            p = '<div class="comcenter-username-serverinfo origin-game-title"><span class="common-gameicon-hori bright common-game-' + h + "-" + i + ' comcenter-game-icon"></span><span class="common-playing-link" data-track="friend.playing.server.link"><a title="' + j + '" class="common-playing-link comcenter-playing-link" href="' + k + '">' + j + "</a></span></div>",
            2048 === h && (r = " btn-primary"),
            g = '<button class="btn btn-small join-friend-submit-link join-friend join-friendcomcenter-interact-playing' + r + '" data-bind-action="join-mp-gameserver" data-role="1" data-guid="' + l + '" data-game="' + h + '" data-platform="1" data-friendpersonaid="' + m + '" data-track="friend.playing.server.join"><i class="icon-join-friend"></i></button></div>'),
            "undefined" == typeof f && (f = ""),
            o = '<surf:container id="comcenter-surface-friends_' + b + '" class="extFLFriend"><li id="comcenter-' + b + '" class="comcenter-friend-item comcenter-friend comcenter-friend-online' + q + '" rel="' + b + '"' + f + '><div class="comcenter-avatar"><a href="' + c + '"><i class="avatar medium ' + s + '" style="background-image:url(' + d + ')"></i></a></div><div class="comcenter-username' + e + '"><a class="comcenter-username-link" href="' + c + '">' + unescape(a) + "</a>" + p + '</div><div class="comcenter-interact-container">' + g + "</li></surf:container>",
            "" !== g ? this.addHTML(".extFlPlaying", o) : this.addHTML(".extFlOnline", o)
        },
        addHTML: function(a, b, c) {
            return a = $(a),
            c ? a.after(b) : a.append(b),
            b = $(".extFlOnline").parent().html(),
            null === b ? this.refresh() : (b = "<div>" + b + "</div>",
            this.addCache(this.addSeparator(!0) + b))
        },
        addCache: function(a) {
            return this.htmlCache = a,
            window.localStorage["extfriends.htmlCache"] = a
        },
        addRefreshButton: function() {
            var a = $("#extFLRefresh");
            "undefined" == typeof a[0] && (a = $('<img id="extFLRefresh" src="http://kurtextrem.de/bbl/refresh.png" style="position:absolute;top:10px;right:4px;cursor:pointer">'),
            a.load(function() {
                $("#friendlist-header > i").before(a)
            }
            .bind(this)).click(function() {
                ($.now() - this.lastUpdate) / 1e3 > 4 && this.refresh()
            }
            .bind(this)).hover(function() {
                this.updateRefreshTitle(a)
            }
            .bind(this)))
        },
        updateRefreshTitle: function(a) {
            var b = ($.now() - this.lastUpdate) / 1e3;
            a.attr("title", this.instance.t("refreshTooltip") + " " + Math.floor(b, 1) + "s ")
        },
        addSeparator: function(a) {
            var b = '<surf:container id="comcenterOnlineFriends"><li id="comcenter-extfl-separator" class="comcenter-separator online"><surf:container id="comcenterExtFlFriends"><span style="cursor:default">Ext. Friendlist</span></surf:container></li></surf:container>';
            return a ? b : (b += '<div><div class="extFlPlaying"></div><div class="extFlOnline"></div></div>',
            this.addHTML('[id^="comcenter-surface-friends_"]:last-of-type', b),
            void 0)
        },
        showFriends: function() {
            var d, a = "", b = this.extendedFriends.length, c = "";
            a += '<table style="border:0;width:50%;margin:auto">';
            for (var e = 0; b > e; e++)
                a += "<tr>",
                c = this.extendedFriends[e],
                a += "<td>",
                a += '<a href="http://battlelog.battlefield.com/bf' + ("bf4" === BBLog.cache("mode") ? "4" : "3") + this.languageAddition + "/user/" + c + '/">' + unescape(c) + "</a> ",
                a += "</td>",
                a += "<td>",
                a += '<span data-nick="' + c + '"  style="cursor:pointer" title="' + this.instance.t("remove") + '">(X)</span>',
                a += "</td>",
                a += "</tr>";
            a += "</table>",
            this.alert("friendsalert", this.instance.t("firstStepText1") + " v" + this.version, a, function() {
                $("#extFLRefresh").click()
            }),
            d = $("#popup-friendsalert"),
            d.find(".common-popup-content-container").css({
                overflow: "auto",
                height: "382px"
            }),
            d.find("td > span").click(function(a) {
                var b = $(a.target);
                b.parents("tr").fadeOut(5e3),
                this.toggleName(b.data("nick"), !0)
            }
            .bind(this))
        },
        spinner: function(a) {
            return a ? $("#comcenterExtFlFriends").append('<span class="loader small extFlSpinner" style="margin-left:7px"></span>') : $(".extFlSpinner").remove()
        },
        addAjaxListener: function() {
            $(document).on("click", "#popup-friendsalert a, .extFLFriend a", function(a) {
                Surface.ajaxNavigation.navigateTo($(this).attr("href")),
                a.preventDefault()
            })
        },
        isOptedOut: function(a) {
            return -1 !== this.optedOut.indexOf(a)
        },
        alert: function(a, b, c, d) {
            var e = $('<div class="popup-prompt-buttons"><div style="text-align:right"><input type="button" class="ok-btn base-button-arrow-small popup-prompt-button-continue" value="' + BBLog.t("ok") + '"/><div class="base-clear"></div></div>');
            d || (d = function() {}
            ),
            c = "<div>" + c + "</div>",
            e.find(".common-popup-close-button").on("click", function() {
                d(null ),
                BBLog.closeAllPopups()
            }),
            e.find(".ok-btn").on("click", function() {
                d(!0),
                BBLog.closeAllPopups()
            }),
            BBLog.popup(a, b, c, e)
        }
    };
    window.setTimeout(function() {
        BBLog.handle("add.plugin", a)
    }, 1e3)
});
