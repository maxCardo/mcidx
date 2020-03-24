window.idxSearchForm = idx('#IDX-searchForm');
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
        if (idx(this).hasClass('IDX-noSubmit') || idx(this).attr('name') === undefined)
        {
            disable = true;
        }
        // If the field has nothing set or no data, disable it
        else if (idx(this).val() === '' || idx(this).val() === null)
        {
            disable = true;
        }
        // handle any select2 inputs
        else if (idx(this).hasClass('IDX-quickList') && idx(this).attr('type') === 'hidden')
        {
            var currentElement = idx(this);
            idx.each(idx(this).select2("data"), function(key,value) {
                currentElement.after('<input class="IDX-quickListHiddenField" type="hidden" name="'+currentElement.attr('name')+'[]" value="'+value.id+'" />');
            });
            disable = true;
        }

        /**
         * Disable it
         */
        if (disable)
        {
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
    var keys = ['lp', 'hp', 'bd', 'tb', 'pt', 'sqft', 'acres', 'idxID'] ;

    // remove any existing ones that have been added
    idx('.IDX-reorderedHiddenField').remove();

    //go through each input (which includes selects for jquery
    idx('#IDX-searchForm :input').each(function(){
        //if the input name is from "keys" array
        if(idx.inArray(this.name,keys) != -1 && !idx(this).is('disabled') && idx(this).val() !== '')
        {
            //prepend to the front of the form
            // idx(this).closest("form").prepend(this) ;
            idx(this).attr('disabled','disabled');
            idx(this).closest("form").prepend('<input class="IDX-reorderedHiddenField" type="hidden" name="'+this.name+'" value="'+this.value+'" />');
        }
    });
};

/**
 * Populate the csv_listingID field value.
 */
idx(function() {
    var dataSourceChecked = ['#IDX-editSavedSearchData','#IDX-modifySearchData'];
    idx.each(dataSourceChecked, function (k, elementID) {
        var e = idx(elementID);
        if (e.size()) {
            var data = idx.parseJSON(e.text());

            if (data.queryArray && data.queryArray.csv_listingID) {
                idx('#IDX-listingID').val(data.queryArray.csv_listingID);
            }
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
    if (location.search.match(/edit=true&ssid=\d+/)) {
        idx('#IDX-searchForm #IDX-formSubmit').text('Save Search');
        idx('#IDX-searchForm #IDX-formSubmit').attr('data-action', 'editSavedSearch');
    }
    idx('#IDX-formSubmit').on('click', function(e) {
        e.preventDefault();
        var dataAction = idx(this).attr('data-action');
        if (dataAction == 'search') {
            idxSearchForm.submit();
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
                    return false;
                }
                window.location.href = data.url;
            });
        }
    });
});

