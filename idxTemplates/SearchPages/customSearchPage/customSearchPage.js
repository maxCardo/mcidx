(function(window, undefined) {
    'use strict';
    var ajaxURL,
        timer,
        initialAdvFieldValues = [];

    window.idxSearchForm = idx('#IDX-searchForm');

    if (window.location.pathname.match(/idx/)) {
        ajaxURL = '/idx/ajax/search.php';
    } else {
        ajaxURL = window.ajaxURL;
    }

    var MobileFirst = function() {
        this.disclaimerElements = [];
        this.pageSettings = {
            queryArray: {}
        };
        this.defaultPriceData = {};

        // Try to load page setting.
        if (idx('#IDX-pageSettings').length) {
            var settingsString = idx('#IDX-pageSettings').text();
            var settingsObj =  JSON.parse(settingsString);
            idx.extend(this.pageSettings, settingsObj);
        }

        // Try to load default price data.
        if (idx('#IDX-defaultPriceData').length) {
            var defaultPriceText = idx('#IDX-defaultPriceData').text();
            var defaultPriceObj = JSON.parse(defaultPriceText);
            idx.extend(this.defaultPriceData, defaultPriceObj);
        }

        var isNeedToCheckMinAndMax = function(target) {
            return target.pageSettings.queryArray.pt &&
                (target.defaultPriceData.min || target.defaultPriceData.max) &&
                (! target.pageSettings.queryArray.lp && ! target.pageSettings.queryArray.hp);
        };

        // Set min and max price.
        if (isNeedToCheckMinAndMax(this)) {
            if (this.defaultPriceData.min) {
                this.pageSettings.queryArray.lp = this.defaultPriceData.min[this.pageSettings.queryArray.pt];
            }
            if (this.defaultPriceData.max) {
                this.pageSettings.queryArray.hp = this.defaultPriceData.max[this.pageSettings.queryArray.pt];
            }
        }
    };

    MobileFirst.prototype.generatePrices = function(input) {
        // Convert input to string.
        input = input.toString();
        var symbol;
        if (!input.match(/^\d+$|^\d+(-$|\+$|-\d+$)/)) {
            return [];
        }
        if (input.match(/\d+-$/)) {
            input = input.substr(0, input.indexOf('-')).toString();
            symbol = '-';
        }
        if (input.match(/\d+-\d+$/)) {
            return [input];
        }
        if (input.indexOf('+') !== -1) {
            return [input];
        }

        var length = input.length,
            maximum = (Math.pow(10, length) - 1),
            lessThan = input + '-',
            moreThan = input + '+',
            between = input + '-' + maximum;

        if (symbol === '-') {
            return [lessThan, between];
        }

        return [lessThan, moreThan, between];
    };

    MobileFirst.prototype.setPageSettings = function (settings) {
        if (typeof settings === 'object') {
            this.pageSettings = idx.extend(this.pageSettings, settings);
        } else {
            console.error('Please pass setting object');
        }
        return this.pageSettings;
    };

    MobileFirst.prototype.generatePropertyStatusOptions = function (currentIdxId, currentPtId) {
        const propStatusElement = idx('#IDX-propStatus');
        if (propStatusElement && idx.mlsList && currentIdxId && currentPtId) {
            propStatusElement.select2('enable', true).empty().append('<option/>');
            const propStatus = idx.mlsList[currentIdxId].ptData[currentPtId].availPropStatus;
            for (var key in propStatus) {
                if (propStatus.hasOwnProperty(key)) {
                    propStatusElement.append(idx('<option>').val(propStatus[key]).text(propStatus[key]));
                }
            }
        }
    };
    var mobileFirst = new MobileFirst();

    var isLeadEditSavedSearch = function() {
        if (window.location.search.match('edit=true')) {
            return true;
        }
        return false;
    };

    var isModifySearch = function () {
        if (window.location.search.match('modifySearch=true')) {
            return true;
        }
        return false;
    };

    var loadFieldData = function(query, fieldID, layoutID) {
        var idxID = idx.pageSettings.queryArray.idxID;
        var pt = idx.pageSettings.queryArray.pt;
        var options = {
            'action': 'loadFieldData',
            'idxID': idxID,
            'mlsPtID': pt,
            'fieldID': fieldID,
            'page': query.page,
            'term': query.term,
            'layoutID': (isNaN(layoutID) ? 0 : layoutID)
        };
        idx.getJSON(ajaxURL, options, function(response) {
            query.callback(response);
        }); // End getJSON.
    };

    var initSelect2 = function() {
        // Only do this if select2 exists.
        if (idx().select2) {
            var saveInitialValues = initialAdvFieldValues.length == 0;
            idx('.IDX-quickList').select2({
                allowClear: true,
                multiple: true,
                initSelection: function(element, callback) {
                    var data = [];
                    idx.each(idx(element).val().split('!%'), function(key, value) {
                        data.push({
                            id: value,
                            text: value
                        });
                    });
                    if (saveInitialValues) {
                        initialAdvFieldValues[element.attr('id')] = data;
                    }
                    callback(data);
                },
                formatSearching: function() {
                    return 'Loading values...<img style="float:right" src="/images/spinner.gif" />';
                },
                separator: '!%',
                query: function(query) {

                    var fieldID = idx(this)[0].element.attr('data-fieldid');
                    var layoutID = idx(this)[0].element.attr('data-layoutID');

                    if (!timer) {
                        loadFieldData(query, fieldID, layoutID);
                        timer = 1;
                    } else {
                        // If term, make sure it's longer than 2.
                        if (query.term.length > 0 && query.term.length < 3) {
                            return false;
                        }

                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            loadFieldData(query, fieldID, layoutID);
                        }, 400);
                    }
                }
            });

            idx('.IDX-quickListNumeric').select2({
                allowClear: true,
                multiple: true,
                separator: '!%',
                query: function(query) {
                    if (query.term.match(/\d+$/)) {
                        var data = { results: [] };
                        query.callback(data);
                    } else {
                        return [{ id: '', text: 'No matches found' }];
                    }
                },
                createSearchChoice: function(term, data) {
                    if (idx(data).filter(function() {
                        return this.text.localeCompare(term) === 0;
                    }).length === 0) {
                        if (term.match(/\d+/)) {
                            return { id: term, text: term };
                        }
                    }
                },
                formatSearching: function() {
                    return 'Enter any number';
                },
                initSelection: function(element, callback) {
                    var data = [];
                    idx.each(idx(element).val().split('!%'), function(key, value) {
                        data.push({
                            id: value,
                            text: value
                        });
                    });
                    if (saveInitialValues) {
                        initialAdvFieldValues[element.attr('id')] = data;
                    }
                    callback(data);
                },
            });
        }
    };
    var attemptToPopulateForm = function() {
        // The sources to check in order, if data is found we break out of the loop and use the first data found.
        var keys = Object.keys(idx.pageSettings.queryArray);
        var key, i, ele, value;
        for(i = 0; i < keys.length; i++) {
            key = keys[i];
            value = idx.pageSettings.queryArray[key];
            if (key.indexOf('_') > 0) {
                ele = idxSearchForm
                    .find('[name^='+key+']')
                    .filter(function(index, element) {
                        return element.name == key || element.name == key+'[]';
                    });
                if (ele.is(':radio')) {
                    var e1 = idxSearchForm.find('[name$="'+key+'"][value="'+value+'"]').prop('checked', true);

                    if (e1.data('e-change')) {
                        e1.change();
                    }
                } else {
                    if (ele.hasClass('IDX-quickList') && idx.isArray(value)) {
                        var select2ValueString = value.join('!%');
                        ele.filter('.IDX-quickList').val(select2ValueString);
                    }
                    if (ele.hasClass('IDX-quickListNumeric') && idx.isArray(value)) {
                        var select2ValueString = value.join('!%');
                        ele.filter('.IDX-quickListNumeric').val(select2ValueString);
                    }
                    // If checkbox and not an array, make it one.
                    if (ele.is(':checkbox') && !idx.isArray(value)) {
                        value = value.split(',');
                    }
                    // Set the value.
                    ele.filter(':not(.IDX-quickList):not(.IDX-quickListNumeric)').val(value);
                }
            }
        }
    };

    // MLS data and page setting.
    var loadPageInfo = function() {
        idx.mlsList = {};
        idx.account = {};
        idx.pageSettings = {
            queryArray: {},
            defaultQueryArray: {},
            hiddenFields: {}
        };
        idx.cczListRules = {};
        idx.disclaimers = {};
        idx.defaultPriceData = {};
        const queryArray = {};

        if (isLeadEditSavedSearch()) {
            var editSavedSearchText = idx('#IDX-editSavedSearchData').text();
            if (editSavedSearchText !== '') {
                mobileFirst.setPageSettings(JSON.parse(editSavedSearchText));
            }
        }

        idx.extend(idx.pageSettings, mobileFirst.pageSettings);
        idx.extend(idx.defaultPriceData, mobileFirst.defaultPriceData);

        if (idx('#IDX-cczListRules').size()) {
            var cczListRulesText = idx('#IDX-cczListRules').text();
            if (cczListRulesText !== '') {
                idx.extend(idx.cczListRules, JSON.parse(cczListRulesText));
                idx('#IDX-cczListRules').remove();
            }
        }
        if (idx('#IDX-mlsList').size()) {
            var mlsList = idx('#IDX-mlsList').text();
            if (mlsList !== '') {
                idx.extend(idx.mlsList, JSON.parse(mlsList));
                idx('#IDX-mlsList').remove();
            }
        }

        if (idx('#IDX-idxID').size()) {
            queryArray.idxID = idx('#IDX-idxID').val();
        } else {
            // Set the first idxID as default if no default value.
            if (!queryArray.idxID) {
                queryArray.idxID = idx('#IDX-idxID option[value]:first').val();
            }
        }
        // Set the first pt as default if no default value.
        if (idx('#IDX-pt').size()) {
            const pt = idx('#IDX-pt').val();
            queryArray.pt = pt;
            if (pt === '') {
                queryArray.pt = idx('#IDX-pt option[value]:first').val();
            }
        }

        // We won't get property status options on page load when modifying all properties search,
        // so we need to generate the property status options here.
        const propStatusElement = idx('#IDX-propStatus');
        if (propStatusElement && propStatusElement.find('option').length < 2) {
            mobileFirst.generatePropertyStatusOptions(queryArray.idxID, queryArray.pt);
        }

        idx.extend(idx.pageSettings.queryArray, queryArray);
        idx.extend(idx.pageSettings.defaultQueryArray, idx.pageSettings.queryArray);

        // Account status.
        idx.account.loggedIn = idx('#IDX-main').hasClass('IDX-loggedIn');
    };

    var resetSubTypeAndStatus = function() {
        // Property sub type.
        idx('#IDX-propSubType').select2('data', null);
        // SubType.
        idx('#IDX-propStatus').select2('data', null);
        idx.pageSettings.queryArray.a_propStatus = [];
        idx.pageSettings.queryArray.a_propSubType = [];
    };

    var coreFieldsSelect2 = function() {
        // Common functions for number select2.
        var createNumberChoices = function(term, data, label) {
            label = label || '';
            if (idx(data).filter(function() {
                return this.text.localeCompare(term) === 0;
            }).length === 0) {
                if (term.match(/\d+/)) {
                    return {
                        id: term,
                        text: label + term
                    };
                }
            }
        };

        var createCurrencyChoices = function(term, data, label) {
            label = label || '';
            if (idx(data).filter(function() {
                return this.text.localeCompare(term) === 0;
            }).length === 0) {
                if (term.match(/\d+/)) {
                    return {
                        id: term,
                        text: label + currencyFormat(term)
                    };
                }
            }
        };

        //  Function for generating guesses in the min and max select2 dropdown.
        var currencyQuery = function(query, label) {
            label = label || '';
            if (query.term.match(/\d+$/)) {
                var data = {
                    results: []
                };
                query.callback(data);
            } else {
                return [{
                    id: '',
                    text: 'No matches found'
                }];
            }
        };
        var numberQuery = function(query, label) {
            label = label || '';
            if (query.term.match(/\d+$/)) {
                var data = {
                        results: []
                    },
                    i, s;
                query.callback(data);
            } else {
                return [{
                    id: '',
                    text: 'No matches found'
                }];
            }
        };

        // Function to add commas and $ to numbers for currency.
        var currencyFormat = function (num){
            num = num.toString();
            // If there is a decimal only use numbers to the left of it.
            num = num.split('.');
            // Only numbers.
            num = num[0].replace(/\D/g,'');
            var numLength = num.length;
            numLength /=3;
            for(i=0; i<numLength; i++) {
                num = num.replace(/(\d+)(\d{3})/, '$1'+','+'$2');
            }
            return '$'+num;
        };

        // IDX.
        var idxPlaceholder = idx('#IDX-idxID').siblings('label').text() || 'Select Market Area';
        idx('select#IDX-idxID').select2({
            placeholder: idxPlaceholder
        });

        // Property Type.
        var ptPlaceholder = idx('#IDX-pt').siblings('label').text() || 'Property Type';
        idx('#IDX-pt').select2({
            placeholder: ptPlaceholder
        });

        // Property subType.
        var propSubTypesPlaceholder = idx('#IDX-propSubType').siblings('label').text() || 'Property Sub Type';
        var propSubTypesLabel = propSubTypesPlaceholder + ': ';
        idx('#IDX-propSubType').select2({
            placeholder: propSubTypesPlaceholder,
            allowClear: true,
            formatSelection: function(state) {
                return propSubTypesLabel + state.text;
            }
        });

        // Status.
        var statusPlaceholder = idx('#IDX-propStatus').siblings('label').text() || 'Status';
        var statusLabel = statusPlaceholder + ': ';
        idx('#IDX-propStatus').select2({
            placeholder: statusPlaceholder,
            allowClear: true,
            formatSelection: function(state) {
                return statusLabel + state.text;
            }
        });

        // City, county, postal code.
        var cityCountyPostalCodePlaceholder = idx('#IDX-ccz-select').siblings('label').text() || 'City, County, Postal Code';
        cityCountyPostalCodePlaceholder = cityCountyPostalCodePlaceholder.replace(/,([^,]*)$/, ' or$1');
        var cczSortFn =  function(results, container) {
            if (idx('#IDX-ccz-select option:selected').length && container.attr('class') === 'select2-results') {
                var filterResults = [];
                for (var i = 0; i < results.length; i++) {
                    if (this.dataType === idx(results[i].element).data('type')) {
                        filterResults[0] = results[i];
                        break;
                    }
                }
                return filterResults;
            }
            return results;
        };
        var getCczValues = function() {
            var values;
            if (idx.pageSettings.defaultQueryArray.ccz) {
                values = idx.pageSettings.defaultQueryArray[idx.pageSettings.defaultQueryArray.ccz];
            }
            return values;
        };

        var cczSelect = idx('#IDX-ccz-select');
        var cczInitialValues = getCczValues();
        if (cczInitialValues) {
            cczSelect.val(cczInitialValues)
        }

        cczSelect.select2({
            placeholder: cityCountyPostalCodePlaceholder,
            minimumInputLength: 1,
            matcher: function(term, text) {
                if(term === '') {
                    return false;
                } else {
                    return text.toUpperCase().indexOf(term.toUpperCase()) === 0;
                }
            },
            sortResults: cczSortFn,
            formatSelection: function(data, container, escapeMarkup) {
                if (data) {
                    this.dataType = data.element[0].dataset.type;
                }
                return idx.fn.select2.defaults.formatSelection.apply(null, arguments);
            }
        });
        if (cczInitialValues !== '') {
            idx('#IDX-ccz').val(idx('#IDX-ccz-select option:selected').data('type'));
            idx('#IDX-ccz-select').attr('name', idx('#IDX-ccz').val() + '[]');
        }

        // MinPrice.
        var minPricePlaceholder = idx('#IDX-lp').siblings('label').text() || 'Min Price';
        var minPriceLabel = minPricePlaceholder + ': ';
        idx('#IDX-lp').select2({
            placeholder: minPricePlaceholder,
            allowClear: true,
            initSelection: function(element, callback) {
                var val = idx(element).val();
                callback({id: val, text: minPriceLabel + currencyFormat(val)});
            },
            query: function(query) {
                return currencyQuery(query, minPriceLabel);
            },
            createSearchChoice: function(term, data) {
                // term = currencyFormat(term);
                return createCurrencyChoices(term, data, minPriceLabel);
            },
            formatResult: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return state.text;
                }
            },
            formatSelection: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    idx('input[name=lp]').val(state.id);
                    return state.text;
                }
            },
            formatSearching: function() {
                return 'Enter any number';
            }
        });

        // Max price.
        var maxPricePlaceholder = idx('#IDX-hp').siblings('label').text() || 'Max Price';
        var maxPriceLabel = maxPricePlaceholder + ': ';
        idx('#IDX-hp').select2({
            placeholder: maxPricePlaceholder,
            allowClear: true,
            initSelection: function(element, callback) {
                var val = idx(element).val();
                callback({id: val, text: maxPriceLabel + currencyFormat(val)});
            },
            query: function(query) {
                return currencyQuery(query, maxPriceLabel);
            },
            createSearchChoice: function(term, data) {
                // term = currencyFormat(term);
                return createCurrencyChoices(term, data, maxPriceLabel);
            },
            formatResult: function(state) {32
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return state.text;
                }
            },
            formatSelection: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    idx('input[name=hp]').val(state.id);
                    return state.text;
                }
            },
            formatSearching: function() {
                return 'Enter any number';
            }
        });

        // Bedrooms.
        var bedroomsPlaceholder = idx('#IDX-bd').siblings('label').text() || 'Bedrooms';
        var bedroomsLabel = bedroomsPlaceholder + ': ';
        idx('#IDX-bd').select2({
            placeholder: bedroomsPlaceholder,
            allowClear: true,
            formatResult: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return bedroomsLabel + state.text;
                }
            },
            formatSelection: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return bedroomsLabel + state.text;
                }
            }
        });

        // Total bathrooms.
        var bathroomsPlaceholder = idx('#IDX-tb').siblings('label').text() || 'Bathrooms';
        var bathroomsLabel = bathroomsPlaceholder + ': ';
        idx('#IDX-tb').select2({
            placeholder: bathroomsPlaceholder,
            allowClear: true,
            formatResult: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return bathroomsLabel + state.text;
                }
            },
            formatSelection: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return bathroomsLabel + state.text;
                }
            }
        });

        // Square feet.
        var sqftPlaceholder = idx('#IDX-sqft').siblings('label').text() || 'Square Feet';
        var sqftLabel = sqftPlaceholder + ': ';
        idx('#IDX-sqft').select2({
            placeholder: sqftPlaceholder,
            allowClear: true,
            initSelection: function(element, callback) {
                var val = idx(element).val();
                callback({id: val, text: sqftLabel + val});
            },
            query: function(query) {
                return numberQuery(query, sqftLabel);
            },
            createSearchChoice: function(term, data) {
                return createNumberChoices(term, data, sqftLabel);
            },
            formatResult: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return state.text;
                }
            },
            formatSelection: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return state.text;
                }
            },
            formatSearching: function() {
                return 'Enter any number';
            }
        });

        idx('#IDX-reduced').select2({
            placeholder: 'Price Reduced',
            allowClear: true,
            // Search box is useless for 5 options.
            minimumResultsForSearch: -1,
            formatSelection: function (state) {
                return 'Price reduced ' + state.text.toLowerCase()
            }
        });

        // Acres.
        var acresPlaceholder = idx('#IDX-acres').siblings('label').text() || 'Acres';
        var acresLabel = acresPlaceholder + ': ';
        idx('#IDX-acres').select2({
            placeholder: acresPlaceholder,
            allowClear: true,
            initSelection: function(element, callback) {
                var val = idx(element).val();
                callback({id: val, text: acresLabel + val});
            },
            query: function(query) {
                return numberQuery(query, acresLabel);
            },
            createSearchChoice: function(term, data) {
                return createNumberChoices(term, data, acresLabel);
            },
            formatResult: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return state.text;
                }
            },
            formatSelection: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    return state.text;
                }
            },
            formatSearching: function() {
                return 'Enter any number';
            }
        });

        // Add.
        var addPlaceholder = idx('#IDX-add').siblings('label').text() || 'Max Days Listed';
        idx('#IDX-add').select2({
            placeholder: addPlaceholder,
            allowClear: true,
            initSelection: function(element, callback) {
                var val = idx(element).val();
                var label = (val === '1') ? ' day' : ' days';
                callback({id: val, text: val + label});
            },
            query: numberQuery,
            createSearchChoice: createNumberChoices,
            formatResult: function(state) {
                if (state.id.match(/\d+$/)) {
                    var label = (state.id === '1') ? ' day' : ' days';
                    return state.text + label;
                }
            },
            formatSelection: function(state) {
                if (state.id === '' || state.id.match(/\d+$/)) {
                    var label = (state.id === '1') ? ' day' : ' days';
                    if (state.text.match('day')) {
                        return state.text;
                    } else {
                        return state.text + label;
                    }
                }
            },
            formatSearching: function() {
                return 'Enter any number';
            }
        });

        // Photo, virtual tour, open house, and feature.
        var searchRefinementInitialValues = [];
        if (idx.pageSettings.queryArray) {
            var refinementFields = ['amin_photocount', 'wvt', 'woh', 'fl'];
            var field;
            for(var i = 0; i < refinementFields.length; i++) {
                field = refinementFields[i];
                if (idx.pageSettings.queryArray[field]) {
                    searchRefinementInitialValues.push(field);
                    if (field === 'amin_photocount') {
                        idx('input[name="' + field + '"]').val('1');
                    } else {
                        idx('input[name="' + field + '"]').val('y');
                    }
                    idxSearchForm.find('[name^=' + field + ']').val(idx.pageSettings.queryArray[field]);
                }
            }
        }

        var refinementPlaceholderText = 'Image, Virtual Tour, Open House';

        // If the featured option exists, add it's text to the placeholder too.
        if (idx('#IDX-searchRefinement option[value=fl]').size() > 0) {
            refinementPlaceholderText += ', Featured';
        }

        // Search refinement.
        idx('#IDX-searchRefinement').val(searchRefinementInitialValues).select2({
            placeholder: refinementPlaceholderText
        });

        // Per page.
        idx('#IDX-per').select2({
            placeholder: 'Results per page',
            formatResult: function(state) {
                if (state.id.match(/\d+$/)) {
                    return '<b>' + state.text + '</b>' + ' results per page';
                }
            },
            formatSelection: function(state) {
                if (state.id.match(/\d+$/)) {
                    return '<b>' + state.text + '</b>' + ' results per page';
                }
            }
        });

        // Sort.
        idx('#IDX-srt').select2({
            placeholder: 'Sort By'
        });
    };

    var initCoreSelect2Values = function() {
        // Initalize default core select2 values.
        if (idx.pageSettings.defaultQueryArray) {
            for (var ele in idx.pageSettings.defaultQueryArray) {
                if (idx.pageSettings.defaultQueryArray.hasOwnProperty(ele)) {
                    idxSearchForm.find('[name^='+ele+']').select2('val', idx.pageSettings.defaultQueryArray[ele]);
                }
            }

            // Update refinement fields.
            var refinementFields = ['amin_photocount', 'wvt', 'woh', 'fl'];
            refinementFields.forEach(function(field) {
                var _field = idx('input[name="' + field + '"]');
                _field.val('');
                if (idx.pageSettings.defaultQueryArray[field]) {
                    _field.val(idx.pageSettings.defaultQueryArray[field]);
                }
            });

            // Price.
            var lp = idx.pageSettings.defaultQueryArray.lp || idx('#IDX-lp').val();
            var hp = idx.pageSettings.defaultQueryArray.hp || idx('#IDX-hp').val();
            if (lp !== '' && hp !== '') {
                idx('#IDX-lp, #IDX-min').val(lp);
                idx('#IDX-hp, .IDX-max').val(hp);
                idx('#IDX-price').val(lp + '-' + hp).trigger('change');
            } else if (lp !== '') {
                idx('#IDX-lp').val(lp);
                idx('#IDX-price').val(lp + '+').trigger('change');
            } else if (hp !== '') {
                idx('#IDX-hp').val(hp);
                idx('#IDX-price').val(hp + '-').trigger('change');
            }

        }
    };

    var initialDefaultPageSettings = function() {
        // Check bedroom and bathroom are both showing.
        if (!idx.pageSettings.hiddenFields.bd && !idx.pageSettings.hiddenFields.tb) {
            idx('#IDX-bd-group').addClass('IDX-bd-tb');
            idx('#IDX-tb-group').addClass('IDX-bd-tb');
        }

        if (!idx.pageSettings.hiddenFields.sqft && !idx.pageSettings.hiddenFields.acres) {
            idx('#IDX-sqft-group').addClass('IDX-sqft-acres');
            idx('#IDX-acres-group').addClass('IDX-sqft-acres');
        }

        // Check that min and max price are showing.
        if (!idx.pageSettings.hiddenFields.minPrice && !idx.pageSettings.hiddenFields.maxPrice) {
            idx('#IDX-minPrice-group, #IDX-maxPrice-group').addClass('IDX-minPrice-maxPrice');
        }
        initCoreSelect2Values();
    };

    var bindCoreFieldsEvents = function() {
        idx('#IDX-idxID').on('change', function() {
            var currentIdxId = idx(this).val();

            idx.pageSettings.queryArray.idxID = currentIdxId;

            var updateProperty = function(propTypes, defaultPt) {
                propTypes = propTypes || [];
                var propTypeElement = idx('#IDX-pt');
                propTypeElement.empty().append('<option/>');

                for (var key in propTypes) {
                    if (propTypes.hasOwnProperty(key)) {
                        var option = '<option value="' + key + '">' + propTypes[key] + '</option>';
                        propTypeElement.append(option);
                    }
                }

                var propTypeValue = (defaultPt) ? defaultPt : Object.keys(propTypes)[0];
                if (currentIdxId === idx.pageSettings.defaultQueryArray.idxID) {
                    propTypeValue = idx.pageSettings.defaultQueryArray.pt;
                }

                propTypeElement.val(propTypeValue).trigger('change');
            };

            var updateCCZ = function(cczList) {
                idx('#IDX-ccz-select optgroup').empty();
                idx('#IDX-ccz-select').select2('val', '');
                for (var key in idx.cczListRules) {
                    if (idx.cczListRules.hasOwnProperty(key)) {
                        var data = cczList[key];
                        var label = idx.cczListRules[key];
                        var optGroup = idx('#IDX-ccz-select optgroup[label="' + label + '"]');
                        for (var valKey in data) {
                            if (data.hasOwnProperty(valKey)) {
                                var option = '<option value="' + valKey + '" data-type="' + key + '">' + data[valKey] + '</option>';
                                optGroup.append(option);
                            }
                        }
                    }
                }
            };
            var updateDisclaimers = function(disclaimers) {
                if (!idx.middleware) {
                    // Removing current disclaimer and set threshold to avoid infinite loop.
                    var editSavedSearchDiv = document.getElementById('IDX-editSavedSearch');
                    var sibling = editSavedSearchDiv ? editSavedSearchDiv.nextSibling : null;
                    while (editSavedSearchDiv
                        && sibling
                        && (sibling.id !== 'IDX-defaultPriceData' || sibling.id !== 'IDX-modifySearchData')
                        ) {
                        sibling.remove();
                        sibling = editSavedSearchDiv.nextSibling;
                    }
                    editSavedSearchDiv.insertAdjacentHTML('afterend', disclaimers);
                    dynamicDisclaimer();
                }
            };
            idx('#IDX-advancedSearchFields').empty();

            if (currentIdxId !== '') {
                var updateUrl = function() {
                    // Change url.
                    if (window.location.href.match(/\?/)) {
                        if (window.location.href.match(/\?.*idxID=[a-zA-Z]{1}\d{3}/)) {
                            window.history.pushState('', '', window.location.href.replace(/idxID=[a-zA-Z]{1}\d{3}/, 'idxID=' + currentIdxId));
                        } else {
                            window.history.pushState('', '', window.location.href + '&idxID=' + currentIdxId);
                        }
                    } else {
                        window.history.pushState('', '', window.location.pathname + '?idxID=' + currentIdxId);
                    }
                };

                if (idx.mlsList[currentIdxId]) {
                    updateProperty(idx.mlsList[currentIdxId].propTypes, idx.mlsList[currentIdxId].defaultPt);
                    if ( !idx.middleware ) {
                        updateUrl();
                    }
                } else {
                    idx.ajax({
                        url: ajaxURL,
                        data: {action: 'getMlsPropertyInfo', idxID: currentIdxId},
                        dataType: 'JSON'
                    }).done(function(data) {
                        idx.extend(idx.mlsList, data);
                        // Update property type.
                        updateProperty(data[currentIdxId].propTypes, data[currentIdxId].defaultPt);
                        if ( !idx.middleware ) {
                            updateUrl();
                        }
                    });
                }

                if (idx.cczListRules[currentIdxId]) {
                    updateCCZ(idx.cczListRules[currentIdxId], currentIdxId);
                } else {
                    idx.ajax({
                        url: ajaxURL,
                        data: {action: 'getCCZList', idxID: currentIdxId},
                        dataType: 'JSON'
                    }).done(function(data) {
                        idx.cczListRules[currentIdxId] = data;
                        var cczGroup = idx('#IDX-ccz-select optgroup');
                        cczGroup.empty();
                        // Update ccz.
                        updateCCZ(data, currentIdxId);
                    });
                }
                if (mobileFirst.disclaimerElements.length > 0) {
                    mobileFirst.disclaimerElements.forEach(function(element) {
                        element.remove();
                    });
                    mobileFirst.disclaimerElements = [];
                }
                if ('string' === typeof idx.disclaimers[currentIdxId]) {
                    updateDisclaimers(idx.disclaimers[currentIdxId]);
                } else {
                    idx.ajax({
                        url: ajaxURL,
                        data: {action: 'getDisclaimers', idxID: currentIdxId},
                        dataType: 'JSON'
                    }).done(function(data) {
                        idx.disclaimers[currentIdxId] = data.disclaimer;
                        updateDisclaimers(data.disclaimer);
                    })
                }
            } else {
                updateProperty();
            }
        });

        // property Type.
        idx('#IDX-pt').on('change', function() {
            var currentIdxId = idx.pageSettings.queryArray.idxID,
                currentPtId = idx(this).val(),
                key, options;

            idx.pageSettings.queryArray.pt = currentPtId;

            resetSubTypeAndStatus();

            if (currentPtId === '') {
                idx('#IDX-propSubType').select2('enable', false);
                idx('#IDX-propStatus').select2('enable', false);
            } else {
                idx('#IDX-propSubType').select2('enable', true);
                idx('#IDX-propSubType').empty();
                idx('#IDX-propSubType').append('<option/>');
                idx('#IDX-lp').val(idx.defaultPriceData.min[currentPtId]);
                idx('#IDX-hp').val(idx.defaultPriceData.max[currentPtId]);

                if (typeof(idx.mlsList[currentIdxId]) !== 'undefined') {
                    var propSubTypes = idx.mlsList[currentIdxId].propSubTypes[currentPtId];
                    if (propSubTypes === null || propSubTypes.length === 0) {
                        // Empty prop sub type. Hide if not already.
                        if (!idx('#IDX-propSubType-group').hasClass('IDX-hidden')) {
                            idx('#IDX-propSubType-group').addClass('IDX-hidden');
                        }
                    } else {
                        if (!idx('#IDX-propSubType-group').attr('data-hidden') && idx('#IDX-propSubType-group').hasClass('IDX-hidden')) {
                            idx('#IDX-propSubType-group').removeClass('IDX-hidden');
                        }
                    }
                    for (key in propSubTypes) {
                        if (propSubTypes.hasOwnProperty(key)) {
                            options = '<option value="' + propSubTypes[key] + '">' + propSubTypes[key] + '</option>';
                            idx('#IDX-propSubType').append(options);
                        }
                    }
                    var ptBath = idx.mlsList[currentIdxId].ptData[currentPtId].bath;
                    var tbGroup = idx('#IDX-tb-group')
                    if (ptBath === null || ptBath === 'n'){
                        if (!tbGroup.hasClass('IDX-hidden')) {
                            tbGroup.addClass('IDX-hidden');
                        }
                    } else {
                        if (!tbGroup.attr('data-hidden') && tbGroup.hasClass('IDX-hidden')) {
                            tbGroup.removeClass('IDX-hidden');
                        }
                    }

                    var ptBed = idx.mlsList[currentIdxId].ptData[currentPtId].bed;
                    var bdGroup = idx('#IDX-bd-group')
                    if (ptBed === null || ptBed === 'n'){
                        if (!bdGroup.hasClass('IDX-hidden')) {
                            bdGroup.addClass('IDX-hidden');
                        }
                    } else {
                        if (!bdGroup.attr('data-hidden') && bdGroup.hasClass('IDX-hidden')) {
                            bdGroup.removeClass('IDX-hidden');
                        }
                    }
                    mobileFirst.generatePropertyStatusOptions(currentIdxId, currentPtId);
                }
                else {
                    var pt = idx('#IDX-pt').val()
                    var bdGroup = idx('#IDX-bd-group')
                    if (!bdGroup.hasClass('IDX-coreField-'+pt)) {
                        bdGroup.addClass('IDX-hidden');
                    } else {
                        bdGroup.removeClass('IDX-hidden');
                    }

                    var tbGroup = idx('#IDX-tb-group');
                    if (!tbGroup.hasClass('IDX-coreField-'+pt)) {
                        tbGroup.addClass('IDX-hidden');
                    } else {
                        tbGroup.removeClass('IDX-hidden');
                    }
                }
            }
            if (isNeedAdvancedFields()) {
                loadAdvancedFields();
            }
        });

        // CCZ.
        idx('#IDX-ccz-select').on('select2-selecting', function(e) {
            idx('#IDX-ccz').val(idx(e.choice.element).data('type'));
            if(idx.middleware) {
                idx('#IDX-ccz-select').attr('name', idx('#IDX-ccz').val() + '[]');
            }
        });

        // Price.
        idx('#IDX-price').on('change', function(e) {
            var price = e.val;
            if (price) {
                if (price.match(/\d+\-\d+/)) {
                    var prices = price.split('-');
                    if (parseFloat(prices[0]) < parseFloat(prices[1])) {
                        idx('#IDX-lp').val(prices[0]);
                        idx('#IDX-hp').val(prices[1]);
                    } else {
                        idx('#IDX-lp').val(prices[1]);
                        idx('#IDX-hp').val(prices[0]);
                    }
                }
                if (price.match(/\d+\+$/)) {
                    idx('#IDX-lp').val(price.replace('+', ''));
                    idx('#IDX-hp').val(null);
                }
                if (price.match(/\d+\-$/)) {
                    idx('#IDX-lp').val(null);
                    idx('#IDX-hp').val(price.replace('-', ''));
                }
            } else {
                idx('#IDX-lp').val(null);
                idx('#IDX-hp').val(null);
            }
        });

        // IDX-searchRefinement.
        idx('#IDX-searchRefinement').on('change', function(e) {
            var refinementFields = ['amin_photocount', 'wvt', 'woh', 'fl'],
                i;
            // Clean old values.
            for (i = refinementFields.length - 1; i >= 0; i--) {
                idx('input[name="' + refinementFields[i] + '"]').val('');
            }
            if (e.val.length) {
                for (i = e.val.length - 1; i >= 0; i--) {
                    var value = e.val[i];
                    if (value === 'amin_photocount') {
                        idx('input[name="' + value + '"]').val('1');
                    } else {
                        idx('input[name="' + value + '"]').val('y');
                    }
                }
            }
        });
    };

    var disabledEmptyFields = function(form) {
        var allFields = form.find('input, select, textarea');
        for (var i = allFields.length - 1; i >= 0; i--) {
            if (idx(allFields[i]).val() === '') {
                idx(allFields[i]).prop('disabled', true);
            }
        }
        form.find('input[name=price]').prop('disabled', true);
    };
    var enableDisabledField = function(form) {
        var allFields = idx(form).find('input, select, textarea');
        allFields.prop('disabled', false);
    };

    var getSavedSearchID = function() {
        var match = window.location.search.match(/ssid=(\d*)/);
        return match[1];
    };

    var buildCCZSelect = function (form) {
        var values = idx('#IDX-ccz-select').val();
        if ( values && values.length) {
            var cczType = idx('#IDX-ccz').val();

            var cczListFieldsInDOM = idx('#ciID, #coID, #pcID');
            if (cczListFieldsInDOM.size() > 0) {

                var cczListElements = {
                    "city": "ciID",
                    "county": "coID",
                    "zipcode": "pcID"
                };

                // Disable the non-active ccz lists
                cczListFieldsInDOM.prop('disabled', true);
                idx('#' + cczListElements[cczType]).removeAttr('disabled');
            }

            var virtualSelect = idx('<select>').attr({
                name: cczType + '[]',
                multiple: 'multiple'
            }).addClass('IDX-hide');
            var values = [];
            var selectedOptions = idx('#IDX-ccz-select option:selected');
            var value;
            idx(selectedOptions).each(function(i, e) {
                e = idx(e);
                value = e.val();
                if (values.indexOf(value) === -1) {
                    virtualSelect.append(e);
                    values.push(value);
                }
            });
            form.append(virtualSelect);
        }
    };

    /*
     * Build quickList input fields.
     */
    var buildQuickListInputs = function(form) {
        var input;
        form.find('.IDX-quickList:hidden, .IDX-quickListNumeric:hidden').each(function(index, element) {
            if (element.value) {
                var jqueryElement = idx(element);
                var name = element.name + '[]';
                idx.each(jqueryElement.select2("data"), function(key, value) {
                    input = idx('<input>')
                        .addClass('IDX-quickListHiddenField')
                        .attr({type: 'hidden', name: name, value: value.id});
                    form.append(input);
                })
            }
            // Remove the original quick list element from the clone.
            idx(element).remove();
        });
    };

    var bindSearchPageButtonsEvents = function() {
        idx('#IDX-formSubmit, #IDX-submitButton, #IDX-formSubmit-bottom').click(function(e) {
            e.preventDefault();
            // Update searchForm.
            var dataAction = idx(this).attr('data-action');
            if ( dataAction === 'search')  {
                // Setup form for submission.
                idx('#IDX-searchRefinement').prop('disabled', true);

                disabledEmptyFields(idxSearchForm);
                buildCCZSelect(idxSearchForm);
                buildQuickListInputs(idxSearchForm);

                idx('#IDX-loadingScreen').dialog({
                    autoOpen: false,
                    resizable: false,
                    width: 100,
                    open: function() {
                        idx('.ui-dialog-titlebar').hide();
                    },
                    hide: 'fold',
                    modal: true
                });
                if (!idx.middleware) {
                    idx('#IDX-loadingScreen').dialog('open');
                }
                idxSearchForm.submit();
                enableDisabledField(idxSearchForm);
            } else if ( dataAction === 'editSavedSearch'){
                disabledEmptyFields(idxSearchForm);
                buildCCZSelect(idxSearchForm);
                buildQuickListInputs(idxSearchForm);
                idx('#IDX-error').remove();
                var queryString = idxSearchForm.serialize();
                var savedSearchID = getSavedSearchID();

                idx.ajax({
                    url: ajaxURL,
                    type: 'POST',
                    data:  {
                        action: 'editSaveSearch',
                        id: savedSearchID,
                        queryString: queryString
                    },
                    dataType: 'json'
                }).done(function(data) {
                    if (data.error) {
                        idxSearchForm.prepend('<div id="IDX-error" class="IDX-alert IDX-alert-danger">' +
                            'Could not save search. ' + data.message + ' ' +
                            '<a href="/idx/userlogin">Log in</a>' +
                            '</div>');
                        idx('[disabled]').removeAttr('disabled');
                        return false;
                    } else {
                        window.location.href = data.url;
                    }
                });
            } else {
                idxSearchForm.fadeOut(600, function() {
                    idx('#IDX-emailUpdateSignupStep2Container').removeClass('IDX-hide').show();
                    var action = idxSearchForm.attr('action');
                    disabledEmptyFields(idxSearchForm);
                    buildCCZSelect(idxSearchForm);
                    buildQuickListInputs(idxSearchForm);
                    // Determine the results page the search is going to.
                    var matches = action.match(/\/results\/(.*)/);
                    var queryString = 'page=' + matches[1] + '&' + idxSearchForm.serialize();
                    idx('#IDX-saveSearchForm .IDX-queryString').val(queryString);
                    var url = idx('#IDX-saveSearchForm').attr('action');
                    var paramObj = {};


                    idx.each(idx('#IDX-saveSearchForm').serializeArray(), function(index, data) {
                        if (data.value !== '') {
                            paramObj[data.name] = data.value;
                        }
                    });

                    // They are logged in, submit the form.
                    idx.ajax({
                        url: url,
                        type: 'POST',
                        data: paramObj,
                        dataType: 'json'
                    }).done(function(response) {
                        if (response && response.emailUpdateSearch) {
                            idxSearchForm.appendTo('body').submit();
                        }
                    });
                });
            }
        });
        idx('#IDX-formReset, #IDX-formReset-bottom').click(function() {
            var formId = idx("#IDX-formReset").closest('form').attr('id');
            var form = document.forms[formId];
            if (form) {
                form.reset();
                var select2MultiElements = idx('#' + formId).find(
                    '#IDX-coreSearchFields .select2-container, #IDX-advancedSearchFields .select2-container'
                );
                var select2Id, selectId;
                for (var i = 0; i < select2MultiElements.length; i++) {
                    select2Id = idx(select2MultiElements[i]).attr('id');
                    selectId = select2Id.replace('s2id_', '');
                    if (selectId !== 'IDX-idxID' && selectId !== 'IDX-pt') {
                        idx('#'+selectId).select2('data', initialAdvFieldValues[selectId] || null);
                    }
                }
            }
            initCoreSelect2Values();
            attemptToPopulateForm();
        });
    };

    var bindEmailUpdateSignupButtonsEvents = function() {
        // Search form submit buttons.
        idx('#IDX-formSubmit, #IDX-formSubmit-bottom').click(function(e) {
            e.preventDefault();
            disabledEmptyFields(idxSearchForm);
            buildCCZSelect(idxSearchForm);
            buildQuickListInputs(idxSearchForm);

            // Determine the results page the search is going to.
            var action = idxSearchForm.attr('action');
            var matches = action.match(/\/results\/(.*)/);
            var queryString = 'page=' + matches[1] + '&' + idxSearchForm.serialize();
            handleEmailSignupForm(queryString);
        });

        // If emailupdate signup from social authorization.
        if (idx('#IDX-registration').data('emailupdatessearch')) {
            handleEmailSignupForm(idx('#IDX-registration').data('emailupdatessearch'));
        }

        // Sign up from submit buttons.
        idx('#IDX-submitBtn').click(function(e) {
            e.preventDefault();
            var errorMessage = '';
            // Clear the existing error fields.
            idx('#IDX-signupForm').find('.IDX-errorField').each(function () {
                idx(this).removeClass('IDX-errorField');
            });
            // Validate.
            idx('#IDX-signupForm').find('input[data-fieldrequired], textarea[data-fieldrequired], select[data-fieldrequired]').each(function() {
                // Check any required field for a value.
                if (idx(this).val() === '') {
                    idx(this).addClass('IDX-errorField');
                    errorMessage += '<br />Please fill out all required fields.';
                } else if (idx(this).attr('name') === 'email') {
                    // Check email field for validity.
                    idx(this).val(idx.trim(idx(this).val()));
                    var reg = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/;
                    if (!reg.test(idx(this).val())) {
                        errorMessage += '<br />Email address format is not valid.';
                        idx(this).addClass('IDX-errorField');
                    }
                } else if (idx(this).attr('type') === 'checkbox' && !idx(this).is(':checked')) {
                    errorMessage += '<br />Please fill out all required fields.';
                    idx(this).parent().addClass('IDX-errorField');
                } else if (idx(this).attr('type') === 'radio' && !idx(this).is(':checked')) {
                    // Find a matching radio.
                    var selectedRadioCount = idx('input[name=' + idx(this).attr('name') + ']:checked').length;
                    if (!selectedRadioCount) {
                        errorMessage += '<br>Please fill out all required fields.';
                        idx(this).parent().addClass('IDX-errorField');
                    }
                }
            });
            if (errorMessage === '') {
                var url = idx('#IDX-signupForm').attr('action');
                var paramObj = {};
                idx.each(idx('#IDX-signupForm').serializeArray(), function(index, data) {
                    if (data.value !== '') {
                        paramObj[data.name] = data.value;
                    }
                });
                idx.ajax({
                    url: url,
                    type: 'POST',
                    data: paramObj,
                    dataType: 'json'
                }).done(function(response) {
                    if (response.error === 'n') {
                        if (response.redirectLink) {
                            window.location = response.redirectLink;
                        }
                    }
                });
            } else {
                idx('#IDX-signupForm .IDX-formResponse').html('<p class="IDX-errorMessage"><span class="IDX-errorIcon"></span>Validation failed.' + errorMessage + '</p>').fadeIn('slow');
            }
        });

        // log in.
        idx('#IDX-loginSubmit').click(function(e) {
            e.preventDefault();
            if (!idx('#IDX-loginResponse').find('img').size()) {
                idx('#IDX-loginResponse').append('<img src="/images/ajaxLoadSmall.gif" style="display:block; margin: 0 auto;">');
            } else {
                idx('#IDX-loginResponse').show();
            }
            if (idx('#IDX-leadNotExist')) {
                idx('#IDX-leadNotExist').hide();
            }
            idx('#IDX-loadingScreen').fadeIn('slow');

            var loginForm = idx(this).closest('form');
            var url = loginForm.attr('action');
            loginForm.find('input, select, textarea').each(function(index, ele) {
                if (idx(ele).val() === '') {
                    idx(ele).prop('disabled', true);
                }
            });
            var data = {};
            var inputData = loginForm.serializeArray();
            for (var i = 0; i < inputData.length; i++) {
                var _data = inputData[i];
                data[_data.name] = _data.value;
            }

            idx.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'JSON'
            }).done(function(response) {
                if (response.error === 'n' && response.emailUpdateSearch) {
                    idxSearchForm.submit();
                }
                if(response.leadNotExist) {
                    if (idx('#IDX-leadNotExist').size()) {
                        idx('#IDX-leadNotExist').show();
                    } else {
                        idx('#IDX-emailUpdateSignupStep2').after('<div id="IDX-leadNotExist" class="IDX-alert IDX-alert-danger">' +
                            'Account not exist' +
                            '</div>');
                    }
                }
            }).always(function() {
                idx('#IDX-loginResponse').hide();
            });
        });
    };

    /**
     * Handle the email update signup step two UI changes.
     *
     * @param {string} queryString The search query string to be saved.
     */
    function handleEmailSignupForm(queryString) {
        idxSearchForm.fadeOut(600, function() {
            idx('#IDX-emailUpdateSignupStep2Container').removeClass('IDX-hide').show();

            // Logged In.
            if (idx.account.loggedIn) {
                // Handle if the user is logged in already.
                idx('#IDX-saveSearchForm .IDX-queryString').val(queryString);
                var url = idx('#IDX-saveSearchForm').attr('action');
                var paramObj = {};
                idx.each(idx('#IDX-saveSearchForm').serializeArray(), function(index, data) {
                    if (data.value !== '') {
                        paramObj[data.name] = data.value;
                    }
                });

                // They are logged in, submit the form.
                idx.ajax({
                    url: url,
                    type: 'POST',
                    data: paramObj,
                    dataType: 'json'
                }).done(function(response) {
                    if (response && response.emailUpdateSearch) {
                        idxSearchForm.submit();
                    }
                });
            } else {
                idx('#IDX-registration .IDX-saveParams').attr('disabled', 'disabled');
                idx('#IDX-registration .IDX-saveWhat').val('emailUpdatesSearch').removeAttr('disabled');

                // Set the searchID.
                var searchPageID = idxSearchForm.data('pageid');

                idx('#IDX-registration .IDX-queryString').val(queryString).removeAttr('disabled');
                idx('#IDX-registration .IDX-searchPageID').val(searchPageID).removeAttr('disabled');
                idx('#IDX-registration').fadeIn(400);
            }
        });
    }
    var isNeedAdvancedFields = function() {
        if (idx.middleware) {
            if (idx('.mwpage-addeditwidget').size() || idx('.mwpage-addeditsavedlink')) {
                return idx.pageSettings.advancedFields === 'on';
            }
            return false;
        }
        return idx.pageSettings.advancedFields === 'on' && idx.pageSettings.queryArray.idxID;
    };

    var loadAdvancedFields = function() {
        var idxID = idx.pageSettings.queryArray.idxID || idx.pageSettings.defaultQueryArray.idxID;
        var pt = idx.pageSettings.queryArray.pt || idx.pageSettings.defaultQueryArray.pt;
        var pageID = idx('#IDX-searchForm').attr('data-pageid');
        var version = idx('#IDX-advancedSearchFields').size() ? idx('#IDX-advancedSearchFields').data('version').toFixed(3) : 1.000;
        if (idxID && pt) {
            if (!idx('#IDX-loadingScreen:visible').size()) {
                idx('#IDX-loadingScreen').fadeIn('slow');
            }
            idx('#IDX-advancedSearchFields').empty();
            // load the advanced fields.
            var options = {
                'action': 'loadAdvFields',
                'idxID': idxID,
                'pt': pt,
                'pageID': pageID,
                'version': version
            };
            if (isModifySearch()) {
                options.modifySearch = true;
            }

            idx.get(ajaxURL, options, function(html) {
                idx('#IDX-advancedSearchFields').empty();
                idx('#IDX-advancedSearchFields').append(html);
                attemptToPopulateForm();
                initSelect2();
                coreFieldsSelect2();
                idx('#IDX-loadingScreen').hide();
                idx(window).trigger('resize');
                idx('#IDX-advancedSearchFields .IDX-makeDatePicker').datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: "m-d-yy"
                });
            }, 'html'); // end getJSON.
        }
    };

    var intialLayoutHandler = function() {
        if (!idx.layoutSettings) {
            idx.layoutSettings = {
                actionButtonsPostion: idx('#IDX-action-buttons').offset()
            };
        }

        idx(window).smartresize(function() {
            var buttonsArea = idx('#IDX-action-buttons');
            var containerWidth = buttonsArea.parent().outerWidth();
            buttonsArea.width(containerWidth);
        });
        idx(window).trigger('resize');
    };

    var dynamicDisclaimer = function() {
        // Handle courtesy cssSelector rules.
        if (idx('.IDX-mlsSelectorRulesDisclaimer').size() > 0) {
            // Standard selector rules, container based on the page category.
            idx('.IDX-mlsSelectorRulesDisclaimer > div').each(function(key, value) {
                var selector = idx(this).children('.IDX-selector').text();
                var disclaimerElement = idx(this).children('.IDX-selectorText').html();
                var selectorText = idx(disclaimerElement);
                idx(selector, '#IDX-main').append(selectorText);
                mobileFirst.disclaimerElements.push(selectorText);
            });
        }
    };

    idx(function() {

        // enableDisableField.
        enableDisabledField(idxSearchForm);

        // load page initial info (default mls, hidden fields, etc..)
        loadPageInfo();

        // select2.
        coreFieldsSelect2();

        // After select2 elements have been finished, showing the search content. This will avoid flashing page style.
        idx('#IDX-searchPageWrapper').removeClass('IDX-hide').removeClass('hide');

        // Layout.
        initialDefaultPageSettings();

        // Bind events.
        bindCoreFieldsEvents();

        idx('#IDX-formSubmit, #IDX-submitButton, #IDX-formSubmit-bottom').unbind('click');

        if (idx.pageSettings.emailUpdateSignup) {
            if (idx.account.loggedIn) {
                idx('#IDX-emailUpdateSignupStep2Container').prepend('<div id="IDX-emailUpdateSignupStep2" class="IDX-emailUpdateSignupText">Step 2: Saving search...</div>');
                idx('#IDX-formSubmit, #IDX-formSubmit-bottom').text('Save Search');
                idx('#IDX-formSubmit, #IDX-formSubmit-bottom').attr('data-action', 'saveSearch');
                bindSearchPageButtonsEvents();
            } else {
                // Not logged in so move the registration content into step 2 stuff.
                idx('#IDX-registrationContent').prepend('<div id="IDX-emailUpdateSignupStep2" class="IDX-emailUpdateSignupText">Step 2: Create a personalized Listing Manager account.</div>');
                idx('#IDX-registration').hide().prependTo('#IDX-emailUpdateSignupStep2Container').removeClass('ui-dialog-content ui-widget-content');
                bindEmailUpdateSignupButtonsEvents();
            }
        } else {
            bindSearchPageButtonsEvents();
        }

        // Loading advancedSearchFields.
        if (isNeedAdvancedFields()) {
            loadAdvancedFields();
        }
        intialLayoutHandler();
        if (isLeadEditSavedSearch()) {
            idx('#IDX-formSubmit, #IDX-formSubmit-bottom').text('Save Search');
            idx('#IDX-formSubmit, #IDX-formSubmit-bottom').attr('data-action', 'editSavedSearch');
        }
        dynamicDisclaimer();
    });

})(window);

