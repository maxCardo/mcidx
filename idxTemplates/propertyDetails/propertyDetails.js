(function () {
    // bankrate
    var bankRateSetup = function () {
        if (idx('#IDX-BankRateTool-Dialog').size() || idx('#IDX-bankRate').size()) {
            Number.prototype.formatMoney = function (c, d, t) {
                var n = this,
                    _c = isNaN(c = Math.abs(c)) ? 2 : c,
                    _d = d === undefined ? '.' : d,
                    _t = t === undefined ? ',' : t,
                    s = n < 0 ? '-' : '',
                    i = parseInt(n = Math.abs(+n || 0).toFixed(_c), 10) + '',
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + _t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + _t) + (_c ? _d + Math.abs(n - i).toFixed(_c).slice(2) : '');
            };
            var listingDefaultInfo = JSON.parse(idx('#IDX-mortgageDefaultQueryParameters').text().replace(/\s*/g, ''));
            // format price field.
            idx('.IDX-priceField').on('change', function () {
                var val = idx(this).val();
                val = val.replace(/[,|$]/g, '');
                var floatVal;
                if (val.match(/.*\..*/)) {
                    floatVal = parseFloat(val);
                } else {
                    floatVal = parseInt(val, 10);
                }

                idx(this).val(floatVal.formatMoney());
                if (idx(this).data('type') === 'downPayment') {
                    var loanAmount = listingDefaultInfo.price - floatVal;
                    idx('#IDX-loanAmount input').val(loanAmount.formatMoney());
                } else {
                    var downPayment = listingDefaultInfo.price - floatVal;
                    idx('#IDX-downPayment input').val(downPayment.formatMoney());
                }
            });
            var noResult = '<div id="IDX-mortgageRatesResultInfo">' +
                '<h3>There are no rates available for the product you selected.</h3>' +
                '</div>';
            var template = '<div class="IDX-bankRateRowContent" data-role="content" data-editorial="{{isEditorial}}">' +
                '<div class="IDX-mortgageRatesLogoInfo">' +
                '<a class="IDX-mortgageRatesLogo" href="{{cpc}}" target="_blank"><img src="http://www.bankrate.com/system/img/inst/{{logo}}"/></a>' +
                '<div class="IDX-mortgageRatesBankInfo">' +
                '<p class="IDX-mortgageRatesAdvertiser">{{advertiser}}</p>' +
                '<p class="IDX-noMargin"><span class="IDX-mortgageRatesNMLS IDX-mortgageRatesLabel"><small>NMLS # {{nmls}}</small></span></p>' +
                '<p class="IDX-noMargin"><span class="IDX-mortgageRatesSlic IDX-mortgageRatesLabel"><small>State Lic # {{slicense}}</small></span></p>' +
                '<h4 class="IDX-noMargin"><span class="IDX-mortgageRatesPhone"><a href="tel://{{phone}}">{{phone}}</a></span></h4>' +
                '</div>' +
                '</div>' +
                '<div class="IDX-mortgageRatesInfo">' +
                '<p class="IDX-mortgageRatesAPR"><span class="IDX-mortgageRatesLabel">APR: </span>{{apr}}% </p>' +
                '<p class="IDX-mortgageRatesRate"><span class="IDX-mortgageRatesLabel">Rate: </span>{{rate}}%</p>' +
                '<p class="IDX-mortgageRatesPoints"><span class="IDX-mortgageRatesLabel">Points: </span>{{points}}</p>' +
                '<p class="IDX-mortgageRatesFees" ><span class="IDX-mortgageRatesLabel">Fees: </span>${{fees}}</p>' +
                '<p class="IDX-mortgageRatesCaps"><span class="IDX-mortgageRatesLabel">Caps: </span>{{firstcap}}/{{addcap}}/{{lifecap}}</p>' +
                '</div>' +
                '<div class="IDX-mortgageRatesBottom">' +
                '<p class="IDX-mortgageRatesEst">${{estpayment}}/mo <small>{{date}}</small></p>' +
                '<a class="IDX-mortgageRatesGoBtn" rel="nofollow" href="javascript:void(0)" onclick="javascript:window.location=\'{{cpc}}\'">Next</a>' +
                '</div>' +
                '</div><hr/>';
            var generateMortgages = function () {
                var mortgages = idx.extend({}, listingDefaultInfo);
                mortgages.downPayment = parseFloat(idx('#IDX-downPayment input').val().replace(/,/g, ''));
                mortgages.loanAmount = mortgages.price - mortgages.downPayment;
                mortgages.fico = idx('#IDX-mortgageRatesFico').val().replace(/,/g, '');
                mortgages.products = idx('#IDX-mortgageRatesProductId').val();
                mortgages.legacyID = idx('#IDX-mortgageRatesProductId option:selected').data('legacyid');
                mortgages.ltv = (mortgages.loanAmount / mortgages.price) * 100;
                return mortgages;
            };
            var xhr;
            var gatherBankRateData = function () {
                // clean previous result.
                idx('#IDX-mortgageShowAllRates').hide();
                idx('#IDX-bankRateContent').empty();
                idx('#IDX-BankRateDataloading').show();
                var mortgages = generateMortgages();
                if (xhr) {
                    xhr.abort();
                }
                xhr = idx.ajax({
                    url: '/idx/api/mortgages/rates',
                    data: {
                        zip: mortgages.zipcode,
                        loanAmount: mortgages.loanAmount,
                        fico: mortgages.fico,
                        ltv: mortgages.ltv,
                        products: mortgages.products,
                        points: mortgages.points
                    }
                });
                xhr.done(function (resp) {
                    if (resp && resp.result && typeof (resp.result[0]) === 'object') {
                        var advertiser, temp, regex, field, points, isEditorial;
                        resp.result.forEach(function (advertiser) {
                            isEditorial = advertiser.ispaid.toLowerCase() === 'false';
                            if (advertiser.svydate) {
                                advertiser.svydate = new Date(advertiser.svydate).toDateString().replace(/\s\d{4}/, '');
                            } else {
                                advertiser.svydate = new Date().toDateString().replace(/\s\d{4}/, '');
                            }
                            temp = template;
                            regex = new RegExp('{{isEditorial}}');
                            temp = temp.replace(regex, isEditorial);
                            for (field in advertiser) {
                                if (advertiser.hasOwnProperty(field)) {
                                    regex = new RegExp('{{' + field + '}}', 'g');
                                    temp = temp.replace(regex, advertiser[field]);
                                }
                            }
                            if (!advertiser.points) {
                                regex = new RegExp('{{points}}');
                                points = parseFloat(advertiser.originationpoints) + parseFloat(advertiser.discpoints);
                                temp = temp.replace(regex, points);
                            }
                            regex = new RegExp('{{[a-zA-Z]+}}');
                            temp = temp.replace(regex, '');
                            idx('#IDX-bankRateContent').append(temp);
                        });
                        idx('div[data-editorial="true"] .IDX-mortgageRatesLogo').hide();
                        idx('div[data-editorial="true"] .IDX-mortgageRatesGoBtn').hide();
                        idx('#IDX-mortgageShowAllRates').show();
                        if (idx('#IDX-mortgageRatesProductId option:selected').text().match(/arm/i)) {
                            idx('.IDX-mortgageRatesCaps').show();
                        } else {
                            idx('.IDX-mortgageRatesCaps').hide();
                        }
                        idx('.IDX-mortgageRatesNMLS').each(function (index, ele) {
                            if (idx(ele).text() == 'NMLS # ')
                                idx(ele).remove();
                        });
                        idx('.IDX-mortgageRatesSlic').each(function (index, ele) {
                            if (idx(ele).text() == 'State Lic # ')
                                idx(ele).remove();
                        });
                        if (idx(window).width() <= 480) {
                            idx('.IDX-mortgageRatesInfo').addClass('IDX-mortgageRatesInfo-small');
                        } else {
                            idx('.IDX-mortgageRatesInfo').removeClass('IDX-mortgageRatesInfo-small');
                        }

                        if (idx(window).width() <= 420) {
                            idx('.IDX-mortgageRatesLogo img').addClass('IDX-mortgageRatesLogoImg-small');
                            idx('#IDX-mortgageRatesTable').addClass('IDX-mortgageRatesTable-small');
                        } else {
                            idx('.IDX-mortgageRatesLogo img').removeClass('IDX-mortgageRatesLogoImg-small');
                            idx('#IDX-mortgageRatesTable').removeClass('IDX-mortgageRatesTable-small');
                        }
                    } else {
                        idx('#IDX-bankRateContent').append(noResult);
                    }
                }).always(function () {
                    xhr = undefined;
                    idx('#IDX-BankRateDataloading').hide();
                });
            };
            var seeMoreRates = function () {
                var mortgages = generateMortgages();
                if (mortgages.zipcode !== '') {
                    var points;
                    if (mortgages.points === 'One') {
                        points = 'ZeroToOne';
                    } else if (mortgages.points === 'Two') {
                        points = 'OneToTwo';
                    } else {
                        points = mortgages.points;
                    }
                    window.open('http://www.bankrate.com/funnel/mortgages/mortgage-results.aspx?pid=p:idxb&zip=' + mortgages.zipcode + '&loan=' + mortgages.loanAmount + '&perc=' + mortgages.ltv + '&prods=' + mortgages.legacyID + '&points=' + points);
                } else {
                    window.open('http://www.bankrate.com/funnel/mortgages/?pid=p:idxb&loan=' + mortgages.loanAmount + '&prods=' + mortgages.legacyID + '&points=All');
                }
            };
            idx('#searchBankRate').click(function (e) {
                e.preventDefault();
                gatherBankRateData();
            });
            // show all rate links
            idx('#IDX-mortgageShowAllRates').click(function (e) {
                e.preventDefault();
                seeMoreRates();
            });
            idx('a[href="#IDX-bankRate"]').click(function (e) {
                e.preventDefault();
                var mortgages = generateMortgages();
                idx('#IDX-loanAmount input').val(mortgages.loanAmount.formatMoney());
                idx('#IDX-downPayment input').val(mortgages.downPayment.formatMoney());
                // open bankrate dialog
                idx("#IDX-BankRateTool-Dialog").dialog({
                    resizable: false,
                    modal: true,
                    width: '90%'
                });
                gatherBankRateData();
                idx('#IDX-mortgageRatesContent').show();
            });
            // center dialog
            idx(window).resize(function () {
                // if (idx(window)) {};
                idx("#IDX-BankRateTool-Dialog").dialog("option", "position", {
                    at: "center",
                    collision: "fit",
                    my: "center"
                });
            });
        }
    }

    if (idx.Modernizr.mq('only screen and (min-width: 640px)')) {

        if (!idx('#IDX-detailsWrapper').attr('data-collapse-details')) {
            idx('.IDX-panel-collapse').collapse('show');
            idx('.IDX-panel-collapse-toggle').removeClass('IDX-collapsed');
        }
        idx('#IDX-firstDate').datepicker();
        idx('#IDX-secondDate').datepicker();
    } else {
        idx('.IDX-panel-collapse').collapse('hide');
        idx('.IDX-panel-collapse-toggle').addClass('IDX-collapsed');
    }
    var openVirtualTourModal = function (e) {
        e.preventDefault();
        idx(idx(this).attr('href')).dialog('open');
    };

    // load slideshow images later.
    idx(function () {
        /**
         * Handle courtesy & disclaimer CSS selector rules.
         * @param {string} parent The parent selector.
         */
        var moveCourtesiesAndDisclaimers = function (parent) {
            if (idx(parent).length) {
                var container = '#IDX-main';
                idx(parent + ' > div').each(function () {
                    var selector = idx(this).children('.IDX-selector').text();
                    var text = idx(this).children('.IDX-selectorText').html();
                    idx(selector, container).append(text);
                });
            }
        }
        var selectors = ['.IDX-mlsSelectorRulesCourtesy', '.IDX-mlsSelectorRulesDisclaimer'];
        for (var i = 0; i < selectors.length; i++) {
            moveCourtesiesAndDisclaimers(selectors[i]);
        }

        idx('.IDX-mediaContentVT, .IDX-mediaContentOH').dialog({
            autoOpen: false,
            resizable: false
        });

        idx('#IDX-detailsVirtualTour').click(openVirtualTourModal);

        idx('#IDX-saveProperty').click(function (e) {
            e.preventDefault();
            var softLoggedIn = idx('#IDX-registration').attr('data-softLoggedIn');
            var idxID = idx(this).attr('data-idxid');
            var listingID = idx(this).attr('data-listingid');

            if (idx('#IDX-main').hasClass('IDX-loggedIn') && !softLoggedIn) {
                idx('#IDX-savePropertyForm .IDX-idxID').val(idxID);
                idx('#IDX-savePropertyForm .IDX-listingID').val(listingID);

                // they are logged in, submit the form
                idx('#IDX-savePropertyForm').ajaxSubmit({
                    dataType: 'json',
                    success: function (responseText, statusText, xhr, $form) {
                        var element = idx('#IDX-saveProperty');
                        if (responseText.status === 'success' || responseText.status === 'duplicate') {
                            element.text('Saved!');
                        } else {
                            element.after('Error saving property');
                        }
                    }
                });
            } else {
                idx('.IDX-saveParams').attr('disabled', 'disabled');
                idx('.IDX-saveWhat').val('property').removeAttr('disabled');
                idx('.IDX-idxID').val(idxID).removeAttr('disabled');
                idx('.IDX-listingID').val(listingID).removeAttr('disabled');
                idx('#IDX-registration').dialog('open');
            }
        });

        idx('.IDX-detailsshowcaseSlides a').click(function (e) {
            e.preventDefault();

            changePrimaryImg(idx(this));
        });
        // schedule link
        idx('#IDX-scheduleShowing').click(function (e) {
            e.preventDefault();
            if (idx('#IDX-detailsContactForm:visible').size() && idx('#IDX-scheduleshowingContactForm').size()) {
                window.location = window.location.href.replace(window.location.hash, '') + '#IDX-detailsContactForm';
            } else {
                window.location = idx(this).attr('href');
            }
        });

        // contact agent
        idx('#IDX-contactAgent').click(function (e) {
            e.preventDefault();
            if (idx('#IDX-detailsContactForm:visible').size() && idx('#IDX-detailscontactContactForm').size()) {
                window.location = window.location.href.replace(window.location.hash, '') + '#IDX-detailsContactForm';
            } else {
                window.location = idx(this).attr('href');
            }
        });
        // request more info
        idx('#IDX-moreinfo').click(function (e) {
            e.preventDefault();
            if (idx('#IDX-detailsContactForm:visible').size() && idx('#IDX-moreinfoContactForm').size()) {
                window.location = window.location.href.replace(window.location.hash, '') + '#IDX-detailsContactForm';
            } else {
                window.location = idx(this).attr('href');
            }
        });


        // bankRate
        bankRateSetup();
        /**
         * Set the carousel properties.
         *
         * @return array The carousel array.
         */
        var idxSlides = idxSlides || {};


    });
    // Close pannels on details page
    idx(document).ready(function () {
        idx('.IDX-page-listing .IDX-panel-collapse').each(function () {
            this.classList.remove('IDX-in');
        });
        idx('.IDX-page-listing .IDX-panel-collapse-toggle').each(function () {
            this.classList.add('IDX-collapsed');
        });

        // var isTablet = window.matchMedia("(min-width: 700px) and (max-width: 1250px)")
        // console.log(isTablet)
        // // the button
        // idx('.IDX-panel-collapse-toggle').on('click', function() {
        //     if (isTablet) {
        //         this.classList.toggle('row-expand');
        //     }
        //
        //     idx.each(idx('.IDX-panel-collapse'), function (index, item) {
        //         console.log(item)
        //         console.log(item.classList.contains('IDX-in'))
        //         if (item.classList.contains('IDX-in')) {
        //                 if (index < 3) {
        //                     idx('.IDX-panel-collapse')[0].classList.add('IDX-in');
        //                     idx('.IDX-panel-collapse')[1].classList.add('IDX-in');
        //                     idx('.IDX-panel-collapse')[2].classList.add('IDX-in');
        //                 } else {
        //                     idx('.IDX-panel-collapse')[3].classList.add('IDX-in');
        //                     idx('.IDX-panel-collapse')[4].classList.add('IDX-in');
        //                     idx('.IDX-panel-collapse')[5].classList.add('IDX-in');
        //                 }
        //         }
        //     })
        //     console.log('clicked function')
        //     console.log(this.classList);
        //     console.log(isTablet);
        // });
    });

    function calcHeight(pixels, element, type, divide) {
        if (divide == 0) {
            var nHeight = idx(window).outerHeight() - pixels - 27;
            idx(element).css(type, nHeight + 'px')
        } else {
            var nHeight = idx(window).outerHeight() - pixels - 27;
            var hSpit = nHeight / divide;
            idx(element).css(type, hSpit + 'px');
        }
    }

    if (idx(window).width() >= 1240) {

        calcHeight(115, '.IDX-category-details #IDX-details-row-content', 'min-height', 0);

    }


})(window, undefined);