(function (window, undefined) {
    'use strict';
    idx(function(){
        idx.pageSettings = {};
        // load pageSettings
        if (idx('#IDX-pageSettings').size()) {
            var pageSettingsText = idx('#IDX-pageSettings').text();
            if (pageSettingsText !== '') {
                idx.extend(idx.pageSettings, JSON.parse(pageSettingsText));
                idx('#IDX-pageSettings').remove();
            }
        }

        var ptPlaceholder = idx('#IDX-pt').siblings('label').text() || 'Property Type';
        // property Type
        idx('select#IDX-pt').select2({
            placeholder: ptPlaceholder
        });
        // Market area selection.
        if (idx('#IDX-idxID').length > 0 && idx('#IDX-idxID')[0].localName == 'select') {
            idx('#IDX-idxID').select2({
                placeholder: idx('#IDX-idxID').siblings('label').text() || 'Select Market Area'
            });
        }
        // city, county, postal code
        var cityCountyPostalCodePlaceholder = idx('#IDX-ccz-select').siblings('label').text() || 'City, County, Postal Code';
        cityCountyPostalCodePlaceholder = cityCountyPostalCodePlaceholder.replace(/,([^,]*)$/, ' or $1');
        var cczSortFn = function(results, container) {
            if (idx('select#IDX-ccz-select option:selected').length && container.attr('class') === 'select2-results') {
                var chosenOption = idx('select#IDX-ccz-select option:selected')[0];
                var chosenType = idx(chosenOption).data('type');
                var filterResults = [];
                for (var i = 0; i < results.length; i++) {
                    if (chosenType === idx(results[i].element).data('type')) {
                        filterResults[0] = results[i];
                        break;
                    }
                }
                return filterResults;
            }
            return results;
        };
        // Use saved search queryArray if editing a saved search on the address page.
        if (idx('#IDX-editSavedSearchData').text().length > 0) {
            var savedSearchData = JSON.parse(idx('#IDX-editSavedSearchData').text());
            idx.pageSettings.queryArray = savedSearchData.queryArray;
        }
        if (location.search.match(/edit=true&ssid=\d+/)) {
            idx('#IDX-searchForm #IDX-formSubmit').text('Save Search');
            idx('#IDX-searchForm #IDX-formSubmit').attr('data-action', 'editSavedSearch');
        }
        if (idx.pageSettings.queryArray && idx.pageSettings.queryArray['aw_address']) {
            idx('[name="aw_address"]').val(idx.pageSettings.queryArray['aw_address']);
        }
        var getCczValues = function() {
            var values;
            if (idx.pageSettings.queryArray && idx.pageSettings.queryArray.ccz) {
                values = idx.pageSettings.queryArray[idx.pageSettings.queryArray.ccz];
            }
            return values;
        };
        var cczSelect = idx('#IDX-ccz-select');
        var cczInitialValues = getCczValues();
        if (cczInitialValues) {
            cczSelect.val(cczInitialValues);
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
            sortResults: cczSortFn
        });

        if (cczInitialValues !== '') {
            idx('#IDX-ccz').val(idx('select#IDX-ccz-select option:selected').data('type'));
            idx('#IDX-ccz-select').attr('name', idx('#IDX-ccz').val() + '[]');
        }

        idx('select#IDX-ccz-select').on('change', function() {
            idx('#IDX-ccz').val('');
            if (idx('select#IDX-ccz-select option:selected').size()) {
                idx('#IDX-ccz').val(idx('select#IDX-ccz-select option:selected').data('type'));
                idx('#IDX-ccz-select').attr('name', idx('#IDX-ccz').val() + '[]');
            }
        });

        var refinementFieldSetup = function(field) {
            if (field === 'amin_photocount') {
                idx('[name="' + field + '"]').val('1')
            }
            else{
                idx('[name="' + field + '"]').val('y')
            }
        };

        var searchRefinementInitialValues = [];
        var refinementFields = [ 'amin_photocount', 'wvt', 'woh' ];
        if (idx.pageSettings.queryArray) {
            for(var i = 0; i < refinementFields.length; i++) {
                if (idx.pageSettings.queryArray[refinementFields[i]]) {
                    searchRefinementInitialValues.push(refinementFields[i]);
                    refinementFieldSetup(refinementFields[i]);
                }
            }
        }
        // searchRefinement
        idx('select#IDX-searchRefinement').val(searchRefinementInitialValues).select2({
            placeholder: 'Image, Virtual Tour, Open House, Featured '
        });

        idx('select#IDX-searchRefinement').on('change', function(e) {
            // clean old values
            for (var i = refinementFields.length - 1; i >= 0; i--) {
                idx('input[name="' + value + '"]').val('');
            }
            if (e.val.length) {
                for (i = e.val.length - 1; i >= 0; i--) {
                    var value = e.val[i];
                    refinementFieldSetup(value);
                }
            }
        });
        window.idxSearchForm = idx('#IDX-searchForm');
        idx('#IDX-formSubmit').click(function(e) {
            e.preventDefault();
            var dataAction = idx(this).attr('data-action');
            idx('#IDX-searchRefinement').prop('disabled', true);
            if (idx('#IDX-ccz').val() === '') {
                idx('#IDX-ccz').val('city');
            }
            var allFields = idxSearchForm.find('input, select, textarea');
            for (var i = allFields.length - 1; i >= 0; i--) {
                if (idx(allFields[i]).val() === '') {
                    idx(allFields[i]).prop('disabled', true);
                }
            }

            if (idx('#IDX-ccz-select option:selected').size()) {
                var cczType = idx('#IDX-ccz-select option:selected').data('type');
                var virtualSelect = idx('<select>').attr({
                    name: cczType + '[]',
                    multiple: 'multiple'
                }).addClass('IDX-hide');
                virtualSelect.append(idx('#IDX-ccz-select option:selected'));
                idxSearchForm.append(virtualSelect);
            }
            if (dataAction == 'search') {
                idxSearchForm.submit();
                // Enable the disabled fields.
                idx(idxSearchForm).find('input, select, textarea').removeAttr('disabled');
            } else if (dataAction == 'editSavedSearch') {
                var match = window.location.search.match(/ssid=(\d*)/);
                var savedSearchID = match[1];
                idx.ajax({
                    url: '/idx/ajax/search.php',
                    type: 'POST',
                    data: {action: 'editSaveSearch', id: savedSearchID, queryString: idxSearchForm.serialize()},
                    dataType: 'json'
                }).done(function(data) {
                    if (data.error) {
                        idxSearchForm.prepend('<div id="IDX-error" class="IDX-alert IDX-alert-danger">' +
                            'Could not save search. ' + data.message + ' ' +
                            '<a href="/idx/userlogin">Log in</a>' +
                            '</div>');
                        idx('[disabled]').removeAttr('disabled');
                        return false;
                    }
                    window.location.href = data.url;
                });
            }
        });
        /*
         * Handle courtesy cssSelector rules.
         */
        if (idx('.IDX-mlsSelectorRulesDisclaimer').size() > 0) {
            // Standard selector rules, container based on the page category.
            idx('.IDX-mlsSelectorRulesDisclaimer > div').each(function(key, value) {
                var selector = idx(this).children('.IDX-selector').text();
                var selectorText = idx(this).children('.IDX-selectorText').html();
                idx(selector, '#IDX-main').append(selectorText);
            });
        }

        /**
         * Break up a URI string into key:value pairs.
         *
         * @param String searchString The string to search.
         */
        var idxParseQueryString = function (searchString) {
            var params = {};
            searchString.replace(
                new RegExp(/([^?=&]+)(=([^&]*))?/, 'g'),
                function ($0, $1, $2, $3) {
                    params[$1] = $3
                }
            )
            return params;
        }
        // Register the on click event handler for the reset button.
        idx('#IDX-formReset').on('click', function resetSelect2Fields () {
            var params = idxParseQueryString(window.location.search);
            var select2Fields = {
                'idxID': idx('#IDX-idxID'),
                'pt': idx('#IDX-pt'),
                'ccz': idx('#IDX-ccz-select'),
                'refinement': idx('#IDX-searchRefinement')
            }
            // Loop through each select2 field that doesn't have a URI parameter.
            Object.keys(select2Fields).filter(function filterKeys (key) {
                return (!(key in params)) && select2Fields[key].length;
            }).map(function fields (key) {
                var val = '';
                if (key === 'pt') {
                    // Select the first option that's not blank and add that as the value to select2.
                    var option = select2Fields[key].find('option:not(:empty)').first();
                    if (option.length) {
                        val = option[0].value;
                    }
                }
                select2Fields[key].select2('val', val)
            });
        });
    });
})(window, undefined);