window.disableFields = function () {
    // Clear any persisting hidden quick list fields.
    idx('.IDX-quickListHiddenField').remove();

    // Go through each input.
    idx('#IDX-searchForm :input').each(function() {

        var disable = false;

        // If has the class no-disable, then skip.
        if (idx(this).hasClass('no-disable')) {
            return; // Basically like continue, but were in a function.
        }

        // Disable and inputs that don't need to be submitted.
        if (idx(this).hasClass('IDX-noSubmit') || idx(this).attr('name') === undefined)
        {
            disable = true;
        }
        // If the field has nothing set or no data, disable it.
        else if (idx(this).val() === '' || idx(this).val() === null)
        {
            disable = true;
        }
        // Handle any select2 inputs.
        else if ((idx(this).hasClass('IDX-quickList') || idx(this).hasClass('IDX-quickListNumeric')) && idx(this).attr('type') === 'hidden')
        {
            var currentElement = idx(this);
            idx.each(idx(this).select2("data"), function(key,value) {
                currentElement.after('<input class="IDX-quickListHiddenField" type="hidden" name="'+currentElement.attr('name')+'[]" value="'+value.id+'" />');
            });
            disable = true;
        }

        // Disable it.
        if (disable)
        {
            idx(this).attr('disabled','disabled');
        }
    }); // End each.

    return true;
};

window.reorderParams = function () {
    /**
     *  Form Variables Rearrangement.
     *  We do this since browser can't take more than a finite # of GET variables.
     *  The ones at front will take precedence over those in the very end.
     */

        // Set up specific variables we want at the front of our search.
        // lp = low price, hp = high price, bd = bedrooms, tb = bathrooms, pt = property type,
        // sqft = square feet, acres = acres, idxID = MLS ID.
    var keys = ['lp', 'hp', 'bd', 'tb', 'pt', 'sqft', 'acres', 'idxID'] ;

    // Remove any existing ones that have been added.
    idx('.IDX-reorderedHiddenField').remove();

    // Go through each input (which includes selects for jQuery.
    idx('#IDX-searchForm :input').each(function(){
        // If the input name is from "keys" array.
        if(idx.inArray(this.name,keys) != -1 && !idx(this).is('disabled') && idx(this).val() !== '')
        {
            // Prepend to the front of the form:
            // idx(this).closest("form").prepend(this);
            idx(this).attr('disabled','disabled');
            idx(this).closest("form").prepend('<input class="IDX-reorderedHiddenField" type="hidden" name="'+this.name+'" value="'+this.value+'" />');
        }
    });
};
