/// <reference path="../definitions/angular.d.ts" />
angular.module('formFor', []);
var formFor;
(function (formFor) {
    /**
     * Helper directive for input elements.
     * Observes the $scope :model attribute and updates aria-* elements accordingly.
     */
    var AriaManager = (function () {
        function AriaManager() {
            this.restrict = 'A';
        }
        AriaManager.prototype.link = function ($scope, $element, $attributes) {
            $scope.$watch('model.uid', function (uid) {
                $attributes.$set('ariaDescribedby', uid + '-error');
                $attributes.$set('ariaLabelledby', uid + '-label');
            });
            $scope.$watch('model.error', function (error) {
                $attributes.$set('ariaInvalid', !!error);
            });
        };
        return AriaManager;
    })();
    formFor.AriaManager = AriaManager;
    angular.module('formFor').directive('ariaManager', function () { return new AriaManager(); });
})(formFor || (formFor = {}));
/// <reference path="../../definitions/angular.d.ts" />
var formFor;
(function (formFor) {
    /**
     * This service can be used to configure default behavior for all instances of formFor within a project.
     * Note that it is a service accessible to during the run loop and not a provider accessible during config.
     */
    var FormForConfiguration = (function () {
        function FormForConfiguration() {
            this.autoGenerateLabels_ = false;
            this.defaultDebounceDuration_ = 500;
            this.defaultSubmitComplete_ = angular.noop;
            this.defaultSubmitError_ = angular.noop;
            this.defaultValidationFailed_ = angular.noop;
            this.requiredLabel_ = null;
            this.validationFailedForCustomMessage_ = "Failed custom validation";
            this.validationFailedForEmailTypeMessage_ = "Invalid email format";
            this.validationFailedForIntegerTypeMessage_ = "Must be an integer";
            this.validationFailedForMaxCollectionSizeMessage_ = "Must be fewer than {{num}} items";
            this.validationFailedForMaximumMessage_ = "Must be no more than {{num}}";
            this.validationFailedForMaxLengthMessage_ = "Must be fewer than {{num}} characters";
            this.validationFailedForMinimumMessage_ = "Must be at least {{num}}";
            this.validationFailedForMinCollectionSizeMessage_ = "Must at least {{num}} items";
            this.validationFailedForMinLengthMessage_ = "Must be at least {{num}} characters";
            this.validationFailedForNegativeTypeMessage_ = "Must be negative";
            this.validationFailedForNonNegativeTypeMessage_ = "Must be non-negative";
            this.validationFailedForNumericTypeMessage_ = "Must be numeric";
            this.validationFailedForPatternMessage_ = "Invalid format";
            this.validationFailedForPositiveTypeMessage_ = "Must be positive";
            this.validationFailedForRequiredMessage_ = "Required field";
        }
        Object.defineProperty(FormForConfiguration.prototype, "autoGenerateLabels", {
            // Getters and setters ///////////////////////////////////////////////////////////////////////////////////////////////
            // TODO Add better documentation
            get: function () {
                return this.autoGenerateLabels_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormForConfiguration.prototype, "defaultDebounceDuration", {
            get: function () {
                return this.defaultDebounceDuration_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormForConfiguration.prototype, "defaultSubmitComplete", {
            get: function () {
                return this.defaultSubmitComplete_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormForConfiguration.prototype, "defaultSubmitError", {
            get: function () {
                return this.defaultSubmitError_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormForConfiguration.prototype, "defaultValidationFailed", {
            get: function () {
                return this.defaultValidationFailed_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormForConfiguration.prototype, "requiredLabel", {
            get: function () {
                return this.requiredLabel_;
            },
            enumerable: true,
            configurable: true
        });
        // Public methods ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Use this method to disable auto-generated labels for formFor input fields.
         */
        FormForConfiguration.prototype.disableAutoLabels = function () {
            this.autoGenerateLabels_ = false;
        };
        /**
         * Use this method to enable auto-generated labels for formFor input fields.
         * Labels will be generated based on attribute-name for fields without a label attribute present.
         * Radio fields are an exception to this rule.
         * Their names are generated from their values.
         */
        FormForConfiguration.prototype.enableAutoLabels = function () {
            this.autoGenerateLabels_ = true;
        };
        /**
         * Returns the appropriate error message for the validation failure type.
         */
        FormForConfiguration.prototype.getFailedValidationMessage = function (failureType) {
            switch (failureType) {
                case formFor.ValidationFailureType.CUSTOM:
                    return this.validationFailedForCustomMessage_;
                case formFor.ValidationFailureType.COLLECTION_MAX_SIZE:
                    return this.validationFailedForMaxCollectionSizeMessage_;
                case formFor.ValidationFailureType.COLLECTION_MIN_SIZE:
                    return this.validationFailedForMinCollectionSizeMessage_;
                case formFor.ValidationFailureType.MINIMUM:
                    return this.validationFailedForMinimumMessage_;
                case formFor.ValidationFailureType.MAX_LENGTH:
                    return this.validationFailedForMaxLengthMessage_;
                case formFor.ValidationFailureType.MAXIMUM:
                    return this.validationFailedForMaximumMessage_;
                case formFor.ValidationFailureType.MIN_LENGTH:
                    return this.validationFailedForMinLengthMessage_;
                case formFor.ValidationFailureType.PATTERN:
                    return this.validationFailedForPatternMessage_;
                case formFor.ValidationFailureType.REQUIRED:
                    return this.validationFailedForRequiredMessage_;
                case formFor.ValidationFailureType.TYPE_EMAIL:
                    return this.validationFailedForEmailTypeMessage_;
                case formFor.ValidationFailureType.TYPE_INTEGER:
                    return this.validationFailedForIntegerTypeMessage_;
                case formFor.ValidationFailureType.TYPE_NEGATIVE:
                    return this.validationFailedForNegativeTypeMessage_;
                case formFor.ValidationFailureType.TYPE_NON_NEGATIVE:
                    return this.validationFailedForNonNegativeTypeMessage_;
                case formFor.ValidationFailureType.TYPE_NUMERIC:
                    return this.validationFailedForNumericTypeMessage_;
                case formFor.ValidationFailureType.TYPE_POSITIVE:
                    return this.validationFailedForPositiveTypeMessage_;
            }
        };
        /**
         * Sets the default debounce interval (in ms) for all textField inputs.
         * This setting can be overridden on a per-input basis (see textField).
         * Defaults to 500ms.
         * To disable debounce (update only on blur) pass false.
         */
        FormForConfiguration.prototype.setDefaultDebounceDuration = function (value) {
            this.defaultDebounceDuration_ = value;
        };
        /**
         * Sets the default submit-complete behavior for all formFor directives.
         * This setting can be overridden on a per-form basis (see formFor).
         *
         * Default handler function accepting a data parameter representing the server-response returned by the submitted form.
         * This function should accept a single parameter, the response data from the form-submit method.
         */
        FormForConfiguration.prototype.setDefaultSubmitComplete = function (value) {
            this.defaultSubmitComplete_ = value;
        };
        /**
         * Sets the default submit-error behavior for all formFor directives.
         * This setting can be overridden on a per-form basis (see formFor).
         * @memberof FormForConfiguration
         * @param {Function} method Default handler function accepting an error parameter representing the data passed to the rejected submit promise.
         * This function should accept a single parameter, the error returned by the form-submit method.
         */
        FormForConfiguration.prototype.setDefaultSubmitError = function (value) {
            this.defaultSubmitError_ = value;
        };
        /**
         * Sets the default validation-failed behavior for all formFor directives.
         * This setting can be overridden on a per-form basis (see formFor).
         * @memberof FormForConfiguration
         * @param {Function} method Default function invoked when local form validation fails.
         */
        FormForConfiguration.prototype.setDefaultValidationFailed = function (value) {
            this.defaultValidationFailed_ = value;
        };
        /**
         * Sets a default label to be displayed beside each text and select input for required attributes only.
         */
        FormForConfiguration.prototype.setRequiredLabel = function (value) {
            this.requiredLabel_ = value;
        };
        /**
         * Override the default error message for failed custom validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForCustomMessage = function (value) {
            this.validationFailedForCustomMessage_ = value;
        };
        /**
         * Override the default error message for failed max collection size validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMaxCollectionSizeMessage = function (value) {
            this.validationFailedForMaxCollectionSizeMessage_ = value;
        };
        /**
         * Override the default error message for failed maximum validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMaximumMessage = function (value) {
            this.validationFailedForMaximumMessage_ = value;
        };
        /**
         * Override the default error message for failed maxlength validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMaxLengthMessage = function (value) {
            this.validationFailedForMaxLengthMessage_ = value;
        };
        /**
         * Override the default error message for failed min collection size validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMinCollectionSizeMessage = function (value) {
            this.validationFailedForMaxCollectionSizeMessage_ = value;
        };
        /**
         * Override the default error message for failed minimum validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMinimumMessage = function (value) {
            this.validationFailedForMinimumMessage_ = value;
        };
        /**
         * Override the default error message for failed minlength validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForMinLengthMessage = function (value) {
            this.validationFailedForMinLengthMessage_ = value;
        };
        /**
         * Override the default error message for failed pattern validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForPatternMessage = function (value) {
            this.validationFailedForPatternMessage_ = value;
        };
        /**
         * Override the default error message for failed required validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForRequiredMessage = function (value) {
            this.validationFailedForRequiredMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'email' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForEmailTypeMessage = function (value) {
            this.validationFailedForEmailTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'integer' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForIntegerTypeMessage = function (value) {
            this.validationFailedForIntegerTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'negative' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForNegativeTypeMessage = function (value) {
            this.validationFailedForNegativeTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'nonNegative' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForNonNegativeTypeMessage = function (value) {
            this.validationFailedForNonNegativeTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'numeric' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForNumericTypeMessage = function (value) {
            this.validationFailedForNumericTypeMessage_ = value;
        };
        /**
         * Override the default error message for failed type = 'positive' validations.
         * This setting applies to all instances of formFor unless otherwise overridden on a per-rule basis.
         */
        FormForConfiguration.prototype.setValidationFailedForPositiveTypeMessage = function (value) {
            this.validationFailedForPositiveTypeMessage_ = value;
        };
        return FormForConfiguration;
    })();
    formFor.FormForConfiguration = FormForConfiguration;
    ;
    angular.module('formFor').service('FormForConfiguration', function () { return new FormForConfiguration(); });
})(formFor || (formFor = {}));
;
/// <reference path="form-for-configuration.ts" />
var formFor;
(function (formFor) {
    /**
     * Various helper methods for functionality shared between formFor field directives.
     */
    var FieldHelper = (function () {
        function FieldHelper(FormForConfiguration) {
            this.formForConfiguration_ = FormForConfiguration;
        }
        /**
         * Determines the field's label based on its current attributes and the FormForConfiguration configuration settings.
         * Also watches for changes in the (attributes) label and updates $scope accordingly.
         *
         * @param $scope Directive link $scope
         * @param $attributes Directive link $attributes
         * @param humanizeValueAttribute Fall back to a humanized version of the :value attribute if no label is provided;
         *                               This can be useful for radio options where the label should represent the value.
         *                               By default, a humanized version of the :attribute attribute will be used.
         */
        FieldHelper.prototype.manageLabel = function ($scope, $attributes, humanizeValueAttribute) {
            if ($attributes.hasOwnProperty('label')) {
                $attributes.$observe('label', function (label) {
                    $scope['label'] = label;
                });
            }
            if (this.formForConfiguration_.autoGenerateLabels) {
                $scope['label'] = humanizeValueAttribute ? formFor.StringUtil.humanize($scope['value']) : formFor.StringUtil.humanize($scope['attribute']);
            }
        };
        /**
         * Helper method that registers a form field and stores the bindable object returned on the $scope.
         * This method also unregisters the field on $scope $destroy.
         *
         * @param $scope Input field $scope
         * @param $attributes Input field $attributes element
         * @param formForController Controller object for parent formFor
         */
        FieldHelper.prototype.manageFieldRegistration = function ($scope, $attributes, formForController) {
            $scope.$watch('attribute', function (newValue, oldValue) {
                if ($scope['model']) {
                    formForController.unregisterFormField(oldValue);
                }
                $scope['model'] = formForController.registerFormField($scope['attribute']);
                if ($attributes['uid']) {
                    $scope['model']['uid'] = $attributes['uid'];
                }
            });
            $scope.$on('$destroy', function () {
                formForController.unregisterFormField($scope['attribute']);
            });
        };
        return FieldHelper;
    })();
    formFor.FieldHelper = FieldHelper;
    angular.module('formFor').service('FieldHelper', ["FormForConfiguration", function (FormForConfiguration) { return new FieldHelper(FormForConfiguration); }]);
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
/// <reference path="../services/form-for-configuration.ts" />
var formFor;
(function (formFor) {
    /**
     * Renders a checkbox <code>input</code> with optional label.
     * This type of component is well-suited for boolean attributes.
     *
     * @example
     * // To display a simple TOS checkbox you might use the following markup:
     * <checkbox-field label="I agree with the TOS"
     *                 attribute="accepted">
     * </checkbox-field>
     */
    function CheckboxFieldDirective($log, fieldHelper) {
        return {
            require: '^formFor',
            restrict: 'EA',
            templateUrl: 'form-for/templates/checkbox-field.html',
            scope: {
                attribute: '@',
                disable: '=',
                help: '@?',
                changed: '@?'
            },
            link: function ($scope, $element, $attributes, formForController) {
                if (!$scope['attribute']) {
                    $log.error('Missing required field "attribute"');
                    return;
                }
                $scope.tabIndex = $attributes['tabIndex'] || 0;
                $scope.toggle = function toggle() {
                    if (!$scope.disable && !$scope.model.disabled) {
                        $scope.model.bindable = !$scope.model.bindable;
                    }
                };
                fieldHelper.manageLabel($scope, $attributes, false);
                fieldHelper.manageFieldRegistration($scope, $attributes, formForController);
            }
        };
    }
    formFor.CheckboxFieldDirective = CheckboxFieldDirective;
    angular.module('formFor').directive('checkboxField', ["$log", "FieldHelper", function ($log, FieldHelper) { return CheckboxFieldDirective($log, FieldHelper); }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Header label for collections.
     * This component displays header text as well as collection validation errors.
     *
     * @example
     * // To display a simple collection header:
     * <collection-label  label="Hobbies" attribute="hobbies">
     * </collection-label>
     *
     * @param $sce $injector-supplied $sce service
     */
    function CollectionLabelDirective($sce) {
        return {
            require: '^formFor',
            restrict: 'EA',
            templateUrl: 'form-for/templates/collection-label.html',
            scope: {
                attribute: '@',
                help: '@?',
                label: '@'
            },
            link: function ($scope, $element, $attributes, formForController) {
                $scope.$watch('label', function (value) {
                    $scope.bindableLabel = $sce.trustAsHtml(value);
                });
                $scope.model = formForController.registerCollectionLabel($scope.attribute);
            }
        };
    }
    formFor.CollectionLabelDirective = CollectionLabelDirective;
    angular.module('formFor').directive('collectionLabel', ["$sce", function ($sce) { return CollectionLabelDirective($sce); }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Displays a standard formFor field validation error message.
     *
     * @example
     * // To display a field error:
     * <field-error error="This is an error message">
     * </field-error>
     */
    function FieldErrorDirective() {
        return {
            restrict: 'EA',
            templateUrl: 'form-for/templates/field-error.html',
            scope: {
                error: '=',
                leftAligned: '@?',
                uid: '@'
            },
            link: function ($scope) {
                // No-op
            }
        };
    }
    formFor.FieldErrorDirective = FieldErrorDirective;
    angular.module('formFor').directive('fieldError', FieldErrorDirective);
})(formFor || (formFor = {}));
/// <reference path="../services/form-for-configuration.ts" />
var formFor;
(function (formFor) {
    /**
     * This component is only intended for internal use by the formFor module.
     *
     * @example
     * // To display a simple label with a help tooltip:
     * <field-label label="Username"
     *              help="This will be visible to other users">
     * </field-label>
     *
     * @param $sce $injector-supplied $sce service
     * @param formForConfiguration
     */
    function FieldLabelDirective($sce, formForConfiguration) {
        return {
            replace: true,
            restrict: 'EA',
            templateUrl: 'form-for/templates/field-label.html',
            scope: {
                inputUid: '@',
                help: '@?',
                label: '@',
                required: '@?',
                uid: '@'
            },
            controller: function ($scope) {
                $scope.$watch('label', function (value) {
                    $scope.bindableLabel = $sce.trustAsHtml(value);
                });
                $scope.$watch('required', function (required) {
                    $scope.requiredLabel = $scope.$eval(required) ? formForConfiguration.requiredLabel : null;
                });
            }
        };
    }
    formFor.FieldLabelDirective = FieldLabelDirective;
    angular.module('formFor').directive('fieldLabel', ["$sce", "FormForConfiguration", function ($sce, FormForConfiguration) { return FieldLabelDirective($sce, FormForConfiguration); }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     *
     */
    function FormForBuilderDirective($compile, $parse) {
        var nestedObjectHelper = new formFor.NestedObjectHelper($parse);
        return {
            require: 'formFor',
            restrict: 'A',
            link: function ($scope, $element, $attributes, formForController) {
                // View schema may be explicitly passed in as a separate model,
                // Or it may be combined with the validation rules used by formFor.
                var viewSchema;
                if ($attributes.formForBuilder) {
                    viewSchema = $scope.$eval($attributes.formForBuilder);
                }
                else if ($attributes.validationRules) {
                    viewSchema = $scope.$eval($attributes.validationRules);
                }
                else if ($attributes.$service) {
                    viewSchema = $scope.$eval($attributes.$service.validationRules);
                }
                // View schema may contain nested properties.
                // We will differentiate between form-fields and other properties using the 'inputType' field.
                var viewSchemaKeys = nestedObjectHelper.flattenObjectKeys(viewSchema);
                var htmlString = "";
                for (var i = 0, length = viewSchemaKeys.length; i < length; i++) {
                    var fieldName = viewSchemaKeys[i];
                    var viewField = nestedObjectHelper.readAttribute(viewSchema, fieldName);
                    var html;
                    if (viewField && viewField.hasOwnProperty('inputType')) {
                        var help = viewField.help || '';
                        var label = viewField.label || '';
                        var uid = viewField.uid || '';
                        var labelAttribute = label ? "label=\"" + label + "\"" : '';
                        switch (viewField.inputType) {
                            case formFor.BuilderFieldType.CHECKBOX:
                                htmlString += "<checkbox-field attribute=\"" + fieldName + "\"\n                                               help=\"" + help + "\"\n                                               " + labelAttribute + "\n                                               uid=\"" + uid + "\">\n                               </checkbox-field>";
                                break;
                            case formFor.BuilderFieldType.RADIO:
                                var radioLabel = label ? label : formFor.StringUtil.humanize(fieldName);
                                htmlString += "<field-label help=\"" + help + "\"\n                                            label=\"" + radioLabel + "\">\n                                 </field-label>";
                                viewField.values.forEach(function (value) {
                                    htmlString += "<radio-field attribute=\"" + fieldName + "\"\n                                              label=\"" + formFor.StringUtil.humanize(value) + "\"\n                                              uid=\"" + uid + "\"\n                                              value=\"" + value + "\">\n                                 </radio-field>";
                                });
                                break;
                            case formFor.BuilderFieldType.SELECT:
                                var values = JSON.stringify(viewField.values).replace(/"/g, '&quot;');
                                htmlString += "<select-field attribute=\"" + fieldName + "\"\n                                             " + (viewField.allowBlank ? 'allow-blank' : '') + "\n                                             " + (viewField.enableFiltering ? 'enable-filtering' : '') + "\n                                             help=\"" + help + "\"\n                                             " + labelAttribute + "\n                                             " + labelAttribute + "\n                                             multiple=\"" + !!viewField.multipleSelection + "\"\n                                             options=\"" + values + "\"\n                                             uid=\"" + uid + "\"\n                                             value-attribute=\"" + (viewField.valueAttribute || '') + "\">\n                               </select-field>";
                                break;
                            case formFor.BuilderFieldType.NUMBER:
                            case formFor.BuilderFieldType.PASSWORD:
                            case formFor.BuilderFieldType.TEXT:
                                htmlString += "<text-field attribute=\"" + fieldName + "\"\n                                           " + labelAttribute + "\n                                           help=\"" + help + "\"\n                                           ng-attr-multiline=\"" + !!viewField.multiline + "\"\n                                           rows=\"" + (viewField.rows || '') + "\"\n                                           type=\"" + viewField.inputType + "\"\n                                           uid=\"" + uid + "\">\n                               </text-field>";
                                break;
                        }
                    }
                }
                // Append a submit button if one isn't already present inside of $element.
                if ($element.find('input[type=button], button').length === 0) {
                    htmlString += "<submit-button label=\"Submit\"></submit-button>";
                }
                var linkingFunction = $compile(htmlString);
                var compiled = linkingFunction($scope, undefined, { transcludeControllers: formForController });
                // Prepend in case the user has specified their own custom submit button(s).
                $element.prepend(compiled);
            }
        };
    }
    formFor.FormForBuilderDirective = FormForBuilderDirective;
    ;
    angular.module('formFor').directive('formForBuilder', ["$compile", "$parse", function ($compile, $parse) { return FormForBuilderDirective($compile, $parse); }]);
})(formFor || (formFor = {}));
/// <reference path="../services/form-for-configuration.ts" />
var formFor;
(function (formFor) {
    /**
     * Angular introduced debouncing (via ngModelOptions) in version 1.3.
     * As of the time of this writing, that version is still in beta.
     * This component adds debouncing behavior for Angular 1.2.x.
     * It is primarily intended for use with &lt;input type=text&gt; and &lt;textarea&gt; elements.
     *
     * @example
     * // To configure this component to debounce with a 2 second delay:
     * <input type="text"
     *        ng-model="username"
     *        form-for-debounce="2000" />
     *
     * // To disable the debounce interval and configure an input to update only on blur:
     * <input type="text"
     *        ng-model="username"
     *        form-for-debounce="false" />
     */
    function FormForDebounceDirective($log, $sniffer, $timeout, formForConfiguration) {
        return {
            priority: 99,
            require: 'ngModel',
            restrict: 'A',
            /**
             * Scope.
             *
             * @param formForDebounce Debounce duration in milliseconds.
             *                        By default this value is 1000ms.
             *                        To disable the debounce interval (to update on blur) a value of false should be specified.
             */
            scope: {
                formForDebounce: '@'
            },
            link: function ($scope, $element, $attributes, ngModelController) {
                if ($attributes['type'] === 'radio' || $attributes['type'] === 'checkbox') {
                    $log.warn("formForDebounce should only be used with <input type=text> and <textarea> elements");
                    return;
                }
                var durationAttributeValue = $attributes['formForDebounce'];
                var duration = formForConfiguration.defaultDebounceDuration;
                // Debounce can be configured for blur-only by passing a value of 'false'.
                if (durationAttributeValue !== undefined) {
                    if (durationAttributeValue.toString() === 'false') {
                        duration = false;
                    }
                    else {
                        durationAttributeValue = parseInt(durationAttributeValue);
                        if (angular.isNumber(durationAttributeValue) && !isNaN(durationAttributeValue)) {
                            duration = durationAttributeValue;
                        }
                    }
                }
                // Older IEs do not have 'input' events - and trying to access them can cause TypeErrors.
                // Angular's ngModel falls back to 'keydown' and 'paste' events in this case, so we must also.
                if ($sniffer.hasEvent('input')) {
                    $element.off('input');
                }
                else {
                    $element.off('keydown');
                    if ($sniffer.hasEvent('paste')) {
                        $element.off('paste');
                    }
                }
                var debounceTimeoutId;
                if (duration !== false) {
                    var inputChangeHandler = function () {
                        $timeout.cancel(debounceTimeoutId);
                        debounceTimeoutId = $timeout(function () {
                            $scope.$apply(function () {
                                ngModelController.$setViewValue($element.val());
                            });
                        }, duration);
                    };
                    if ($sniffer.hasEvent('input')) {
                        $element.on('input', undefined, inputChangeHandler);
                    }
                    else {
                        $element.on('keydown', undefined, inputChangeHandler);
                        if ($sniffer.hasEvent('paste')) {
                            $element.on('paste', undefined, inputChangeHandler);
                        }
                    }
                }
                $element.on('blur', undefined, function () {
                    $scope.$apply(function () {
                        ngModelController.$setViewValue($element.val());
                    });
                });
                $scope.$on('$destroy', function () {
                    if (debounceTimeoutId) {
                        $timeout.cancel(debounceTimeoutId);
                    }
                });
            }
        };
    }
    formFor.FormForDebounceDirective = FormForDebounceDirective;
    angular.module('formFor').directive('formForDebounce', ["$log", "$sniffer", "$timeout", "FormForConfiguration", function ($log, $sniffer, $timeout, FormForConfiguration) { return FormForDebounceDirective($log, $sniffer, $timeout, FormForConfiguration); }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     */
    function FormForIncludeReplaceDirective() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function ($scope, $element, $attributes) {
                $element.replaceWith($element.children());
            }
        };
    }
    formFor.FormForIncludeReplaceDirective = FormForIncludeReplaceDirective;
    ;
    angular.module('formFor').directive('formForIncludeReplace', function () { return FormForIncludeReplaceDirective(); });
})(formFor || (formFor = {}));
/// <reference path="../../definitions/angular.d.ts" />
var formFor;
(function (formFor) {
    /**
     * Helper utility to simplify working with nested objects.
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var NestedObjectHelper = (function () {
        /**
         * Constructor.
         *
         * @param $parse Injector-supplied $parse service
         */
        function NestedObjectHelper($parse) {
            this.$parse_ = $parse;
        }
        /**
         * Converts a field name (which may contain dots or array indices) into a string that can be used to key an object.
         * e.g. a field name like 'items[0].name' would be converted into 'items___0______name'
         *
         * @param fieldName Attribute (or dot-notation path) to read
         * @returns Modified field name safe to use as an object key
         */
        NestedObjectHelper.prototype.flattenAttribute = function (fieldName) {
            return fieldName.replace(/\[([^\]]+)\]\.{0,1}/g, '___$1___').replace(/\./g, '___');
        };
        /**
         * Crawls an object and returns a flattened set of all attributes using dot notation.
         * This converts an Object like: {foo: {bar: true}, baz: true} into an Array like ['foo', 'foo.bar', 'baz'].
         *
         * @param object Object to be flattened
         * @returns Array of flattened keys (perhaps containing dot notation)
         */
        NestedObjectHelper.prototype.flattenObjectKeys = function (object) {
            var keys = [];
            var queue = [{
                object: object,
                prefix: null
            }];
            while (true) {
                if (queue.length === 0) {
                    break;
                }
                var data = queue.pop();
                var objectIsArray = Array.isArray(data.object);
                var prefix = data.prefix ? data.prefix + (objectIsArray ? '[' : '.') : '';
                var suffix = objectIsArray ? ']' : '';
                if (typeof data.object === 'object') {
                    for (var prop in data.object) {
                        var path = prefix + prop + suffix;
                        var value = data.object[prop];
                        keys.push(path);
                        queue.push({
                            object: value,
                            prefix: path
                        });
                    }
                }
            }
            return keys;
        };
        /**
         * Returns the value defined by the specified attribute.
         * This function guards against dot notation for nested references (ex. 'foo.bar').
         *
         * @param object Object ot be read
         * @param fieldName Attribute (or dot-notation path) to read
         * @returns Value defined at the specified key
         */
        NestedObjectHelper.prototype.readAttribute = function (object, fieldName) {
            return this.$parse_(fieldName)(object);
        };
        /**
         * Writes the specified value to the specified attribute.
         * This function guards against dot notation for nested references (ex. 'foo.bar').
         *
         * @param object Object ot be updated
         * @param fieldName Attribute (or dot-notation path) to update
         * @param value Value to be written
         */
        NestedObjectHelper.prototype.writeAttribute = function (object, fieldName, value) {
            this.initializeArraysAndObjectsForParse_(object, fieldName);
            this.$parse_(fieldName).assign(object, value);
        };
        // Helper methods ////////////////////////////////////////////////////////////////////////////////////////////////////
        // For Angular 1.2.21 and below, $parse does not handle array brackets gracefully.
        // Essentially we need to create Arrays that don't exist yet or objects within array indices that don't yet exist.
        // @see https://github.com/angular/angular.js/issues/2845
        NestedObjectHelper.prototype.initializeArraysAndObjectsForParse_ = function (object, attribute) {
            var startOfArray = 0;
            while (true) {
                startOfArray = attribute.indexOf('[', startOfArray);
                if (startOfArray < 0) {
                    break;
                }
                var arrayAttribute = attribute.substr(0, startOfArray);
                var possibleArray = this.readAttribute(object, arrayAttribute);
                // Create the Array if it doesn't yet exist
                if (!possibleArray) {
                    possibleArray = [];
                    this.writeAttribute(object, arrayAttribute, possibleArray);
                }
                // Create an empty Object in the Array if the user is about to write to one (and one does not yet exist)
                var match = attribute.substr(startOfArray).match(/([0-9]+)\]\./);
                if (match) {
                    var targetIndex = parseInt(match[1]);
                    if (!possibleArray[targetIndex]) {
                        possibleArray[targetIndex] = {};
                    }
                }
                // Increment and keep scanning
                startOfArray++;
            }
        };
        return NestedObjectHelper;
    })();
    formFor.NestedObjectHelper = NestedObjectHelper;
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Supplies $q service with additional methods.
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var PromiseUtils = (function () {
        /**
         * Constructor.
         *
         * @param $q Injector-supplied $q service
         */
        function PromiseUtils($q) {
            this.$q_ = $q;
        }
        /**
         * @inheritDoc
         */
        PromiseUtils.prototype.all = function (promises) {
            return this.$q_.all(promises);
        };
        /**
         * @inheritDoc
         */
        PromiseUtils.prototype.defer = function () {
            return this.$q_.defer();
        };
        /**
         * Similar to $q.reject, this is a convenience method to create and resolve a Promise.
         *
         * @param data Value to resolve the promise with
         * @returns A resolved promise
         */
        PromiseUtils.prototype.resolve = function (data) {
            var deferred = this.$q_.defer();
            deferred.resolve(data);
            return deferred.promise;
        };
        /**
         * @inheritDoc
         */
        PromiseUtils.prototype.reject = function (reason) {
            return this.$q_.reject(reason);
        };
        /**
         * Similar to $q.all but waits for all promises to resolve/reject before resolving/rejecting.
         *
         * @param promises Array of Promises
         * @returns A promise to be resolved or rejected once all of the observed promises complete
         */
        PromiseUtils.prototype.waitForAll = function (promises) {
            var deferred = this.$q_.defer();
            var results = {};
            var counter = 0;
            var errored = false;
            function udpateResult(key, data) {
                if (!results.hasOwnProperty(key)) {
                    results[key] = data;
                    counter--;
                }
                checkForDone();
            }
            function checkForDone() {
                if (counter === 0) {
                    if (errored) {
                        deferred.reject(results);
                    }
                    else {
                        deferred.resolve(results);
                    }
                }
            }
            angular.forEach(promises, function (promise, key) {
                counter++;
                promise.then(function (data) {
                    udpateResult(key, data);
                }, function (data) {
                    errored = true;
                    udpateResult(key, data);
                });
            });
            checkForDone(); // Handle empty Array
            return deferred.promise;
        };
        /**
         * @inheritDoc
         */
        PromiseUtils.prototype.when = function (value) {
            return this.$q_.when(value);
        };
        return PromiseUtils;
    })();
    formFor.PromiseUtils = PromiseUtils;
})(formFor || (formFor = {}));
/// <reference path="../utils/nested-object-helper.ts" />
/// <reference path="../utils/promise-utils.ts" />
var formFor;
(function (formFor) {
    /**
     * Controller exposed via the FormFor directive's scope.
     *
     * <p>Intended for use only by formFor directive and fields (children); this class is not exposed to the $injector.
     *
     * @param target Object to attach controller methods to
     * @param $parse Injector-supplied $parse service
     * @param $q Injector-supplied $q service
     * @param $scope formFor directive $scope
     * @param modelValidator ModelValidator service
     */
    function createFormForController(target, $parse, $q, $scope, modelValidator) {
        var nestedObjectHelper = new formFor.NestedObjectHelper($parse);
        var promiseUtils = new formFor.PromiseUtils($q);
        /**
         * @inheritDocs
         */
        target.registerCollectionLabel = function (fieldName) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            var bindableWrapper = {
                error: null,
                required: modelValidator.isCollectionRequired(fieldName, $scope.$validationRuleset)
            };
            $scope.collectionLabels[bindableFieldName] = bindableWrapper;
            var watcherInitialized = false;
            $scope.$watch('formFor.' + fieldName + '.length', function () {
                // The initial $watch should not trigger a visible validation...
                if (!watcherInitialized) {
                    watcherInitialized = true;
                }
                else if (!$scope.validateOn || $scope.validateOn === 'change') {
                    modelValidator.validateCollection($scope.formFor, fieldName, $scope.$validationRuleset).then(function () {
                        $scope.formForStateHelper.setFieldError(bindableFieldName, null);
                    }, function (error) {
                        $scope.formForStateHelper.setFieldError(bindableFieldName, error);
                    });
                }
            });
            return bindableWrapper;
        };
        /**
         * @inheritDocs
         */
        target.registerFormField = function (fieldName) {
            if (!fieldName) {
                throw Error('Invalid field name "' + fieldName + '" provided.');
            }
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            if ($scope['fields'].hasOwnProperty(bindableFieldName)) {
                throw Error('Field "' + fieldName + '" has already been registered. Field names must be unique.');
            }
            var bindableFieldWrapper = {
                bindable: null,
                disabled: $scope.disable,
                error: null,
                pristine: true,
                required: modelValidator.isFieldRequired(fieldName, $scope.$validationRuleset),
                uid: formFor.FormForGUID.create()
            };
            // Store information about this field that we'll need for validation and binding purposes.
            // @see Above documentation for $scope.fields
            var fieldDatum = {
                bindableWrapper: bindableFieldWrapper,
                fieldName: fieldName,
                formForStateHelper: $scope.formForStateHelper,
                unwatchers: []
            };
            $scope.fields[bindableFieldName] = fieldDatum;
            var getter = $parse(fieldName);
            var setter = getter.assign;
            // Changes made by our field should be synced back to the form-data model.
            fieldDatum.unwatchers.push($scope.$watch('fields.' + bindableFieldName + '.bindableWrapper.bindable', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    setter($scope.formFor, newValue);
                }
            }));
            var formDataWatcherInitialized;
            // Changes made to the form-data model should likewise be synced to the field's bindable model.
            // (This is necessary for data that is loaded asynchronously after a form has already been displayed.)
            fieldDatum.unwatchers.push($scope.$watch('formFor.' + fieldName, function (newValue, oldValue) {
                // An asynchronous formFor data source should reset any dirty flags.
                // A user tabbing in and out of a field also shouldn't be counted as dirty.
                // Easiest way to guard against this is to reset the initialization flag.
                if (newValue !== fieldDatum.bindableWrapper.bindable || oldValue === undefined && newValue === '' || newValue === undefined) {
                    formDataWatcherInitialized = false;
                }
                fieldDatum.bindableWrapper.bindable = newValue;
                if (!$scope.validateOn || $scope.validateOn === 'change') {
                    target.validateField(fieldName);
                }
                // Changes in form-data should also trigger validations.
                // Validation failures will not be displayed unless the form-field has been marked dirty (changed by user).
                // We shouldn't mark our field as dirty when Angular auto-invokes the initial watcher though,
                // So we ignore the first invocation...
                if (!formDataWatcherInitialized) {
                    formDataWatcherInitialized = true;
                    $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, false);
                }
                fieldDatum.bindableWrapper.pristine = !$scope.formForStateHelper.hasFieldBeenModified(bindableFieldName);
            }));
            return bindableFieldWrapper;
        };
        /**
         * @inheritDocs
         */
        target.registerSubmitButton = function (submitButtonScope) {
            var bindableWrapper = {
                disabled: false
            };
            $scope.buttons.push(bindableWrapper);
            return bindableWrapper;
        };
        /**
         * @inheritDocs
         */
        target.resetErrors = function () {
            for (var bindableFieldName in $scope.fields) {
                // If the field is invalid, we don't want it to appear valid- just pristing.
                if ($scope.formForStateHelper.getFieldError(bindableFieldName)) {
                    $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, false);
                    $scope.fields[bindableFieldName].bindableWrapper.pristine = true;
                }
            }
            $scope.formForStateHelper.setFormSubmitted(false);
            $scope.formForStateHelper.resetFieldErrors();
        };
        /**
         * @inheritDocs
         */
        target.resetField = function (fieldName) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            // If the field is invalid, we don't want it to appear valid- just pristing.
            if ($scope.formForStateHelper.getFieldError(bindableFieldName)) {
                $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, false);
                $scope.fields[bindableFieldName].bindableWrapper.pristine = true;
            }
            $scope.formForStateHelper.setFieldError(bindableFieldName, null);
        };
        /**
         * @inheritDocs
         */
        target.resetFields = function () {
            target.resetErrors();
        };
        /**
         * @inheritDocs
         */
        target.setFieldError = function (fieldName, error) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, true);
            $scope.formForStateHelper.setFieldError(bindableFieldName, error);
        };
        /**
         * @inheritDocs
         */
        target.unregisterFormField = function (fieldName) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            angular.forEach($scope.fields[bindableFieldName].unwatchers, function (unwatch) {
                unwatch();
            });
            delete $scope.fields[bindableFieldName];
        };
        /**
         * @inheritDocs
         */
        target.updateCollectionErrors = function (fieldNameToErrorMap) {
            angular.forEach($scope.collectionLabels, function (bindableWrapper, bindableFieldName) {
                var error = nestedObjectHelper.readAttribute(fieldNameToErrorMap, bindableFieldName);
                $scope.formForStateHelper.setFieldError(bindableFieldName, error);
            });
        };
        /**
         * @inheritDocs
         */
        target.updateFieldErrors = function (fieldNameToErrorMap) {
            angular.forEach($scope.fields, function (scope, bindableFieldName) {
                var error = nestedObjectHelper.readAttribute(fieldNameToErrorMap, scope.fieldName);
                $scope.formForStateHelper.setFieldError(bindableFieldName, error);
            });
        };
        /**
         * @inheritDocs
         */
        target.validateField = function (fieldName) {
            var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
            $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, true);
            // Run validations and store the result keyed by our bindableFieldName for easier subsequent lookup.
            if ($scope.$validationRuleset) {
                modelValidator.validateField($scope.formFor, fieldName, $scope.$validationRuleset).then(function () {
                    $scope.formForStateHelper.setFieldError(bindableFieldName, null);
                }, function (error) {
                    $scope.formForStateHelper.setFieldError(bindableFieldName, error);
                });
            }
        };
        /**
         * @inheritDocs
         */
        target.validateForm = function (showErrors) {
            // Reset errors before starting new validation.
            target.updateCollectionErrors({});
            target.updateFieldErrors({});
            var validateCollectionsPromise;
            var validateFieldsPromise;
            if ($scope.$validationRuleset) {
                var validationKeys = [];
                angular.forEach($scope.fields, function (fieldDatum) {
                    validationKeys.push(fieldDatum.fieldName);
                });
                validateFieldsPromise = modelValidator.validateFields($scope.formFor, validationKeys, $scope.$validationRuleset);
                validateFieldsPromise.then(angular.noop, target.updateFieldErrors);
                validationKeys = []; // Reset for below re-use
                angular.forEach($scope.collectionLabels, function (bindableWrapper, bindableFieldName) {
                    validationKeys.push(bindableFieldName);
                });
                validateCollectionsPromise = modelValidator.validateFields($scope.formFor, validationKeys, $scope.$validationRuleset);
                validateCollectionsPromise.then(angular.noop, target.updateCollectionErrors);
            }
            else {
                validateCollectionsPromise = promiseUtils.resolve();
                validateFieldsPromise = promiseUtils.resolve();
            }
            var deferred = promiseUtils.defer();
            promiseUtils.waitForAll([validateCollectionsPromise, validateFieldsPromise]).then(deferred.resolve, function (errors) {
                // If all collections are valid (or no collections exist) this will be an empty array.
                if (angular.isArray(errors[0]) && errors[0].length === 0) {
                    errors.splice(0, 1);
                }
                // Errors won't be shown for clean fields, so mark errored fields as dirty.
                if (showErrors) {
                    angular.forEach(errors, function (errorObjectOrArray) {
                        var flattenedFields = nestedObjectHelper.flattenObjectKeys(errorObjectOrArray);
                        angular.forEach(flattenedFields, function (fieldName) {
                            var error = nestedObjectHelper.readAttribute(errorObjectOrArray, fieldName);
                            if (error) {
                                var bindableFieldName = nestedObjectHelper.flattenAttribute(fieldName);
                                $scope.formForStateHelper.setFieldHasBeenModified(bindableFieldName, true);
                            }
                        });
                    });
                }
                deferred.reject(errors);
            });
            return deferred.promise;
        };
        return target;
    }
    formFor.createFormForController = createFormForController;
})(formFor || (formFor = {}));
/// <reference path="../utils/form-for-controller.ts" />
/// <reference path="../utils/promise-utils.ts" />
var formFor;
(function (formFor) {
    /**
     * This directive should be paired with an Angular ngForm object,
     * and should contain at least one of the formFor field types described below.
     * At a high level, it operates on a bindable form-data object and runs validations each time a change is detected.
     */
    function FormForDirective($injector) {
        var $log = $injector.get('$log');
        var $parse = $injector.get('$parse');
        var $q = $injector.get('$q');
        var $sce = $injector.get('$sce');
        var formForConfiguration = $injector.get('FormForConfiguration');
        var modelValidator = $injector.get('ModelValidator');
        var promiseUtils = new formFor.PromiseUtils($q);
        return {
            // We don't need the ngForm controller, but we do rely on the form-submit hook
            require: 'form',
            restrict: 'A',
            scope: {
                controller: '=?',
                disable: '=?',
                formFor: '=',
                service: '@',
                submitComplete: '&?',
                submitError: '&?',
                submitWith: '&?',
                valid: '=?',
                validateOn: '=?',
                validationFailed: '&?',
                validationRules: '=?'
            },
            controller: function ($scope) {
                if (!$scope.formFor) {
                    $log.error('The form data object specified by <form form-for=""> is null or undefined.');
                }
                $scope.fields = {};
                $scope.collectionLabels = {};
                $scope.buttons = [];
                $scope.controller = $scope.controller || {};
                if ($scope.service) {
                    $scope.$service = $injector.get($scope.service);
                }
                // Validation rules can come through 2 ways:
                // As part of the validation service or as a direct binding (specified via an HTML attribute binding).
                if ($scope.validationRules) {
                    $scope.$validationRuleset = $scope.validationRules;
                }
                else if ($scope.$service) {
                    $scope.$validationRuleset = $scope.$service.validationRules;
                }
                // Attach FormForController (interface) methods to the directive's controller (this).
                formFor.createFormForController(this, $parse, promiseUtils, $scope, modelValidator);
                // Expose controller methods to the shared, bindable $scope.controller
                if ($scope.controller) {
                    angular.copy(this, $scope.controller);
                }
                // Disable all child inputs if the form becomes disabled.
                $scope.$watch('disable', function (value) {
                    angular.forEach($scope.fields, function (fieldDatum) {
                        fieldDatum.bindableWrapper.disabled = value;
                    });
                    angular.forEach($scope.buttons, function (buttonWrapper) {
                        buttonWrapper.disabled = value;
                    });
                });
                // Track field validity and dirty state.
                $scope.formForStateHelper = new formFor.FormForStateHelper($parse, $scope);
                // Watch for any validation changes or changes in form-state that require us to notify the user.
                // Rather than using a deep-watch, FormForStateHelper exposes a bindable attribute 'watchable'.
                // This attribute is guaranteed to change whenever validation criteria change (but its value is meaningless).
                $scope.$watch('formForStateHelper.watchable', function () {
                    var hasFormBeenSubmitted = $scope.formForStateHelper.hasFormBeenSubmitted();
                    // Mark invalid fields
                    angular.forEach($scope.fields, function (fieldDatum, bindableFieldName) {
                        if (hasFormBeenSubmitted || $scope.formForStateHelper.hasFieldBeenModified(bindableFieldName)) {
                            var error = $scope.formForStateHelper.getFieldError(bindableFieldName);
                            fieldDatum.bindableWrapper.error = error ? $sce.trustAsHtml(error) : null;
                        }
                        else {
                            fieldDatum.bindableWrapper.error = null; // Clear out field errors in the event that the form has been reset
                        }
                    });
                    // Mark invalid collections
                    angular.forEach($scope.collectionLabels, function (bindableWrapper, bindableFieldName) {
                        var error = $scope.formForStateHelper.getFieldError(bindableFieldName);
                        bindableWrapper.error = error ? $sce.trustAsHtml(error) : null;
                    });
                });
            },
            link: function ($scope, $element, $attributes) {
                $element.on('submit', undefined, function () {
                    $scope.formForStateHelper.setFormSubmitted(true);
                    $scope.disable = true;
                    var validationPromise;
                    // By default formFor validates on-change,
                    // But we need to [re-]validate on submit as well to handle pristine fields.
                    // The only case we don't want to validate for is 'manual'.
                    if ($scope.validateOn === 'manual') {
                        validationPromise = promiseUtils.resolve();
                    }
                    else {
                        validationPromise = $scope.controller.validateForm();
                    }
                    validationPromise.then(function () {
                        var promise;
                        // $scope.submitWith is wrapped with a virtual function so we must check via attributes
                        if ($attributes['submitWith']) {
                            promise = $scope.submitWith({ data: $scope.formFor });
                        }
                        else if ($scope.$service && $scope.$service.submit) {
                            promise = $scope.$service.submit($scope.formFor);
                        }
                        else {
                            promise = promiseUtils.reject('No submit function provided');
                        }
                        // Issue #18 Guard against submit functions that don't return a promise by warning rather than erroring.
                        if (!promise) {
                            promise = promiseUtils.reject('Submit function did not return a promise');
                        }
                        promise.then(function (response) {
                            // $scope.submitComplete is wrapped with a virtual function so we must check via attributes
                            if ($attributes['submitComplete']) {
                                $scope.submitComplete({ data: response });
                            }
                            else {
                                formForConfiguration.defaultSubmitComplete(response);
                            }
                        }, function (errorMessageOrErrorMap) {
                            // If the remote response returned inline-errors update our error map.
                            // This is unecessary if a string was returned.
                            if (angular.isObject(errorMessageOrErrorMap)) {
                                if ($scope.validateOn !== 'manual') {
                                    // TODO Questionable: Maybe server should be forced to return fields/collections constraints?
                                    $scope.controller.updateCollectionErrors(errorMessageOrErrorMap);
                                    $scope.controller.updateFieldErrors(errorMessageOrErrorMap);
                                }
                            }
                            // $scope.submitError is wrapped with a virtual function so we must check via attributes
                            if ($attributes['submitError']) {
                                $scope.submitError({ error: errorMessageOrErrorMap });
                            }
                            else {
                                formForConfiguration.defaultSubmitError(errorMessageOrErrorMap);
                            }
                        });
                        promise['finally'](function () {
                            $scope.disable = false;
                        });
                    }, function (reason) {
                        $scope.disable = false;
                        // $scope.validationFailed is wrapped with a virtual function so we must check via attributes
                        if ($attributes['validationFailed']) {
                            $scope.validationFailed();
                        }
                        else {
                            formForConfiguration.defaultValidationFailed(reason);
                        }
                    });
                    return false;
                });
            }
        };
    }
    formFor.FormForDirective = FormForDirective;
    angular.module('formFor').directive('formFor', ["$injector", function ($injector) { return FormForDirective($injector); }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * UID generator for formFor input fields.
     * @see http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var FormForGUID = (function () {
        function FormForGUID() {
        }
        /**
         * Create a new GUID.
         */
        FormForGUID.create = function () {
            return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
        };
        return FormForGUID;
    })();
    formFor.FormForGUID = FormForGUID;
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
/// <reference path="../services/form-for-configuration.ts" />
/// <reference path="../utils/form-for-guid.ts" />
var formFor;
(function (formFor) {
    /**
     * Renders a radio &lt;input&gt; with optional label.
     * This type of component is well-suited for small enumerations.
     *
     * @example
     * // To render a radio group for gender selection you might use the following markup:
     * <radio-field label="Female" attribute="gender" value="f"></radio-field>
     * <radio-field label="Male" attribute="gender" value="m"></radio-field>
     *
     * @param $log $injector-supplied $log service
     * @param FormForConfiguration
     */
    function RadioFieldDirective($log, FormForConfiguration) {
        var fieldHelper = new formFor.FieldHelper(FormForConfiguration);
        var fieldNameToActiveRadioGroupDatumMap = {};
        return {
            require: '^formFor',
            restrict: 'EA',
            templateUrl: 'form-for/templates/radio-field.html',
            scope: {
                attribute: '@',
                disable: '=',
                help: '@?',
                value: '@'
            },
            link: function ($scope, $element, $attributes, formForController) {
                if (!$scope.attribute) {
                    $log.error('Missing required field "attribute"');
                    return;
                }
                if (!fieldNameToActiveRadioGroupDatumMap[$scope.attribute]) {
                    fieldHelper.manageFieldRegistration($scope, $attributes, formForController);
                    fieldNameToActiveRadioGroupDatumMap[$scope.attribute] = {
                        defaultScope: $scope,
                        scopes: []
                    };
                }
                else {
                    // Only the primary <radio> input should show error message text
                    $scope.hideErrorMessage = true;
                }
                // Everything inside of  $scope.model pertains to the first <input type="radio"> for this attribute/name.
                // In order for our view's aria-* and label-for tags to function properly, we need a unique uid for this instance.
                $scope.uid = $attributes['uid'] || formFor.FormForGUID.create();
                var radioGroupDatum = fieldNameToActiveRadioGroupDatumMap[$scope.attribute];
                radioGroupDatum.scopes.push($scope);
                fieldHelper.manageLabel($scope, $attributes, true);
                $scope.tabIndex = $attributes['tabIndex'] || 0;
                $scope.click = function () {
                    if (!$scope.disable && !$scope.model.disabled) {
                        $scope.model.bindable = $scope.value;
                    }
                };
                radioGroupDatum.defaultScope.$watch('model', function (value) {
                    $scope.model = value;
                });
                radioGroupDatum.defaultScope.$watch('disable', function (value) {
                    $scope.disable = value;
                });
                radioGroupDatum.defaultScope.$watch('model.disabled', function (value) {
                    if ($scope.model) {
                        $scope.model.disabled = value;
                    }
                });
                /**
                 * Update this RadioField (UI) whenever the group's value changes.
                 * This could be triggered by another RadioField in the group.
                 */
                $scope.$watch('model.bindable', function (newValue) {
                    $scope.checked = newValue !== undefined && newValue !== null && $scope.value !== undefined && $scope.value !== null && newValue.toString() === $scope.value.toString();
                });
                /**
                 * Remove this RadioField from the group when it's removed from the DOM.
                 */
                $scope.$on('$destroy', function () {
                    radioGroupDatum.scopes.splice(radioGroupDatum.scopes.indexOf($scope), 1);
                    if (radioGroupDatum.scopes.length === 0) {
                        delete fieldNameToActiveRadioGroupDatumMap[$scope.attribute];
                    }
                });
            }
        };
    }
    formFor.RadioFieldDirective = RadioFieldDirective;
    angular.module('formFor').directive('radioField', ["$log", "FormForConfiguration", function ($log, FormForConfiguration) { return RadioFieldDirective($log, FormForConfiguration); }]);
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
var formFor;
(function (formFor) {
    var MIN_TIMEOUT_INTERVAL = 10;
    /**
     * Renders a drop-down &lt;select&gt; menu along with an input label.
     * This type of component works with large enumerations and can be configured to allow for a blank/empty selection
     * by way of an allow-blank attribute.
     *
     * The following HTML attributes are supported by this directive:
     * <ul>
     * <li>allow-blank: The presence of this attribute indicates that an empty/blank selection should be allowed.
     * <li>prevent-default-option: Optional attribute to override default selection of the first list option.
     *       Without this attribute, lists with `allow-blank` will default select the first option in the options array.
     *</ul>
     *
     * @example
     * // To use this component you'll first need to define a set of options. For instance:
     * $scope.genders = [
     *   { value: 'f', label: 'Female' },
     *   { value: 'm', label: 'Male' }
     * ];
     *
     * // To render a drop-down input using the above options:
     * <select-field attribute="gender"
     *               label="Gender"
     *               options="genders">
     * </select-field>
     *
     * // If you want to make this attribute optional you can use the allow-blank attribute as follows:
     * <select-field attribute="gender"
     *               label="Gender"
     *               options="genders"
     *               allow-blank>
     * </select-field>
     *
     * @param $document $injector-supplied $document service
     * @param $log $injector-supplied $log service
     * @param $timeout $injector-supplied $timeout service
     * @param fieldHelper
     */
    function SelectFieldDirective($document, $log, $timeout, fieldHelper) {
        return {
            require: '^formFor',
            restrict: 'EA',
            templateUrl: 'form-for/templates/select-field.html',
            scope: {
                attribute: '@',
                disable: '=',
                filterDebounce: '@?',
                help: '@?',
                multiple: '=?',
                options: '='
            },
            link: function ($scope, $element, $attributes, formForController) {
                if (!$scope.attribute) {
                    $log.error('Missing required field "attribute"');
                    return;
                }
                $scope.allowBlank = $attributes.hasOwnProperty('allowBlank');
                $scope.enableFiltering = $attributes.hasOwnProperty('enableFiltering');
                $scope.preventDefaultOption = $attributes.hasOwnProperty('preventDefaultOption');
                // Read from $attributes to avoid getting any interference from $scope.
                $scope.labelAttribute = $attributes['labelAttribute'] || 'label';
                $scope.valueAttribute = $attributes['valueAttribute'] || 'value';
                $scope.placeholder = $attributes.hasOwnProperty('placeholder') ? $attributes['placeholder'] : 'Select';
                $scope.tabIndex = $attributes['tabIndex'] || 0;
                $scope.scopeBuster = {};
                fieldHelper.manageLabel($scope, $attributes, false);
                fieldHelper.manageFieldRegistration($scope, $attributes, formForController);
                var filterText;
                // Helper method for setting focus on an item after a delay
                var setDelayedFilterTextFocus = function () {
                    if (!filterText) {
                        filterText = $element.find('input');
                    }
                    $timeout(filterText.focus.bind(filterText));
                };
                $scope.close = function () {
                    $timeout(function () {
                        $scope.isOpen = false;
                    });
                };
                $scope.open = function () {
                    if ($scope.disable || $scope.model.disabled) {
                        return;
                    }
                    $timeout(function () {
                        $scope.isOpen = true;
                    });
                };
                /*****************************************************************************************
                 * The following code pertains to filtering visible options.
                 *****************************************************************************************/
                $scope.emptyOption = {};
                $scope.emptyOption[$scope.labelAttribute] = '';
                $scope.emptyOption[$scope.valueAttribute] = undefined;
                $scope.placeholderOption = {};
                $scope.placeholderOption[$scope.labelAttribute] = $scope.placeholder;
                $scope.placeholderOption[$scope.valueAttribute] = undefined;
                $scope.filteredOptions = [];
                // Sanitizes option and filter-text values for comparison
                var sanitize = function (value) {
                    return value && value.toLowerCase();
                };
                // Updates visible <option>s based on current filter text
                var calculateFilteredOptions = function () {
                    var options = $scope.options || [];
                    $scope.filteredOptions.splice(0);
                    if (!$scope.enableFiltering || !$scope.scopeBuster.filter) {
                        angular.copy(options, $scope.filteredOptions);
                    }
                    else {
                        var filter = sanitize($scope.scopeBuster.filter);
                        angular.forEach(options, function (option) {
                            var index = sanitize(option[$scope.labelAttribute]).indexOf(filter);
                            if (index >= 0) {
                                $scope.filteredOptions.push(option);
                            }
                        });
                    }
                    if (!$scope.selectedOption && !$scope.multiple && !$scope.enableFiltering) {
                        $scope.filteredOptions.unshift($scope.placeholderOption);
                    }
                    else if ($scope.allowBlank) {
                        $scope.filteredOptions.unshift($scope.emptyOption);
                    }
                };
                $scope.$watch('scopeBuster.filter', calculateFilteredOptions);
                $scope.$watch('options.length', calculateFilteredOptions);
                /*****************************************************************************************
                 * The following code manages setting the correct default value based on bindable model.
                 *****************************************************************************************/
                var updateDefaultOption = function () {
                    var selected = $scope.selectedOption && $scope.selectedOption[$scope.valueAttribute];
                    var numOptions = $scope.options && $scope.options.length;
                    // Default select the first item in the list
                    // Do not do this if a blank option is allowed OR if the user has explicitly disabled this function
                    if (selected === $scope.model.bindable && !$scope.allowBlank && !$scope.preventDefaultOption && numOptions) {
                        $scope.model.bindable = $scope.options[0][$scope.valueAttribute];
                    }
                };
                $scope.$watch('model.bindable', updateDefaultOption);
                $scope.$watch('options.length', updateDefaultOption);
                /*****************************************************************************************
                 * The following code deals with toggling/collapsing the drop-down and selecting values.
                 *****************************************************************************************/
                $scope.$watch('model.bindable', function () {
                    var matchingOption = null;
                    angular.forEach($scope.options, function (option) {
                        if (option[$scope.valueAttribute] === $scope.model.bindable) {
                            matchingOption = option;
                        }
                    });
                    if (matchingOption) {
                        $scope.selectedOption = matchingOption;
                        $scope.selectedOptionLabel = matchingOption[$scope.labelAttribute];
                    }
                    // Make sure our filtered text reflects the currently selected label (important for Bootstrap styles).
                    $scope.scopeBuster.filter = $scope.selectedOptionLabel;
                });
                var documentClick = function (event) {
                    // See filterTextClick() for why we check this property.
                    if (event.ignoreFor === $scope.model.uid) {
                        return;
                    }
                    $scope.close();
                };
                $scope.filterTextClick = function (event) {
                    // We can't stop the event from propagating or we might prevent other inputs from closing on blur.
                    // But we can't let it proceed as normal or it may result in the $document click handler closing a newly-opened input.
                    // Instead we tag it for this particular instance of <select-field> to ignore.
                    if ($scope.isOpen) {
                        event.ignoreFor = $scope.model.uid;
                    }
                };
                var pendingTimeoutId;
                $scope.$watch('isOpen', function () {
                    if (pendingTimeoutId) {
                        $timeout.cancel(pendingTimeoutId);
                    }
                    pendingTimeoutId = $timeout(function () {
                        pendingTimeoutId = null;
                        if ($scope.isOpen) {
                            $document.on('click', undefined, documentClick);
                        }
                        else {
                            $document.off('click', undefined, documentClick);
                        }
                    }, MIN_TIMEOUT_INTERVAL);
                });
                $scope.$on('$destroy', function () {
                    $document.off('click', documentClick);
                });
                /*****************************************************************************************
                 * The following code responds to keyboard events when the drop-down is visible
                 *****************************************************************************************/
                $scope.setFilterFocus = function () {
                    setDelayedFilterTextFocus();
                };
                $scope.mouseOver = function (index) {
                    $scope.mouseOverIndex = index;
                    $scope.mouseOverOption = index >= 0 ? $scope.filteredOptions[index] : null;
                };
                $scope.selectOption = function (option) {
                    $scope.model.bindable = option && option[$scope.valueAttribute];
                };
                // Listen to key down, not up, because ENTER key sometimes gets converted into a click event.
                $scope.keyDown = function (event) {
                    switch (event.keyCode) {
                        case 27:
                            $scope.close();
                            break;
                        case 13:
                            if ($scope.isOpen) {
                                $scope.selectOption($scope.mouseOverOption);
                                $scope.close();
                            }
                            else {
                                $scope.open();
                            }
                            event.preventDefault();
                            break;
                        case 38:
                            if ($scope.isOpen) {
                                $scope.mouseOver($scope.mouseOverIndex > 0 ? $scope.mouseOverIndex - 1 : $scope.filteredOptions.length - 1);
                            }
                            else {
                                $scope.open();
                            }
                            break;
                        case 40:
                            if ($scope.isOpen) {
                                $scope.mouseOver($scope.mouseOverIndex < $scope.filteredOptions.length - 1 ? $scope.mouseOverIndex + 1 : 0);
                            }
                            else {
                                $scope.open();
                            }
                            break;
                        case 9:
                        case 16:
                            $scope.close();
                            break;
                        default:
                            $scope.open();
                            break;
                    }
                };
                $scope.$watchCollection('[isOpen, filteredOptions.length]', function () {
                    // Reset hover anytime our list opens/closes or our collection is refreshed.
                    $scope.mouseOver(-1);
                    // Pass focus through to filter field when select is opened
                    if ($scope.isOpen && $scope.enableFiltering) {
                        setDelayedFilterTextFocus();
                    }
                });
            }
        };
    }
    formFor.SelectFieldDirective = SelectFieldDirective;
    angular.module('formFor').directive('selectField', ["$document", "$log", "$timeout", "FieldHelper", function ($document, $log, $timeout, FieldHelper) { return SelectFieldDirective($document, $log, $timeout, FieldHelper); }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Displays a submit &lt;button&gt; component that is automatically disabled when a form is invalid or in the process of submitting.
     *
     * @example
     * // Here is a simple submit button with an icon:
     * <submit-button label="Sign Up" icon="fa fa-user"></submit-button>
     *
     * // You can use your own <button> components within a formFor as well.
     * // If you choose to you must register your button with formFor's controller using registerSubmitButton().
     * // This method returns a model with a bindable 'disabled' attribute that your button should use like so:
     * <form form-for="formData">
     *   <button ng-disabled="model.disabled">Submit</button>
     * </form>
     *
     * @param $sce $injector-supplied $sce service
     */
    function SubmitButtonDirective($sce) {
        return {
            require: '^formFor',
            restrict: 'EA',
            templateUrl: 'form-for/templates/submit-button.html',
            scope: {
                disable: '=',
                icon: '@',
                label: '@'
            },
            link: function ($scope, $element, $attributes, formForController) {
                $scope['buttonClass'] = $attributes['buttonClass'];
                $scope.tabIndex = $attributes['tabIndex'] || 0;
                $scope.$watch('label', function (value) {
                    $scope.bindableLabel = $sce.trustAsHtml(value);
                });
                $scope.model = formForController.registerSubmitButton($scope);
            }
        };
    }
    formFor.SubmitButtonDirective = SubmitButtonDirective;
    ;
    angular.module('formFor').directive('submitButton', ["$sce", function ($sce) { return SubmitButtonDirective($sce); }]);
})(formFor || (formFor = {}));
/// <reference path="../services/field-helper.ts" />
var formFor;
(function (formFor) {
    /**
     * Displays an HTML &lt;input&gt; or &lt;textarea&gt; element along with an optional label.
     *
     * <p>The HTML &lt;input&gt; type can be configured to allow for passwords, numbers, etc.
     * This directive can also be configured to display an informational tooltip.
     * In the event of a validation error, this directive will also render an inline error message.
     *
     * <p>This directive supports the following HTML attributes in addition to its scope properties:
     *
     * <ul>
     *   <li>autofocus: The presence of this attribute will auto-focus the input field.
     *   <li>multiline: The presence of this attribute enables multi-line input.
     * </ul>
     *
     * @example
     * // To create a password input you might use the following markup:
     * <text-field attribute="password" label="Password" type="password"></text-field>
     *
     * // To create a more advanced input field, with placeholder text and help tooltip you might use the following markup:
     * <text-field attribute="username" label="Username"
     *             placeholder="Example brianvaughn"
     *             help="Your username will be visible to others!"></text-field>
     *
     * // To render a multiline text input (or <textarea>):
     * <text-field attribute="description" label="Description" multiline></text-field>
     *
     * // To render icons based on the status of the field (pristin, invalid, valid) pass an object:
     * <text-field attribute="username" label="Username"
     *             icon-after="{pristine: 'fa fa-user', invalid: 'fa fa-times', valid: 'fa fa-check'}">
     * </text-field>
     */
    function TextFieldDirective($log, $timeout, fieldHelper) {
        return {
            require: '^formFor',
            restrict: 'EA',
            templateUrl: 'form-for/templates/text-field.html',
            scope: {
                attribute: '@',
                debounce: '@?',
                disable: '=',
                focused: '&?',
                blurred: '&?',
                help: '@?',
                iconAfterClicked: '&?',
                iconBeforeClicked: '&?',
                placeholder: '@?',
                rows: '=?'
            },
            link: function ($scope, $element, $attributes, formForController) {
                if (!$scope.attribute) {
                    $log.error('Missing required field "attribute"');
                    return;
                }
                // Expose textField attributes to textField template partials for easier customization (see issue #61)
                $scope.attributes = $attributes;
                $scope.rows = $scope.rows || 3;
                $scope.type = $attributes['type'] || 'text';
                $scope.multiline = $attributes.hasOwnProperty('multiline') && $attributes['multiline'] !== 'false';
                $scope.tabIndex = $attributes['tabIndex'] || 0;
                if ($attributes.hasOwnProperty('autofocus')) {
                    $timeout(function () {
                        $element.find($scope.multiline ? 'textarea' : 'input')[0].focus();
                    });
                }
                fieldHelper.manageLabel($scope, $attributes, false);
                fieldHelper.manageFieldRegistration($scope, $attributes, formForController);
                // Update $scope.iconAfter based on the field state (see class-level documentation for more)
                if ($attributes['iconAfter']) {
                    var updateIconAfter = function () {
                        if (!$scope.model) {
                            return;
                        }
                        var iconAfter = $attributes['iconAfter'].charAt(0) === '{' ? $scope.$eval($attributes['iconAfter']) : $attributes['iconAfter'];
                        if (angular.isObject(iconAfter)) {
                            if ($scope.model.error) {
                                $scope.iconAfter = iconAfter['invalid'];
                            }
                            else if ($scope.model.pristine) {
                                $scope.iconAfter = iconAfter['pristine'];
                            }
                            else {
                                $scope.iconAfter = iconAfter['valid'];
                            }
                        }
                        else {
                            $scope.iconAfter = iconAfter;
                        }
                    };
                    $attributes.$observe('iconAfter', updateIconAfter);
                    $scope.$watch('model.error', updateIconAfter);
                    $scope.$watch('model.pristine', updateIconAfter);
                }
                // Update $scope.iconBefore based on the field state (see class-level documentation for more)
                if ($attributes['iconBefore']) {
                    var updateIconBefore = function () {
                        if (!$scope.model) {
                            return;
                        }
                        var iconBefore = $attributes['iconBefore'].charAt(0) === '{' ? $scope.$eval($attributes['iconBefore']) : $attributes['iconBefore'];
                        if (angular.isObject(iconBefore)) {
                            if ($scope.model.error) {
                                $scope.iconBefore = iconBefore['invalid'];
                            }
                            else if ($scope.model.pristine) {
                                $scope.iconBefore = iconBefore['pristine'];
                            }
                            else {
                                $scope.iconBefore = iconBefore['valid'];
                            }
                        }
                        else {
                            $scope.iconBefore = iconBefore;
                        }
                    };
                    $attributes.$observe('iconBefore', updateIconBefore);
                    $scope.$watch('model.error', updateIconBefore);
                    $scope.$watch('model.pristine', updateIconBefore);
                }
                $scope.onIconAfterClick = function () {
                    if ($attributes.hasOwnProperty('iconAfterClicked')) {
                        $scope.iconAfterClicked();
                    }
                };
                $scope.onIconBeforeClick = function () {
                    if ($attributes.hasOwnProperty('iconBeforeClicked')) {
                        $scope.iconBeforeClicked();
                    }
                };
                $scope.onFocus = function () {
                    if ($attributes.hasOwnProperty('focused')) {
                        $scope.focused();
                    }
                };
                $scope.onBlur = function () {
                    if ($attributes.hasOwnProperty('blurred')) {
                        $scope.blurred();
                    }
                };
            }
        };
    }
    formFor.TextFieldDirective = TextFieldDirective;
    angular.module('formFor').directive('textField', ["$log", "$timeout", "FieldHelper", function ($log, $timeout, FieldHelper) { return TextFieldDirective($log, $timeout, FieldHelper); }]);
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Input types available for auto-created forms; see {@link FieldView}.
     */
    (function (BuilderFieldType) {
        BuilderFieldType[BuilderFieldType["CHECKBOX"] = "checkbox"] = "CHECKBOX";
        BuilderFieldType[BuilderFieldType["NUMBER"] = "number"] = "NUMBER";
        BuilderFieldType[BuilderFieldType["PASSWORD"] = "password"] = "PASSWORD";
        BuilderFieldType[BuilderFieldType["RADIO"] = "radio"] = "RADIO";
        BuilderFieldType[BuilderFieldType["SELECT"] = "select"] = "SELECT";
        BuilderFieldType[BuilderFieldType["TEXT"] = "text"] = "TEXT";
    })(formFor.BuilderFieldType || (formFor.BuilderFieldType = {}));
    var BuilderFieldType = formFor.BuilderFieldType;
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Identifies a validation failure type.
     */
    (function (ValidationFailureType) {
        ValidationFailureType[ValidationFailureType["COLLECTION_MAX_SIZE"] = "COLLECTION_MAX_SIZE"] = "COLLECTION_MAX_SIZE";
        ValidationFailureType[ValidationFailureType["COLLECTION_MIN_SIZE"] = "COLLECTION_MIN_SIZE"] = "COLLECTION_MIN_SIZE";
        ValidationFailureType[ValidationFailureType["CUSTOM"] = "CUSTOM"] = "CUSTOM";
        ValidationFailureType[ValidationFailureType["MAXIMUM"] = "MAXIMUM"] = "MAXIMUM";
        ValidationFailureType[ValidationFailureType["MAX_LENGTH"] = "MAX_LENGTH"] = "MAX_LENGTH";
        ValidationFailureType[ValidationFailureType["MINIMUM"] = "MINIMUM"] = "MINIMUM";
        ValidationFailureType[ValidationFailureType["MIN_LENGTH"] = "MIN_LENGTH"] = "MIN_LENGTH";
        ValidationFailureType[ValidationFailureType["PATTERN"] = "PATTERN"] = "PATTERN";
        ValidationFailureType[ValidationFailureType["REQUIRED"] = "REQUIRED_FIELD"] = "REQUIRED";
        ValidationFailureType[ValidationFailureType["TYPE_EMAIL"] = "TYPE_EMAIL"] = "TYPE_EMAIL";
        ValidationFailureType[ValidationFailureType["TYPE_INTEGER"] = "TYPE_INTEGER"] = "TYPE_INTEGER";
        ValidationFailureType[ValidationFailureType["TYPE_NEGATIVE"] = "TYPE_NEGATIVE"] = "TYPE_NEGATIVE";
        ValidationFailureType[ValidationFailureType["TYPE_NON_NEGATIVE"] = "TYPE_NON_NEGATIVE"] = "TYPE_NON_NEGATIVE";
        ValidationFailureType[ValidationFailureType["TYPE_NUMERIC"] = "TYPE_NUMERIC"] = "TYPE_NUMERIC";
        ValidationFailureType[ValidationFailureType["TYPE_POSITIVE"] = "TYPE_POSITIVE"] = "TYPE_POSITIVE";
    })(formFor.ValidationFailureType || (formFor.ValidationFailureType = {}));
    var ValidationFailureType = formFor.ValidationFailureType;
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    /**
     * Constraints that can be applied to a form field.
     * These constraints can be combined (e.g. "positive integer").
     */
    (function (ValidationFieldType) {
        ValidationFieldType[ValidationFieldType["EMAIL"] = "email"] = "EMAIL";
        ValidationFieldType[ValidationFieldType["INTEGER"] = "integer"] = "INTEGER";
        ValidationFieldType[ValidationFieldType["NEGATIVE"] = "negative"] = "NEGATIVE";
        ValidationFieldType[ValidationFieldType["NON_NEGATIVE"] = "nonNegative"] = "NON_NEGATIVE";
        ValidationFieldType[ValidationFieldType["NUMBER"] = "number"] = "NUMBER";
        ValidationFieldType[ValidationFieldType["POSITIVE"] = "positive"] = "POSITIVE";
    })(formFor.ValidationFieldType || (formFor.ValidationFieldType = {}));
    var ValidationFieldType = formFor.ValidationFieldType;
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    /**
     * Wrapper object for a form-field attribute that exposes field-state to field directives.
     *
     * <p>Note that this interface exists for type-checking only; nothing actually implements this interface.
     */
    var BindableFieldWrapper = (function () {
        function BindableFieldWrapper() {
        }
        return BindableFieldWrapper;
    })();
    formFor.BindableFieldWrapper = BindableFieldWrapper;
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
/// <reference path="../../definitions/angular.d.ts" />
/// <reference path="form-for-configuration.ts" />
/// <reference path="../utils/nested-object-helper.ts" />
/// <reference path="../utils/promise-utils.ts" />
var formFor;
(function (formFor) {
    /**
     * Model validation service.
     */
    var ModelValidator = (function () {
        /**
         * Constructor.
         *
         * @param $interpolate Injector-supplied $interpolate service
         * @param $parse Injecter-supplied $parse service
         * @param $q Injector-supplied $q service
         * @param formForConfiguration
         */
        function ModelValidator($interpolate, $parse, $q, formForConfiguration) {
            this.$interpolate_ = $interpolate;
            this.formForConfiguration_ = formForConfiguration;
            this.nestedObjectHelper_ = new formFor.NestedObjectHelper($parse);
            this.promiseUtils_ = new formFor.PromiseUtils($q);
        }
        /**
         * Determines if the specified collection is required (requires a minimum number of items).
         *
         * @param fieldName Name of field containing the collection.
         * @param validationRuleSet Map of field names to validation rules
         */
        ModelValidator.prototype.isCollectionRequired = function (fieldName, validationRuleSet) {
            var validationRules = this.getRulesFor_(fieldName, validationRuleSet);
            if (validationRules && validationRules.collection && validationRules.collection.min) {
                if (angular.isObject(validationRules.collection.min)) {
                    return validationRules.collection.min.rule > 0;
                }
                else {
                    return validationRules.collection.min > 0;
                }
            }
            return false;
        };
        /**
         * Determines if the specified field is flagged as required.
         *
         * @param fieldName Name of field in question.
         * @param validationRuleSet Map of field names to validation rules
         */
        ModelValidator.prototype.isFieldRequired = function (fieldName, validationRuleSet) {
            var validationRules = this.getRulesFor_(fieldName, validationRuleSet);
            if (validationRules && validationRules.required) {
                if (angular.isObject(validationRules.required)) {
                    return validationRules.required.rule;
                }
                else {
                    return !!validationRules.required;
                }
            }
            return false;
        };
        /**
         * Validates the model against all rules in the validationRules.
         * This method returns a promise to be resolved on successful validation,
         * or rejected with a map of field-name to error-message.
         *
         * @param formData Form-data object model is contained within
         * @param validationRuleSet Map of field names to validation rules
         * @return Promise to be resolved or rejected based on validation success or failure.
         */
        ModelValidator.prototype.validateAll = function (formData, validationRuleSet) {
            var fieldNames = this.nestedObjectHelper_.flattenObjectKeys(formData);
            return this.validateFields(formData, fieldNames, validationRuleSet);
        };
        /**
         * Validate the properties of a collection (but not the items within the collection).
         * This method returns a promise to be resolved on successful validation or rejected with an error message.
         *
         * @param formData Form-data object model is contained within
         * @param fieldName Name of collection to validate
         * @param validationRuleSet Map of field names to validation rules
         * @return Promise to be resolved or rejected based on validation success or failure.
         */
        ModelValidator.prototype.validateCollection = function (formData, fieldName, validationRuleSet) {
            var validationRules = this.getRulesFor_(fieldName, validationRuleSet);
            var collection = this.nestedObjectHelper_.readAttribute(formData, fieldName);
            if (validationRules && validationRules.collection) {
                collection = collection || [];
                return this.validateCollectionMinLength_(collection, validationRules.collection) || this.validateCollectionMaxLength_(collection, validationRules.collection) || this.promiseUtils_.resolve();
            }
            return this.promiseUtils_.resolve();
        };
        /**
         * Validates a value against the related rule-set (within validationRules).
         * This method returns a promise to be resolved on successful validation.
         * If validation fails the promise will be rejected with an error message.
         *
         * @param formData Form-data object model is contained within.
         * @param fieldName Name of field used to associate the rule-set map with a given value.
         * @param validationRuleSet Map of field names to validation rules
         * @return Promise to be resolved or rejected based on validation success or failure.
         */
        ModelValidator.prototype.validateField = function (formData, fieldName, validationRuleSet) {
            var validationRules = this.getRulesFor_(fieldName, validationRuleSet);
            var value = this.nestedObjectHelper_.readAttribute(formData, fieldName);
            if (validationRules) {
                if (value === undefined || value === null) {
                    value = ""; // Escape falsy values liked null or undefined, but not ones like 0
                }
                return this.validateFieldRequired_(value, validationRules) || this.validateFieldMinimum_(value, validationRules) || this.validateFieldMinLength_(value, validationRules) || this.validateFieldMaximum_(value, validationRules) || this.validateFieldMaxLength_(value, validationRules) || this.validateFieldType_(value, validationRules) || this.validateFieldPattern_(value, validationRules) || this.validateFieldCustom_(value, formData, validationRules) || this.promiseUtils_.resolve();
            }
            return this.promiseUtils_.resolve();
        };
        /**
         * Validates the values in model with the rules defined in the current validationRules.
         * This method returns a promise to be resolved on successful validation,
         * or rejected with a map of field-name to error-message.
         *
         * @param formData Form-data object model is contained within
         * @param fieldNames White-list set of fields to validate for the given model.
         *                   Values outside of this list will be ignored.
         * @param validationRuleSet Map of field names to validation rules
         * @return Promise to be resolved or rejected based on validation success or failure.
         */
        ModelValidator.prototype.validateFields = function (formData, fieldNames, validationRuleSet) {
            var _this = this;
            var deferred = this.promiseUtils_.defer();
            var promises = [];
            var errorMap = {};
            angular.forEach(fieldNames, function (fieldName) {
                var validationRules = _this.getRulesFor_(fieldName, validationRuleSet);
                if (validationRules) {
                    var promise;
                    if (validationRules.collection) {
                        promise = _this.validateCollection(formData, fieldName, validationRuleSet);
                    }
                    else {
                        promise = _this.validateField(formData, fieldName, validationRuleSet);
                    }
                    promise.then(angular.noop, function (error) {
                        _this.nestedObjectHelper_.writeAttribute(errorMap, fieldName, error);
                    });
                    promises.push(promise);
                }
            }, this);
            // Wait until all validations have finished before proceeding; bundle up the error messages if any failed.
            this.promiseUtils_.waitForAll(promises).then(deferred.resolve, function () {
                deferred.reject(errorMap);
            });
            return deferred.promise;
        };
        // Helper methods ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Strip array brackets from field names so that model values can be mapped to rules.
         * e.g. "foo[0].bar" should be validated against "foo.collection.fields.bar"
         *
         * @private
         */
        ModelValidator.prototype.getRulesFor_ = function (fieldName, validationRuleSet) {
            var expandedFieldName = fieldName.replace(/\[[^\]]+\]/g, '.collection.fields');
            return this.nestedObjectHelper_.readAttribute(validationRuleSet, expandedFieldName);
        };
        ModelValidator.prototype.getFieldTypeFailureMessage_ = function (validationRules, failureType) {
            return angular.isObject(validationRules.type) ? validationRules.type.message : this.formForConfiguration_.getFailedValidationMessage(failureType);
        };
        /**
         * Determining if numeric input has been provided.
         * This guards against the fact that `new Number('') == 0`.
         * @private
         */
        ModelValidator.isConsideredNumeric_ = function (stringValue, numericValue) {
            return stringValue && !isNaN(numericValue);
        };
        // Validation helper methods /////////////////////////////////////////////////////////////////////////////////////////
        ModelValidator.prototype.validateCollectionMinLength_ = function (collection, validationRuleCollection) {
            if (validationRuleCollection.min) {
                var min = angular.isObject(validationRuleCollection.min) ? validationRuleCollection.min.rule : validationRuleCollection.min;
                if (collection.length < min) {
                    var failureMessage;
                    if (angular.isObject(validationRuleCollection.min)) {
                        failureMessage = validationRuleCollection.min.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.COLLECTION_MIN_SIZE))({ num: min });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateCollectionMaxLength_ = function (collection, validationRuleCollection) {
            if (validationRuleCollection.max) {
                var max = angular.isObject(validationRuleCollection.max) ? validationRuleCollection.max.rule : validationRuleCollection.max;
                if (collection.length > max) {
                    var failureMessage;
                    if (angular.isObject(validationRuleCollection.max)) {
                        failureMessage = validationRuleCollection.max.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.COLLECTION_MAX_SIZE))({ num: max });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldCustom_ = function (value, formData, validationRules) {
            var _this = this;
            if (validationRules.custom) {
                var defaultErrorMessage;
                var validationFunction;
                if (angular.isFunction(validationRules.custom)) {
                    defaultErrorMessage = this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.CUSTOM);
                    validationFunction = validationRules.custom;
                }
                else {
                    defaultErrorMessage = validationRules.custom.message;
                    validationFunction = validationRules.custom.rule;
                }
                try {
                    var returnValue = validationFunction(value, formData);
                }
                catch (error) {
                    return this.promiseUtils_.reject(error.message || defaultErrorMessage);
                }
                if (angular.isObject(returnValue) && angular.isFunction(returnValue.then)) {
                    return returnValue.then(function (reason) {
                        return _this.promiseUtils_.resolve(reason);
                    }, function (reason) {
                        return _this.promiseUtils_.reject(reason || defaultErrorMessage);
                    });
                }
                else if (returnValue) {
                    return this.promiseUtils_.resolve(returnValue);
                }
                else {
                    return this.promiseUtils_.reject(defaultErrorMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldMaximum_ = function (value, validationRules) {
            if (validationRules.maximum) {
                var stringValue = value.toString();
                var numericValue = Number(value);
                var maximum = angular.isObject(validationRules.maximum) ? validationRules.maximum.rule : validationRules.maximum;
                if (stringValue && !isNaN(numericValue) && numericValue > maximum) {
                    var failureMessage;
                    if (angular.isObject(validationRules.maximum)) {
                        failureMessage = validationRules.maximum.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.MAXIMUM))({ num: maximum });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldMaxLength_ = function (value, validationRules) {
            if (validationRules.maxlength) {
                var maxlength = angular.isObject(validationRules.maxlength) ? validationRules.maxlength.rule : validationRules.maxlength;
                if (value.length > maxlength) {
                    var failureMessage;
                    if (angular.isObject(validationRules.maxlength)) {
                        failureMessage = validationRules.maxlength.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.MAX_LENGTH))({ num: maxlength });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldMinimum_ = function (value, validationRules) {
            if (validationRules.minimum) {
                var stringValue = value.toString();
                var numericValue = Number(value);
                var minimum = angular.isObject(validationRules.minimum) ? validationRules.minimum.rule : validationRules.minimum;
                if (stringValue && !isNaN(numericValue) && numericValue < minimum) {
                    var failureMessage;
                    if (angular.isObject(validationRules.minimum)) {
                        failureMessage = validationRules.minimum.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.MINIMUM))({ num: minimum });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldMinLength_ = function (value, validationRules) {
            if (validationRules.minlength) {
                var minlength = angular.isObject(validationRules.minlength) ? validationRules.minlength.rule : validationRules.minlength;
                if (value && value.length < minlength) {
                    var failureMessage;
                    if (angular.isObject(validationRules.minlength)) {
                        failureMessage = validationRules.minlength.message;
                    }
                    else {
                        failureMessage = this.$interpolate_(this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.MIN_LENGTH))({ num: minlength });
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldRequired_ = function (value, validationRules) {
            if (validationRules.required) {
                var required = angular.isObject(validationRules.required) ? validationRules.required.rule : validationRules.required;
                // Compare both string and numeric values to avoid rejecting non-empty but falsy values (e.g. 0).
                var stringValue = value.toString().replace(/\s+$/, ''); // Disallow an all-whitespace string
                var numericValue = Number(value);
                if (required && !stringValue && !numericValue) {
                    var failureMessage;
                    if (angular.isObject(validationRules.required)) {
                        failureMessage = validationRules.required.message;
                    }
                    else {
                        failureMessage = this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.REQUIRED);
                    }
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldPattern_ = function (value, validationRules) {
            if (validationRules.pattern) {
                var isRegExp = validationRules.pattern instanceof RegExp;
                var regExp = isRegExp ? validationRules.pattern : validationRules.pattern.rule;
                if (!regExp.exec(value)) {
                    var failureMessage = isRegExp ? this.formForConfiguration_.getFailedValidationMessage(formFor.ValidationFailureType.PATTERN) : validationRules.pattern.message;
                    return this.promiseUtils_.reject(failureMessage);
                }
            }
            return null;
        };
        ModelValidator.prototype.validateFieldType_ = function (value, validationRules) {
            if (validationRules.type) {
                // String containing 0+ ValidationRuleFieldType enums
                var typesString = angular.isObject(validationRules.type) ? validationRules.type.rule : validationRules.type;
                var stringValue = value.toString();
                var numericValue = Number(value);
                if (typesString) {
                    var types = typesString.split(' ');
                    for (var i = 0, length = types.length; i < length; i++) {
                        var type = types[i];
                        switch (type) {
                            case formFor.ValidationFieldType.INTEGER:
                                if (stringValue && (isNaN(numericValue) || numericValue % 1 !== 0)) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_INTEGER));
                                }
                                break;
                            case formFor.ValidationFieldType.NUMBER:
                                if (stringValue && isNaN(numericValue)) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_NUMERIC));
                                }
                                break;
                            case formFor.ValidationFieldType.NEGATIVE:
                                if (ModelValidator.isConsideredNumeric_(stringValue, numericValue) && numericValue >= 0) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_NEGATIVE));
                                }
                                break;
                            case formFor.ValidationFieldType.NON_NEGATIVE:
                                if (ModelValidator.isConsideredNumeric_(stringValue, numericValue) && numericValue < 0) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_NON_NEGATIVE));
                                }
                                break;
                            case formFor.ValidationFieldType.POSITIVE:
                                if (ModelValidator.isConsideredNumeric_(stringValue, numericValue) && numericValue <= 0) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_POSITIVE));
                                }
                                break;
                            case formFor.ValidationFieldType.EMAIL:
                                if (stringValue && !stringValue.match(/^.+@.+\..+$/)) {
                                    return this.promiseUtils_.reject(this.getFieldTypeFailureMessage_(validationRules, formFor.ValidationFailureType.TYPE_EMAIL));
                                }
                                break;
                        }
                    }
                }
            }
            return null;
        };
        return ModelValidator;
    })();
    formFor.ModelValidator = ModelValidator;
    angular.module('formFor').service('ModelValidator', ["$interpolate", "$parse", "$q", "FormForConfiguration", function ($interpolate, $parse, $q, FormForConfiguration) { return new ModelValidator($interpolate, $parse, $q, FormForConfiguration); }]);
})(formFor || (formFor = {}));
/// <reference path="nested-object-helper.ts" />
var formFor;
(function (formFor) {
    /*
     * Organizes state management for form-submission and field validity.
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var FormForStateHelper = (function () {
        // TODO Add some documentation
        function FormForStateHelper($parse, $scope) {
            this.formForScope_ = $scope;
            this.nestedObjectHelper_ = new formFor.NestedObjectHelper($parse);
            this.formForScope_.fieldNameToErrorMap = $scope.fieldNameToErrorMap || {};
            this.formForScope_.valid = true;
            this.fieldNameToModifiedStateMap_ = {};
            this.formSubmitted_ = false;
            this.fieldNameToErrorMap_ = {};
            this.watchable = 0;
        }
        FormForStateHelper.prototype.getFieldError = function (fieldName) {
            return this.nestedObjectHelper_.readAttribute(this.formForScope_.fieldNameToErrorMap, fieldName);
        };
        FormForStateHelper.prototype.hasFieldBeenModified = function (fieldName) {
            return this.nestedObjectHelper_.readAttribute(this.fieldNameToModifiedStateMap_, fieldName);
        };
        FormForStateHelper.prototype.hasFormBeenSubmitted = function () {
            return this.formSubmitted_;
        };
        FormForStateHelper.prototype.isFormInvalid = function () {
            return !this.isFormValid();
        };
        FormForStateHelper.prototype.isFormValid = function () {
            for (var prop in this.fieldNameToErrorMap_) {
                return false;
            }
            return true;
        };
        FormForStateHelper.prototype.resetFieldErrors = function () {
            this.formForScope_.fieldNameToErrorMap = {};
        };
        FormForStateHelper.prototype.setFieldError = function (fieldName, error) {
            var safeFieldName = this.nestedObjectHelper_.flattenAttribute(fieldName);
            this.nestedObjectHelper_.writeAttribute(this.formForScope_.fieldNameToErrorMap, fieldName, error);
            if (error) {
                this.fieldNameToErrorMap_[safeFieldName] = error;
            }
            else {
                delete this.fieldNameToErrorMap_[safeFieldName];
            }
            this.formForScope_.valid = this.isFormValid();
            this.watchable++;
        };
        FormForStateHelper.prototype.setFieldHasBeenModified = function (fieldName, hasBeenModified) {
            this.nestedObjectHelper_.writeAttribute(this.fieldNameToModifiedStateMap_, fieldName, hasBeenModified);
            this.watchable++;
        };
        FormForStateHelper.prototype.setFormSubmitted = function (submitted) {
            this.formSubmitted_ = submitted;
            this.watchable++;
        };
        return FormForStateHelper;
    })();
    formFor.FormForStateHelper = FormForStateHelper;
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    /**
     * Utility for working with strings.
     *
     * <p>Intended for use only by formFor directive; this class is not exposed to the $injector.
     */
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
         * Converts text in common variable formats to humanized form.
         *
         * @param text Name of variable to be humanized (ex. myVariable, my_variable)
         * @returns Humanized string (ex. 'My Variable')
         */
        StringUtil.humanize = function (text) {
            if (!text) {
                return '';
            }
            text = text.replace(/[A-Z]/g, function (match) {
                return ' ' + match;
            });
            text = text.replace(/_([a-z])/g, function (match, $1) {
                return ' ' + $1.toUpperCase();
            });
            text = text.replace(/\s+/g, ' ');
            text = text.trim();
            text = text.charAt(0).toUpperCase() + text.slice(1);
            return text;
        };
        return StringUtil;
    })();
    formFor.StringUtil = StringUtil;
})(formFor || (formFor = {}));
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
/// <reference path="../../../definitions/angular.d.ts" />
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
var formFor;
(function (formFor) {
    ;
})(formFor || (formFor = {}));
;