window.disableFields = function () {
    // clear any persisting hidden quick list fields
    idx('.IDX-quickListHiddenField').remove();

    // Go through each input
    idx('#IDX-searchForm :input').each(function() {

        var disable = false;

        // if has the class no-disable, then skip
        if (idx(this).hasClass('no-disable')) {
            return; // basically like continue, but were in a function
        }

        // Disable and inputs that don't need to be submitted
        if (idx(this).hasClass('IDX-noSubmit') || idx(this).attr('name') === undefined) {
            disable = true;
        }
        // If the field has nothing set or no data, disable it
        else if (idx(this).val() === '' || idx(this).val() === null) {
            disable = true;
        }
        // handle any select2 inputs
        else if (idx(this).hasClass('IDX-quickList') && idx(this).attr('type') === 'hidden') {
            var currentElement = idx(this);
            idx.each(idx(this).select2("data"), function(key,value) {
                currentElement.after('<input class="IDX-quickListHiddenField" type="hidden" name="'+currentElement.attr('name')+'[]" value="'+value.id+'" />');
            });
            disable = true;
        }

        /**
         * Disable it
         */
        if (disable) {
            idx(this).attr('disabled','disabled');
        }
    }); // end each

    return true;
};

window.reorderParams = function () {
    /**
     *  Form Variables Rearrangement
     *  We do this since browser can't take more than a finite # of GET variables
     *  The ones at front will take precedence over those in the very end
     */

        //set up specific variables we want at the front of our search
        //lp = low price, hp = high price, bd = bedrooms, tb = bathrooms, pt = property type
        //sqft = square feet, acres = acres, idxID = MLS ID
    var keys = [ 'lp', 'hp', 'bd', 'tb', 'pt', 'sqft', 'acres', 'idxID' ];

    // remove any existing ones that have been added
    idx('.IDX-reorderedHiddenField').remove();

    //go through each input (which includes selects for jquery
    idx('#IDX-searchForm :input').each(function(){
        //if the input name is from "keys" array
        if (idx.inArray(this.name,keys) != -1 && !idx(this).is('disabled') && idx(this).val() !== '') {
            // prepend to the front of the form
            idx(this).attr('disabled','disabled');
            idx(this).closest("form").prepend('<input class="IDX-reorderedHiddenField" type="hidden" name="'+this.name+'" value="'+this.value+'" />');
        }
    });
};

window.mlsPtChange = function (type) {
    var pageID = idx('#IDX-searchForm').attr('data-pageid');

    var idxID = idx('#IDX-idxID').val()
    var mlsName = idx('#IDX-idxID option:selected').text()

    var options = {'action':'getMethodHtml', 'pageID':pageID, 'idxID':idxID, 'type':'search'};

    idx('#IDX-searchPageWrapper').html('<div class="alert text-center">Loading Search HTML for '+mlsName+'<br />'+ajaxLoadBar+'</div>');
    var loader = instanceWorkingGraphic();

    idx.get(ajaxURL, options, function(html) {

        // do global things
        clearWorkingGraphic(loader);

        idx('#IDX-searchPageWrapper').fadeOut('fast',function() {
            idx(this).remove();
            idx('#middlewareSearch').html(html);
        });

    },'html'); // end
};
