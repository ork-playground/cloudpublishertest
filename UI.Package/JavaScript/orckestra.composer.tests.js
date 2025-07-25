'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../System/IDisposable.ts' />
///<reference path='../Generics/Collections/IHashTable.ts' />
///<reference path='./IController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ControllerRegistry = /** @class */ (function () {
            function ControllerRegistry() {
                if (ControllerRegistry._instance === void 0) {
                    ControllerRegistry._instance = this;
                }
                return ControllerRegistry._instance;
            }
            ControllerRegistry.prototype.isRegistered = function (controllerName) {
                return ControllerRegistry._registry.hasOwnProperty(controllerName);
            };
            ControllerRegistry.prototype.retrieveController = function (controllerName) {
                if (!this.isRegistered(controllerName)) {
                    throw new Error('Unable to unregister the controller ' + controllerName + ' because it does not exist in the registry');
                }
                return ControllerRegistry._registry[controllerName];
            };
            ControllerRegistry.prototype.register = function (controllerName, controller) {
                if (this.isRegistered(controllerName)) {
                    throw new Error('The controller ' + controllerName + ' is already registered.');
                }
                ControllerRegistry._registry[controllerName] = controller;
            };
            ControllerRegistry.prototype.unregister = function (controllerName) {
                var unregisteredController; // IController;
                if (!this.isRegistered(controllerName)) {
                    throw new Error('Unable to unregister the controller ' + controllerName + ' because it does not exist in the registry');
                }
                delete ControllerRegistry._registry[controllerName];
                return unregisteredController;
            };
            ControllerRegistry._registry = {}; //IHashTable<IController> = {};
            return ControllerRegistry;
        }());
        Composer.ControllerRegistry = ControllerRegistry;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
/// <reference path='./IListener.ts' />
/// <reference path='./ISubscription.ts' />
/// <reference path='./IListener.ts' />
/// <reference path='./IListenerQueue.ts' />
/// <reference path='./IEventInformation.ts' />
/// <reference path='../Generics/Collections/IHashTable.ts' />
///<reference path='../Typings/tsd.d.ts' />
/// <reference path='./Mvc/IControllerConfiguration.ts' />
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='./IControllerContext.ts' />
///<reference path='../Events/IEventHub.ts' />
///<reference path='../IComposerContext.ts' />
///<reference path='../IComposerConfiguration.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./ICachePolicy.ts' />
/// <reference path="../../Typings/tsd.d.ts" />
/// <reference path="./IController.ts" />
/// <reference path="./ControllerRegistry.ts" />
/// <reference path="./ICreateControllerOptions.ts" />
/// <reference path="../Cache/ICache.ts" />
/// <reference path="../Events/IEventHub.ts" />
/// <reference path="../IComposerContext.ts" />
/// <reference path="../IComposerConfiguration.ts" />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        /**
        * Factory for creating controllers.
        */
        var ControllerFactory = /** @class */ (function () {
            function ControllerFactory() {
            }
            /**
            * Creates and returns an instance of a controller.
            */
            ControllerFactory.createController = function (options) {
                var controllerConstructor = ControllerFactory._controllerRegistry.retrieveController(options.controllerName);
                return new controllerConstructor(options.context, options.eventHub, options.composerContext, options.composerConfiguration);
            };
            ControllerFactory._controllerRegistry = new Orckestra.Composer.ControllerRegistry();
            return ControllerFactory;
        }());
        Composer.ControllerFactory = ControllerFactory;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../Generics/Collections/IHashTable.ts' />
///<reference path='../../Typings/tsd.d.ts' />
/// <reference path="../../Typings/tsd.d.ts" />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var UIBusyHandle = /** @class */ (function () {
            /*
             * Start the busy state, to be called before the async call
             * @param loadingIndicatorContext JQuery element of what the handler will remove/add class "hidden".
             * @param containerContext JQuery element containing inputs that will be disabled while busy.
             * @param msDelay Number of ms before activating async. If done is called before the end
             *        of the delay, the loadingIndicatorContext will not be shown.
             */
            function UIBusyHandle(loadingIndicatorContext, containerContext, msDelay) {
                this._isLoading = false;
                this.loadingIndicatorContext = loadingIndicatorContext;
                this.containerContext = containerContext;
                this.startBusy(msDelay);
            }
            /*
             * Ends the busy state, to be called in the then of the async call
             */
            UIBusyHandle.prototype.done = function () {
                this.endBusy();
            };
            UIBusyHandle.prototype.isLoading = function () {
                return this._isLoading;
            };
            UIBusyHandle.prototype.startBusy = function (msDelay) {
                var _this = this;
                this._isLoading = true;
                this.timeoutHandle = setTimeout(function () {
                    _this.containerContext.find(':input:enabled').addClass('async-busy').prop('disabled', true);
                    _this.loadingIndicatorContext.removeClass('d-none');
                }, msDelay);
            };
            UIBusyHandle.prototype.endBusy = function () {
                clearTimeout(this.timeoutHandle);
                this._isLoading = false;
                this.loadingIndicatorContext.addClass('d-none');
                this.containerContext.find(':input.async-busy').removeClass('async-busy').prop('disabled', false);
            };
            return UIBusyHandle;
        }());
        Composer.UIBusyHandle = UIBusyHandle;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path="../../Typings/tsd.d.ts" />
/// <reference path='../Generics/Collections/IHashTable.ts' />
/// <reference path='../Events/IEventHub.ts' />
/// <reference path='./IController.ts' />
/// <reference path='./IControllerContext.ts' />
/// <reference path='./IRegisterActionOptions.ts' />
/// <reference path='./IControllerActionContext.ts' />
///<reference path='../Templating/IComposerTemplates.ts' />
///<reference path='../Templating/IComposerTemplates.ts' />
/// <reference path='../JQueryPlugins/IParsleyJqueryPlugin.ts' />
/// <reference path='../Validation/IParsley.ts' />
/// <reference path='../UI/UIBusyParam.ts' />
/// <reference path='../UI/UIBusyHandle.ts' />
/// <reference path='../IComposerContext.ts' />
/// <reference path='../IComposerConfiguration.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        /**
        * Provides methods that respond to client-side requests.
        */
        var Controller = /** @class */ (function () {
            function Controller(context, eventHub, composerContext, composerConfiguration) {
                this.context = context;
                this.eventHub = eventHub;
                this.composerContext = composerContext;
                this.composerConfiguration = composerConfiguration;
                this._composerEventPostfix = '.composer';
                this._defaultEventsToMonitor = ['click', 'mouseover', 'mouseout', 'contextmenu', 'submit', 'focus', 'blur', 'change']; // 'dblclick'
                if (_.isEmpty(context)) {
                    throw new Error('context is required');
                }
                if (_.isEmpty(eventHub)) {
                    throw new Error('eventHub is required');
                }
                if (_.isEmpty(composerContext)) {
                    throw new Error('composerContext is required');
                }
            }
            Controller.registerAction = function (classToRegisterActionOn, registerActionOptions) {
                var classPrototype = classToRegisterActionOn.prototype;
                if (!Controller.prototype.isPrototypeOf(classPrototype)) {
                    throw new Error('The class you are trying to register the action on is not a controller.');
                }
                if (_.isFunction(registerActionOptions.actionDelegate)) {
                    if (!classPrototype.hasOwnProperty(registerActionOptions.actionName) ||
                        registerActionOptions.overwrite &&
                            classPrototype.hasOwnProperty(registerActionOptions.actionName) &&
                            _.isFunction(classPrototype[registerActionOptions.actionName])) {
                        classPrototype[registerActionOptions.actionName] = registerActionOptions.actionDelegate;
                    }
                    else {
                        throw new Error("You cannot overwrite the action named \"" + registerActionOptions.actionName + "\" without specifying overwrite = true in the registerActionOptions.");
                    }
                }
                else {
                    throw new Error("Unable to register action " + registerActionOptions.actionName + ". The action delegate is not a function.");
                }
            };
            Controller.prototype.initialize = function () {
                if (_.isEmpty(this.eventsToMonitor)) {
                    this.eventsToMonitor = this._defaultEventsToMonitor;
                }
                this.registerDomEvents();
            };
            Controller.prototype.dispose = function () {
                this.unregisterDomEvents();
            };
            Controller.prototype.asyncBusy = function (options) {
                if (options === void 0) { options = {}; }
                options = _.merge({
                    elementContext: this.context.container,
                    containerContext: this.context.container,
                    loadingIndicatorSelector: '.loading-indicator',
                    msDelay: 0
                }, options);
                var loadingIndicatorContext = options.elementContext.find(options.loadingIndicatorSelector);
                var handle = new Composer.UIBusyHandle(loadingIndicatorContext, options.containerContext, options.msDelay);
                return handle;
            };
            /*
             * Prevents a form from submitting.
             * @param context A controller action context.
             */
            Controller.prototype.preventFormSubmit = function (context) {
                context.event.preventDefault();
            };
            Controller.prototype.render = function (templateId, viewModel, parentSelector) {
                var _this = this;
                var container = this.context.container;
                if (!_.isEmpty(parentSelector)) {
                    container = this.context.container.find(parentSelector);
                }
                var elements = container.find("[data-templateid=\"" + templateId + "\"]");
                if (_.isEmpty(elements)) {
                    console.warn("Could not find the template '" + templateId + "' inside its container.", container);
                }
                elements.each(function (index, item) {
                    var renderedTemplate = _this.getRenderedTemplateContents(templateId, viewModel);
                    if (renderedTemplate !== null) {
                        item.outerHTML = renderedTemplate;
                    }
                });
            };
            Controller.prototype.getRenderedTemplateContents = function (templateId, viewModel) {
                var template = Orckestra.Composer.Templates[templateId];
                if (!_.isFunction(template)) {
                    console.error("Template '" + templateId + "' not found in compiled templates.");
                    return null;
                }
                try {
                    return template(viewModel);
                }
                catch (error) {
                    // catch handlebars rendering errors mostly
                    console.error(error.name + ": " + error.message + " in template '" + templateId + "'.", viewModel);
                }
            };
            Controller.prototype.registerFormsForValidation = function (context, customOptions) {
                if (customOptions === void 0) { customOptions = {}; }
                var formValidators = [];
                var options = {
                    trigger: 'focusout change',
                    focus: 'first',
                    errorTemplate: '<li></li>',
                    classHandler: function (fieldInstance) {
                        var handleSelector = fieldInstance.$element.data('parsleyClassHandlerSelector');
                        // returning undefined will make parsley use the default classHandler
                        if (_.isEmpty(handleSelector)) {
                            return undefined;
                        }
                        var classHandler = fieldInstance.$element.closest(handleSelector);
                        return classHandler;
                    }
                };
                _.assign(options, customOptions);
                context.each(function (index, element) {
                    formValidators.push($(element).parsley(options));
                });
                if (customOptions.serverValidationContainer) {
                    this.hideServerValidationMessageOnClientValidation(formValidators, customOptions.serverValidationContainer);
                }
                return formValidators;
            };
            /**
             * Hide any messages from previous server validation
             * when the new form is used to prevent mixing up
             * client side validation message with server side
             * messages.
             *
             * @param formValidators all the parlsey forms to manage
             * @param serverValidationContainer the jQuery selector to find messages to empty
             */
            Controller.prototype.hideServerValidationMessageOnClientValidation = function (formValidators, serverValidationContainer) {
                _.each(formValidators, function (parsley) {
                    parsley.subscribe('parsley:field:validate', function () {
                        parsley.$element.find(serverValidationContainer).empty();
                        _.defer(function () { parsley.unsubscribe('parsley:field:validate'); });
                    });
                });
            };
            Controller.prototype.registerDomEvents = function () {
                var _this = this;
                var parseAction = this.parseAction.bind(this);
                this._unregister = function () {
                    _this.context.container.off(_this._composerEventPostfix, parseAction);
                };
                this.eventsToMonitor.forEach(function (item) {
                    _this.context.container.on("" + item + _this._composerEventPostfix, parseAction);
                });
            };
            Controller.prototype.unregisterDomEvents = function () {
                if (this._unregister !== void 0) {
                    this._unregister();
                }
            };
            Controller.prototype.parseAction = function (e) {
                this.applyControllerAction($(e.target), e);
            };
            Controller.prototype.applyControllerAction = function (context, e) {
                var controllerActions, eventAttribute = "oc-" + e.type, rawActions = context.data(eventAttribute);
                if (_.isEmpty(rawActions)) {
                    if (context.length > 0 && context[0] !== this.context.container[0]) {
                        this.applyControllerAction(context.parent(), e);
                    }
                    return;
                }
                controllerActions = rawActions.replace(/\s+/g, '').split(',');
                this.applyControllerActions(context, e, controllerActions);
            };
            Controller.prototype.applyControllerActions = function (context, e, controllerActions) {
                var _this = this;
                controllerActions.forEach(function (controllerAction) {
                    var controllerActionContext;
                    if (_.isFunction(_this[controllerAction])) {
                        controllerActionContext = {
                            elementContext: context,
                            event: e
                        };
                        _this[controllerAction].apply(_this, [controllerActionContext]);
                    }
                });
            };
            return Controller;
        }());
        Composer.Controller = Controller;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='./Localization/ILocalizationProvider.ts' />
///<reference path='./Localization/LocalizationProvider.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ComposerClient = /** @class */ (function () {
            function ComposerClient() {
            }
            ComposerClient.get = function (url, data) {
                return this.sendRequest('GET', url, data);
            };
            ComposerClient.post = function (url, data) {
                return this.sendRequest('POST', url, data ? JSON.stringify(data) : null);
            };
            ComposerClient.put = function (url, data) {
                return this.sendRequest('PUT', url, data ? JSON.stringify(data) : null);
            };
            ComposerClient.remove = function (url, data) {
                return this.sendRequest('DELETE', url, data ? JSON.stringify(data) : null);
            };
            ComposerClient.sendRequest = function (method, url, data) {
                var _this = this;
                var settings = {
                    contentType: 'application/json',
                    dataType: 'json',
                    data: data,
                    method: method,
                    url: url,
                    headers: {
                        'Accept-Language': this.getPageCulture(),
                        'WebsiteId': this.getWebsiteId()
                    }
                };
                return Q($.ajax(settings)).fail(function (reason) { return _this.onRequestRejected(reason); });
            };
            ComposerClient.getPageCulture = function () {
                var culture = $('html').attr('lang');
                if (!culture) {
                    throw new Error('No lang attribute was found on the <html> element. Please make sure it is included.');
                }
                return culture;
            };
            ComposerClient.getWebsiteId = function () {
                var websiteId = $('html').data('website');
                if (!websiteId) {
                    throw new Error('No websiteId was found on the <html> element. Please make sure it is included.');
                }
                return websiteId;
            };
            ComposerClient.onRequestRejected = function (reason) {
                if (reason.readyState === 0) {
                    throw { Errors: [{ LocalizedErrorMessage: this.getAjaxFailedErrorMessage() }] };
                }
                if (reason.readyState === 4 && reason.status === 205) {
                    console.log('Page must be reloaded.');
                    var redirectUrl = this.getReloadUrl();
                    window.location.href = redirectUrl;
                }
                if (reason.readyState === 4 && reason.status === 401) {
                    throw { Errors: [{ LocalizedErrorMessage: this.getUnauthorizedErrorMessage() }] };
                }
                if (reason.readyState === 4 && reason.status === 500 && reason.responseJSON !== null) {
                    throw { Errors: reason.responseJSON.Errors || reason.responseJSON.ExceptionMessage };
                }
                throw reason;
            };
            ComposerClient.getReloadUrl = function () {
                var rawQueryString = window.location.search;
                var value = 'session=expired';
                if (this.doesUrlContainQueryString(rawQueryString, value)) {
                    return window.location.href;
                }
                var splitter = '&';
                if (_.isEmpty(rawQueryString)) {
                    splitter = '/?';
                }
                var qs = "" + rawQueryString + splitter + value;
                var urls = window.location.href.split('?', 2);
                var url = "" + urls[0] + qs;
                return url;
            };
            ComposerClient.doesUrlContainQueryString = function (url, value) {
                var regex = new RegExp('(\\?|\\&)' + value, 'i');
                return regex.test(url);
            };
            ComposerClient.getAjaxFailedErrorMessage = function () {
                return Composer.LocalizationProvider.instance().getLocalizedString('General', 'L_ErrorAjaxFailed');
            };
            ComposerClient.getUnauthorizedErrorMessage = function () {
                return Composer.LocalizationProvider.instance().getLocalizedString('General', 'L_ErrorUnauthorized');
            };
            return ComposerClient;
        }());
        Composer.ComposerClient = ComposerClient;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../Controller.ts' />
///<reference path='../ComposerClient.ts' />
///<reference path='../IControllerActionContext.ts' />
///<reference path='../../Events/IEventInformation.ts' />
///<reference path='./ILocalizationProvider.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var LocalizationProvider = /** @class */ (function () {
            function LocalizationProvider() {
                this._localizationTree = {};
                if (LocalizationProvider._instance) {
                    throw new Error('Error: Instantiation failed: Use LocalizationProvider.instance() instead of new.');
                }
                LocalizationProvider._instance = this;
            }
            LocalizationProvider.instance = function () {
                return LocalizationProvider._instance;
            };
            /**
             * Boostrap the localization.
             *
             * This call is responsibly for refreshing all localization
             * to the current page culture
             */
            LocalizationProvider.prototype.initialize = function (composerContext) {
                this._composerContext = composerContext;
                var provider = this;
                var language = this._composerContext.language;
                return Composer.ComposerClient.get('/api/localization/' + language)
                    .then(function (result) {
                    var tree = result;
                    provider._localizationTree = tree;
                });
            };
            /**
             * Get a  localized string
             *
             * @param categoryName The category used to bundle this localization
             * @param keyName The exact key to localize
             * @return the localizedString or null if none found
            */
            LocalizationProvider.prototype.getLocalizedString = function (categoryName, keyName) {
                categoryName = (categoryName || '').toLowerCase();
                var tree = (this._localizationTree || {});
                var categories = (tree.LocalizedCategories || {});
                var category = (categories[categoryName] || {});
                var values = (category.LocalizedValues || {});
                var value = values[keyName];
                return value;
            };
            /*
             * Note: not really protected, this is a Typescript scoped method
             * called from the javascript scoped handlebars helper.
             */
            LocalizationProvider.prototype.handleBarsHelper_localize = function (categoryName, keyName) {
                var value = this.getLocalizedString(categoryName, keyName);
                if (_.isUndefined(value)) {
                    value = '[' + categoryName + '.' + keyName + ']';
                }
                return value;
            };
            /*
             * Note: not really protected, this is a Typescript scoped method
             * called from the javascript scoped handlebars helper.
             */
            LocalizationProvider.prototype.handleBarsHelper_localizeFormat = function (categoryName, keyName, options) {
                var value;
                var format = this.getLocalizedString(categoryName, keyName);
                if (_.isUndefined(format)) {
                    value = '[' + categoryName + '.' + keyName + ']';
                }
                else {
                    value = this.stringFormat(format, options);
                }
                return value;
            };
            /*
             * Note: not really protected, this is a Typescript scoped method
             * called from the javascript scoped handlebars helper.
             */
            LocalizationProvider.prototype.handleBarsHelper_isLocalized = function (categoryName, keyName) {
                var value = this.getLocalizedString(categoryName, keyName);
                if (_.isEmpty(value) || _.isUndefined(value)) {
                    return false;
                }
                return true;
            };
            /*
             * Substitute to String.Format in C#
             * This is a limited version to support numeric placeholders {0} without formatting
             */
            LocalizationProvider.prototype.stringFormat = function (format, options) {
                return format.replace(/\{\s*([^}\s]+)\s*\}/g, function (m, p1, offset, string) {
                    return options[p1] !== void 0 ? options[p1] : p1;
                });
            };
            LocalizationProvider._instance = new LocalizationProvider();
            return LocalizationProvider;
        }());
        Composer.LocalizationProvider = LocalizationProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../Typings/tsd.d.ts' />
///<reference path='./IComposerContext.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ComposerContext = /** @class */ (function () {
            function ComposerContext() {
                this.language = (function () {
                    return document.getElementsByTagName('html')[0].getAttribute('lang');
                })();
            }
            return ComposerContext;
        }());
        Composer.ComposerContext = ComposerContext;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='./ISubscription.ts' />
/// <reference path='./IListener.ts' />
/// <reference path='./IListenerQueue.ts' />
/// <reference path='./IEventInformation.ts' />
/// <reference path='./IEventHub.ts' />
/// <reference path='../Generics/Collections/IHashTable.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        /**
         * An event hub for subscribing to and publishing events.
        */
        var EventHub = /** @class */ (function () {
            function EventHub() {
                this._events = {};
                if (EventHub._instance) {
                    throw new Error('Error: Instantiation failed: Use EventHub.instance() instead of new.');
                }
                EventHub._instance = this;
            }
            EventHub.instance = function () {
                return EventHub._instance;
            };
            /**
             * Subscribe to an event.
             *
             * @param eventName The name of the event to subscribe to.
             * @param listener The listener subscribing to the event.
            */
            EventHub.prototype.subscribe = function (eventName, listener) {
                var _this = this;
                var index;
                if (!this._events.hasOwnProperty(eventName)) {
                    this._events[eventName] = { queue: [] };
                }
                index = this._events[eventName].queue.push(listener) - 1;
                return (function (topic, index) {
                    return {
                        remove: function () {
                            delete _this._events[eventName].queue[index];
                        }
                    };
                })(eventName, index);
            };
            /**
             * Publishes an event.
             *
             * @param eventName The name of the event to subscribe to.
             * @param eventInformation The information to provide all subscribers when the event is published.
            */
            EventHub.prototype.publish = function (eventName, eventInformation) {
                if (!this._events.hasOwnProperty(eventName)) {
                    return;
                }
                this._events[eventName].queue.forEach(function (listener) {
                    if (listener !== void 0) {
                        listener(eventInformation);
                    }
                });
            };
            EventHub._instance = new EventHub();
            return EventHub;
        }());
        Composer.EventHub = EventHub;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CookieUtils = /** @class */ (function () {
            function CookieUtils() {
            }
            CookieUtils.setCookie = function (name, val) {
                var date = new Date();
                var value = val;
                // Set it expire in 7 days
                date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
                // Set it
                document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
            };
            CookieUtils.getCookie = function (name) {
                var value = "; " + document.cookie;
                var parts = value.split("; " + name + "=");
                if (parts.length == 2) {
                    return parts.pop().split(";").shift();
                }
            };
            CookieUtils.deleteCookie = function (name) {
                var date = new Date();
                // Set it expire in -1 days
                date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
                // Set it
                document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
            };
            return CookieUtils;
        }());
        Composer.CookieUtils = CookieUtils;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../Typings/tsd.d.ts' />
///<reference path='./Mvc/ControllerRegistry.ts' />
///<reference path='./Mvc/ControllerFactory.ts' />
///<reference path='./Templating/IComposerTemplates.ts' />
///<reference path='./Templating/IComposerTemplates.ts' />
///<reference path='./Mvc/Localization/LocalizationProvider.ts' />
///<reference path='./Mvc/Localization/ILocalizationProvider.ts' />
///<reference path='./Validation/IParsleyValidator.ts' />
///<reference path='./ComposerContext.ts' />
///<reference path='./IComposerConfiguration.ts' />
///<reference path='./Mvc/IControllerConfiguration.ts' />
///<reference path='./Plugins/IPlugin.ts' />
///<reference path='./Events/EventHub.ts' />
///<reference path='./Utils/CookieUtils.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        function loadPlugins(plugins, window, document) {
            if (!_.isEmpty(plugins)) {
                plugins.forEach(function (rawPluginName) {
                    var pluginName = rawPluginName + "Plugin", plugin;
                    if (Orckestra.Composer.hasOwnProperty(pluginName) && _.isFunction(Orckestra.Composer[pluginName])) {
                        plugin = Object.create(Orckestra.Composer[pluginName]).prototype;
                        plugin.initialize(window, document);
                    }
                });
            }
        }
        function loadControllers(controllerRegistry, controllers) {
            if (!_.isEmpty(controllers)) {
                controllers.forEach(function (controllerConfiguration) {
                    controllerRegistry.register(controllerConfiguration.name, controllerConfiguration.controller);
                });
            }
        }
        function raiseLanguageSwitchEventIfNeeded(cacheProvider, eventHub) {
            var cacheKey = 'languageSwitchEvent';
            return cacheProvider.defaultCache.get(cacheKey).then(function (value) {
                eventHub.publish('languageSwitched', null);
                cacheProvider.defaultCache.clear(cacheKey);
            });
        }
        function setTimezoneOffsetCookie() {
            var timezoneoffset = Composer.CookieUtils.getCookie("timeZoneOffset");
            if (!timezoneoffset) {
                Composer.CookieUtils.setCookie("timeZoneOffset", new Date().getTimezoneOffset().toString());
            }
        }
        Composer.bootstrap = function (window, document, composerConfiguration) {
            var controllerRegistry = new Orckestra.Composer.ControllerRegistry(), controller, eventHub = Orckestra.Composer.EventHub.instance(), cacheProvider = Composer.CacheProvider.instance(), localizationProvider = Orckestra.Composer.LocalizationProvider.instance(), composerContext = new Composer.ComposerContext();
            // TODO: Need a better solution that <any>.
            Handlebars.partials = Orckestra.Composer.Templates;
            Handlebars.localizationProvider = localizationProvider;
            localizationProvider.initialize(composerContext).fail(function () {
                console.log('Failed to initialize the localization provider');
            }).then(function () {
                var blades = $('[data-oc-controller]'), controllers = [];
                loadPlugins(composerConfiguration.plugins, window, document);
                loadControllers(controllerRegistry, composerConfiguration.controllers);
                // Need a better query selector as this one is shit
                blades.each(function (index, item) {
                    var bladeName = item.getAttribute('data-oc-controller'), context;
                    if (controllerRegistry.isRegistered(bladeName)) {
                        context = {
                            container: $(item),
                            dataItemId: item.getAttribute('data-item-id'),
                            templateName: bladeName,
                            viewModel: JSON.parse(item.getAttribute('data-context') || window[item.getAttribute('data-context-var')] || '{}'),
                            window: window
                        };
                        controller = Orckestra.Composer.ControllerFactory.createController({
                            controllerName: bladeName,
                            context: context,
                            eventHub: eventHub,
                            composerContext: composerContext,
                            composerConfiguration: composerConfiguration
                        });
                        controller.initialize();
                        controllers.push(controller);
                    }
                });
                eventHub.publish('allControllersInitialized', null);
                raiseLanguageSwitchEventIfNeeded(cacheProvider, eventHub);
                /**
                 * This part of the code is mostly created to clean up dom events
                 * it was created to workaround a bug with IE8 that had memory leaks
                 * when a circular reference was made with a dom element (ie event + update of the dom element)
                 * see : http://com.hemiola.com/2009/11/23/memory-leaks-in-ie8/
                 * and : http://stackoverflow.com/questions/3083196/in-internet-explorer-why-does-memory-leak-stay-even-when-navigating-away-from
                 */
                $(window).on('beforeunload', function () {
                    controllers.forEach(function (controller) { return controller.dispose(); });
                });
                setTimezoneOffsetCookie();
            }).done();
        };
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var CacheError;
        (function (CacheError) {
            CacheError[CacheError["NotFound"] = 0] = "NotFound";
            CacheError[CacheError["Expired"] = 1] = "Expired";
        })(CacheError = Composer.CacheError || (Composer.CacheError = {}));
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./ICachePolicy.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../Storage/IStorage.ts' />
/// <reference path='../Storage/IStorageItem.ts' />
/// <reference path='./CacheError.ts' />
/// <reference path='./ICache.ts' />
/// <reference path='./ICacheItem.ts' />
/// <reference path='./ICachePolicy.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var NoExpirationPolicy = {};
        /**
         * This cache uses a client-side storage engine to provide object caching
         */
        var StorageBasedCache = /** @class */ (function () {
            function StorageBasedCache(storage, type) {
                var _this = this;
                if (!storage) {
                    throw new Error('The storage is required');
                }
                if (!type) {
                    throw new Error('The type is required');
                }
                this._type = type;
                this._storage = storage;
                this._storageInitializing =
                    storage.init().then(function () { return storage.initObjectStore(_this._type); });
            }
            StorageBasedCache.prototype.get = function (key) {
                var _this = this;
                if (!key) {
                    throw new Error('The key is required');
                }
                return this._storageInitializing
                    .then(function () { return _this._storage.get(_this._type, key); })
                    .then(function (cacheItem) { return _this.validate(key, cacheItem).then(function () { return cacheItem.value; }); });
            };
            StorageBasedCache.prototype.validate = function (key, item) {
                var _this = this;
                return Q.Promise(function (resolve, reject) {
                    if (_.isNull(item) || _.isNull(item.value)) {
                        reject(Composer.CacheError.NotFound);
                    }
                    else if (_this.isExpired(item)) {
                        _this._storageInitializing
                            .then(function () { return _this._storage.remove(_this._type, key); })
                            .done(function () { return reject(Composer.CacheError.Expired); }, function (reason) { return reject(reason); });
                    }
                    else {
                        item.lastAccessed = new Date().getTime();
                        var storageItem = {
                            id: key,
                            value: item
                        };
                        _this._storageInitializing
                            .then(function () { return _this._storage.set(_this._type, storageItem); })
                            .done(function () { return resolve(void 0); }, function (reason) { return reject(reason); });
                    }
                });
            };
            StorageBasedCache.prototype.isExpired = function (item) {
                var expirationTime, now = new Date().getTime();
                if (item.policy && item.policy.absoluteExpiration) {
                    expirationTime = item.policy.absoluteExpiration;
                }
                else if (item.policy && item.policy.slidingExpiration) {
                    expirationTime = item.lastAccessed + (item.policy.slidingExpiration * 1000);
                }
                else {
                    return false;
                }
                return expirationTime < now;
            };
            StorageBasedCache.prototype.set = function (key, value, policy, type) {
                var _this = this;
                if (!key) {
                    throw new Error('The key is required');
                }
                var typeItem = !type ? this._type : type;
                var cacheItem = {
                    value: value,
                    policy: !policy ? NoExpirationPolicy : policy,
                    lastAccessed: new Date().getTime()
                };
                var storageItem = {
                    id: key,
                    value: cacheItem
                };
                return this._storageInitializing
                    .then(function () { return _this._storage.set(typeItem, storageItem); })
                    .then(function () { return value; });
            };
            StorageBasedCache.prototype.clear = function (key) {
                var _this = this;
                if (!key) {
                    throw new Error('The key is required');
                }
                return this._storageInitializing
                    .then(function () { return _this._storage.remove(_this._type, key); });
            };
            StorageBasedCache.prototype.fullClear = function () {
                var _this = this;
                return this._storageInitializing
                    .then(function () { return _this._storage.fullRemove(_this._type); });
            };
            return StorageBasedCache;
        }());
        Composer.StorageBasedCache = StorageBasedCache;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./IStorage.ts' />
/// <reference path='./IStorageItem.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var BackingStorage = /** @class */ (function () {
            function BackingStorage(_storage) {
                this._storage = _storage;
                this._isInitialized = false;
                this._initializedObjectStores = {};
            }
            BackingStorage.prototype.init = function () {
                var _this = this;
                return Q.fcall(function () {
                    _this._isInitialized = true;
                });
            };
            BackingStorage.prototype.initObjectStore = function (type) {
                var _this = this;
                if (!type) {
                    throw new Error('The type is required');
                }
                return Q.fcall(function () {
                    if (!_this._isInitialized) {
                        throw new Error('The local storage has not been initialized');
                    }
                    _this.initObjectStoreImpl(type);
                });
            };
            BackingStorage.prototype.initObjectStoreImpl = function (type) {
                var objectStore = this.getObjectStore(type);
                if (!objectStore) {
                    objectStore = {};
                    this.setObjectStore(type, objectStore);
                }
                this._initializedObjectStores[type] = true;
            };
            BackingStorage.prototype.get = function (type, id) {
                var _this = this;
                if (!type) {
                    throw new Error('The type is required');
                }
                if (!id) {
                    throw new Error('The id is required');
                }
                return Q.fcall(function () {
                    if (!_this._isInitialized) {
                        throw new Error('The local storage has not been initialized');
                    }
                    if (!_this._initializedObjectStores[type]) {
                        throw new Error('The object store ' + type + ' has not been initialized');
                    }
                    return _this.getImpl(type, id);
                });
            };
            BackingStorage.prototype.getImpl = function (type, id) {
                var objectStore = this.getObjectStore(type);
                if (objectStore.hasOwnProperty(id)) {
                    return objectStore[id];
                }
                return null;
            };
            BackingStorage.prototype.remove = function (type, id) {
                var _this = this;
                if (!type) {
                    throw new Error('The type is required');
                }
                if (!id) {
                    throw new Error('The id is required');
                }
                return Q.fcall(function () {
                    if (!_this._isInitialized) {
                        throw new Error('The local storage has not been initialized');
                    }
                    if (!_this._initializedObjectStores[type]) {
                        throw new Error('The object store ' + type + ' has not been initialized');
                    }
                    _this.removeImpl(type, id);
                });
            };
            BackingStorage.prototype.fullRemove = function (type) {
                var _this = this;
                if (!type) {
                    throw new Error('The type is required');
                }
                return Q.fcall(function () {
                    if (!_this._isInitialized) {
                        throw new Error('The local storage has not been initialized');
                    }
                    if (!_this._initializedObjectStores[type]) {
                        throw new Error('The object store ' + type + ' has not been initialized');
                    }
                    _this.fullRemoveImpl(type);
                });
            };
            BackingStorage.prototype.removeImpl = function (type, id) {
                var objectStore = this.getObjectStore(type);
                if (objectStore.hasOwnProperty(id)) {
                    delete objectStore[id];
                    this.setObjectStore(type, objectStore);
                }
            };
            BackingStorage.prototype.fullRemoveImpl = function (type) {
                this.setObjectStore(type, null);
            };
            BackingStorage.prototype.set = function (type, item) {
                var _this = this;
                if (!type) {
                    throw new Error('The type is required');
                }
                if (!item) {
                    throw new Error('The item is required');
                }
                if (!item.id) {
                    throw new Error('The item id is required');
                }
                return Q.fcall(function () {
                    if (!_this._isInitialized) {
                        throw new Error('The local storage has not been initialized');
                    }
                    if (!_this._initializedObjectStores[type]) {
                        throw new Error('The object store ' + type + ' has not been initialized');
                    }
                    _this.setImpl(type, item);
                });
            };
            BackingStorage.prototype.setImpl = function (type, item) {
                var objectStore = this.getObjectStore(type);
                objectStore[item.id] = item.value;
                this.setObjectStore(type, objectStore);
            };
            BackingStorage.prototype.getObjectStore = function (type) {
                var objectStoreString = this._storage.getItem(type);
                var objectStore = JSON.parse(objectStoreString);
                return objectStore;
            };
            BackingStorage.prototype.setObjectStore = function (type, objectStore) {
                var objectStoreString = JSON.stringify(objectStore);
                this._storage.setItem(type, objectStoreString);
            };
            return BackingStorage;
        }());
        Composer.BackingStorage = BackingStorage;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var StorageType;
        (function (StorageType) {
            StorageType[StorageType["localStorage"] = 0] = "localStorage";
            StorageType[StorageType["sessionStorage"] = 1] = "sessionStorage";
        })(StorageType = Composer.StorageType || (Composer.StorageType = {}));
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./StorageType.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var localStoragePolyFill;
        var sessionStoragePolyFill;
        var StoragePolyfill = /** @class */ (function () {
            function StoragePolyfill() {
            }
            StoragePolyfill.create = function (windowHandle, storageType) {
                var lastStorage, lastStorageKey, storagePolyFill;
                if (storageType === void 0) {
                    throw {
                        name: 'StoragePolyfillException',
                        message: "A storage type must be specified in the storage polyfill create method."
                    };
                }
                switch (storageType) {
                    case Composer.StorageType.localStorage:
                        storagePolyFill = localStoragePolyFill;
                        break;
                    case Composer.StorageType.sessionStorage:
                        storagePolyFill = sessionStoragePolyFill;
                        break;
                }
                if (storagePolyFill !== void 0) {
                    return storagePolyFill;
                }
                function persist(storage) {
                    windowHandle.name = JSON.stringify(storage);
                }
                function getStorageKey(key) {
                    return key.concat(storageType.toString());
                }
                function getStorageApi() {
                    return {
                        clear: function () {
                            var key;
                            Object.keys(storagePolyFill).forEach(function (key) {
                                if (storagePolyFill.hasOwnProperty(key)) {
                                    delete storagePolyFill[key];
                                }
                            });
                            persist(storagePolyFill);
                        },
                        getItem: function (key) {
                            key = getStorageKey(key);
                            return storagePolyFill[key] || null;
                        },
                        key: function (index) {
                            var keys = null;
                            keys = Object.keys(storagePolyFill).filter(function (value, indexToMatch) { return indexToMatch === index; });
                            return keys.length > 0 ? keys[0] : null;
                        },
                        removeItem: function (key) {
                            key = getStorageKey(key);
                            if (key in storagePolyFill && storagePolyFill.hasOwnProperty(key)) {
                                delete storagePolyFill[key];
                                persist(storagePolyFill);
                            }
                        },
                        setItem: function (key, data) {
                            key = getStorageKey(key);
                            storagePolyFill[key] = data;
                            persist(storagePolyFill);
                        },
                        dispose: function () {
                            persist(storagePolyFill);
                        }
                    };
                }
                storagePolyFill = Object.create(getStorageApi());
                if (windowHandle.name !== '') {
                    lastStorage = JSON.parse(windowHandle.name);
                    for (lastStorageKey in lastStorage) {
                        if (lastStorage.hasOwnProperty(lastStorageKey)) {
                            storagePolyFill[lastStorageKey] = lastStorage[lastStorageKey];
                        }
                    }
                }
                switch (storageType) {
                    case Composer.StorageType.localStorage:
                        localStoragePolyFill = storagePolyFill;
                        return localStoragePolyFill;
                    case Composer.StorageType.sessionStorage:
                        sessionStoragePolyFill = storagePolyFill;
                        return sessionStoragePolyFill;
                }
            };
            return StoragePolyfill;
        }());
        Composer.StoragePolyfill = StoragePolyfill;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./StoragePolyFill.ts' />
///<reference path='./StorageType.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        //We need to defer the evaluation of the storage since on google chrome / incognito mode,
        //it raise a security error exception / access denied
        function getStorage(storageCallback, storageType, window) {
            var dummyData = '__composer__data__bidon__';
            try {
                var storageToUse = storageCallback();
                if (storageToUse !== void 0) {
                    //Hack to support safari browser / anonymous mode since it support local storage but with a max size of 0kb,
                    //thus we try to insert dummy data to check if it break or not.
                    storageToUse.setItem(dummyData, dummyData);
                    storageToUse.removeItem(dummyData);
                    return storageToUse;
                }
            }
            catch (e) {
                console.log('Storage is not supported or is disabled. window.name will be used instead.');
            }
            return Composer.StoragePolyfill.create(window, storageType);
        }
        Composer.StorageFactory = {
            create: function (storageType, window) {
                switch (storageType) {
                    case Composer.StorageType.localStorage:
                        return getStorage(function () { return window.localStorage; }, storageType, window);
                    case Composer.StorageType.sessionStorage:
                        return getStorage(function () { return window.sessionStorage; }, storageType, window);
                    default:
                        throw {
                            name: 'StorageTypeException',
                            message: "The storage type \"" + storageType + "\" is currently not supported."
                        };
                }
            }
        };
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
///<reference path='./ICache.ts' />
///<reference path='./ICacheProvider.ts' />
///<reference path='./StorageBasedCache.ts' />
///<reference path='../Storage/IStorage.ts' />
///<reference path='../Storage/BackingStorage.ts' />
/// <reference path='../Storage/StorageFactory.ts' />
/// <reference path='../Storage/StorageType.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var CacheProvider = /** @class */ (function () {
            function CacheProvider() {
                this.window = window;
                if (CacheProvider._instance) {
                    throw new Error('Error: Instantiation failed: Use CacheProvider.instance() instead of new.');
                }
                this.defaultCache = this.getDefaultCache();
                this.sessionCache = this.getSessionCache();
                this.localStorage = this.getLocalStorage();
                this.sessionStorage = this.getSessionStorage();
                CacheProvider._instance = this;
            }
            CacheProvider.instance = function () {
                return CacheProvider._instance;
            };
            CacheProvider.prototype.getCache = function (cacheKey) {
                var backingStorage = this.getLocalStorage();
                return new Composer.StorageBasedCache(new Composer.BackingStorage(backingStorage), cacheKey);
            };
            CacheProvider.prototype.getDefaultCache = function () {
                return this.getCache(CacheProvider.defaultCacheKey);
            };
            CacheProvider.prototype.getSessionCache = function () {
                var backingStorage = this.getSessionStorage();
                return new Composer.StorageBasedCache(new Composer.BackingStorage(backingStorage), CacheProvider.sessionCacheKey);
            };
            CacheProvider.prototype.getLocalStorage = function () {
                return Composer.StorageFactory.create(Composer.StorageType.localStorage, window);
            };
            CacheProvider.prototype.getSessionStorage = function () {
                return Composer.StorageFactory.create(Composer.StorageType.sessionStorage, window);
            };
            CacheProvider.defaultCacheKey = 'oc-cache';
            CacheProvider.sessionCacheKey = 'oc-cache-session';
            CacheProvider._instance = new CacheProvider();
            return CacheProvider;
        }());
        Composer.CacheProvider = CacheProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../Mvc/ComposerClient.ts' />
/// <reference path='./ISearchRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SearchRepository = /** @class */ (function () {
            function SearchRepository() {
            }
            SearchRepository.prototype.getFacets = function (QueryString) {
                return Composer.ComposerClient.post('/api/search/getfacets', { QueryString: QueryString });
            };
            SearchRepository.prototype.getCategoryFacets = function (CategoryId, QueryString) {
                return Composer.ComposerClient.post('/api/search/getcategoryfacets', { QueryString: QueryString, CategoryId: CategoryId });
            };
            SearchRepository.prototype.getQueryFacets = function (QueryName, QueryType, QueryString) {
                return Composer.ComposerClient.post('/api/searchquery/getqueryfacets', { QueryString: QueryString, QueryName: QueryName, QueryType: QueryType });
            };
            SearchRepository.prototype.getSearchResults = function (QueryString, CategoryId) {
                return Composer.ComposerClient.post('/api/search/search', { QueryString: QueryString, CategoryId: CategoryId });
            };
            SearchRepository.prototype.getQuerySearchResults = function (QueryString, QueryName, QueryType) {
                return Composer.ComposerClient.post('/api/searchquery/search', { QueryString: QueryString, QueryName: QueryName, QueryType: QueryType });
            };
            SearchRepository.prototype.getContentSearchResults = function (QueryString, CurrentTabPathInfo, IsCurrentSiteOnly) {
                return Composer.ComposerClient.post('/api/contentsearch/search', { QueryString: QueryString, CurrentTabPathInfo: CurrentTabPathInfo, IsCurrentSiteOnly: IsCurrentSiteOnly });
            };
            return SearchRepository;
        }());
        Composer.SearchRepository = SearchRepository;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var PAGE_PARAM = 'page';
        var SORT_BY_PARAM = 'sortBy';
        var SORT_DIRECTION_PARAM = 'sortDirection';
        var KEYWORDS_PARAM = 'keywords';
        var SearchParams = /** @class */ (function () {
            function SearchParams() {
            }
            SearchParams.getSearchParams = function () {
                return new URLSearchParams(window.location.search);
            };
            SearchParams.getSearchQuery = function (params) {
                return '?' + params.toString();
            };
            SearchParams.currentPage = function () {
                var params = this.getSearchParams();
                return parseInt(params.get(PAGE_PARAM)) || 1;
            };
            SearchParams.getKeyword = function () {
                var params = this.getSearchParams();
                return params.get(KEYWORDS_PARAM);
            };
            SearchParams.toPage = function (page) {
                var params = this.getSearchParams();
                params.set(PAGE_PARAM, page);
                return this.getSearchQuery(params);
            };
            SearchParams.nextPage = function () {
                var params = this.getSearchParams();
                var page = parseInt(params.get(PAGE_PARAM)) || 1;
                page += 1;
                params.set(PAGE_PARAM, page.toString());
                return this.getSearchQuery(params);
            };
            SearchParams.previousPage = function () {
                var params = this.getSearchParams();
                var page = parseInt(params.get(PAGE_PARAM)) || 1;
                if (page > 1)
                    page -= 1;
                params.set(PAGE_PARAM, page.toString());
                return this.getSearchQuery(params);
            };
            SearchParams.changeSorting = function (sortBy, sortDirection) {
                var params = this.getSearchParams();
                params.set(SORT_BY_PARAM, sortBy);
                params.set(SORT_DIRECTION_PARAM, sortDirection);
                return this.getSearchQuery(params);
            };
            SearchParams.changeFacet = function (key, value) {
                var params = this.getSearchParams();
                value ? params.set(key, 'on') : params.delete(key);
                return this.getSearchQuery(params);
            };
            SearchParams.getLastSegment = function () {
                return window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
            };
            SearchParams.pushState = function (query) {
                window.history.pushState(window.history.state, "", window.location.pathname + query);
            };
            return SearchParams;
        }());
        Composer.SearchParams = SearchParams;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ContentSearchEvents;
        (function (ContentSearchEvents) {
            ContentSearchEvents["SearchResultsLoaded"] = "ContentSearchResultsLoaded";
        })(ContentSearchEvents = Composer.ContentSearchEvents || (Composer.ContentSearchEvents = {}));
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../Mvc/Controller.ts' />
///<reference path='../Repositories/ISearchRepository.ts' />
///<reference path='../Repositories/SearchRepository.ts' />
/// <reference path='./SearchParams.ts' />
/// <reference path='./Constants/ContentSearchEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var VisibleFacetsCount = 5;
        var ContentFacetSearchController = /** @class */ (function (_super) {
            __extends(ContentFacetSearchController, _super);
            function ContentFacetSearchController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.searchRepository = new Composer.SearchRepository();
                return _this;
            }
            ContentFacetSearchController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeVueComponent();
            };
            ContentFacetSearchController.prototype.initializeVueComponent = function () {
                var _a = this.context.viewModel, Facets = _a.Facets, SelectedFacets = _a.SelectedFacets;
                var currentSite = this.context.container.data('current-site') === 'True';
                var self = this;
                this.VueFacets = new Vue({
                    el: '#vueContentSearchFacets',
                    components: {},
                    data: {
                        Mode: {
                            Loading: false
                        },
                        SelectedFacets: null,
                        Facets: null
                    },
                    mounted: function () {
                        var selectedFacets = self.formatSelectedFacets(SelectedFacets);
                        this.SelectedFacets = selectedFacets;
                        this.Facets = self.formatFacets(Facets, selectedFacets);
                        self.eventHub.subscribe(Composer.ContentSearchEvents.SearchResultsLoaded, this.onSearchResultsLoaded);
                    },
                    methods: {
                        onFacetToggle: function (event, key) {
                            var queryString = Composer.SearchParams.changeFacet(key, event.target.checked);
                            this.loadSearchResults({ queryString: queryString });
                        },
                        removeSelectedFacet: function (key) {
                            var queryString = Composer.SearchParams.changeFacet(key, false);
                            this.loadSearchResults({ queryString: queryString });
                        },
                        loadSearchResults: function (_a) {
                            var _this = this;
                            var queryString = _a.queryString;
                            Composer.SearchParams.pushState(queryString);
                            var currentTab = Composer.SearchParams.getLastSegment();
                            this.Mode.isLoading = true;
                            self.searchRepository.getContentSearchResults(queryString, currentTab, currentSite).then(function (result) {
                                _this.Mode.isLoading = false;
                                self.eventHub.publish(Composer.ContentSearchEvents.SearchResultsLoaded, { data: result });
                            });
                        },
                        onSearchResultsLoaded: function (_a) {
                            var data = _a.data;
                            var Facets = data.Facets, SelectedFacets = data.SelectedFacets;
                            var selectedFacets = self.formatSelectedFacets(SelectedFacets);
                            this.SelectedFacets = selectedFacets;
                            this.Facets = self.formatFacets(Facets, selectedFacets);
                        }
                    }
                });
            };
            ContentFacetSearchController.prototype.formatSelectedFacets = function (selectedFacets) {
                return (selectedFacets || []).reduce(function (accum, item) { return accum.concat(item.Hits); }, []);
            };
            ContentFacetSearchController.prototype.formatFacets = function (facets, selectedFacets) {
                return facets.map(function (facet) {
                    var hits = facet.Hits.map(function (hit) { return (__assign({}, hit, { isSelected: selectedFacets.some(function (x) { return x.Key === hit.Key; }) })); });
                    return __assign({}, facet, { visibleFacets: hits.slice(0, VisibleFacetsCount), hiddenFacets: hits.slice(VisibleFacetsCount) });
                });
            };
            return ContentFacetSearchController;
        }(Orckestra.Composer.Controller));
        Composer.ContentFacetSearchController = ContentFacetSearchController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        Composer.urlHelper = {
            getURLParameter: function (url, name) {
                return decodeURIComponent((new RegExp('[?|&]' + name
                    + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || null;
            }
        };
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var Utils = /** @class */ (function () {
            function Utils() {
            }
            /**
            * Scroll the screen to the specified element
            * @param element The element to scroll to
            * @param offsetDiff the different applied to the top offset position of the element
            */
            Utils.scrollToElement = function (element, offsetDiff) {
                if (offsetDiff === void 0) { offsetDiff = 100; }
                if (!_.isUndefined(element) && element.length > 0) {
                    $('html, body').animate({
                        scrollTop: $(element).offset().top - offsetDiff
                    }, 10);
                }
            };
            /**
             * Get current website id
             */
            Utils.getWebsiteId = function () {
                return $('html').data('website');
            };
            Utils.getCulture = function () {
                return $('html').attr('lang');
            };
            Utils.IsC1ConsolePreview = function () {
                return $('html').data('console-preview') === 'True';
            };
            return Utils;
        }());
        Composer.Utils = Utils;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Mvc/IControllerContext.ts' />
///<reference path='../../../Mvc/ComposerClient.ts' />
///<reference path='./IShowFacetsService.ts' />
///<reference path='../../../Utils/Utils.ts' />
///<reference path='../../../Cache/CacheProvider.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ShowFacetsService = /** @class */ (function () {
            function ShowFacetsService() {
                this.cacheShowFacetKey = "showfacet_" + Composer.Utils.getWebsiteId();
                this.cacheProvider = Composer.CacheProvider.instance();
                this.cachePolicy = { slidingExpiration: 300 }; // 5min
            }
            ShowFacetsService.instance = function () {
                return ShowFacetsService._instance;
            };
            ShowFacetsService.prototype.setShowFacets = function (show) {
                return this.cacheProvider.sessionCache.set(this.cacheShowFacetKey, show);
            };
            ShowFacetsService.prototype.getShowFacets = function () {
                return this.cacheProvider.sessionCache.get(this.cacheShowFacetKey);
            };
            ShowFacetsService.prototype.clearShowFacets = function () {
                return this.cacheProvider.sessionCache.clear(this.cacheShowFacetKey);
            };
            ShowFacetsService._instance = new ShowFacetsService();
            return ShowFacetsService;
        }());
        Composer.ShowFacetsService = ShowFacetsService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../../Typings/vue/index.d.ts' />
/// <reference path='../Repositories/ISearchRepository.ts' />
/// <reference path='../Repositories/SearchRepository.ts' />
/// <reference path='../Utils/UrlHelper.ts' />
/// <reference path='./SearchParams.ts' />
/// <reference path='./Constants/ContentSearchEvents.ts' />
/// <reference path='../Composer.Product/ProductSearch/Services/ShowFacetsService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ContentSearchResultsController = /** @class */ (function (_super) {
            __extends(ContentSearchResultsController, _super);
            function ContentSearchResultsController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.showFacetsService = Composer.ShowFacetsService.instance();
                _this.searchRepository = new Composer.SearchRepository();
                return _this;
            }
            ContentSearchResultsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var _a = this.context.viewModel, SearchResults = _a.SearchResults, PagesCount = _a.PagesCount, Total = _a.Total;
                var SelectedSortBy = this.context.container.data('selected-sort');
                var AvailableSortBys = this.context.container.data('available-sort');
                var itemsCount = this.context.container.data('items-count');
                var currentSite = this.context.container.data('current-site') === 'True';
                this.sendContentSearchResultsForAnalytics(Total);
                var self = this;
                this.vueSearchResults = new Vue({
                    el: "#" + this.context.container.data('vueid'),
                    components: {},
                    data: {
                        SearchResults: SearchResults && SearchResults.slice(0, itemsCount),
                        TotalCount: Total,
                        SelectedSortBy: SelectedSortBy,
                        AvailableSortBys: AvailableSortBys,
                        FacetsVisible: true,
                        Pagination: {
                            PagesCount: 1,
                            CurrentPage: 1,
                            PreviousPage: false,
                            NextPage: false,
                        },
                        isLoading: false
                    },
                    mounted: function () {
                        var _this = this;
                        this.Pagination = this.getPagination(PagesCount);
                        self.eventHub.subscribe(Composer.ContentSearchEvents.SearchResultsLoaded, this.onSearchResultsLoaded);
                        self.showFacetsService.getShowFacets().then(function (value) {
                            _this.FacetsVisible = value;
                            if (!value)
                                _this.hideFacet(true); // as an intial setup we hide the facet and ask for an update to be made  
                        }, function (error) {
                            self.showFacetsService.setShowFacets(true);
                        });
                    },
                    computed: {},
                    updated: function () {
                        this.updateProductColumns();
                    },
                    methods: {
                        hideFacet: function (update) {
                            if (update === void 0) { update = false; }
                            document.getElementById("leftCol").classList.add("w-0-lg");
                            document.getElementById("rightCol").classList.remove("col-lg-9");
                            if (update)
                                this.FacetsVisible = false; // setting this will trigger the "updated" function above only if requested
                        },
                        showFacet: function () {
                            document.getElementById("leftCol").classList.remove("w-0-lg");
                            document.getElementById("rightCol").classList.add("col-lg-9");
                        },
                        toggleFacet: function () {
                            if (this.FacetsVisible) {
                                this.hideFacet();
                            }
                            else {
                                this.showFacet();
                            }
                            this.FacetsVisible = !this.FacetsVisible; // setting this will trigger the "updated" function above
                            self.showFacetsService.setShowFacets(this.FacetsVisible);
                        },
                        updateProductColumns: function () {
                            if (document.getElementById('vueContentSearchFacets') === null)
                                return;
                            var productColContainer = document.getElementsByClassName("product-col-container");
                            if (this.FacetsVisible) {
                                for (var i = 0; i < productColContainer.length; i++) {
                                    productColContainer[i].classList.replace("col-sm-3", "col-sm-4");
                                }
                            }
                            else {
                                for (var i = 0; i < productColContainer.length; i++) {
                                    productColContainer[i].classList.replace("col-sm-4", "col-sm-3");
                                }
                            }
                        },
                        getPagination: function (count) {
                            var currentPage = Composer.SearchParams.currentPage();
                            return ({
                                PagesCount: count,
                                CurrentPage: currentPage,
                                PreviousPage: currentPage > 1,
                                NextPage: currentPage < count
                            });
                        },
                        previousPage: function () {
                            var queryString = Composer.SearchParams.previousPage();
                            this.loadSearchResults({ queryString: queryString });
                        },
                        nextPage: function () {
                            var queryString = Composer.SearchParams.nextPage();
                            this.loadSearchResults({ queryString: queryString });
                        },
                        toPage: function (page) {
                            var queryString = Composer.SearchParams.toPage(page);
                            this.loadSearchResults({ queryString: queryString });
                        },
                        sortingChanged: function (sortBy, sortOrder) {
                            var queryString = Composer.SearchParams.changeSorting(sortBy, sortOrder);
                            this.loadSearchResults({ queryString: queryString });
                        },
                        loadSearchResults: function (_a) {
                            var _this = this;
                            var queryString = _a.queryString;
                            Composer.SearchParams.pushState(queryString);
                            var currentTab = Composer.SearchParams.getLastSegment();
                            this.isLoading = true;
                            self.searchRepository.getContentSearchResults(queryString, currentTab, currentSite).then(function (result) {
                                _this.isLoading = false;
                                self.eventHub.publish(Composer.ContentSearchEvents.SearchResultsLoaded, { data: result });
                            });
                        },
                        onSearchResultsLoaded: function (_a) {
                            var data = _a.data;
                            var _b = data.ActiveTab, SearchResults = _b.SearchResults, PagesCount = _b.PagesCount, Total = _b.Total;
                            this.Pagination = this.getPagination(PagesCount);
                            this.SearchResults = SearchResults.slice();
                            this.TotalCount = Total;
                            this.SelectedSortBy = data.SelectedSortBy;
                            self.sendContentSearchResultsForAnalytics(Total);
                        }
                    }
                });
            };
            ContentSearchResultsController.prototype.sendContentSearchResultsForAnalytics = function (totalCount) {
                var data = {
                    Keywords: Composer.SearchParams.getKeyword(),
                    TotalCount: totalCount,
                    CurrentTab: Composer.SearchParams.getLastSegment()
                };
                this.eventHub.publish('contentSearchResultRendered', { data: data });
            };
            return ContentSearchResultsController;
        }(Orckestra.Composer.Controller));
        Composer.ContentSearchResultsController = ContentSearchResultsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ProductEvents;
        (function (ProductEvents) {
            ProductEvents["LineItemAdding"] = "lineItemAdding";
            ProductEvents["LineItemRemoving"] = "lineItemRemoving";
            ProductEvents["LineItemAdded"] = "lineItemAddedToCart";
            ProductEvents["LineItemUpdated"] = "lineItemUpdated";
            ProductEvents["WishListUpdating"] = "wishListUpdating";
            ProductEvents["WishListUpdated"] = "wishListUpdated";
            ProductEvents["ProductClick"] = "productClick";
        })(ProductEvents = Composer.ProductEvents || (Composer.ProductEvents = {}));
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./IError.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./IError.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./IErrorCollection.ts' />
/// <reference path='./IError.ts' />
/// <reference path='./IErrorHandler.ts' />
/// <reference path='../Mvc/Localization/LocalizationProvider.ts' />
/// <reference path='../Events/EventHub.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ErrorHandler = /** @class */ (function () {
            function ErrorHandler() {
            }
            ErrorHandler.instance = function () {
                var instance = new ErrorHandler();
                var memoize = function () { return instance; };
                ErrorHandler.instance = memoize;
                return memoize();
            };
            /**
             * Will output the error to the user.
             * @param {IError} error Error to display.
             */
            ErrorHandler.prototype.outputError = function (error) {
                this.publishGenericErrorEvent(error);
            };
            /**
             * Will localize an error based on its code and will display it
             * to the user.
             * @param {string} errorCode Error code to localize.
             */
            ErrorHandler.prototype.outputErrorFromCode = function (errorCode) {
                var error = this.createErrorFromCode(errorCode);
                this.publishGenericErrorEvent(error);
            };
            ErrorHandler.prototype.createErrorFromCode = function (errorCode) {
                var localization = Composer.LocalizationProvider.instance().getLocalizedString('Errors', "L_" + errorCode);
                var error = {
                    ErrorCode: errorCode,
                    LocalizedErrorMessage: localization
                };
                return error;
            };
            /**
             * Removes all errors from the current page.
             */
            ErrorHandler.prototype.removeErrors = function () {
                this.publishGenericErrorEvent();
            };
            ErrorHandler.prototype.publishGenericErrorEvent = function (error) {
                var errorColl = this.createErrorCollection(error);
                Composer.EventHub.instance().publish('GeneralErrorOccured', {
                    data: errorColl
                });
            };
            ErrorHandler.prototype.createErrorCollection = function (error) {
                var errorCollection = {
                    Errors: []
                };
                if (error) {
                    errorCollection.Errors.push(error);
                }
                return errorCollection;
            };
            return ErrorHandler;
        }());
        Composer.ErrorHandler = ErrorHandler;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Mvc/Controller.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Mvc/ComposerClient.ts' />
///<reference path='../Events/EventHub.ts' />
///<reference path='./IMembershipRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var MembershipRepository = /** @class */ (function () {
            function MembershipRepository() {
            }
            /**
            * Attempt to Log In using Composer API.
            * @param
            */
            MembershipRepository.prototype.login = function (formData, returnUrl) {
                var data = _.extend({ ReturnUrl: returnUrl }, formData);
                return Composer.ComposerClient.post('/api/membership/login', data);
            };
            /**
            * Logout using Composer API.
            * @param
            */
            MembershipRepository.prototype.logout = function (returnUrl, preserveCustomerInfo) {
                if (returnUrl === void 0) { returnUrl = ''; }
                if (preserveCustomerInfo === void 0) { preserveCustomerInfo = false; }
                var data = {
                    ReturnUrl: returnUrl,
                    PreserveCustomerInfo: preserveCustomerInfo
                };
                return Composer.ComposerClient.post('/api/membership/logout', data);
            };
            /**
            * Attempt to register using Composer API.
            * @param
            */
            MembershipRepository.prototype.register = function (formData, returnUrl) {
                var data = _.extend({ ReturnUrl: returnUrl }, formData);
                return Composer.ComposerClient.post('/api/membership/register', data);
            };
            /**
            * Attempt to trigger the forgot password email using Composer API.
            * @param
            */
            MembershipRepository.prototype.forgotPassword = function (formData) {
                var data = _.extend({}, formData);
                return Composer.ComposerClient.post('/api/membership/forgotpassword', data);
            };
            /**
            * Attempt to reset password for the Customer identified by the ticket using Composer API.
            * @param
            */
            MembershipRepository.prototype.resetPassword = function (formData, ticket, returnUrl) {
                var data = _.extend({ ReturnUrl: returnUrl, ticket: ticket }, formData);
                return Composer.ComposerClient.post('/api/membership/resetpassword', data);
            };
            /**
            * Attempt to change the password for the connected Customer using Composer API.
            * @param
            */
            MembershipRepository.prototype.changePassword = function (formData, returnUrl) {
                var data = _.extend({ ReturnUrl: returnUrl }, formData);
                return Composer.ComposerClient.post('/api/membership/changepassword', data);
            };
            /**
             * If the current user is authenticated or not
             */
            MembershipRepository.prototype.isAuthenticated = function () {
                return Composer.ComposerClient.get('/api/membership/isAuthenticated');
            };
            /**
            * If user with this username exist
            */
            MembershipRepository.prototype.isUserExist = function (email) {
                return Composer.ComposerClient.get('/api/membership/isExist?email=' + email);
            };
            /**
            * Get user meta data to dispay status/name andurls
            */
            MembershipRepository.prototype.userMetadata = function () {
                return Composer.ComposerClient.get('/api/membership/usermetadata');
            };
            return MembershipRepository;
        }());
        Composer.MembershipRepository = MembershipRepository;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Repositories/MembershipRepository.ts' />
///<reference path='./IMembershipService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var MembershipService = /** @class */ (function () {
            function MembershipService(membershipRepository) {
                if (!membershipRepository) {
                    throw new Error('Error: membershipRepository is required');
                }
                this.membershipRepository = membershipRepository;
            }
            /**
            * Attempt to Log In using Composer API.
            * @param
            */
            MembershipService.prototype.login = function (formData, returnUrl) {
                return this.membershipRepository.login(formData, returnUrl);
            };
            /**
            * Logout using Composer API.
            * @param
            */
            MembershipService.prototype.logout = function (returnUrl, preserveCustomerInfo) {
                if (returnUrl === void 0) { returnUrl = ''; }
                if (preserveCustomerInfo === void 0) { preserveCustomerInfo = false; }
                return this.membershipRepository.logout(returnUrl, preserveCustomerInfo);
            };
            /**
            * Attempt to register using Composer API.
            * @param
            */
            MembershipService.prototype.register = function (formData, returnUrl) {
                return this.membershipRepository.register(formData, returnUrl);
            };
            /**
            * Attempt to trigger the forgot password email using Composer API.
            * @param
            */
            MembershipService.prototype.forgotPassword = function (formData) {
                return this.membershipRepository.forgotPassword(formData);
            };
            /**
            * Attempt to reset password for the Customer identified by the ticket using Composer API.
            * @param
            */
            MembershipService.prototype.resetPassword = function (formData, ticket, returnUrl) {
                return this.membershipRepository.resetPassword(formData, ticket, returnUrl);
            };
            /**
            * Attempt to change the password for the connected Customer using Composer API.
            * @param
            */
            MembershipService.prototype.changePassword = function (formData, returnUrl) {
                return this.membershipRepository.changePassword(formData, returnUrl);
            };
            /**
             * If the current user is authenticated or not
             */
            MembershipService.prototype.isAuthenticated = function () {
                var _this = this;
                if (_.isUndefined(this.memoizeIsAuthenticated)) {
                    this.memoizeIsAuthenticated = _.memoize(function (arg) { return _this.isAuthenticatedImpl(); });
                }
                return this.memoizeIsAuthenticated();
            };
            /**
             * If the current user is authenticated or not
             */
            MembershipService.prototype.isAuthenticatedImpl = function () {
                return this.membershipRepository.isAuthenticated();
            };
            /**
            * If user with this username exist
            */
            MembershipService.prototype.isUserExist = function (email) {
                return this.membershipRepository.isUserExist(email);
            };
            return MembershipService;
        }());
        Composer.MembershipService = MembershipService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../Mvc/ComposerClient.ts' />
/// <reference path='./ICartRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CartRepository = /** @class */ (function () {
            function CartRepository() {
            }
            CartRepository.prototype.getCart = function () {
                return Composer.ComposerClient.get('/api/cart/getcart');
            };
            CartRepository.prototype.addLineItem = function (productId, variantId, quantity, recurringOrderFrequencyName, recurringOrderProgramName) {
                if (quantity === void 0) { quantity = 1; }
                if (!productId) {
                    throw new Error('The product id is required');
                }
                if (quantity <= 0) {
                    throw new Error('The quantity must be greater than zero');
                }
                var data = {
                    ProductId: productId,
                    VariantId: variantId,
                    Quantity: quantity,
                    RecurringOrderFrequencyName: recurringOrderFrequencyName,
                    RecurringOrderProgramName: recurringOrderProgramName
                };
                return Composer.ComposerClient.post('/api/cart/lineitem', data);
            };
            CartRepository.prototype.updateLineItem = function (lineItemId, quantity, recurringOrderFrequencyName, recurringOrderProgramName) {
                if (!lineItemId) {
                    throw new Error('The line item id is required');
                }
                if (quantity <= 0) {
                    throw new Error('The quantity must be greater than zero');
                }
                var data = {
                    LineItemId: lineItemId,
                    Quantity: quantity,
                    RecurringOrderFrequencyName: recurringOrderFrequencyName,
                    RecurringOrderProgramName: recurringOrderProgramName
                };
                return Composer.ComposerClient.put('/api/cart/lineitem', data);
            };
            CartRepository.prototype.deleteLineItem = function (lineItemId) {
                if (!lineItemId) {
                    throw new Error('The line item id is required');
                }
                var data = {
                    LineItemId: lineItemId
                };
                return Composer.ComposerClient.remove('/api/cart/lineitem', data);
            };
            CartRepository.prototype.updateBillingMethodPostalCode = function (postalCode) {
                if (!postalCode) {
                    throw new Error('The postal code is required');
                }
                var data = {
                    PostalCode: postalCode
                };
                return Composer.ComposerClient.post('/api/cart/billingaddress', data);
            };
            CartRepository.prototype.updateShippingMethodPostalCode = function (postalCode) {
                if (!postalCode) {
                    throw new Error('The postal code is required');
                }
                var data = {
                    PostalCode: postalCode
                };
                return Composer.ComposerClient.post('/api/cart/shippingaddress', data);
            };
            CartRepository.prototype.setCheapestShippingMethod = function () {
                var data = {
                    UseCheapest: true
                };
                return Composer.ComposerClient.post('/api/cart/shippingmethod', data);
            };
            CartRepository.prototype.addCoupon = function (couponCode) {
                if (!couponCode) {
                    throw new Error('The coupon code is required');
                }
                var data = {
                    CouponCode: couponCode
                };
                return Composer.ComposerClient.post('/api/cart/coupon', data);
            };
            CartRepository.prototype.removeCoupon = function (couponCode) {
                if (!couponCode) {
                    throw new Error('The coupon code is required');
                }
                var data = {
                    CouponCode: couponCode
                };
                return Composer.ComposerClient.remove('/api/cart/coupon', data);
            };
            CartRepository.prototype.clean = function () {
                var data = {};
                return Composer.ComposerClient.remove('/api/cart/clean', data);
            };
            CartRepository.prototype.updateCart = function (param) {
                if (!param) {
                    throw new Error('The param is required');
                }
                return Composer.ComposerClient.post('/api/cart/updateCart', param);
            };
            CartRepository.prototype.completeCheckout = function (currentStep) {
                if (currentStep) {
                    //TODO: this is for old checkout, need to clean later
                    var data = {
                        CurrentStep: currentStep
                    };
                    return Composer.ComposerClient.post('/api/cart/completecheckout', data);
                }
                return Composer.ComposerClient.post('/api/cart/completecheckout', null);
            };
            return CartRepository;
        }());
        Composer.CartRepository = CartRepository;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ShippingMethodService = /** @class */ (function () {
            function ShippingMethodService() {
            }
            /**
            * Return a Promise which returns the ShippingMethods available for the cart.
            */
            ShippingMethodService.prototype.getShippingMethods = function () {
                return Composer.ComposerClient.get('/api/cart/shippingmethods');
            };
            ShippingMethodService.prototype.getShippingMethodTypes = function () {
                return Composer.ComposerClient.get('/api/cart/groupedshippingmethods');
            };
            return ShippingMethodService;
        }());
        Composer.ShippingMethodService = ShippingMethodService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var CartEvents;
        (function (CartEvents) {
            CartEvents["CartUpdating"] = "cartUpdating";
            CartEvents["CartUpdated"] = "cartUpdated";
            CartEvents["CouponUpdated"] = "couponUpdated";
        })(CartEvents = Composer.CartEvents || (Composer.CartEvents = {}));
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ProductsHelper = /** @class */ (function () {
            function ProductsHelper() {
            }
            ProductsHelper.isSize = function (kvaName) {
                return kvaName.toLowerCase().includes('size');
            };
            ProductsHelper.getKeyVariantDisplayName = function (product, keyName) {
                if (!product || !product.KeyVariantAttributeItems)
                    return;
                var kva = product.KeyVariantAttributeItems.find(function (i) { return i.PropertyName === keyName; });
                return kva.DisplayName;
            };
            ProductsHelper.getKeyVariantValues = function (product, keyName, noSelection) {
                if (noSelection === void 0) { noSelection = false; }
                if (!product || !product.KeyVariantAttributeItems)
                    return [];
                var kva = product.KeyVariantAttributeItems.find(function (i) { return i.PropertyName === keyName; });
                var selectedVariant = product.SelectedVariant;
                if (!kva)
                    return [];
                var selectedKvas = selectedVariant.Kvas;
                var selectedPrValue = selectedKvas[keyName];
                var variants = product.Variants;
                var isDisabled = function (relatedVariants) {
                    var otherKeyProps = product.KeyVariantAttributeItems.filter(function (p) { return p.PropertyName !== keyName; });
                    var disabled = false;
                    otherKeyProps.forEach(function (otherP) {
                        var selectedOtherPrValue = selectedKvas[otherP.PropertyName];
                        if (selectedOtherPrValue) {
                            var findRelatedWithSelected = relatedVariants.find(function (v) { return v.Kvas[otherP.PropertyName] === selectedOtherPrValue; });
                            if (!findRelatedWithSelected) {
                                disabled = true;
                            }
                        }
                    });
                    return disabled;
                };
                return kva.Values.map(function (prValue) {
                    var relatedVariants = variants.filter(function (v) { return v.Kvas[keyName] === prValue.Value; });
                    return __assign({}, prValue, { Disabled: isDisabled(relatedVariants), Selected: noSelection ? false : selectedPrValue === prValue.Value });
                });
            };
            ProductsHelper.mergeVariantPrice = function (product, variantPrice) {
                if (!variantPrice)
                    return;
                product.IsOnSale = variantPrice.IsPriceDiscounted;
                product.DisplaySpecialPrice = variantPrice.ListPrice;
                product.DisplayListPrice = variantPrice.DefaultListPrice;
                product.HasPriceRange = false;
            };
            ProductsHelper.findVariant = function (product, kva, selectedKvas) {
                var keys = selectedKvas ? Object.keys(selectedKvas) : Object.keys(kva);
                var mergedKva = selectedKvas ? __assign({}, selectedKvas, kva) : kva;
                var compareProperties = function (pr) {
                    return keys.reduce(function (result, current) { return result && (pr[current] && pr[current] === mergedKva[current]); }, true);
                };
                return product.Variants.find(function (v) { return compareProperties(v.Kvas); });
            };
            ProductsHelper.getProductDataForAnalytics = function (product, variantId, price, pageName, quantity) {
                if (quantity === void 0) { quantity = 1; }
                var ProductId = product.ProductId, Brand = product.Brand, DisplayName = product.DisplayName, CategoryId = product.CategoryId;
                var data = {
                    ProductId: ProductId,
                    VariantId: variantId,
                    Quantity: quantity,
                    Price: price,
                    ListPrice: price,
                    DisplayName: DisplayName,
                    Brand: Brand,
                    CategoryId: CategoryId,
                    List: pageName
                };
                if (variantId && product.Variants) {
                    var variant = product.Variants.find(function (v) { return v.Id === variantId; });
                    var variantData = this.getVariantDataForAnalytics(variant);
                    data = __assign({}, data, variantData);
                }
                return data;
            };
            ProductsHelper.getVariantDataForAnalytics = function (variant) {
                var variantName = this.buildVariantName(variant.Kvas);
                var data = {
                    Variant: variantName,
                    Name: variant.DisplayName ? variant.DisplayName : undefined,
                    ListPrice: variant.ListPrice
                };
                return data;
            };
            ProductsHelper.buildVariantName = function (kvas) {
                var keys = Object.keys(kvas).sort();
                var nameParts = [];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var value = kvas[key];
                    nameParts.push(value);
                }
                return nameParts.join(' ');
            };
            ProductsHelper.isAddToCartDisabled = function (product, productsMap) {
                return product.loading || !product.IsAvailableToSell
                    || (product.HasVariants && productsMap[product.ProductId] && !productsMap[product.ProductId].SizeSelected);
            };
            return ProductsHelper;
        }());
        Composer.ProductsHelper = ProductsHelper;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Cache/CacheProvider.ts' />
///<reference path='../../Cache/CacheError.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../../Utils/Utils.ts' />
///<reference path='./ICartService.ts' />
///<reference path='./CartEvents.ts' />
///<reference path='../../Composer.Product/Product/ProductHelpers.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CartService = /** @class */ (function () {
            function CartService() {
                this.VueCartMixins = [];
                this.cachePolicy = { slidingExpiration: 300 }; // 5min
                this.cacheKey = "CartViewModel|" + Composer.Utils.getWebsiteId();
                this.cacheProvider = Composer.CacheProvider.instance();
                this.cartRepository = new Composer.CartRepository();
                this.eventHub = Composer.EventHub.instance();
                CartService.instance = this;
            }
            CartService.getInstance = function () {
                if (!CartService.instance) {
                    CartService.instance = new CartService();
                }
                return CartService.instance;
            };
            CartService.prototype.getCart = function () {
                var _this = this;
                return this.getCacheCart()
                    .fail(function (reason) {
                    if (_this.canHandle(reason)) {
                        return _this.getFreshCart();
                    }
                    console.error('An error occured while getting the cart from cache.', reason);
                    throw reason;
                });
            };
            CartService.prototype.canHandle = function (reason) {
                return reason === Composer.CacheError.Expired || reason === Composer.CacheError.NotFound;
            };
            CartService.prototype.getFreshCart = function (force) {
                var _this = this;
                if (force === void 0) { force = false; }
                if (!CartService.GettingFreshCart || force) {
                    CartService.GettingFreshCart = this.cartRepository.getCart()
                        .then(function (cart) { return _this.setCartToCache(cart); });
                }
                // to avoid getting a fresh cart multiple times within a page session
                return CartService.GettingFreshCart
                    .fail(function (reason) {
                    console.error('An error occured while getting a fresh cart.', reason);
                    throw reason;
                });
            };
            CartService.prototype.addLineItem = function (product, price, variantId, quantity, pageName, recurringOrderFrequencyName) {
                var _this = this;
                if (quantity === void 0) { quantity = 1; }
                if (pageName === void 0) { pageName = "Search Results"; }
                if (recurringOrderFrequencyName === void 0) { recurringOrderFrequencyName = undefined; }
                var ProductId = product.ProductId, RecurringOrderProgramName = product.RecurringOrderProgramName;
                var dataForAnalytics = Composer.ProductsHelper.getProductDataForAnalytics(product, variantId, price, pageName, quantity);
                this.eventHub.publish(Composer.ProductEvents.LineItemAdding, { data: dataForAnalytics });
                this.eventHub.publish(Composer.CartEvents.CartUpdating, { data: dataForAnalytics });
                return this.cartRepository.addLineItem(ProductId, variantId, quantity, recurringOrderFrequencyName, RecurringOrderProgramName)
                    .then(function (cart) {
                    _this.setCartToCache(cart);
                    _this.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cart });
                    _this.eventHub.publish(Composer.ProductEvents.LineItemAdded, { data: { Cart: cart, ProductId: ProductId, VariantId: variantId } });
                    Composer.ErrorHandler.instance().removeErrors();
                    return cart;
                });
            };
            CartService.prototype.updateLineItem = function (lineItemId, quantity, productId, recurringOrderFrequencyName, recurringOrderProgramName) {
                var _this = this;
                var data = {
                    LineItemId: lineItemId,
                    Quantity: quantity,
                    ProductId: productId
                };
                this.eventHub.publish(Composer.CartEvents.CartUpdating, { data: data });
                return this.cartRepository.updateLineItem(lineItemId, quantity, recurringOrderFrequencyName, recurringOrderProgramName)
                    .then(function (cart) { return _this.setCartToCache(cart); })
                    .then(function (cart) {
                    _this.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cart });
                    return cart;
                });
            };
            CartService.prototype.deleteLineItem = function (lineItemId, productId) {
                var _this = this;
                var data = {
                    LineItemId: lineItemId,
                    ProductId: productId
                };
                this.eventHub.publish(Composer.CartEvents.CartUpdating, { data: data });
                return this.cartRepository.deleteLineItem(lineItemId)
                    .then(function (cart) { return _this.setCartToCache(cart); })
                    .then(function (cart) {
                    _this.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cart });
                    return cart;
                });
            };
            CartService.prototype.updateBillingMethodPostalCode = function (postalCode) {
                var _this = this;
                return this.cartRepository.updateBillingMethodPostalCode(postalCode)
                    .then(function (cart) { return _this.setCartToCache(cart); });
            };
            CartService.prototype.updateShippingMethodPostalCode = function (postalCode) {
                var _this = this;
                return this.cartRepository.updateShippingMethodPostalCode(postalCode)
                    .then(function (cart) { return _this.setCartToCache(cart); });
            };
            CartService.prototype.setCheapestShippingMethod = function () {
                var _this = this;
                return this.cartRepository.setCheapestShippingMethod()
                    .then(function (cart) { return _this.setCartToCache(cart); });
            };
            CartService.prototype.addCoupon = function (couponCode) {
                var _this = this;
                return this.cartRepository.addCoupon(couponCode)
                    .then(function (cart) { return _this.setCartToCache(cart); });
            };
            CartService.prototype.removeCoupon = function (couponCode) {
                var _this = this;
                return this.cartRepository.removeCoupon(couponCode)
                    .then(function (cart) { return _this.setCartToCache(cart); });
            };
            CartService.prototype.clean = function () {
                var _this = this;
                return this.cartRepository.clean()
                    .then(function (cart) { return _this.setCartToCache(cart); });
            };
            CartService.prototype.updateCart = function (param) {
                var _this = this;
                return this.cartRepository.updateCart(param)
                    .then(function (result) { return _this.setCartToCache(result.Cart).then(function () { return result; }); });
            };
            CartService.prototype.completeCheckout = function (currentStep) {
                var _this = this;
                if (currentStep === void 0) { currentStep = null; }
                return this.cartRepository.completeCheckout(currentStep)
                    .then(function (result) { return _this.setCartToCache(null).then(function () { return result; }); });
            };
            CartService.prototype.invalidateCache = function () {
                CartService.GettingFreshCart = undefined;
                return this.cacheProvider.defaultCache.clear(this.cacheKey);
            };
            CartService.prototype.getCacheCart = function () {
                return this.cacheProvider.defaultCache.get(this.cacheKey);
            };
            CartService.prototype.setCartToCache = function (cart) {
                return this.cacheProvider.defaultCache.set(this.cacheKey, cart, this.cachePolicy);
            };
            return CartService;
        }());
        Composer.CartService = CartService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Mvc/ComposerClient.ts' />
///<reference path='./IRegionService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var RegionService = /** @class */ (function () {
            function RegionService() {
            }
            RegionService.prototype.getRegions = function () {
                var _this = this;
                if (_.isUndefined(this._memoizeGetRegions)) {
                    this._memoizeGetRegions = _.memoize(function (arg) { return _this.getRegionsImpl(); });
                }
                return this._memoizeGetRegions();
            };
            RegionService.prototype.getRegionsImpl = function () {
                return Composer.ComposerClient.get('/api/address/regions');
            };
            return RegionService;
        }());
        Composer.RegionService = RegionService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../System/IDisposable.ts' />
///<reference path='./ViewModels/IActivePaymentViewModel.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var BaseCheckoutPaymentProvider = /** @class */ (function () {
            function BaseCheckoutPaymentProvider(window, eventHub, providerType, providerName) {
                this._providerType = providerType;
                this._providerName = providerName;
                this._window = window;
                this._eventHub = eventHub;
            }
            Object.defineProperty(BaseCheckoutPaymentProvider.prototype, "providerType", {
                /**
                 * Obtains the underlying type of the Payment Provider.
                 * @return {string} Type of the Payment Provider.
                 */
                get: function () {
                    return this._providerType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseCheckoutPaymentProvider.prototype, "providerName", {
                /**
                 * Obtains the name of the Payment Provider.
                 * @return {string} Name of the Payment provider.
                 */
                get: function () {
                    return this._providerName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseCheckoutPaymentProvider.prototype, "window", {
                get: function () {
                    return this._window;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Method called to get a promise for payment validation.
             * Returns a promise of boolean. The return boolean needs to be false for validation error,
             * or true if valid.
             * @return {Q.Promise<boolean>} Promise that will be executed when we validate the payment control.
             */
            BaseCheckoutPaymentProvider.prototype.validatePayment = function (activePaymentVM) {
                throw new Error('This Payment Provider does not implement the "validatePayment" method.');
            };
            /**
             * Method called to get a promise when payment will submit.
             * @return {Q.Promise<any>} Promise that will be executed when to cart is about the be updated.
             */
            BaseCheckoutPaymentProvider.prototype.submitPayment = function (activePaymentVM) {
                throw new Error('This Payment Provider does not implement the "submitPayment" method.');
            };
            /**
             * Gets the container for the Payment Provider.
             * @return {JQuery} jQuery object.
             */
            BaseCheckoutPaymentProvider.prototype.getForm = function () {
                var form = $('#PaymentForm');
                if (!form || _.isEmpty(form)) {
                    throw new Error('Could not find the element PaymentForm on this page.');
                }
                return form;
            };
            BaseCheckoutPaymentProvider.prototype.dispose = function () {
                //Nothing to do here.
            };
            return BaseCheckoutPaymentProvider;
        }());
        Composer.BaseCheckoutPaymentProvider = BaseCheckoutPaymentProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./IPaymentMethodViewModel.ts' />
///<reference path='./IActivePaymentViewModel.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='./ViewModels/IPaymentMethodViewModel.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../Payment/BaseCheckoutPaymentProvider.ts' />
///<reference path='../Payment/ViewModels/IPaymentViewModel.ts' />
///<reference path='../Payment/IPaymentRepository.ts' />
///<reference path='./IPaymentService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var PaymentService = /** @class */ (function () {
            function PaymentService(eventHub, paymentRepository) {
                this.eventHub = eventHub;
                this.paymentRepository = paymentRepository;
            }
            /**
             * Return a list of acceptable payment providers details with labels
             * @param  {providers: Array<string>}      Array of provider names.
             * @return {Array<IPaymentMethodViewModel} List of payment provider details
             */
            PaymentService.prototype.getPaymentMethods = function (providers) {
                return this.paymentRepository.getPaymentMethods(providers);
            };
            /**
             * Return the active payment for the active cart
             * @return {IActivePaymentViewModel} Active payment for the active cart.
             */
            PaymentService.prototype.getActivePayment = function () {
                return this.paymentRepository.getActivePayment();
            };
            PaymentService.prototype.removePaymentMethod = function (paymentMethodId, paymentProviderName) {
                return this.paymentRepository.removePaymentMethod(paymentMethodId, paymentProviderName);
            };
            PaymentService.prototype.setPaymentMethod = function (request) {
                return this.paymentRepository.setPaymentMethod(request);
            };
            /**
             * Return a list of acceptable payment providers and methods details with labels
             * @return {ICheckoutPaymentViewModel} payment details
             */
            PaymentService.prototype.getCheckoutPayment = function () {
                return this.paymentRepository.getCheckoutPayment();
            };
            PaymentService.prototype.updatePaymentMethod = function (request) {
                return this.paymentRepository.updatePaymentMethod(request);
            };
            return PaymentService;
        }());
        Composer.PaymentService = PaymentService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./IPaymentProfileListItemViewModel.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path="./IPaymentRepository.ts" />
///<reference path="./ViewModels/IPaymentViewModel.ts" />
///<reference path="./ViewModels/IActivePaymentViewModel.ts" />
///<reference path="./ViewModels/IPaymentProfileListViewModel.ts" />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var PaymentRepository = /** @class */ (function () {
            function PaymentRepository() {
            }
            /**
             * Return a list of saved payment methods for a specified array of payment provider names
             * @param  {providers: Array<string>}       Array of provider names.
             * @return {Array<IPaymentMethodViewModel>} Instance of the provider.
             */
            PaymentRepository.prototype.getPaymentMethods = function (providers) {
                return Composer.ComposerClient.post('/api/payment/paymentmethods', { Providers: providers });
            };
            /**
             * Return the active payment for the active cart
             * @return {IActivePaymentViewModel} Active payment for the active cart.
             */
            PaymentRepository.prototype.getActivePayment = function () {
                return Composer.ComposerClient.get('/api/payment/activepayment');
            };
            PaymentRepository.prototype.removePaymentMethod = function (paymentMethodId, paymentProviderName) {
                return Composer.ComposerClient.remove('/api/payment/removemethod', {
                    PaymentMethodId: paymentMethodId,
                    PaymentProviderName: paymentProviderName
                });
            };
            PaymentRepository.prototype.setPaymentMethod = function (request) {
                return Composer.ComposerClient.put('/api/payment/paymentMethod', request);
            };
            /**
             * Return a list of payment methods and payment provider
             * @return {ICheckoutPaymentViewModel} Instance of the provider.
             */
            PaymentRepository.prototype.getCheckoutPayment = function () {
                return Composer.ComposerClient.get('/api/payment/checkoutpayment');
            };
            PaymentRepository.prototype.updatePaymentMethod = function (request) {
                return Composer.ComposerClient.put('/api/payment/checkoutpayment', request);
            };
            return PaymentRepository;
        }());
        Composer.PaymentRepository = PaymentRepository;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../Events/IEventHub.ts' />
/// <reference path='./BaseCheckoutPaymentProvider.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CheckoutPaymentProviderFactory = /** @class */ (function () {
            function CheckoutPaymentProviderFactory(window, eventHub) {
                this._eventHub = eventHub;
                this._window = window;
            }
            /**
             * Determines if the Checkout Payment Provider exists or not.
             * @param  {string}  providerType Type of the provider.
             * @return {boolean}              True if the provider exists in the Orckestra.Composer namespace.
             */
            CheckoutPaymentProviderFactory.prototype.hasProvider = function (providerType) {
                if (Orckestra.Composer[providerType]) {
                    return true;
                }
                return false;
            };
            /**
             * Gets an instance of a Checkout Payment provider. If the provider does not exists, throws an
             * error.
             * @param  {string}                   providerType                  Type of the provider.
             * @param  {string}                   providerName                  Name of the provider.
             * @return {ICheckoutPaymentProvider}                               Instance of the provider.
             */
            CheckoutPaymentProviderFactory.prototype.getInstance = function (providerType, providerName) {
                if (this.hasProvider(providerType)) {
                    var Clazz = Orckestra.Composer[providerType];
                    var instance = new Clazz(this._window, providerName, this._eventHub);
                    return instance;
                }
                throw new Error('Unable to find a class named "' + providerType + '".');
            };
            return CheckoutPaymentProviderFactory;
        }());
        Composer.CheckoutPaymentProviderFactory = CheckoutPaymentProviderFactory;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./IPaymentMethodViewModel.ts' />
///<reference path='./IActivePaymentViewModel.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='./Payment/ViewModels/ICheckoutPaymentViewModel.ts' />
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Mvc/ComposerClient.ts' />
///<reference path='./ICustomerRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CustomerRepository = /** @class */ (function () {
            function CustomerRepository() {
            }
            /**
            * Attempt to register using Composer API.
            * @param
            */
            CustomerRepository.prototype.updateAccount = function (formData, returnUrl) {
                var data = _.extend({ ReturnUrl: returnUrl }, formData);
                return Composer.ComposerClient.post('/api/customer/update', data);
            };
            /**
            * Get the customer addresses.
            */
            CustomerRepository.prototype.getAddresses = function () {
                return Composer.ComposerClient.get('/api/customer/addresses');
            };
            /**
             * Get the customer addresses for a recurring cart page.
             */
            CustomerRepository.prototype.getRecurringCartAddresses = function (cartName) {
                var data = {
                    CartName: cartName
                };
                return Composer.ComposerClient.post('/api/customer/recurringcartaddresses', data);
            };
            /**
             * Get the customer addresses for a recurring cart page.
             */
            CustomerRepository.prototype.getRecurringTemplateAddresses = function (id) {
                var data = {
                    id: id
                };
                return Composer.ComposerClient.post('/api/customer/recurringorderstemplatesaddresses', data);
            };
            /**
            * Create a new customer address
            * @param
            */
            CustomerRepository.prototype.createAddress = function (formData, returnUrl) {
                var data = _.extend({ ReturnUrl: returnUrl }, formData);
                return Composer.ComposerClient.post('/api/customer/addresses', data);
            };
            /**
            * Update a customer address
            * @param
            */
            CustomerRepository.prototype.updateAddress = function (formData, addressId, returnUrl) {
                var data = _.extend({ ReturnUrl: returnUrl }, formData);
                return Composer.ComposerClient.post('/api/customer/addresses/' + addressId, data);
            };
            /**
            * Delete a customer address
            * @param
            */
            CustomerRepository.prototype.deleteAddress = function (addressId, returnUrl) {
                var data = { ReturnUrl: returnUrl };
                return Composer.ComposerClient.remove('/api/customer/addresses/' + addressId, data);
            };
            /**
            * Set default address for a customer
            * @param
            */
            CustomerRepository.prototype.setDefaultAddress = function (addressId, returnUrl) {
                var data = { ReturnUrl: returnUrl };
                return Composer.ComposerClient.post('/api/customer/setdefaultaddress/' + addressId, data);
            };
            return CustomerRepository;
        }());
        Composer.CustomerRepository = CustomerRepository;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Repositories/CustomerRepository.ts' />
///<reference path='./ICustomerService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CustomerService = /** @class */ (function () {
            function CustomerService(customerRepository) {
                if (!customerRepository) {
                    throw new Error('Error: customerRepository is required');
                }
                this.customerRepository = customerRepository;
            }
            /**
            * Attempt to register using Composer API.
            * @param
            */
            CustomerService.prototype.updateAccount = function (formData, returnUrl) {
                return this.customerRepository.updateAccount(formData, returnUrl);
            };
            /**
            * Get the customer addresses.
            */
            CustomerService.prototype.getAddresses = function () {
                var _this = this;
                if (_.isUndefined(this.memoizeGetAdresses)) {
                    this.memoizeGetAdresses = _.memoize(function (arg) { return _this.getAddressesImpl(); });
                }
                return this.memoizeGetAdresses();
            };
            CustomerService.prototype.getAddressesImpl = function () {
                return this.customerRepository.getAddresses();
            };
            /**
             * Get the customer addresses for a recurring cart page.
             */
            CustomerService.prototype.getRecurringCartAddresses = function (cartName) {
                var _this = this;
                if (_.isUndefined(this.memoizeGetAdresses)) {
                    this.memoizeGetAdresses = _.memoize(function (arg) { return _this.getRecurringCartAddressesImpl(cartName); });
                }
                return this.memoizeGetAdresses();
            };
            CustomerService.prototype.getRecurringCartAddressesImpl = function (cartName) {
                return this.customerRepository.getRecurringCartAddresses(cartName);
            };
            /**
             * Get the customer addresses for a recurring cart page.
             */
            CustomerService.prototype.getRecurringTemplateAddresses = function (id) {
                var _this = this;
                if (_.isUndefined(this.memoizeGetAdresses)) {
                    this.memoizeGetAdresses = _.memoize(function (arg) { return _this.getRecurringTemplateAddressesImpl(id); });
                }
                return this.memoizeGetAdresses();
            };
            CustomerService.prototype.getRecurringTemplateAddressesImpl = function (id) {
                return this.customerRepository.getRecurringTemplateAddresses(id);
            };
            /**
            * Create a new customer address
            * @param
            */
            CustomerService.prototype.createAddress = function (formData, returnUrl) {
                return this.customerRepository.createAddress(formData, returnUrl);
            };
            /**
            * Update a customer address
            * @param
            */
            CustomerService.prototype.updateAddress = function (formData, addressId, returnUrl) {
                return this.customerRepository.updateAddress(formData, addressId, returnUrl);
            };
            /**
            * Delete a customer address
            * @param
            */
            CustomerService.prototype.deleteAddress = function (addressId, returnUrl) {
                this.memoizeGetAdresses = undefined;
                return this.customerRepository.deleteAddress(addressId, returnUrl);
            };
            /**
            * Set default address for a customer
            * @param
            */
            CustomerService.prototype.setDefaultAddress = function (addressId, returnUrl) {
                return this.customerRepository.setDefaultAddress(addressId, returnUrl);
            };
            return CustomerService;
        }());
        Composer.CustomerService = CustomerService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/vue/index.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CheckoutStepVueComponent = /** @class */ (function () {
            function CheckoutStepVueComponent() {
            }
            CheckoutStepVueComponent.initialize = function () {
                Vue.component(this.componentMame, this.getComponent());
            };
            CheckoutStepVueComponent.getComponent = function () {
                return {
                    props: {
                        /***
                         * Function to execute before step switch. Return value must be boolean
                         * If the return result is false, step switch is restricted
                         */
                        beforeChange: {
                            type: Function
                        },
                        /***
                         * Function to execute before step enter. Return value must be boolean
                         * If the return result is false, step switch is restricted
                         */
                        beforeEnter: {
                            type: Function
                        },
                        /***
                         * Function to execute after step switch. Return void for now.
                         * Safe to assume necessary validation has already occured
                         */
                        afterChange: {
                            type: Function
                        },
                        /***
                         * Function to determine if step fulfilled so next step can be switched. Return value must be boolean
                         */
                        fulfilled: {
                            type: Boolean,
                            default: true
                        },
                        /***
                         * Property to determine if this step is loading. It is used to show loading spinner over the step container
                         */
                        loading: Boolean
                    },
                    inject: ['addStep', 'removeStep', 'nextStep', 'isStepExist', 'nextStepId', 'getPrevStepInstance'],
                    data: function () {
                        return {
                            active: false,
                            id: null,
                            validationError: null,
                            checked: false,
                            elementId: ''
                        };
                    },
                    computed: {
                        slotProps: function () {
                            var _this = this;
                            return {
                                nextStep: this.$parent.nextStep,
                                prevStep: this.$parent.prevStep,
                                navigateToStep: this.$parent.navigateToStep,
                                activeStepId: this.$parent.activeStepId,
                                isLastStep: this.$parent.isLastStep,
                                id: this.id,
                                active: this.active,
                                displayContinueButton: (((this.checked && !this.fulfilled) || !this.checked) && (this.nextStepId() === this.id)),
                                selectStep: function () {
                                    this.$parent.navigateToStep(this.id);
                                },
                                preview: this.fulfilled && this.checked && !this.active,
                                next: this.id === this.nextStepId(),
                                show: this.isStepExist(this),
                                prevFulfilled: (function () {
                                    var prevStep = _this.getPrevStepInstance(_this.id);
                                    return prevStep && prevStep.fulfilled;
                                })()
                            };
                        },
                    },
                    methods: {},
                    mounted: function () {
                        this.addStep(this);
                    },
                    destroyed: function () {
                        if (this.$el && this.$el.parentNode) {
                            this.$el.parentNode.removeChild(this.$el);
                        }
                        this.removeStep(this);
                    },
                    template: "\n                    <div class=\"checkout-step-container\"\n                    \t v-show=\"slotProps.show\"\n                         v-bind:class=\"{'active-step': active,\n                         'preview-step': slotProps.preview,\n                         'next-step': slotProps.next,\n                         'loading' : loading\n                        }\"\n                         role=\"tabpanel\"\n                         v-bind:id=\"elementId\">\n                         <div class=\"loading-spinner\">\n                            <div class=\"spinner-border text-info\" role=\"status\">\n                                <span class=\"sr-only\">Loading...</span>\n                            </div>\n                         </div>\n                        <slot v-bind=\"slotProps\"></slot>\n                    </div>"
                };
            };
            CheckoutStepVueComponent.componentMame = 'checkout-step';
            return CheckoutStepVueComponent;
        }());
        Composer.CheckoutStepVueComponent = CheckoutStepVueComponent;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CheckoutHelpers = /** @class */ (function () {
            function CheckoutHelpers() {
            }
            CheckoutHelpers.getFocusedElementId = function () {
                return document.activeElement.id;
            };
            CheckoutHelpers.getFocusedStepIndex = function (steps) {
                if (steps === void 0) { steps = []; }
                var activeId = this.getFocusedElementId();
                return steps.findIndex(function (step) { return step.tabId === activeId; });
            };
            CheckoutHelpers.findElementAndFocus = function (elemId) {
                var elem = document.getElementById(elemId);
                if (elem) {
                    elem.focus();
                }
            };
            CheckoutHelpers.isPromise = function (func) {
                return func.then && typeof func.then === 'function';
            };
            return CheckoutHelpers;
        }());
        Composer.CheckoutHelpers = CheckoutHelpers;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/vue/index.d.ts' />
///<reference path='./CheckoutHelpers.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CheckoutPageVueComponent = /** @class */ (function () {
            function CheckoutPageVueComponent() {
            }
            CheckoutPageVueComponent.initialize = function () {
                Vue.component(this.componentMame, this.getComponent());
            };
            CheckoutPageVueComponent.getComponent = function () {
                return {
                    components: {},
                    props: {
                        id: {
                            type: String,
                            default: 'fw_' + new Date().valueOf()
                        },
                        validateOnBack: Boolean,
                        /***
                         * Applies to text, border and circle
                         */
                        color: {
                            type: String,
                            default: '#e74c3c'
                        },
                        errorColor: {
                            type: String,
                            default: '#8b0000'
                        },
                        shape: {
                            type: String,
                            default: 'circle'
                        },
                        layout: {
                            type: String,
                            default: 'horizontal'
                        },
                        stepsClasses: {
                            type: [String, Array],
                            default: ''
                        },
                        stepSize: {
                            type: String,
                            default: 'md',
                            validator: function validator(value) {
                                var acceptedValues = ['xs', 'sm', 'md', 'lg'];
                                return acceptedValues.indexOf(value) !== -1;
                            }
                        },
                        /***
                         *
                         * Index of the initial step to display
                         */
                        startIndex: {
                            type: Number,
                            default: 0,
                            validator: function validator(value) {
                                return value >= 0;
                            }
                        }
                    },
                    provide: function () {
                        return {
                            addStep: this.addStep,
                            removeStep: this.removeStep,
                            nextStep: this.nextStep,
                            isStepExist: this.isStepExist,
                            nextStepId: this.nextStepId,
                            getPrevStepInstance: this.getPrevStepInstance
                        };
                    },
                    data: function data() {
                        return {
                            activeStepId: 0,
                            currentPercentage: 0,
                            maxStep: 0,
                            loading: false,
                            steps: []
                        };
                    },
                    computed: {
                        slotProps: function slotProps() {
                            return {
                                nextStep: this.nextStep,
                                prevStep: this.prevStep,
                                activeStepId: this.activeStepId,
                                isLastStep: this.isLastStep,
                                fillButtonStyle: this.fillButtonStyle
                            };
                        },
                        stepCount: function stepCount() {
                            return this.steps.length;
                        },
                        isLastStep: function isLastStep() {
                            return this.activeStepId === this.stepCount - 1;
                        },
                        isVertical: function isVertical() {
                            return this.layout === 'vertical';
                        },
                        displayPrevButton: function displayPrevButton() {
                            return this.activeStepId !== 0;
                        },
                        stepPercentage: function stepPercentage() {
                            return 1 / (this.stepCount * 2) * 100;
                        },
                        fillButtonStyle: function fillButtonStyle() {
                            return {
                                backgroundColor: this.color,
                                borderColor: this.color,
                                color: 'white'
                            };
                        },
                    },
                    methods: {
                        getStepInstance: function (id) {
                            return this.steps.find(function (step) { return step.id === id; });
                        },
                        getNextStepInstance: function (id) {
                            var listIndex = this.steps.findIndex(function (step) { return step.id === id; });
                            return this.steps[listIndex + 1];
                        },
                        getPrevStepInstance: function (id) {
                            var listIndex = this.steps.findIndex(function (step) { return step.id === id; });
                            return this.steps[listIndex - 1];
                        },
                        nextStepId: function () {
                            var nextStep = this.getNextStepInstance(this.activeStepId);
                            return nextStep && nextStep.id;
                        },
                        emitStepChange: function (prevIndex, nextIndex) {
                            this.$emit('on-change', prevIndex, nextIndex);
                            this.$emit('update:startIndex', nextIndex);
                        },
                        addStep: function (item) {
                            var index = this.$slots.default.filter(function (d) { return item.$vnode.tag === d.tag; })
                                .indexOf(item.$vnode);
                            this.steps.splice(index, 0, item); // if a step is added before the current one, go to it
                            item.id = this.steps.indexOf(item);
                            item.elementId = 'step' + index;
                            this.maxStep = this.steps.length - 1; //TODO: fix it
                            if (index < this.activeStepId + 1) {
                                //this.maxStep = index;
                                this.changeStep(this.getNextStepInstance(this.activeStepId), this.getStepInstance(index));
                            }
                        },
                        removeStep: function (item) {
                            var index = this.steps.indexOf(item);
                            if (index > -1) {
                                // Go one step back if the current step is removed
                                if (this.steps[index].id === this.activeStepId) {
                                    this.changeStep(this.getStepInstance(this.activeStepId), this.getPrevStepInstance(this.activeStepId));
                                }
                                this.maxStep = this.steps.length - 1;
                                this.steps.splice(index, 1);
                            }
                        },
                        isStepExist: function (step) {
                            return this.steps.indexOf(step) >= 0;
                        },
                        reset: function () {
                            this.maxStep = 0;
                            this.steps.forEach(function (tab) {
                                tab.checked = false;
                            });
                            this.navigateToStep(0);
                        },
                        activateAll: function () {
                            this.maxStep = this.steps.length - 1;
                            this.steps.forEach(function (step) { return step.checked = true; });
                        },
                        navigateToStep: function (id) {
                            var _this = this;
                            var validate = id > this.activeStepId;
                            if (id <= this.maxStep) {
                                var cb_1 = function () {
                                    if (validate && id - _this.activeStepId > 1) {
                                        // validate all steps recursively until destination id
                                        _this.changeStep(_this.getStepInstance(_this.activeStepId), _this.getNextStepInstance(_this.activeStepId));
                                        _this.beforeStepChange(_this.activeStepId, cb_1);
                                    }
                                    else {
                                        _this.beforeStepEnter(id);
                                        _this.changeStep(_this.getStepInstance(_this.activeStepId), _this.getStepInstance(id));
                                        _this.scrollToStep(id);
                                        _this.afterStepChange(_this.activeStepId);
                                    }
                                };
                                if (validate) {
                                    this.beforeStepChange(this.activeStepId, cb_1);
                                }
                                else {
                                    // when trying leave already saved step(edit mode) when edit it we need to validate it
                                    var step = this.getNextStepInstance(this.activeStepId);
                                    if (step && step.fulfilled) {
                                        this.beforeStepChange(this.activeStepId, cb_1);
                                    }
                                    else {
                                        this.setValidationError(null);
                                        cb_1();
                                    }
                                }
                            }
                            return id <= this.maxStep;
                        },
                        nextStep: function () {
                            var _this = this;
                            var cb = function () {
                                if (_this.activeStepId < _this.stepCount - 1) {
                                    _this.changeStep(_this.getStepInstance(_this.activeStepId), _this.getNextStepInstance(_this.activeStepId));
                                    _this.afterStepChange(_this.activeStepId);
                                }
                                else {
                                    _this.$emit('on-complete');
                                }
                            };
                            this.beforeStepChange(this.activeStepId, cb);
                        },
                        prevStep: function () {
                            var _this = this;
                            var cb = function () {
                                if (_this.activeStepId > 0) {
                                    _this.setValidationError(null);
                                    _this.changeStep(_this.getStepInstance(_this.activeStepId), _this.getPrevStepInstance(_this.activeStepId));
                                }
                            };
                            if (this.validateOnBack) {
                                this.beforeStepChange(this.activeStepId, cb);
                            }
                            else {
                                cb();
                            }
                        },
                        focusnextStep: function () {
                            var tabIndex = Composer.CheckoutHelpers.getFocusedStepIndex(this.steps);
                            if (tabIndex !== -1 && tabIndex < this.steps.length - 1) {
                                var tabToFocus = this.getNextStepInstance(tabIndex);
                                if (tabToFocus.checked) {
                                    Composer.CheckoutHelpers.findElementAndFocus(tabToFocus.elementId);
                                }
                            }
                        },
                        focusprevStep: function () {
                            var tabIndex = Composer.CheckoutHelpers.getFocusedStepIndex(this.steps);
                            if (tabIndex !== -1 && tabIndex > 0) {
                                var toFocusId = this.getPrevStepInstance(tabIndex).elementId;
                                Composer.CheckoutHelpers.findElementAndFocus(toFocusId);
                            }
                        },
                        setLoading: function (value) {
                            this.loading = value;
                            this.$emit('on-loading', value);
                        },
                        setValidationError: function (error) {
                            this.getStepInstance(this.activeStepId).validationError = error;
                            this.$emit('on-error', error);
                        },
                        validateBeforeChange: function (promiseFn, callback) {
                            var _this = this;
                            this.setValidationError(null); // we have a promise
                            if (Composer.CheckoutHelpers.isPromise(promiseFn)) {
                                this.setLoading(true);
                                promiseFn.then(function (res) {
                                    _this.setLoading(false);
                                    var validationResult = res === true;
                                    _this.executeBeforeChange(validationResult, callback);
                                }).catch(function (error) {
                                    _this.setLoading(false);
                                    _this.setValidationError(error);
                                }); // we have a simple function
                            }
                            else {
                                var validationResult = promiseFn === true;
                                this.executeBeforeChange(validationResult, callback);
                            }
                        },
                        executeBeforeChange: function (validationResult, callback) {
                            this.$emit('on-validate', validationResult, this.activeStepId);
                            if (validationResult) {
                                callback();
                            }
                            else {
                                this.getStepInstance(this.activeStepId).validationError = 'error';
                            }
                        },
                        beforeStepChange: function (id, callback) {
                            if (this.loading) {
                                return;
                            }
                            var oldStep = this.getStepInstance(id);
                            if (oldStep && oldStep.beforeChange !== undefined) {
                                var stepChangeRes = oldStep.beforeChange();
                                this.validateBeforeChange(stepChangeRes, callback);
                            }
                            else {
                                callback();
                            }
                        },
                        beforeStepEnter: function (id) {
                            if (this.loading) {
                                return;
                            }
                            var newStep = this.getStepInstance(id);
                            if (newStep && newStep.beforeEnter !== undefined) {
                                newStep.beforeEnter();
                            }
                        },
                        afterStepChange: function (id) {
                            if (this.loading) {
                                return;
                            }
                            var newStep = this.getStepInstance(id);
                            if (newStep && newStep.afterChange !== undefined) {
                                newStep.afterChange();
                            }
                        },
                        changeStep: function (oldStep, newStep) {
                            var emitChangeEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
                            var newId = newStep && newStep.id;
                            var oldId = oldStep && oldStep.id;
                            if (oldStep) {
                                oldStep.active = false;
                            }
                            if (newStep) {
                                newStep.active = true;
                                newStep.checked = true;
                            }
                            if (emitChangeEvent && this.activeStepId !== newId) {
                                this.emitStepChange(oldId, newId);
                            }
                            this.activeStepId = newId;
                            this.activateStepAndCheckStep(this.activeStepId);
                            return true;
                        },
                        scrollToStep: function (stepIndex) {
                            var elementId = this.getStepInstance(stepIndex).elementId;
                            setTimeout(function () {
                                $('html, body').animate({
                                    scrollTop: $('#' + elementId).offset().top
                                }, 500);
                            }, 500);
                        },
                        deactivateSteps: function () {
                            this.steps.forEach(function (step) {
                                step.active = false;
                            });
                        },
                        activateStep: function (id) {
                            this.deactivateSteps();
                            var step = this.steps.find(function (step) {
                                step.checked = true;
                                return step.id === id;
                            });
                            if (step) {
                                step.active = true;
                                step.checked = true;
                            }
                        },
                        activateStepAndCheckStep: function (id) {
                            this.activateStep(id);
                            if (id > this.maxStep) {
                                this.maxStep = id;
                            }
                            this.activeStepId = id;
                        },
                        initializeSteps: function () {
                            if (this.steps.length > 0 && this.startIndex === 0) {
                                this.activateStep(this.activeStepId);
                            }
                            if (this.startIndex < this.steps.length) {
                                this.activateStepAndCheckStep(this.startIndex);
                            }
                            else {
                                window.console.warn("Prop startIndex set to " + this.startIndex + " is greater than the number of steps - " + this.steps.length + ". Make sure that the starting index is less than the number of tabs registered");
                            }
                        },
                        findNotFilledStepId: function () {
                            var _this = this;
                            var step = this.steps.find(function (step, index) { return !step.fulfilled || index === _this.steps.length - 1; });
                            return step && step.id;
                        }
                    },
                    mounted: function () {
                        this.initializeSteps();
                    },
                    template: "\n                    <div :id=\"id ? id : ''\" class=\"single-page-checkout\" :class=\"[stepSize, {vertical: isVertical}]\" >\n                        <div class=\"wizard-tab-content\">\n                          <slot v-bind=\"slotProps\">\n                          </slot>\n                        </div>\n                    </div>"
                };
            };
            CheckoutPageVueComponent.componentMame = 'checkout-page';
            return CheckoutPageVueComponent;
        }());
        Composer.CheckoutPageVueComponent = CheckoutPageVueComponent;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/vue/index.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var TransitionCollapseVueComponent = /** @class */ (function () {
            function TransitionCollapseVueComponent() {
            }
            TransitionCollapseVueComponent.initialize = function () {
                Vue.component(this.componentMame, this.getComponent());
            };
            TransitionCollapseVueComponent.getComponent = function () {
                return {
                    methods: {
                        beforeEnter: function (element) {
                            requestAnimationFrame(function () {
                                if (!element.style.height) {
                                    element.style.height = '0px';
                                }
                                element.style.display = null;
                            });
                        },
                        /**
                         * @param {HTMLElement} element
                         */
                        enter: function (element) {
                            requestAnimationFrame(function () {
                                requestAnimationFrame(function () {
                                    element.style.height = element.scrollHeight + "px";
                                });
                            });
                        },
                        /**
                         * @param {HTMLElement} element
                         */
                        afterEnter: function (element) {
                            element.style.height = null;
                        },
                        /**
                         * @param {HTMLElement} element
                         */
                        beforeLeave: function (element) {
                            requestAnimationFrame(function () {
                                if (!element.style.height) {
                                    element.style.height = element.offsetHeight + "px";
                                }
                            });
                        },
                        /**
                         * @param {HTMLElement} element
                         */
                        leave: function (element) {
                            requestAnimationFrame(function () {
                                requestAnimationFrame(function () {
                                    element.style.height = '0px';
                                });
                            });
                        },
                        /**
                         * @param {HTMLElement} element
                         */
                        afterLeave: function (element) {
                            element.style.height = null;
                        },
                    },
                    template: "\n                <transition-group name=\"collapse\" tag=\"div\"\n                        @before-enter=\"beforeEnter\"\n                        @enter=\"enter\"\n                        @after-enter=\"afterEnter\"\n                        @before-leave=\"beforeLeave\"\n                        @leave=\"leave\"\n                        @after-leave=\"afterLeave\"\n                        class=\"collapse-transition\">\n                    <slot />\n                </transition-group>"
                };
            };
            TransitionCollapseVueComponent.componentMame = 'transition-collapse';
            return TransitionCollapseVueComponent;
        }());
        Composer.TransitionCollapseVueComponent = TransitionCollapseVueComponent;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='./MembershipService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var MyAccountEvents;
        (function (MyAccountEvents) {
            MyAccountEvents[MyAccountEvents["AccountCreated"] = 0] = "AccountCreated";
            MyAccountEvents[MyAccountEvents["AccountUpdated"] = 1] = "AccountUpdated";
            MyAccountEvents[MyAccountEvents["AddressCreated"] = 2] = "AddressCreated";
            MyAccountEvents[MyAccountEvents["AddressUpdated"] = 3] = "AddressUpdated";
            MyAccountEvents[MyAccountEvents["AddressDeleted"] = 4] = "AddressDeleted";
            MyAccountEvents[MyAccountEvents["LoggedIn"] = 5] = "LoggedIn";
            MyAccountEvents[MyAccountEvents["LoggedOut"] = 6] = "LoggedOut";
            MyAccountEvents[MyAccountEvents["PasswordChanged"] = 7] = "PasswordChanged";
            MyAccountEvents[MyAccountEvents["ForgotPasswordInstructionSent"] = 8] = "ForgotPasswordInstructionSent";
            MyAccountEvents["StartEditOrder"] = "startEditOrder";
            MyAccountEvents["EditOrderStarted"] = "editOrderStarted";
            MyAccountEvents["EditOrderCanceled"] = "editOrderCanceled";
            MyAccountEvents["EditOrderFinished"] = "editOrderFinished";
            MyAccountEvents["OrderCanceled"] = "orderCanceled";
        })(MyAccountEvents = Composer.MyAccountEvents || (Composer.MyAccountEvents = {}));
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='./MembershipService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var MyAccountStatus;
        (function (MyAccountStatus) {
            MyAccountStatus[MyAccountStatus["Success"] = 0] = "Success";
            MyAccountStatus[MyAccountStatus["InvalidTicket"] = 1] = "InvalidTicket";
            MyAccountStatus[MyAccountStatus["DuplicateEmail"] = 2] = "DuplicateEmail";
            MyAccountStatus[MyAccountStatus["DuplicateUserName"] = 3] = "DuplicateUserName";
            MyAccountStatus[MyAccountStatus["InvalidQuestion"] = 4] = "InvalidQuestion";
            MyAccountStatus[MyAccountStatus["InvalidPassword"] = 5] = "InvalidPassword";
            MyAccountStatus[MyAccountStatus["InvalidPasswordAnswer"] = 6] = "InvalidPasswordAnswer";
            MyAccountStatus[MyAccountStatus["InvalidEmail"] = 7] = "InvalidEmail";
            MyAccountStatus[MyAccountStatus["Failed"] = 8] = "Failed";
            MyAccountStatus[MyAccountStatus["UserRejected"] = 9] = "UserRejected";
            MyAccountStatus[MyAccountStatus["RequiresApproval"] = 10] = "RequiresApproval";
            MyAccountStatus[MyAccountStatus["AjaxFailed"] = 11] = "AjaxFailed";
        })(MyAccountStatus = Composer.MyAccountStatus || (Composer.MyAccountStatus = {}));
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Composer.MyAccount/Common/CustomerService.ts' />
///<reference path='../../Dto/AddressDto.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var AddressRegisteredService = /** @class */ (function () {
            function AddressRegisteredService(customerService) {
                this.customerService = customerService;
            }
            /**
           * Get the customer addresses. The selected shipping address is taken from the cart by default.
           * If no address has been set in the cart, the selected shipping address corresponds to the preferred address.
           */
            AddressRegisteredService.prototype.getShippingAddresses = function (cart) {
                var _this = this;
                if (!cart) {
                    throw new Error('The cart is required');
                }
                return this.customerService.getAddresses()
                    .then(function (addresses) {
                    addresses.AddressesLoaded = true;
                    addresses.SelectedShippingAddressId = _this.getSelectedShippingAddressId(cart, addresses);
                    addresses.SelectedBillingAddressId = _this.getSelectedBillingAddressId(cart, addresses);
                    return addresses;
                });
            };
            AddressRegisteredService.prototype.getSelectedShippingAddressId = function (cart, addressList) {
                if (this.isShippingAddressFromCartValid(cart, addressList)) {
                    return cart.ShippingAddress.AddressBookId;
                }
                return this.getPreferredShippingAddressId(addressList);
            };
            AddressRegisteredService.prototype.getSelectedBillingAddressId = function (cart, addressList) {
                if (this.isBillingAddressFromCartValid(cart, addressList)) {
                    return cart.Payment.BillingAddress.AddressBookId;
                }
                return this.getPreferredBilliingAddressId(addressList);
            };
            AddressRegisteredService.prototype.isShippingAddressFromCartValid = function (cart, addressList) {
                if (cart.ShippingAddress === undefined) {
                    return false;
                }
                return _.some(addressList.Addresses, function (address) { return address.Id === cart.ShippingAddress.AddressBookId; });
            };
            AddressRegisteredService.prototype.isBillingAddressFromCartValid = function (cart, addressList) {
                if (cart.Payment.BillingAddress === undefined) {
                    return false;
                }
                return _.some(addressList.Addresses, function (address) { return address.Id === cart.Payment.BillingAddress.AddressBookId; });
            };
            AddressRegisteredService.prototype.getPreferredShippingAddressId = function (addressList) {
                var preferredShippingAddress = _.find(addressList.Addresses, function (address) { return address.IsPreferredShipping; });
                return preferredShippingAddress ? preferredShippingAddress.Id : undefined;
            };
            AddressRegisteredService.prototype.getPreferredBilliingAddressId = function (addressList) {
                var preferredAddress = _.find(addressList.Addresses, function (address) { return address.IsPreferredBilling; });
                return preferredAddress ? preferredAddress.Id : undefined;
            };
            return AddressRegisteredService;
        }());
        Composer.AddressRegisteredService = AddressRegisteredService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var UIModal = /** @class */ (function () {
            function UIModal(window, modalContextSelector, confirmAction, sender, container) {
                if (container === void 0) { container = undefined; }
                var _this = this;
                this.openModal = function (event) {
                    _this.modalContext = $(_this.modalContextSelector);
                    _this.confirmDeferred = Q.defer();
                    _this.modalContext.on('shown.bs.modal', function (event) {
                        $('[data-dismiss]', event.target).focus();
                    });
                    _this.modalContext.on('hide.bs.modal', function (event) {
                        $(event.target).off('shown.bs.modal hide.bs.modal');
                        if (_this.confirmDeferred.promise.isPending()) {
                            _this.confirmDeferred.resolve(false);
                        }
                    });
                    _this.modalContext.modal('show');
                    _this.confirmDeferred.promise
                        .then(function (value) {
                        _this.modalContext.modal('hide');
                        if (value) {
                            return _this.confirmAction.call(_this.sender, event);
                        }
                    })
                        .done(null, function (error) {
                        console.log(error);
                    });
                };
                this.confirmAction = confirmAction;
                this.modalContextSelector = modalContextSelector;
                this.window = window;
                this.sender = sender;
                this.container = container;
                this.registerDomEvents(container);
            }
            UIModal.prototype.registerDomEvents = function (container) {
                if (container === undefined) {
                    $(this.window.document).on('click', '.modal--confirm', this.confirmModal.bind(this));
                    $(this.window.document).on('click', '.modal--cancel', this.cancelModal.bind(this));
                }
                else {
                    container.on('click', '.modal--confirm', this.confirmModal.bind(this));
                    container.on('click', '.modal--cancel', this.cancelModal.bind(this));
                }
            };
            UIModal.prototype.unregisterDomEvents = function () {
                $(this.window.document).off('click', '.modal--confirm', this.confirmModal);
                $(this.window.document).off('click', '.modal--cancel', this.cancelModal);
            };
            UIModal.prototype.confirmModal = function () {
                this.confirmDeferred.resolve(true);
            };
            UIModal.prototype.cancelModal = function () {
                this.confirmDeferred.resolve(false);
            };
            UIModal.prototype.dispose = function () {
                this.unregisterDomEvents();
            };
            return UIModal;
        }());
        Composer.UIModal = UIModal;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Repositories/CustomerRepository.ts' />
///<reference path='../Repositories/IMembershipRepository.ts' />
///<reference path='../Repositories/MembershipRepository.ts' />
///<reference path='../Cache/CacheProvider.ts' />
///<reference path='../Utils/Utils.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var UserMetadataService = /** @class */ (function () {
            function UserMetadataService(membershipRepository) {
                this.cacheKey = 'UserMetadata';
                this.cachePolicy = { slidingExpiration: 300 }; // 5min
                if (!membershipRepository) {
                    throw new Error('Error: membershipRepository is required');
                }
                this.cacheProvider = Composer.CacheProvider.instance();
                this.membershipRepository = membershipRepository;
                UserMetadataService.instance = this;
            }
            UserMetadataService.getInstance = function () {
                if (!UserMetadataService.instance) {
                    UserMetadataService.instance = new UserMetadataService(new Composer.MembershipRepository());
                }
                return UserMetadataService.instance;
            };
            UserMetadataService.prototype.getUserMetadata = function () {
                var _this = this;
                return this.getFromCache()
                    .fail(function (reason) {
                    if (_this.canHandle(reason)) {
                        return _this.getFreshMetadata();
                    }
                    throw reason;
                });
            };
            UserMetadataService.prototype.canHandle = function (reason) {
                return reason === Composer.CacheError.Expired || reason === Composer.CacheError.NotFound;
            };
            UserMetadataService.prototype.getFreshMetadata = function () {
                var _this = this;
                return this.membershipRepository.userMetadata()
                    .then(function (result) { return _this.setToCache(result); });
            };
            UserMetadataService.prototype.buildCacheKey = function () {
                return this.cacheKey + "." + Composer.Utils.getCulture() + "." + Composer.Utils.getWebsiteId();
            };
            UserMetadataService.prototype.invalidateCache = function () {
                return this.cacheProvider.defaultCache.clear(this.buildCacheKey());
            };
            UserMetadataService.prototype.getFromCache = function () {
                var composedKey = this.buildCacheKey();
                return this.cacheProvider.defaultCache.get(composedKey);
            };
            UserMetadataService.prototype.setToCache = function (cart) {
                var composedKey = this.buildCacheKey();
                return this.cacheProvider.defaultCache.set(composedKey, cart, this.cachePolicy);
            };
            return UserMetadataService;
        }());
        Composer.UserMetadataService = UserMetadataService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/vue/index.d.ts' />
///<reference path='../../Composer.MyAccount/Common/MembershipService.ts' />
///<reference path='../../ErrorHandling/ErrorHandler.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='./ShippingMethodService.ts' />
///<reference path='../../Composer.Cart/CartSummary/CartService.ts' />
///<reference path='../IBaseSingleCheckoutController.ts' />
///<reference path='../../Services/RegionService.ts' />
///<reference path='./IRegisterOptions.ts' />
///<reference path='../Services/PaymentService.ts' />
///<reference path='../Payment/PaymentRepository.ts' />
///<reference path='../Payment/CheckoutPaymentProviderFactory.ts' />
///<reference path='./ISingleCheckoutService.ts' />
///<reference path='../ISingleCheckoutContext.ts' />
///<reference path='../../Composer.MyAccount/Common/CustomerService.ts' />
///<reference path='../VueComponents/CheckoutStepVueComponent.ts' />
///<reference path='../VueComponents/CheckoutPageVueComponent.ts' />
///<reference path='../VueComponents/TransitionCollapseVueComponent.ts' />
///<reference path='../../Composer.MyAccount/Common/MyAccountEvents.ts' />
///<reference path='../../Composer.MyAccount/Common/MyAccountStatus.ts' />
///<reference path='./AddressRegisteredService.ts' />
///<reference path='../../UI/UIModal.ts' />
///<reference path='../../Services/UserMetadataService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CheckoutStepNumbers;
        (function (CheckoutStepNumbers) {
            CheckoutStepNumbers[CheckoutStepNumbers["Information"] = 0] = "Information";
            CheckoutStepNumbers[CheckoutStepNumbers["Shipping"] = 1] = "Shipping";
            CheckoutStepNumbers[CheckoutStepNumbers["ReviewCart"] = 2] = "ReviewCart";
            CheckoutStepNumbers[CheckoutStepNumbers["Billing"] = 3] = "Billing";
            CheckoutStepNumbers[CheckoutStepNumbers["Payment"] = 4] = "Payment";
        })(CheckoutStepNumbers = Composer.CheckoutStepNumbers || (Composer.CheckoutStepNumbers = {}));
        var FulfillmentMethodTypes;
        (function (FulfillmentMethodTypes) {
            FulfillmentMethodTypes["Shipping"] = "Shipping";
            FulfillmentMethodTypes["PickUp"] = "PickUp";
        })(FulfillmentMethodTypes = Composer.FulfillmentMethodTypes || (Composer.FulfillmentMethodTypes = {}));
        var SignInModes;
        (function (SignInModes) {
            SignInModes[SignInModes["Base"] = 0] = "Base";
            SignInModes[SignInModes["UserExists"] = 1] = "UserExists";
            SignInModes[SignInModes["SigningIn"] = 2] = "SigningIn";
        })(SignInModes = Composer.SignInModes || (Composer.SignInModes = {}));
        var SingleCheckoutService = /** @class */ (function () {
            function SingleCheckoutService() {
                this.VueCheckoutMixins = [];
                this.orderConfirmationCacheKey = 'orderConfirmationCacheKey';
                this.orderCacheKey = 'orderCacheKey';
                this.registeredControllers = {};
                this.customerService = new Composer.CustomerService(new Composer.CustomerRepository());
                this.userMetadataService = Composer.UserMetadataService.getInstance();
                this.addressRegisteredService = new Composer.AddressRegisteredService(this.customerService);
                if (SingleCheckoutService.instance) {
                    throw new Error('Instantiation failed: Use SingleCheckoutService.instance() instead of new.');
                }
                this.eventHub = Composer.EventHub.instance();
                this.window = window;
                this.allControllersReady = Q.defer();
                this.cacheProvider = Composer.CacheProvider.instance();
                this.cartService = Composer.CartService.getInstance();
                this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                this.regionService = new Composer.RegionService();
                this.shippingMethodService = new Composer.ShippingMethodService();
                this.paymentService = new Composer.PaymentService(this.eventHub, new Composer.PaymentRepository());
                this.paymentProviderFactory = new Composer.CheckoutPaymentProviderFactory(this.window, this.eventHub);
                this.registerAllControllersInitialized();
                SingleCheckoutService.instance = this;
            }
            SingleCheckoutService.getInstance = function () {
                if (!SingleCheckoutService.instance) {
                    SingleCheckoutService.instance = new SingleCheckoutService();
                }
                return SingleCheckoutService.instance;
            };
            SingleCheckoutService.prototype.registerAllControllersInitialized = function () {
                var _this = this;
                this.eventHub.subscribe('allControllersInitialized', function () {
                    _this.initialize();
                });
            };
            SingleCheckoutService.prototype.initialize = function () {
                var _this = this;
                var authenticatedPromise = this.membershipService.isAuthenticated();
                var userMetadataPromise = this.userMetadataService.getUserMetadata();
                var getCartPromise = this.getCart();
                var regionsPromise = this.regionService.getRegions();
                var shippingMethodTypesPromise = this.shippingMethodService.getShippingMethodTypes();
                Q.all([authenticatedPromise, getCartPromise, regionsPromise, shippingMethodTypesPromise, userMetadataPromise])
                    .spread(function (authVm, cartVm, regionsVm, shippingMethodTypesVm, userMetadataVm) {
                    if (!cartVm.Customer) {
                        cartVm.Customer = {};
                    }
                    var results = {
                        IsAuthenticated: authVm.IsAuthenticated,
                        UseEmailAsUsername: userMetadataVm.UseEmailAsUsername,
                        Cart: cartVm,
                        Regions: regionsVm,
                        ShippingMethodTypes: shippingMethodTypesVm.ShippingMethodTypes,
                        Payment: null
                    };
                    _this.handleCheckoutSecurity(cartVm);
                    _this.initializeVueComponent(results);
                })
                    .then(function () {
                    _this.allControllersReady.resolve(true);
                })
                    .fail(function (reason) {
                    console.error('Error while initializing SingleCheckoutService.', reason);
                    Composer.ErrorHandler.instance().outputErrorFromCode('CheckoutRenderFailed');
                });
            };
            SingleCheckoutService.prototype.handleCheckoutSecurity = function (cart) {
                var redirectUrl = cart.OrderSummary.CheckoutRedirectAction.RedirectUrl;
                if (redirectUrl && !Composer.Utils.IsC1ConsolePreview()) {
                    this.window.location.href = redirectUrl;
                }
            };
            SingleCheckoutService.prototype.initializeVueComponent = function (checkoutContext) {
                var _a;
                var deleteModalElementSelector = '#deleteAddressModal';
                this.VueCheckout = new Vue({
                    el: '#vueSingleCheckout',
                    components: (_a = {},
                        _a[Composer.CheckoutPageVueComponent.componentMame] = Composer.CheckoutPageVueComponent.getComponent(),
                        _a[Composer.CheckoutStepVueComponent.componentMame] = Composer.CheckoutStepVueComponent.getComponent(),
                        _a[Composer.TransitionCollapseVueComponent.componentMame] = Composer.TransitionCollapseVueComponent.getComponent(),
                        _a),
                    data: {
                        Cart: checkoutContext.Cart,
                        Regions: checkoutContext.Regions,
                        ShippingMethodTypes: checkoutContext.ShippingMethodTypes,
                        Payment: null,
                        RegisteredAddresses: [],
                        EditingAddress: {},
                        Steps: {
                            StartStep: 0,
                            Information: {
                                Loading: false
                            },
                            Shipping: {
                                Loading: false
                            },
                            ReviewCart: {
                                Loading: false
                            },
                            Billing: {
                                Loading: false
                            },
                            Payment: {
                                Loading: false
                            }
                        },
                        Mode: {
                            SignIn: SignInModes.Base,
                            AddingNewAddress: false,
                            EditingAddress: false,
                            AddingLine2Address: false,
                            CompleteCheckoutLoading: false,
                            Loading: false,
                            Authenticated: checkoutContext.IsAuthenticated,
                            UseEmailAsUsername: checkoutContext.UseEmailAsUsername
                        },
                        Errors: {
                            PostalCodeError: false,
                            InvalidPhoneFormatError: false,
                            AddressNameAlreadyInUseError: false,
                            StoreLocatorLocationError: false,
                            StoreNotSelectedError: false,
                            SignIn: false
                        },
                        Modal: {
                            deleteAddressModal: null,
                        },
                        AccountLockedDownUntil: {}
                    },
                    mixins: this.VueCheckoutMixins,
                    mounted: function () {
                        if (this.Mode.Authenticated) {
                            this.Modal.deleteAddressModal = new Composer.UIModal(window, deleteModalElementSelector, this.deleteAddress, this);
                        }
                        this.CheckoutPageComponent.activateStepAndCheckStep(this.CheckoutPageComponent.findNotFilledStepId());
                    },
                    computed: {
                        Customer: function () {
                            return this.Cart.Customer;
                        },
                        ShippingAddress: function () {
                            return this.Cart.ShippingAddress;
                        },
                        Rewards: function () {
                            return this.Cart.Rewards;
                        },
                        OrderSummary: function () {
                            return this.Cart.OrderSummary;
                        },
                        CartEmpty: function () {
                            return !this.Cart.LineItemDetailViewModels.length;
                        },
                        IsLoading: function () {
                            return this.Mode.Loading;
                        },
                        IsAuthenticated: function () {
                            return this.Mode.Authenticated;
                        },
                        CheckoutPageComponent: function () {
                            return this.$children[0];
                        }
                    },
                    methods: {
                        initializeParsey: function (formId) {
                            $(formId).parsley({ trigger: 'focusout change' });
                        },
                        validateParsey: function (formId) {
                            var parsleyInit = $(formId).parsley();
                            if (parsleyInit) {
                                parsleyInit.validate();
                                return parsleyInit.isValid();
                            }
                            return true;
                        },
                        resetParsley: function (formId) {
                            $(formId).parsley().reset();
                        },
                        removeStep: function (step) {
                            /// Remove checkout step by the id
                            this.CheckoutPageComponent.removeStep(this.CheckoutPageComponent.$children[step]);
                        },
                        navigateToStep: function (step) {
                            /// Navigate to checkout step by the id
                            this.CheckoutPageComponent.navigateToStep(step);
                        },
                        deleteAddress: function (event) {
                            var element = $(event.target);
                            var $addressListItem = element.closest('[data-address-id]');
                            var addressId = $addressListItem.data('address-id');
                            return SingleCheckoutService.instance.deleteAddress(addressId);
                        },
                        editAddress: function (address, formId) {
                            this.Mode.EditingAddress = true;
                            this.Mode.AddingNewAddress = false;
                            this.EditingAddress = address;
                            this.AddressName = address.AddressName;
                            this.initializeParsey('#' + formId);
                            setTimeout(function () { return Composer.Utils.scrollToElement($('#' + formId)); }, 500);
                        },
                        handleAddressErrors: function (reason) {
                            var _this = this;
                            if (!reason.Errors) {
                                return;
                            }
                            reason.Errors.forEach(function (e) {
                                switch (e.ErrorCode) {
                                    case 'NameAlreadyUsed':
                                        _this.Errors.AddressNameAlreadyInUseError = true;
                                        break;
                                    case 'InvalidPhoneFormat':
                                        _this.Errors.InvalidPhoneFormatError = true;
                                        break;
                                }
                            });
                        },
                        fixAddressNullValues: function (address) {
                            var billingAddressParamsToFix = ['FirstName', 'LastName', 'Line1', 'City', 'RegionCode', 'PostalCode', 'PhoneNumber'];
                            billingAddressParamsToFix.forEach(function (param) {
                                if (address[param] === null) {
                                    address[param] = '';
                                }
                            });
                        },
                        fillAddressNames: function (address) {
                            if (!address.FirstName && !address.LastName) {
                                address.FirstName = this.Customer.FirstName;
                                address.LastName = this.Customer.LastName;
                            }
                        },
                    }
                });
                if (checkoutContext.IsAuthenticated) {
                    this.loadUserAddresses();
                }
            };
            SingleCheckoutService.prototype.calculateStartStep = function (cart, isAuthenticated) {
                if (!this.customerFulfilled(cart)) {
                    return CheckoutStepNumbers.Information;
                }
                else {
                    if (!(this.shippingFulfilled(cart, isAuthenticated))) {
                        return CheckoutStepNumbers.Shipping;
                    }
                    else {
                        if (!this.billingFulfilled(cart, isAuthenticated)) {
                            return CheckoutStepNumbers.Billing;
                        }
                        else {
                            return CheckoutStepNumbers.Payment;
                        }
                    }
                }
            };
            SingleCheckoutService.prototype.customerFulfilled = function (cart) {
                return !!(cart.Customer.FirstName &&
                    cart.Customer.LastName &&
                    cart.Customer.Email);
            };
            SingleCheckoutService.prototype.shippingFulfilled = function (cart, isAuthenticated) {
                if (!(cart.ShippingMethod)) {
                    return false;
                }
                var address = cart.ShippingAddress.Line1 &&
                    cart.ShippingAddress.City &&
                    cart.ShippingAddress.RegionCode &&
                    cart.ShippingAddress.PostalCode &&
                    cart.ShippingAddress.PhoneNumber;
                var isShipToHome = cart.ShippingMethod.FulfillmentMethodTypeString === FulfillmentMethodTypes.Shipping;
                var isPickUp = cart.ShippingMethod.FulfillmentMethodTypeString === FulfillmentMethodTypes.PickUp;
                if (isAuthenticated && isShipToHome) {
                    return (!this.isAddressBookIdEmpty(cart.ShippingAddress.AddressBookId));
                }
                if (!isAuthenticated && isShipToHome) {
                    return !!(address);
                }
                if (isPickUp) {
                    return !!(cart.PickUpLocationId);
                }
                return false;
            };
            SingleCheckoutService.prototype.billingFulfilled = function (cart, isAuthenticated) {
                if (!(cart.Payment)) {
                    return false;
                }
                var billindAddress = cart.Payment.BillingAddress;
                var addressFullfilled = billindAddress.FirstName &&
                    billindAddress.LastName &&
                    billindAddress.Line1 &&
                    billindAddress.City &&
                    billindAddress.RegionCode &&
                    billindAddress.PostalCode &&
                    billindAddress.PhoneNumber;
                if (isAuthenticated) {
                    return !!addressFullfilled && !this.isAddressBookIdEmpty(billindAddress.AddressBookId);
                }
                else {
                    return !!(addressFullfilled);
                }
            };
            SingleCheckoutService.prototype.isAddressBookIdEmpty = function (bookId) {
                return bookId === '00000000-0000-0000-0000-000000000000' || !bookId;
            };
            SingleCheckoutService.prototype.registerController = function (controller) {
                var _this = this;
                if (this.allControllersReady.promise.isPending()) {
                    this.allControllersReady.resolve(false);
                }
                this.allControllersReady.promise
                    .then(function (allControllersReady) {
                    if (allControllersReady) {
                        throw new Error('Too late to register all controllers are ready.');
                    }
                    else {
                        var controllerName = controller.viewModelName;
                        _this.registeredControllers[controllerName] = controller;
                    }
                });
            };
            SingleCheckoutService.prototype.unregisterController = function (controllerName) {
                delete this.registeredControllers[controllerName];
            };
            SingleCheckoutService.prototype.updatePostalCode = function (postalCode) {
                return this.cartService.updateShippingMethodPostalCode(postalCode);
            };
            SingleCheckoutService.prototype.invalidateCache = function () {
                return this.cartService.invalidateCache();
            };
            SingleCheckoutService.prototype.getCart = function () {
                var _this = this;
                return this.invalidateCache()
                    .then(function () { return _this.cartService.getCart(); })
                    .fail(function (reason) {
                    _this.handleError(reason);
                });
            };
            SingleCheckoutService.prototype.removeCartItem = function (id, productId) {
                var _this = this;
                return this.invalidateCache().
                    then(function () { return _this.cartService.deleteLineItem(id, productId); })
                    .fail(function (reason) {
                    _this.handleError(reason);
                });
            };
            SingleCheckoutService.prototype.updateCartItem = function (id, quantity, productId, recurringOrderFrequencyName, recurringOrderProgramName) {
                var _this = this;
                var vue = this.VueCheckout;
                vue.Mode.Loading = true;
                return this.invalidateCache().
                    then(function () { return _this.cartService.updateLineItem(id, quantity, productId, recurringOrderFrequencyName, recurringOrderProgramName); })
                    .then(function (Cart) {
                    _this.updateVueState(vue, Cart);
                    return Cart;
                })
                    .fail(function (reason) {
                    _this.handleError(reason);
                })
                    .finally(function () {
                    vue.Mode.Loading = false;
                });
            };
            SingleCheckoutService.prototype.updateCart = function (controllerNames) {
                var _this = this;
                if (controllerNames === void 0) { controllerNames = null; }
                var emptyVm = {
                    UpdatedCart: {}
                };
                var vue = this.VueCheckout;
                vue.Mode.Loading = true;
                return this.buildCartUpdateViewModel(emptyVm, controllerNames)
                    .then(function (vm) { return _this.cartService.updateCart(vm); })
                    .then(function (result) {
                    var Cart = result.Cart;
                    _this.updateVueState(vue, Cart);
                    return result;
                })
                    .finally(function () {
                    vue.Mode.Loading = false;
                });
            };
            SingleCheckoutService.prototype.updateVueState = function (vue, Cart) {
                vue.customerBeforeEdit = __assign({}, Cart.Customer);
                vue.adressBeforeEdit = __assign({}, Cart.ShippingAddress);
                vue.billingAddressBeforeEdit = __assign({}, Cart.Payment.BillingAddress);
                var errorKeys = _.keys(vue.Errors);
                _.each(errorKeys, function (key) {
                    vue.Errors[key] = false;
                });
                vue.Cart = Cart;
                vue.updateBeforeEditLineItemList();
            };
            SingleCheckoutService.prototype.updatePaymentMethod = function (param) {
                var vue = this.VueCheckout;
                vue.Steps.Payment.Loading = true;
                return this.paymentService.updatePaymentMethod(param)
                    .finally(function () {
                    vue.Steps.Payment.Loading = false;
                });
            };
            SingleCheckoutService.prototype.completeCheckout = function () {
                var _this = this;
                console.log('completeCheckout(): Publishing the cart!');
                return this.cartService.completeCheckout()
                    .then(function (result) {
                    if (_.isEmpty(result.OrderNumber)) {
                        throw {
                            message: 'We could not complete the order because the order number is empty',
                            data: result
                        };
                    }
                    _this.eventHub.publish('checkoutCompleted', { data: result });
                    _this.setOrderToCache(result);
                    _this.setOrderConfirmationToCache(result);
                    if (result.NextStepUrl) {
                        window.location.href = result.NextStepUrl;
                    }
                })
                    .fail(function (reason) {
                    console.error('An error occurred while completing the checkout.', reason);
                    Composer.ErrorHandler.instance().outputErrorFromCode('CompleteCheckoutFailed');
                });
            };
            SingleCheckoutService.prototype.collectViewModelNamesForUpdateCart = function () {
                var controllerInstance;
                var promises = [];
                for (var controllerName in this.registeredControllers) {
                    if (this.registeredControllers.hasOwnProperty(controllerName)) {
                        controllerInstance = this.registeredControllers[controllerName];
                        promises.push(controllerInstance.getViewModelNameForUpdatePromise());
                    }
                }
                return Q.all(promises);
            };
            SingleCheckoutService.prototype.buildCartUpdateViewModel = function (vm, controllersName) {
                if (controllersName === void 0) { controllersName = null; }
                return this.getCartUpdateViewModel(vm, controllersName);
            };
            SingleCheckoutService.prototype.getCartUpdateViewModel = function (vm, controllersName) {
                if (controllersName === void 0) { controllersName = null; }
                var updateModelPromise = this.collectUpdateModelPromises(controllersName);
                return updateModelPromise.then(function (updates) {
                    console.log('Aggregating all ViewModel updates.');
                    _.each(updates, function (update) {
                        if (update) {
                            var keys = _.keys(update);
                            _.each(keys, function (key) {
                                vm.UpdatedCart[key] = update[key];
                            });
                        }
                    });
                    return vm;
                });
            };
            SingleCheckoutService.prototype.collectUpdateModelPromises = function (controllerNames) {
                if (controllerNames === void 0) { controllerNames = null; }
                var promises = [];
                var controllerInstance;
                var _loop_1 = function (controllerName) {
                    if (controllerNames && !controllerNames.find(function (i) { return i === controllerName; })) {
                        return "continue";
                    }
                    if (this_1.registeredControllers.hasOwnProperty(controllerName)) {
                        controllerInstance = this_1.registeredControllers[controllerName];
                        promises.push(controllerInstance.getUpdateModelPromise());
                    }
                };
                var this_1 = this;
                for (var controllerName in this.registeredControllers) {
                    _loop_1(controllerName);
                }
                return Q.all(promises);
            };
            SingleCheckoutService.prototype.handleError = function (reason) {
                console.error('Unable to retrieve the cart for the checkout', reason);
                throw reason;
            };
            SingleCheckoutService.prototype.setOrderConfirmationToCache = function (orderConfirmationViewModel) {
                this.cacheProvider.defaultCache.set(this.orderConfirmationCacheKey, orderConfirmationViewModel).done();
            };
            SingleCheckoutService.prototype.getOrderConfirmationFromCache = function () {
                return this.cacheProvider.defaultCache.get(this.orderConfirmationCacheKey);
            };
            SingleCheckoutService.prototype.clearOrderConfirmationFromCache = function () {
                this.cacheProvider.defaultCache.clear(this.orderConfirmationCacheKey).done();
            };
            SingleCheckoutService.prototype.setOrderToCache = function (orderConfirmationViewModel) {
                this.cacheProvider.defaultCache.set(this.orderCacheKey, orderConfirmationViewModel).done();
            };
            SingleCheckoutService.prototype.getPaymentProviders = function (paymentProviders) {
                var _this = this;
                if (_.isEmpty(paymentProviders)) {
                    console.error('No payment provider was found');
                }
                return paymentProviders.map(function (vm) { return _this.paymentProviderFactory.getInstance(vm.ProviderType, vm.ProviderName); });
            };
            SingleCheckoutService.prototype.getPaymentCheckout = function () {
                return this.paymentService.getCheckoutPayment();
            };
            SingleCheckoutService.prototype.updateBillingPostalCode = function (postalCode) {
                return this.cartService.updateBillingMethodPostalCode(postalCode);
            };
            SingleCheckoutService.prototype.saveAddressToMyAccountAddressBook = function (address) {
                var _this = this;
                return this.customerService.createAddress(address, null).then(function (address) {
                    var vue = _this.VueCheckout;
                    vue.RegisteredAddresses.push(address);
                    return address;
                });
            };
            SingleCheckoutService.prototype.updateAddressInMyAccountAddressBook = function (address) {
                return this.customerService.updateAddress(address, address.Id, null);
            };
            SingleCheckoutService.prototype.deleteAddress = function (addressId) {
                var _this = this;
                return this.customerService.deleteAddress(addressId, null).then(function () {
                    var vue = _this.VueCheckout;
                    var index = vue.RegisteredAddresses.findIndex(function (address) { return address.Id === addressId; });
                    if (index > -1) {
                        vue.RegisteredAddresses.splice(index, 1);
                    }
                });
            };
            SingleCheckoutService.prototype.loginUser = function (formData) {
                var _this = this;
                var returnUrl = window.location.pathname;
                var vue = this.VueCheckout;
                vue.Steps.Information.Loading = true;
                return this.membershipService.login(formData, returnUrl)
                    .then(function (result) { return _this.onLoginFulfilled(result, vue); })
                    .then(function () { return _this.cartService.getFreshCart(true); })
                    .then(function (cart) {
                    _this.updateVueState(vue, cart);
                    vue.Mode.Authenticated = true;
                    vue.Mode.SignIn = SignInModes.Base;
                    vue.Steps.Information.Loading = false;
                    return true;
                })
                    .fail(function (_a) {
                    var error = _a.Errors[0];
                    _this.onLoginRejected(error, vue);
                    return false;
                }).finally(function () { return vue.Steps.Information.Loading = false; });
            };
            SingleCheckoutService.prototype.onLoginFulfilled = function (result, vueData) {
                if (result.Status === Composer.MyAccountStatus[Composer.MyAccountStatus.Success]) {
                    this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn], { data: result });
                    this.cacheProvider.defaultCache.set('customerId', null).done();
                    this.cacheProvider.sessionCache.fullClear();
                    this.userMetadataService.invalidateCache();
                    this.loadUserAddresses();
                    return true;
                    // vueData.$children[0].navigateToStep(CheckoutStepNumbers.Shipping);
                }
                else {
                    vueData.Errors.SignIn = result.Status;
                }
            };
            SingleCheckoutService.prototype.onLoginRejected = function (error, vueData) {
                var errorCode = Composer.MyAccountStatus[Composer.MyAccountStatus.AjaxFailed];
                if (error && error.ErrorCode) {
                    errorCode = error.ErrorCode;
                }
                console.error('An error occurred while logging in.', error.ErrorMessage);
                vueData.Errors.SignIn = errorCode;
                vueData.AccountLockedDownUntil = error.Bag["AccountLockedDownUntil"];
            };
            SingleCheckoutService.prototype.checkUserExist = function (email) {
                return this.membershipService.isUserExist(email)
                    .then(function (result) { return result.IsExist; });
            };
            SingleCheckoutService.prototype.loadUserAddresses = function () {
                var _this = this;
                var vue = this.VueCheckout;
                return this.addressRegisteredService.getShippingAddresses(vue.Cart)
                    .then(function (data) {
                    vue.RegisteredAddresses = data.Addresses;
                    vue.SelectedShippingAddressId = data.SelectedShippingAddressId;
                    vue.SelectedBillingAddressId = data.SelectedBillingAddressId;
                    if (_this.isAddressBookIdEmpty(vue.Cart.ShippingAddress.AddressBookId)) {
                        vue.Cart.ShippingAddress.AddressBookId = data.SelectedShippingAddressId;
                    }
                });
            };
            return SingleCheckoutService;
        }());
        Composer.SingleCheckoutService = SingleCheckoutService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='../ErrorHandling/ErrorHandler.ts' />
///<reference path='./IBaseSingleCheckoutController.ts' />
///<reference path='./Services/ISingleCheckoutService.ts' />
///<reference path='./Services/SingleCheckoutService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var BaseSingleCheckoutController = /** @class */ (function (_super) {
            __extends(BaseSingleCheckoutController, _super);
            function BaseSingleCheckoutController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.formSelector = 'form';
                return _this;
            }
            BaseSingleCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.checkoutService = Composer.SingleCheckoutService.getInstance();
                this.registerController();
            };
            BaseSingleCheckoutController.prototype.registerController = function () {
                this.checkoutService.registerController(this);
            };
            BaseSingleCheckoutController.prototype.unregisterController = function () {
                this.checkoutService.unregisterController(this.viewModelName);
            };
            BaseSingleCheckoutController.prototype.getUpdateModelPromise = function () {
                return Q.resolve(null);
            };
            BaseSingleCheckoutController.prototype.getViewModelNameForUpdatePromise = function () {
                return Q.resolve(null);
            };
            BaseSingleCheckoutController.prototype.getContainer = function () {
                return $("[data-oc-controller='" + this.context.container.data('oc-controller') + "']");
            };
            return BaseSingleCheckoutController;
        }(Orckestra.Composer.Controller));
        Composer.BaseSingleCheckoutController = BaseSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var BillingAddressSingleCheckoutController = /** @class */ (function (_super) {
            __extends(BillingAddressSingleCheckoutController, _super);
            function BillingAddressSingleCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BillingAddressSingleCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                self.viewModelName = 'BillingAddress';
                self.formSelector = '#billingAddressForm';
                var vueBillingAddressMixin = {
                    created: function () {
                        this.billingAddressBeforeEdit = __assign({}, this.Cart.Payment.BillingAddress);
                    },
                    computed: {
                        FulfilledBillingAddress: function () {
                            return self.checkoutService.billingFulfilled(this.Cart, this.IsAuthenticated);
                        },
                        BillingAddress: function () {
                            return this.Cart.Payment.BillingAddress;
                        }
                    },
                    methods: {
                        prepareBilling: function () {
                            return this.IsAuthenticated ? this.prepareBillingAddressRegistered() : this.prepareBillingAddress();
                        },
                        prepareBillingAddress: function () {
                            this.fillAddressNames(this.Cart.Payment.BillingAddress);
                            this.fixAddressNullValues(this.Cart.Payment.BillingAddress);
                            if (this.IsPickUpMethodType) {
                                this.Cart.Payment.BillingAddress.UseShippingAddress = false;
                            }
                            return Q.resolve(true);
                        },
                        processBillingAddress: function () {
                            var _this = this;
                            if (!this.billingAddressModified()) {
                                return Q.resolve(true);
                            }
                            if (!this.BillingAddress.UseShippingAddress) {
                                var isValid = this.validateParsey(self.formSelector);
                                if (!isValid) {
                                    return Q.reject('Billing Address information is not valid');
                                }
                                var postalCode = this.BillingAddress.PostalCode;
                                return this.changeBillingPostalCode(postalCode)
                                    .then(function () { return _this.updateBillingAddress(); });
                            }
                            else {
                                return this.updateBillingAddress();
                            }
                        },
                        updateBillingAddress: function () {
                            var _this = this;
                            this.Steps.Billing.Loading = true;
                            return self.checkoutService.updateCart([self.viewModelName])
                                .then(function () {
                                _this.Mode.AddingNewAddress = !_this.BillingAddress.AddressBookId;
                                return true;
                            })
                                .finally(function () { return _this.Steps.Billing.Loading = false; });
                        },
                        changeBillingPostalCode: function (postalCode) {
                            var _this = this;
                            this.Errors.PostalCodeError = false;
                            if (this.billingAddressBeforeEdit.PostalCode === postalCode) {
                                return Q.resolve(true);
                            }
                            this.Mode.Loading = true;
                            return self.checkoutService.updateBillingPostalCode(postalCode)
                                .then(function (cart) {
                                var _a = cart.Payment.BillingAddress, PostalCode = _a.PostalCode, RegionCode = _a.RegionCode, RegionName = _a.RegionName;
                                _this.Cart.Payment.BillingAddress = __assign({}, _this.BillingAddress, { PostalCode: PostalCode,
                                    RegionCode: RegionCode,
                                    RegionName: RegionName });
                                return true;
                            })
                                .fail(function (reason) {
                                _this.Errors.PostalCodeError = true;
                                throw Error(reason);
                            })
                                .finally(function () { return _this.Mode.Loading = false; });
                        },
                        billingAddressModified: function () {
                            var _this = this;
                            var keys = _.keys(this.BillingAddress).filter(function (k) { return k !== 'UseShippingAddress'; });
                            var dataToCompare = this.BillingAddress.UseShippingAddress ? this.ShippingAddress : this.BillingAddress;
                            return this.BillingAddress && _.some(keys, function (key) { return _this.billingAddressBeforeEdit[key] !== dataToCompare[key]; });
                        },
                        changeUseShippingAddress: function (event) {
                            var checked = event.target.checked;
                            if (checked === this.billingAddressBeforeEdit.UseShippingAddress) {
                                this.Cart.Payment.BillingAddress = __assign({}, this.billingAddressBeforeEdit);
                            }
                            else {
                                if (!checked) {
                                    this.clearBillingAddress();
                                }
                                else {
                                    this.copyShippingAddress();
                                }
                            }
                        },
                        copyShippingAddress: function () {
                            var _a = this.Cart.ShippingAddress, FirstName = _a.FirstName, LastName = _a.LastName, CountryCode = _a.CountryCode, Line1 = _a.Line1, City = _a.City, RegionCode = _a.RegionCode, PostalCode = _a.PostalCode, PhoneNumber = _a.PhoneNumber, AddressBookId = _a.AddressBookId, PhoneRegex = _a.PhoneRegex;
                            this.Cart.Payment.BillingAddress = {
                                FirstName: FirstName, LastName: LastName, CountryCode: CountryCode,
                                Line1: Line1, City: City, RegionCode: RegionCode, PostalCode: PostalCode,
                                PhoneNumber: PhoneNumber, AddressBookId: AddressBookId, PhoneRegex: PhoneRegex, UseShippingAddress: true
                            };
                        },
                        clearBillingAddress: function () {
                            this.Mode.AddingLine2Address = true;
                            var _a = this.Cart.Payment.BillingAddress, FirstName = _a.FirstName, LastName = _a.LastName, CountryCode = _a.CountryCode, PhoneRegex = _a.PhoneRegex, PostalCodeRegexPattern = _a.PostalCodeRegexPattern, UseShippingAddress = _a.UseShippingAddress;
                            this.Cart.Payment.BillingAddress = {
                                FirstName: FirstName || this.Cart.Customer.FirstName,
                                LastName: LastName || this.Cart.Customer.LastName,
                                CountryCode: CountryCode, PhoneRegex: PhoneRegex, PostalCodeRegexPattern: PostalCodeRegexPattern, UseShippingAddress: UseShippingAddress, AddressBookId: null,
                                Line1: '', City: '', RegionCode: '', PostalCode: '', PhoneNumber: ''
                            };
                        },
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueBillingAddressMixin);
            };
            BillingAddressSingleCheckoutController.prototype.getViewModelNameForUpdatePromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var vueData = _this.checkoutService.VueCheckout;
                    if (vueData.IsAuthenticated) {
                        return;
                    }
                    var isValid = vueData.validateParsey(_this.formSelector);
                    if (!isValid) {
                        console.log('Billing Address information is not valid');
                        return Q.reject('Billing Address information is not valid');
                    }
                    if (vueData.billingAddressModified()) {
                        return _this.viewModelName;
                    }
                });
            };
            BillingAddressSingleCheckoutController.prototype.getUpdateModelPromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var _a;
                    var Payment = _this.checkoutService.VueCheckout.Cart.Payment;
                    return _a = {}, _a[_this.viewModelName] = JSON.stringify(Payment.BillingAddress), _a;
                });
            };
            return BillingAddressSingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.BillingAddressSingleCheckoutController = BillingAddressSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BillingAddressSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var BillingAddressRegisteredSingleCheckoutController = /** @class */ (function (_super) {
            __extends(BillingAddressRegisteredSingleCheckoutController, _super);
            function BillingAddressRegisteredSingleCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BillingAddressRegisteredSingleCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                self.viewModelName = 'BillingAddressRegistered';
                self.formSelector = '#addNewBillingAddressForm';
                var vueBillingAddressRegisteredMixin = {
                    data: {
                        SelectedBillingAddressId: null,
                        deleteBillingAddressModal: null,
                    },
                    methods: {
                        prepareBillingAddressRegistered: function () {
                            if (self.checkoutService.isAddressBookIdEmpty(this.Cart.Payment.BillingAddress.AddressBookId)
                                && !self.checkoutService.isAddressBookIdEmpty(this.SelectedBillingAddressId)) {
                                this.Cart.Payment.BillingAddress.AddressBookId = this.SelectedBillingAddressId;
                                return self.checkoutService.updateCart([self.viewModelName]);
                            }
                            if (this.IsPickUpMethodType) {
                                this.Cart.Payment.BillingAddress.UseShippingAddress = false;
                            }
                            return Q.resolve(true);
                        },
                        processBillingAddressRegistered: function () {
                            if (!this.billingAddressModified()) {
                                return Q.resolve(true);
                            }
                            return self.checkoutService.updateCart([self.viewModelName])
                                .then(function () { return true; });
                        },
                        addNewBillingAddress: function () {
                            this.Mode.AddingNewAddress = true;
                            this.clearBillingAddress();
                            this.initializeParsey(self.formSelector);
                        },
                        addBillingAddressToMyAddressBook: function () {
                            var _this = this;
                            var isValid = this.validateParsey(self.formSelector);
                            if (!isValid) {
                                return Q.reject('Billing Address information is not valid');
                            }
                            var addressData = __assign({}, this.Cart.Payment.BillingAddress);
                            addressData.AddressName = this.AddressName;
                            self.checkoutService.saveAddressToMyAccountAddressBook(addressData)
                                .then(function (address) {
                                return _this.changeRegisteredBillingAddress(address.Id);
                            })
                                .fail(function (reason) {
                                console.log(reason);
                                if (reason.Errors && _.find(reason.Errors, function (e) { return e.ErrorCode === 'NameAlreadyUsed'; })) {
                                    _this.Errors.AddressNameAlreadyInUseError = true;
                                }
                                if (reason.Errors && _.find(reason.Errors, function (e) { return e.ErrorCode === 'InvalidPhoneFormat'; })) {
                                    _this.Errors.InvalidPhoneFormatError = true;
                                }
                            });
                        },
                        changeRegisteredBillingAddress: function (addressId) {
                            this.BillingAddress.AddressBookId = addressId;
                            this.Mode.AddingNewAddress = false;
                            this.Mode.EditingAddress = false;
                            if (!this.debouncechangeRegisteredBillingAddress) {
                                this.debouncechangeRegisteredBillingAddress = _.debounce(function () {
                                    var controllersToUpdate = [self.viewModelName];
                                    self.checkoutService.updateCart(controllersToUpdate);
                                }, 500);
                            }
                            this.debouncechangeRegisteredBillingAddress();
                        },
                        deleteBillingAddressConfirm: function (event) {
                            this.Modal.deleteAddressModal.openModal(event);
                        },
                        updateEditedBillingAddress: function () {
                            var _this = this;
                            var isValid = this.validateParsey('#editAddressForm');
                            if (!isValid) {
                                return Q.reject('Address information is not valid');
                            }
                            this.Mode.Loading = true;
                            this.EditingAddress.AddressName = this.AddressName;
                            self.checkoutService.updateAddressInMyAccountAddressBook(this.EditingAddress)
                                .then(function () {
                                _this.Mode.EditingAddress = false;
                                if (_this.Cart.Payment.BillingAddress.AddressBookId === _this.EditingAddress.Id) {
                                    var isMatch = Composer.AddressUtils.isEquals(_this.Cart.Payment.BillingAddress, _this.EditingAddress);
                                    if (!isMatch) {
                                        return _this.changeRegisteredBillingAddress(_this.EditingAddress.Id);
                                    }
                                }
                            })
                                .fail(function (reason) { return _this.handleAddressErrors(reason); })
                                .fin(function () { return _this.Mode.Loading = false; });
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueBillingAddressRegisteredMixin);
            };
            BillingAddressRegisteredSingleCheckoutController.prototype.getViewModelNameForUpdatePromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var vueData = _this.checkoutService.VueCheckout;
                    if (!vueData.IsAuthenticated) {
                        return;
                    }
                    if (vueData.billingAddressModified()) {
                        return _this.viewModelName;
                    }
                });
            };
            BillingAddressRegisteredSingleCheckoutController.prototype.getUpdateModelPromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var _a;
                    var Payment = _this.checkoutService.VueCheckout.Cart.Payment;
                    var _b = Payment.BillingAddress, AddressBookId = _b.AddressBookId, UseShippingAddress = _b.UseShippingAddress;
                    var value = JSON.stringify({
                        UseShippingAddress: UseShippingAddress,
                        BillingAddressId: AddressBookId
                    });
                    return _a = {}, _a[_this.viewModelName] = value, _a;
                });
            };
            return BillingAddressRegisteredSingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.BillingAddressRegisteredSingleCheckoutController = BillingAddressRegisteredSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BillingAddressSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ChangeRecurringFrequencyCheckoutController = /** @class */ (function (_super) {
            __extends(ChangeRecurringFrequencyCheckoutController, _super);
            function ChangeRecurringFrequencyCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ChangeRecurringFrequencyCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                self.viewModelName = 'ChangeRecurringFrequency';
                var vueChangeRecurringFrequencyMixin = {
                    methods: {
                        changeRecurringMode: function (e, item) {
                            var value = e.target.value;
                            item.RecurringOrderFrequencyName = value !== 'single' && item.RecurringOrderProgramFrequencies.length
                                ? item.RecurringOrderProgramFrequencies[0].RecurringOrderFrequencyName : null;
                        },
                        resetLineItemRecurringFrequency: function (item) {
                            var oldItem = this.beforeEditLineItemList.find(function (lineItem) { return lineItem.Id === item.Id; });
                            item.RecurringOrderFrequencyName = oldItem.RecurringOrderFrequencyName;
                            item.RecurringOrderFrequencyDisplayName = oldItem.RecurringOrderFrequencyDisplayName;
                        },
                        updateLineItemRecurringFrequency: function (event, item) {
                            var _this = this;
                            var collapseId = $(event.target).data('lablecollapse');
                            if (!this.isRecurringFrequencyModified(item)) {
                                this.collapseById(collapseId, 'show');
                                return;
                            }
                            self.checkoutService.updateCartItem(item.Id, item.Quantity, item.ProductId, item.RecurringOrderFrequencyName ? item.RecurringOrderFrequencyName : null, item.RecurringOrderProgramName)
                                .finally(function () {
                                _this.collapseById(collapseId, 'show');
                            });
                        },
                        collapseById: function (collapseId, action) {
                            $("#" + collapseId).collapse(action);
                        },
                        isRecurringFrequencyModified: function (item) {
                            return this.beforeEditLineItemList.find(function (i) { return i.Id === item.Id && i.RecurringOrderFrequencyName !== item.RecurringOrderFrequencyName; });
                        },
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueChangeRecurringFrequencyMixin);
            };
            return ChangeRecurringFrequencyCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.ChangeRecurringFrequencyCheckoutController = ChangeRecurringFrequencyCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var GuestCustomerInfoSingleCheckoutController = /** @class */ (function (_super) {
            __extends(GuestCustomerInfoSingleCheckoutController, _super);
            function GuestCustomerInfoSingleCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GuestCustomerInfoSingleCheckoutController.prototype.initialize = function () {
                var self = this;
                self.viewModelName = 'GuestCustomerInfo';
                self.formSelector = '#editCustomerForms';
                _super.prototype.initialize.call(this);
                var vueUserMixin = {
                    data: {
                        CheckedEmailAddress: {
                            Email: '',
                            IsExist: false
                        }
                    },
                    created: function () {
                        this.customerBeforeEdit = __assign({}, this.Cart.Customer);
                    },
                    mounted: function () {
                        this.initializeParsey(self.formSelector);
                    },
                    computed: {
                        FulfilledCustomer: function () {
                            var _a = this.Cart.Customer, Email = _a.Email, Password = _a.Password, Username = _a.Username;
                            var fulfilledSignIn = this.Mode.UseEmailAsUsername ? Email && Password : Username && Password;
                            var fulfilled = self.checkoutService.customerFulfilled(this.Cart);
                            return !!(this.Mode.SignIn === Composer.SignInModes.SigningIn ? fulfilledSignIn : fulfilled);
                        },
                        BaseInformationMode: function () {
                            return this.Mode.SignIn === Composer.SignInModes.Base;
                        },
                        UserExistsMode: function () {
                            return this.Mode.SignIn === Composer.SignInModes.UserExists;
                        },
                        SigningInMode: function () {
                            return this.Mode.SignIn === Composer.SignInModes.SigningIn;
                        },
                        ShowSignInButton: function () {
                            return this.FulfilledShipping && this.SigningInMode;
                        }
                    },
                    methods: {
                        prepareCustomer: function () {
                            this.initializeParsey(self.formSelector);
                        },
                        processCustomer: function () {
                            var _this = this;
                            if (this.ShowSignInButton) {
                                this.Mode.SignIn = Composer.SignInModes.Base;
                                this.Cart.Customer = __assign({}, this.customerBeforeEdit);
                                return Q.resolve(true);
                            }
                            var isValid = this.validateParsey(self.formSelector);
                            if (!isValid) {
                                return Q.reject('User information is not valid');
                            }
                            if (!this.IsAuthenticated) {
                                switch (this.Mode.SignIn) {
                                    case Composer.SignInModes.Base:
                                        return this.checkUserExist(this.Cart.Customer.Email).then(function (result) {
                                            if (result) {
                                                return !result;
                                            }
                                            return _this.updateCustomer();
                                        });
                                    case Composer.SignInModes.SigningIn:
                                        var _a = this.Cart.Customer, Username = _a.Username, Password = _a.Password;
                                        if (this.Mode.UseEmailAsUsername) {
                                            Username = this.Cart.Customer.Email;
                                        }
                                        var loginData = { Username: Username, Password: Password };
                                        return self.checkoutService.loginUser(loginData);
                                }
                            }
                            return this.updateCustomer();
                        },
                        updateCustomer: function () {
                            var _this = this;
                            if (!this.isCustomerModified()) {
                                return Q.resolve(true);
                            }
                            this.Steps.Information.Loading = true;
                            return self.checkoutService.updateCart([self.viewModelName])
                                .then(function () { return true; }).finally(function () { return _this.Steps.Information.Loading = false; });
                        },
                        isCustomerModified: function () {
                            var _this = this;
                            var keys = _.keys(this.Cart.Customer);
                            var isModified = _.some(keys, function (key) { return _this.customerBeforeEdit[key] !== _this.Cart.Customer[key]; });
                            return isModified;
                        },
                        signInButton: function () {
                            this.resetParsley(self.formSelector);
                            this.Mode.SignIn = Composer.SignInModes.SigningIn;
                        },
                        signInAndContinue: function () {
                            var _this = this;
                            var _a = this.Cart.Customer, Username = _a.Username, Password = _a.Password;
                            if (this.Mode.UseEmailAsUsername) {
                                Username = this.Cart.Customer.Email;
                            }
                            var loginData = { Username: Username, Password: Password };
                            self.checkoutService.loginUser(loginData)
                                .then(function (success) {
                                if (success) {
                                    _this.navigateToStep(Composer.CheckoutStepNumbers.Shipping);
                                }
                            });
                        },
                        continueAsGuestButton: function () {
                            this.resetParsley(self.formSelector);
                            this.Mode.SignIn = Composer.SignInModes.Base;
                            this.Errors.SignIn = false;
                            this.checkUserExist(this.Cart.Customer.Email);
                        },
                        onChangeUsername: function (e) {
                            if (this.UserExistsMode) {
                                this.Mode.SignIn = Composer.SignInModes.Base;
                            }
                        },
                        checkUserExist: function (email) {
                            var _this = this;
                            if (this.CheckedEmailAddress.Email === email) {
                                this.Mode.SignIn = this.CheckedEmailAddress.IsExist ? Composer.SignInModes.UserExists : Composer.SignInModes.Base;
                                return Q.resolve(this.CheckedEmailAddress.IsExist);
                            }
                            return self.checkoutService.checkUserExist(email)
                                .then(function (result) {
                                _this.Mode.SignIn = result ? Composer.SignInModes.UserExists : Composer.SignInModes.Base;
                                _this.CheckedEmailAddress = { Email: email, IsExist: result };
                                return result;
                            });
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueUserMixin);
            };
            GuestCustomerInfoSingleCheckoutController.prototype.getViewModelNameForUpdatePromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var vueData = _this.checkoutService.VueCheckout;
                    var isValid = vueData.validateParsey(_this.formSelector);
                    if (!isValid) {
                        return Q.reject('User information is not valid');
                    }
                    if (vueData.isCustomerModified()) {
                        return _this.viewModelName;
                    }
                });
            };
            GuestCustomerInfoSingleCheckoutController.prototype.getUpdateModelPromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var _a;
                    var vueCustomerData = _this.checkoutService.VueCheckout.Cart.Customer;
                    return _a = {}, _a[_this.viewModelName] = JSON.stringify(vueCustomerData), _a;
                });
            };
            return GuestCustomerInfoSingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.GuestCustomerInfoSingleCheckoutController = GuestCustomerInfoSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='./IGetOrderDetailsUrlRequest.ts' />
///<reference path='./IGuestOrderDetailsViewModel.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Events/IEventHub.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='./IFindOrderService.ts' />
///<reference path='./IGetOrderDetailsUrlRequest.ts' />
///<reference path='./IGuestOrderDetailsViewModel.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var FindOrderService = /** @class */ (function () {
            function FindOrderService(eventHub) {
                this.eventHub = eventHub;
            }
            FindOrderService.prototype.getOrderDetailsUrl = function (req) {
                var _this = this;
                var promise = Composer.ComposerClient.post('/api/order/url', req)
                    .then(function (vm) {
                    _this.eventHub.publish('orderDetailsUrlUpdated', {
                        data: vm
                    });
                    return vm;
                });
                return promise;
            };
            FindOrderService.prototype.addOrderToCurrentUser = function (orderNumber) {
                return Composer.ComposerClient.post("/api/order/attach-customer/" + orderNumber, {});
            };
            return FindOrderService;
        }());
        Composer.FindOrderService = FindOrderService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var PasswordCheckService = /** @class */ (function () {
            function PasswordCheckService(_a) {
                var _b = _a.minimumLength, minimumLength = _b === void 0 ? 6 : _b, passwordPattern = _a.passwordPattern;
                this.minimumLength = minimumLength;
                this.passwordPattern = passwordPattern;
            }
            PasswordCheckService.prototype.isPasswordCommon = function (password) {
                return this.passwordPattern.test(password);
            };
            //
            // Returns the strength of the current password
            //
            PasswordCheckService.prototype.checkPasswordStrength = function (password) {
                var numberOfElements = 0;
                /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements; // Lowercase letters
                /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements; // Uppercase letters
                /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements; // Numbers
                /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements; // Special characters (inc. space)
                // Check then strength of this password using some simple rules
                if (password === null || password.length < this.minimumLength) {
                    return "short" /* Short */;
                }
                if (!this.isPasswordCommon(password)) {
                    return "common" /* Common */;
                }
                if (numberOfElements <= 2) {
                    return "weak" /* Weak */;
                }
                if (numberOfElements === 3) {
                    return "ok" /* Ok */;
                }
                return "strong" /* Strong */;
            };
            return PasswordCheckService;
        }());
        Composer.PasswordCheckService = PasswordCheckService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../../Typings/vue/index.d.ts' />
///<reference path='../Composer.Cart/FindMyOrder/IFindOrderService.ts' />
///<reference path='../Composer.Cart/FindMyOrder/FindOrderService.ts' />
///<reference path='../Cache/CacheProvider.ts' />
///<reference path='../Repositories/ICartRepository.ts' />
///<reference path='../Composer.MyAccount/Common/IMembershipService.ts' />
///<reference path='../Composer.MyAccount/Common/MembershipService.ts' />
///<reference path='../Composer.MyAccount/Common/MyAccountEvents.ts' />
///<reference path='../Composer.MyAccount/Common/MyAccountStatus.ts' />
///<reference path='../Utils/PasswordCheckService.ts' />
///<reference path='../ErrorHandling/ErrorHandler.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var OrderConfirmationController = /** @class */ (function (_super) {
            __extends(OrderConfirmationController, _super);
            function OrderConfirmationController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.orderConfirmationCacheKey = 'orderConfirmationCacheKey';
                _this.orderCacheKey = 'orderCacheKey';
                return _this;
            }
            OrderConfirmationController.prototype.initialize = function () {
                var _this = this;
                var self = this;
                _super.prototype.initialize.call(this);
                this.cacheProvider = Composer.CacheProvider.instance();
                this.findOrderService = new Composer.FindOrderService(this.eventHub);
                this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                var form = this.context.container.find('form');
                this.passwordCheckService = new Composer.PasswordCheckService({
                    passwordPattern: RegExp(form.data('password-pattern')),
                    minimumLength: form.data('password-length')
                });
                this.cacheProvider.defaultCache.get(this.orderCacheKey)
                    .then(function (result) {
                    _this.eventHub.publish('CheckoutConfirmation', { data: result });
                    _this.cacheProvider.defaultCache.clear(_this.orderCacheKey).done();
                })
                    .fail(function (reason) {
                    console.error('Unable to retrieve order number from cache, attempt to redirect.');
                });
                this.cacheProvider.defaultCache.get(this.orderConfirmationCacheKey)
                    .then(function (result) {
                    if (!result) {
                        console.error('Order was placed but it is not possible to retrieve order number from cache.');
                        return;
                    }
                    _this.VueCheckoutOrderConfirmation = new Vue({
                        el: '#vueCheckoutOrderConfirmation',
                        data: __assign({ Password: null, IsUserExist: true, IsLoading: false, IsAuthenticated: false, PasswordStrength: '', ShowPassword: false, IsUpdatedOrder: result.IsUpdatedOrder ? result.IsUpdatedOrder : false }, result),
                        mounted: function () {
                            var _this = this;
                            self.findUserAsync(result.CustomerEmail).then(function (isExist) {
                                _this.IsUserExist = isExist;
                            });
                            self.IsAuthenticated().then(function (isAuthenticated) {
                                _this.IsAuthenticated = isAuthenticated;
                            });
                        },
                        computed: {
                            ShowCreateAccountForm: function () {
                                return !this.IsUserExist && !this.IsAuthenticated;
                            }
                        },
                        methods: {
                            getCreateAccountForm: function () {
                                return $("#formCreateAccount");
                            },
                            findMyOrder: function () {
                                var findMyOrderRequest = {
                                    OrderNumber: this.OrderNumber,
                                    Email: this.CustomerEmail
                                };
                                self.findOrderAsync(findMyOrderRequest).then(function (result) {
                                    window.location.href = result.Url;
                                });
                            },
                            createAccount: function () {
                                var _this = this;
                                var parsleyInit = this.getCreateAccountForm().parsley();
                                if (parsleyInit && !parsleyInit.validate()) {
                                    return;
                                }
                                this.IsLoading = true;
                                self.createCustomer(this.CustomerFirstName, this.CustomerLastName, this.CustomerEmail, this.Password)
                                    .then(function (result) { return self.findOrderService.addOrderToCurrentUser(_this.OrderNumber)
                                    .then(function () {
                                    if (result.ReturnUrl) {
                                        window.location.replace(decodeURIComponent(result.ReturnUrl));
                                    }
                                }); })
                                    .finally(function () {
                                    _this.IsLoading = false;
                                });
                            },
                            onChangePassword: function (e) {
                                var value = e.target.value;
                                this.PasswordStrength = self.passwordCheckService.checkPasswordStrength(value);
                            },
                            showPasswordToggle: function () {
                                this.ShowPassword = !this.ShowPassword;
                            }
                        }
                    });
                    _this.eventHub.publish('checkoutStepRendered', {
                        data: { StepNumber: 'confirmation' }
                    });
                    _this.cacheProvider.defaultCache.clear(_this.orderConfirmationCacheKey).done();
                })
                    .fail(function (reason) {
                    console.error('Unable to retrieve order number from cache, attempt to redirect.');
                    var redirectUrl = _this.context.container.data('redirecturl');
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    }
                    else {
                        console.error('Redirect url was not detected.');
                    }
                });
            };
            OrderConfirmationController.prototype.findOrderAsync = function (request) {
                return this.findOrderService.getOrderDetailsUrl(request);
            };
            OrderConfirmationController.prototype.findUserAsync = function (email) {
                return this.membershipService.isUserExist(email)
                    .then(function (result) { return result.IsExist; });
            };
            OrderConfirmationController.prototype.createCustomer = function (FirstName, LastName, Email, Password) {
                var _this = this;
                var formData = { FirstName: FirstName, LastName: LastName, Email: Email, Password: Password };
                return this.membershipService.register(formData, null).then(function (result) {
                    _this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.AccountCreated], { data: result });
                    if (result.Status === Composer.MyAccountStatus[Composer.MyAccountStatus.Success]) {
                        _this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn], { data: result });
                    }
                    return result;
                }).fail(function (_a) {
                    var error = _a.Errors[0];
                    Composer.ErrorHandler.instance().outputErrorFromCode(error.ErrorCode);
                    throw error;
                });
            };
            OrderConfirmationController.prototype.IsAuthenticated = function () {
                return this.membershipService.isAuthenticated().then(function (result) { return result.IsAuthenticated; });
            };
            return OrderConfirmationController;
        }(Orckestra.Composer.Controller));
        Composer.OrderConfirmationController = OrderConfirmationController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var OrderSummarySingleCheckoutController = /** @class */ (function (_super) {
            __extends(OrderSummarySingleCheckoutController, _super);
            function OrderSummarySingleCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OrderSummarySingleCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                var vueCompleteCheckoutMixin = {
                    computed: {
                        OrderCanBePlaced: function () {
                            return !this.Mode.Loading
                                && !this.Mode.CompleteCheckoutLoading
                                && !this.CartEmpty
                                && this.FulfilledShipping
                                && this.FulfilledBillingAddress
                                && this.Payment;
                        },
                        IsShippingEstimatedOrSelected: function () {
                            return this.OrderSummary.IsShippingEstimatedOrSelected && !this.IsPickUpMethodType;
                        }
                    },
                    methods: {
                        processCompleteCheckout: function () {
                            var _this = this;
                            this.Mode.CompleteCheckoutLoading = true;
                            return self.checkoutService.collectViewModelNamesForUpdateCart().
                                then(function (viewModels) {
                                return self.checkoutService.updateCart(viewModels);
                            })
                                .then(function () { return _this.submitPayment(); })
                                .then(function () { return self.checkoutService.completeCheckout(); })
                                .fail(function (reason) {
                                console.error('An error occurred while completing the checkout.', reason);
                                Composer.ErrorHandler.instance().outputErrorFromCode('CompleteCheckoutFailed');
                            })
                                .finally(function () { return _this.Mode.CompleteCheckoutLoading = false; });
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueCompleteCheckoutMixin);
            };
            return OrderSummarySingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.OrderSummarySingleCheckoutController = OrderSummarySingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var PaymentSingleCheckoutController = /** @class */ (function (_super) {
            __extends(PaymentSingleCheckoutController, _super);
            function PaymentSingleCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PaymentSingleCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                self.viewModelName = 'Payment';
                var SAVED_CREDIT_CARD = 'SavedCreditCard';
                var vuePaymentMixin = {
                    mounted: function () {
                        if (this.FulfilledBillingAddress) {
                            this.preparePayment();
                        }
                    },
                    computed: {
                        FulfilledPayment: function () {
                            return !!this.ActivePayment;
                        },
                        MainPaymentMethods: function () {
                            return this.Payment.PaymentMethods.filter(function (method) { return !method.IsCreditCardPaymentMethod; });
                        },
                        HasCreditCardProvider: function () {
                            return this.Payment.PaymentMethods.find(function (m) { return m.IsCreditCardPaymentMethod; });
                        },
                        SavedCreditCardMethods: function () {
                            return this.Payment.PaymentMethods.filter(function (method) {
                                return method.IsCreditCardPaymentMethod && method.PaymentType === SAVED_CREDIT_CARD;
                            });
                        },
                        NewCreditCardMethod: function () {
                            return this.Payment.PaymentMethods.find(function (method) {
                                return method.IsCreditCardPaymentMethod && method.PaymentType !== SAVED_CREDIT_CARD;
                            });
                        },
                        PaymentProviderNames: function () {
                            return this.Payment.PaymentProviders.map(function (p) { return p.ProviderName; });
                        },
                        ActivePayment: function () {
                            return this.Payment ? this.Payment.ActivePaymentViewModel : null;
                        },
                        CreditCardTrustImage: function () {
                            return this.Payment.CreditCardTrustImage;
                        },
                        SelectedPaymentMethod: function () {
                            return this.Payment.PaymentMethods.find(function (m) { return m.IsSelected; });
                        },
                        IsSavedCreditCardSelected: function () {
                            return this.ActivePayment && this.ActivePayment.PaymentMethodType === SAVED_CREDIT_CARD;
                        },
                        IsCreditCardProviderSelect: function () {
                            return this.SelectedPaymentMethod && this.SelectedPaymentMethod.IsCreditCardPaymentMethod;
                        },
                        IsCreditCardProviderSelected: function () {
                            return this.ActivePayment && this.HasCreditCardProvider &&
                                this.ActivePayment.ProviderType === this.HasCreditCardProvider.PaymentProviderType;
                        },
                        Providers: function () {
                            return self.checkoutService.getPaymentProviders(this.Payment.PaymentProviders);
                        }
                    },
                    methods: {
                        selectNewCreditCardPaymentMethod: function () {
                            this.changePaymentMethodProcess(this.ActivePayment.Id, this.NewCreditCardMethod, this.PaymentProviderNames);
                        },
                        changeCardPaymentMethod: function (e) {
                            var value = e.target.value;
                            var selectedMethod = this.SavedCreditCardMethods.find(function (method) { return method.Id === value; });
                            this.changePaymentMethodProcess(this.ActivePayment.Id, selectedMethod, this.PaymentProviderNames);
                        },
                        changePaymentMethod: function (e) {
                            var value = e.target.value;
                            var selectedMethod = this.MainPaymentMethods.find(function (method) { return method.PaymentType === value; })
                                || this.SavedCreditCardMethods.find(function (m) { return m.Default; })
                                || this.NewCreditCardMethod;
                            this.changePaymentMethodProcess(this.ActivePayment.Id, selectedMethod, this.PaymentProviderNames);
                        },
                        changePaymentMethodProcess: function (paymentId, paymentMethodEntity, providers) {
                            var _this = this;
                            var oldPayment = this.SelectedPaymentMethod;
                            this.selectPaymentMethod(paymentMethodEntity.Id);
                            this.Mode.Loading = true;
                            self.checkoutService.updatePaymentMethod({
                                PaymentId: paymentId,
                                PaymentProviderName: paymentMethodEntity.PaymentProviderName,
                                PaymentMethodId: paymentMethodEntity.Id,
                                PaymentType: paymentMethodEntity.PaymentType,
                                Providers: providers
                            }).then(function (result) {
                                Composer.ErrorHandler.instance().removeErrors();
                                _this.Payment.ActivePaymentViewModel = result;
                            }).fail(function (reason) {
                                console.error('Error while changing the payment method.', reason);
                                Composer.ErrorHandler.instance().outputErrorFromCode('PaymentMethodChangeFailed');
                                _this.selectPaymentMethod(oldPayment.Id);
                            }).fin(function () { return _this.Mode.Loading = false; });
                        },
                        selectPaymentMethod: function (paymentId) {
                            this.Payment.PaymentMethods.forEach(function (method) { return method.IsSelected = method.Id === paymentId; });
                        },
                        findActivePaymentProvider: function () {
                            var ProviderType = this.Payment.ActivePaymentViewModel.ProviderType;
                            return self.activePaymentProvider = this.Providers.find(function (provider) { return provider.providerType === ProviderType; });
                        },
                        processPayment: function () {
                            var activeProvider = this.findActivePaymentProvider();
                            return activeProvider.validatePayment(this.Payment.ActivePaymentViewModel)
                                .then(function (success) {
                                if (!success) {
                                    return Q.reject('Card information not valid');
                                }
                                return true;
                            });
                        },
                        submitPayment: function () {
                            var _this = this;
                            return this.processPayment()
                                .then(function () {
                                console.log('Committing payment information.');
                                return self.activePaymentProvider.submitPayment(_this.Payment.ActivePaymentViewModel);
                            });
                        },
                        preparePayment: function () {
                            var _this = this;
                            if (!this.Payment) {
                                this.Steps.Payment.Loading = true;
                                return self.checkoutService.getPaymentCheckout()
                                    .then(function (paymentVm) {
                                    _this.Payment = paymentVm;
                                    _this.Steps.Payment.Loading = false;
                                    return true;
                                });
                            }
                            else {
                                return Q.resolve(true);
                            }
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vuePaymentMixin);
            };
            return PaymentSingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.PaymentSingleCheckoutController = PaymentSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var StoreLocatorEndPointUrls = /** @class */ (function () {
            function StoreLocatorEndPointUrls() {
            }
            StoreLocatorEndPointUrls.GetStoresEndPointUrl = '/api/storelocator/stores';
            StoreLocatorEndPointUrls.GetStoreEndPointUrl = '/api/storelocator/store';
            StoreLocatorEndPointUrls.GetMapConfigurationEndPointUrl = '/api/storelocator/mapconfiguration';
            StoreLocatorEndPointUrls.GetMarkersEndPointUrl = '/api/storelocator/markers';
            return StoreLocatorEndPointUrls;
        }());
        Composer.StoreLocatorEndPointUrls = StoreLocatorEndPointUrls;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Mvc/IControllerContext.ts' />
///<reference path='../../../Mvc/ComposerClient.ts' />
///<reference path='../../../Events/EventHub.ts' />
///<reference path='./IStoreLocatorService.ts' />
///<reference path='./StoreLocatorEndPointUrls.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var StoreLocatorService = /** @class */ (function () {
            function StoreLocatorService() {
            }
            StoreLocatorService.prototype.getStore = function (storeNumber) {
                if (!storeNumber) {
                    throw new Error('The Store Number is required');
                }
                if (!this.memoizeStore) {
                    this.memoizeStore =
                        _.memoize(this.getStoreImpl, function (storeNumber) { return storeNumber; });
                }
                return this.memoizeStore(storeNumber);
            };
            StoreLocatorService.prototype.getStoreImpl = function (storeNumber) {
                var data = { StoreNumber: storeNumber };
                return Composer.ComposerClient.post(Composer.StoreLocatorEndPointUrls.GetStoreEndPointUrl, data);
            };
            StoreLocatorService.prototype.getStores = function (southWest, northEast, searchPoint, page, pageSize) {
                var data = {
                    page: page,
                    pageSize: pageSize,
                    mapBounds: {
                        southWest: southWest,
                        northEast: northEast
                    },
                    searchPoint: searchPoint
                };
                return Composer.ComposerClient.post(Composer.StoreLocatorEndPointUrls.GetStoresEndPointUrl, data);
            };
            StoreLocatorService.prototype.getMapConfiguration = function () {
                return Composer.ComposerClient.get(Composer.StoreLocatorEndPointUrls.GetMapConfigurationEndPointUrl);
            };
            StoreLocatorService.prototype.getMarkers = function (southWest, northEast, zoomLevel, searchPoint, isSearch, pageSize) {
                var data = {
                    zoomLevel: zoomLevel,
                    mapBounds: {
                        southWest: southWest,
                        northEast: northEast
                    },
                    searchPoint: searchPoint,
                    isSearch: isSearch,
                    pageSize: pageSize
                };
                return Composer.ComposerClient.post(Composer.StoreLocatorEndPointUrls.GetMarkersEndPointUrl, data);
            };
            return StoreLocatorService;
        }());
        Composer.StoreLocatorService = StoreLocatorService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/googlemaps/google.maps.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var Marker = /** @class */ (function () {
            function Marker(marker) {
                this._value = marker;
            }
            Object.defineProperty(Marker.prototype, "key", {
                get: function () {
                    return this._key;
                },
                set: function (key) {
                    this._key = key;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Marker.prototype, "value", {
                get: function () {
                    return this._value;
                },
                set: function (marker) {
                    this._value = marker;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Marker.prototype, "storeNumber", {
                get: function () {
                    return this._storeNumber;
                },
                set: function (value) {
                    this._storeNumber = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Marker.prototype, "isCluster", {
                get: function () {
                    return this._isCluster;
                },
                set: function (value) {
                    this._isCluster = value;
                },
                enumerable: true,
                configurable: true
            });
            Marker.prototype.setMap = function (map) {
                this._value.setMap(map);
            };
            Marker.prototype.setPosition = function (position) {
                this._value.setPosition(position);
            };
            return Marker;
        }());
        Composer.Marker = Marker;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='./Marker.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var MarkerPool = /** @class */ (function () {
            function MarkerPool(map, onMarkerCreate) {
                this.markers = [];
                this.indexedMarkersByKey = {};
                this._map = map;
                this._onMarkerCreate = onMarkerCreate;
            }
            MarkerPool.prototype.getMarkers = function () {
                return this.markers;
            };
            MarkerPool.prototype.get = function (isCluster) {
                if (isCluster === void 0) { isCluster = false; }
                var marker = isCluster ? this.createClusterMarker() : this.createMarker();
                marker.isCluster = isCluster;
                this._onMarkerCreate(marker);
                this.markers.push(marker);
                return marker;
            };
            MarkerPool.prototype.getExisting = function (key) {
                return this.indexedMarkersByKey[key];
            };
            MarkerPool.prototype.index = function (marker) {
                this.indexedMarkersByKey[marker.key] = marker;
            };
            MarkerPool.prototype.hasClusters = function () {
                for (var i = 0; i < this.markers.length; i++) {
                    if (this.markers[i] && this.markers[i].isCluster) {
                        return true;
                    }
                }
                return false;
            };
            MarkerPool.prototype.createMarker = function () {
                var marker = new MarkerWithLabel({
                    map: this._map,
                    labelInBackground: false,
                    labelClass: 'store-marker',
                    icon: '/UI.Package/Images/map/marker.png',
                    labelAnchor: new google.maps.Point(12, 42),
                    labelVisible: false
                });
                return new Composer.Marker(marker);
            };
            MarkerPool.prototype.createClusterMarker = function () {
                var marker = new MarkerWithLabel({
                    map: this._map,
                    labelInBackground: false,
                    labelClass: 'store-cluster-marker',
                    icon: '/UI.Package/Images/map/cluster.png',
                    labelAnchor: new google.maps.Point(12, 30),
                    labelVisible: false
                });
                return new Composer.Marker(marker);
            };
            MarkerPool.prototype.releaseAll = function () {
                for (var i = 0; i < this.markers.length; i++) {
                    if (this.markers[i]) {
                        this.markers[i].setMap(null);
                    }
                }
                delete this.markers;
                this.markers = [];
                this.indexedMarkersByKey = {};
            };
            MarkerPool.prototype.releaseByIndex = function (index) {
                var marker = this.indexedMarkersByKey[index];
                if (marker) {
                    delete this.indexedMarkersByKey[index];
                    marker.setMap(null);
                    delete this.markers[this.markers.indexOf(marker)];
                }
            };
            MarkerPool.prototype.releaseClusters = function () {
                var _this = this;
                this.markers.forEach(function (mr) {
                    if (mr.isCluster) {
                        _this.releaseByIndex(mr.key);
                    }
                });
            };
            MarkerPool.prototype.releaseMarkersByIds = function (iscluster, id) {
                var _this = this;
                if (!iscluster) {
                    this.markers.forEach(function (mr) {
                        if (mr && mr.isCluster && mr.storeNumber.indexOf(id) >= 0) {
                            _this.releaseByIndex(mr.key);
                            return;
                        }
                    });
                }
                else {
                    this.markers.forEach(function (mr) {
                        if (mr && !mr.isCluster && id.indexOf(mr.storeNumber) >= 0) {
                            _this.releaseByIndex(mr.key);
                            return;
                        }
                    });
                }
            };
            return MarkerPool;
        }());
        Composer.MarkerPool = MarkerPool;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Generics/Collections/IHashTable.ts' />
///<reference path='./IMapOptions.ts' />
///<reference path='./MarkerPool.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var MapService = /** @class */ (function () {
            function MapService(eventHub) {
                this._mapInitialized = Q.defer();
                this._mapIdle = Q.defer();
                this._mapDragEnded = Q.defer();
                this.eventHub = eventHub;
            }
            MapService.prototype.initialize = function (mapOptions) {
                var _this = this;
                this._map = new google.maps.Map(mapOptions.mapCanvas, mapOptions.options);
                this._informationWindow = new google.maps.InfoWindow({ maxWidth: mapOptions.infoWindowMaxWidth });
                this._markerPool = new Composer.MarkerPool(this._map, function (marker) { _this.onNewMarkerCreated(marker); });
                this.setProjectionOverlay();
                google.maps.event.addListener(this._map, 'click', function () { return _this._informationWindow.close(); });
                google.maps.event.addListener(this._map, 'zoom_changed', function () { return _this._markerPool.releaseClusters(); });
                google.maps.event.addListener(this._map, 'bounds_changed', function () {
                    _this.mapDragEnded()
                        .then(function () {
                        _this.eventHub.publish('mapBoundsUpdated', { data: _this._map.getBounds() });
                    });
                });
                google.maps.event.addListener(this._map, 'idle', function () {
                    _this._mapIdle.resolve(_this);
                });
                google.maps.event.addListener(this._map, 'dragstart', function () {
                    _this._mapDragEnded = Q.defer();
                });
                google.maps.event.addListener(this._map, 'dragend', function () {
                    _this._mapDragEnded.resolve(_this);
                });
                this._mapInitialized.resolve(this);
                this._mapDragEnded.resolve(this);
            };
            MapService.prototype.setProjectionOverlay = function () {
                this._projectionOverlay = new google.maps.OverlayView();
                this._projectionOverlay.draw = function name() {
                    //
                };
                this._projectionOverlay.setMap(this._map);
            };
            MapService.prototype.getMap = function () {
                return this._map;
            };
            MapService.prototype.getInformationWindow = function () {
                return this._informationWindow;
            };
            MapService.prototype.getBounds = function (markerPadding) {
                var bounds = this._map.getBounds();
                if (markerPadding) {
                    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
                    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
                    var projection = this._projectionOverlay.getProjection();
                    if (projection) {
                        var trPix = projection.fromLatLngToDivPixel(tr);
                        var blPix = projection.fromLatLngToDivPixel(bl);
                        blPix.y = blPix.y + markerPadding;
                        trPix.y = trPix.y + markerPadding;
                        var sw = projection.fromDivPixelToLatLng(blPix);
                        var ne = projection.fromDivPixelToLatLng(trPix);
                        return new google.maps.LatLngBounds(sw, ne);
                    }
                }
                return bounds;
            };
            MapService.prototype.getZoom = function () {
                return this._map.getZoom();
            };
            MapService.prototype.onNewMarkerCreated = function (marker) {
                var _this = this;
                if (!marker) {
                    return;
                }
                if (marker.isCluster) {
                    google.maps.event.addListener(marker.value, 'click', function () {
                        _this.eventHub.publish('clusterClick', { data: marker });
                    });
                }
                else {
                    google.maps.event.addListener(marker.value, 'click', function () {
                        _this.eventHub.publish('markerClick', { data: marker });
                    });
                }
            };
            MapService.prototype.mapInitialized = function () {
                return this._mapInitialized.promise;
            };
            MapService.prototype.mapIdle = function () {
                return this._mapIdle.promise;
            };
            MapService.prototype.mapDragEnded = function () {
                return this._mapDragEnded.promise;
            };
            MapService.prototype.centerMap = function (storeBounds) {
                var _this = this;
                if (storeBounds != null) {
                    this.mapIdle().then(function () {
                        var southWest = new google.maps.LatLng(storeBounds.SouthWest.Lat, storeBounds.SouthWest.Lng);
                        var northEast = new google.maps.LatLng(storeBounds.NorthEast.Lat, storeBounds.NorthEast.Lng);
                        var bounds = new google.maps.LatLngBounds(southWest, northEast);
                        _this._map.fitBounds(bounds);
                        _this._mapIdle = Q.defer();
                    });
                }
            };
            MapService.prototype.openInformationWindow = function (content, anchor) {
                this._informationWindow.setContent(content);
                this._informationWindow.open(this._map, anchor);
            };
            MapService.prototype.setLocationInMap = function (point, zoomLevel) {
                var _this = this;
                if (zoomLevel === void 0) { zoomLevel = 11; }
                this.mapIdle().then(function () {
                    _this._map.setCenter(point);
                    _this._map.setZoom(zoomLevel);
                    _this._mapIdle = Q.defer();
                });
            };
            MapService.prototype.extendBounds = function (point1, point2) {
                var _this = this;
                this.mapIdle().then(function () {
                    var bounds = new google.maps.LatLngBounds();
                    bounds.extend(point1);
                    bounds.extend(point2);
                    _this._map.fitBounds(bounds);
                    _this._map.setCenter(bounds.getCenter());
                    _this._mapIdle = Q.defer();
                });
            };
            MapService.prototype.createMarkerOnMap = function (location, title) {
                return new google.maps.Marker({
                    position: location,
                    map: this._map,
                    title: title,
                    icon: 'https://maps.google.com/mapfiles/marker_orange.png'
                });
            };
            MapService.prototype.setMarkers = function (markerInfos, isSearch) {
                if (isSearch === void 0) { isSearch = false; }
                var curZoom = this.getZoom();
                var action = this._prevZoom === curZoom ? 'PAN' : this._prevZoom < curZoom ? 'ZOOM_IN' : 'ZOOM_OUT';
                if (!this._markerPool.hasClusters() && action === 'ZOOM_IN') {
                    this._markerPool.releaseAll();
                }
                if (isSearch) {
                    this._markerPool.releaseAll();
                }
                this._prevZoom = curZoom;
                this.transformResult(markerInfos, this._markerPool, action)
                    .then(function (newMarkers) {
                    newMarkers.forEach(function (m) {
                        m.value.labelVisible = true;
                    });
                });
            };
            MapService.prototype.transformResult = function (result, markerPool, action) {
                var deferred = Q.defer();
                var markers = [];
                function buildMarker(m) {
                    var key = m.Center.Lat + '-' + m.Center.Lng;
                    var marker = null;
                    var isCluster = m.ItemsCount > 1;
                    markerPool.releaseMarkersByIds(isCluster, m.StoreNumber);
                    marker = markerPool.getExisting(key);
                    if (!marker) {
                        marker = markerPool.get(isCluster);
                        var position = new google.maps.LatLng(m.Center.Lat, m.Center.Lng);
                        marker.value.setPosition(position);
                        marker.value.labelContent = (!isCluster ? m.SearchIndex : m.ItemsCount);
                        marker.key = key;
                        marker.storeNumber = m.StoreNumber;
                        marker.isCluster = isCluster;
                        markerPool.index(marker);
                        markers.push(marker);
                    }
                    marker.value.labelContent = (!isCluster ? m.SearchIndex : m.ItemsCount); //update search index;
                }
                for (var i = 0; i < result.length; i++) {
                    var ma = result[i];
                    buildMarker(ma);
                }
                deferred.resolve(markers);
                return deferred.promise;
            };
            return MapService;
        }());
        Composer.MapService = MapService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var GeoLocationService = /** @class */ (function () {
            function GeoLocationService() {
                this._browserGeolocation = navigator.geolocation;
                this._geocoder = new google.maps.Geocoder();
            }
            GeoLocationService.prototype.geolocate = function () {
                return this._browserGeolocation ? this.getCurrentLocation() : Q.reject('browserGeolocation not define');
            };
            GeoLocationService.prototype.getCurrentLocation = function () {
                var _this = this;
                var deferred = Q.defer();
                this._browserGeolocation.getCurrentPosition(function (pos) {
                    _this._currenctLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                    deferred.resolve(_this._currenctLocation);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            GeoLocationService.prototype.getAddressByLocation = function (location) {
                var deferred = Q.defer();
                this._geocoder.geocode({ location: location }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        deferred.resolve(results[0].formatted_address);
                    }
                    else {
                        deferred.resolve('');
                    }
                });
                return deferred.promise;
            };
            GeoLocationService.prototype.getLocationByAddress = function (address) {
                var deferred = Q.defer();
                this._geocoder.geocode({ address: address }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var location = results[0].geometry.location;
                        deferred.resolve(location);
                    }
                    else {
                        deferred.resolve(null);
                        console.log('Location not resolved by Google ' + address);
                    }
                });
                return deferred.promise;
            };
            /// By default render with default value for ViewModel.GoogleDirectionsLink (direction with Empty Start Point),
            /// and when User Accept his Current Location, just in async task update HREF attributes and attach current location coordinates.
            /// We do not update the ViewModel before rendering, as we need to wait for User Input
            GeoLocationService.prototype.updateDirectionLinksWithLatLngSourceAddress = function (container, sourceLocation) {
                var _this = this;
                if (!sourceLocation) {
                    return;
                }
                var ctaDirs = container.find('.ctaGoogleDir');
                ctaDirs.each(function (ind, ctaDir) {
                    var href = $(ctaDir).attr('href');
                    if (href.indexOf('saddr') === -1) {
                        $(ctaDir).attr('href', _this.getDirectionLatLngSourceAddress(href, sourceLocation));
                    }
                });
            };
            GeoLocationService.prototype.getDirectionLatLngSourceAddress = function (baseUrl, sourceLocation) {
                return baseUrl + "&saddr=" + sourceLocation.lat() + "," + sourceLocation.lng();
            };
            return GeoLocationService;
        }());
        Composer.GeoLocationService = GeoLocationService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='./IStoreLocatorHistoryState.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var StoreLocatorHistoryState = /** @class */ (function () {
            function StoreLocatorHistoryState() {
                var _this = this;
                this.isDefined = function () { return !!_this.point; };
            }
            StoreLocatorHistoryState.prototype.parseHistoryState = function () {
                if (!history.state) {
                    return;
                }
                if (history.state.p_lat && history.state.p_lng) {
                    this.point = new google.maps.LatLng(history.state.p_lat, history.state.p_lng);
                }
                if (history.state.c_lat && history.state.c_lng) {
                    this.center = new google.maps.LatLng(history.state.c_lat, history.state.c_lng);
                }
                this.zoom = history.state.zoom;
                this.page = history.state.page;
                this.pos = history.state.pos;
            };
            StoreLocatorHistoryState.prototype.historyPushState = function (update) {
                if (update.page) {
                    this.page = update.page;
                }
                if (update.point) {
                    this.point = update.point;
                }
                if (update.zoom) {
                    this.zoom = update.zoom;
                }
                if (update.center) {
                    this.center = update.center;
                }
                if (update.pos >= 0) {
                    this.pos = update.pos;
                }
                if (this.point) {
                    var obj = {
                        'p_lat': this.point.lat(),
                        'p_lng': this.point.lng(),
                        'page': this.page,
                        'zoom': this.zoom,
                        'c_lat': this.center.lat(),
                        'c_lng': this.center.lng(),
                        'pos': this.pos
                    };
                    if (history.state) {
                        history.replaceState(obj, null, null);
                    }
                    else {
                        history.pushState(obj, null, null);
                    }
                }
            };
            return StoreLocatorHistoryState;
        }());
        Composer.StoreLocatorHistoryState = StoreLocatorHistoryState;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/vue/index.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./Services/StoreLocatorService.ts' />
///<reference path='./MapService.ts' />
///<reference path='./Services/GeoLocationService.ts' />
///<reference path='./IStoreLocatorInitializationOptions.ts' />
///<reference path='./IMapOptions.ts' />
///<reference path='./StoreLocatorHistoryState.ts' />
///<reference path='./IStoreLocatorHistoryState.ts' />
///<reference path='../../Cache/CacheProvider.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var StoreLocatorController = /** @class */ (function (_super) {
            __extends(StoreLocatorController, _super);
            function StoreLocatorController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._storeLocatorService = new Composer.StoreLocatorService();
                _this._geoService = new Composer.GeoLocationService();
                _this._mapService = new Composer.MapService(_this.eventHub);
                _this._historyState = new Composer.StoreLocatorHistoryState();
                _this._isRestoreListPaging = false;
                _this._searchPointAddressCacheKey = 'StoreLocatorSearchAddress';
                _this.cache = Composer.CacheProvider.instance().defaultCache;
                _this._isSearch = false;
                _this._getCurrentLocation = Q.defer();
                return _this;
            }
            StoreLocatorController.prototype.getCurrentLocation = function () {
                return this._getCurrentLocation.promise;
            };
            StoreLocatorController.prototype.initialize = function (options) {
                if (options === void 0) { options = {
                    mapId: 'map',
                    coordinates: { Lat: -33.8688, Lng: 151.2195 },
                    showNearestStoreInfo: true
                }; }
                this._storeLocatorOptions = options;
                this.registerStoreLocatorVue();
            };
            StoreLocatorController.prototype.initializeController = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
                // get current location
                this._geoService.geolocate().then(function (location) {
                    _this._getCurrentLocation.resolve(location);
                }, function (reason) { return _this._getCurrentLocation.resolve(null); });
                this._storeLocatorService.getMapConfiguration()
                    .then(function (configuration) {
                    _this.initSearchBox();
                    var postedAddress = _this.initCacheData();
                    var mapOptions = _this.getMapOptions(_this._storeLocatorOptions, _this._historyState);
                    if (configuration.ZoomLevel) {
                        _this._storeLocatorOptions.zoomLevel = configuration.ZoomLevel;
                    }
                    if (configuration.MarkerPadding) {
                        _this._storeLocatorOptions.markerPadding = configuration.MarkerPadding;
                    }
                    _this._mapService.initialize(mapOptions);
                    return _this._mapService.mapInitialized().then(function () {
                        if (!_this._historyState.isDefined()) {
                            _this._mapService.centerMap(configuration.Bounds);
                        }
                        _this.searchBoxSetBounds(configuration.Bounds);
                        return postedAddress;
                    });
                })
                    .then(function (postedAddress) {
                    if (_this._historyState.isDefined()) {
                        _this.restoreMapFromHistoryState();
                        return null;
                    }
                    if (postedAddress) {
                        return _this._geoService.getLocationByAddress(postedAddress);
                    }
                    else {
                        return _this.getCurrentLocation()
                            .then(function (currentLocation) { return _this._geoService.getAddressByLocation(currentLocation)
                            .then(function (address) {
                            _this.setPostedAddress(address);
                            return currentLocation;
                        }); });
                    }
                })
                    .then(function (currentLocation) {
                    if (!currentLocation) {
                        return;
                    }
                    _this.eventHub.publish('searchPointChanged', { data: currentLocation });
                })
                    .fail(function (reason) { return _this.handlePromiseFail('StoreLocator Initialize', reason); });
            };
            StoreLocatorController.prototype.getCommonStoreLocatorVueConfig = function (self) {
                return {
                    data: {
                        NextPage: null,
                        Stores: [],
                    },
                    mounted: function () {
                        self.initializeController();
                    },
                    methods: {
                        loadNextStoresPage: function () {
                            var _this = this;
                            self.getStores(this.NextPage.Page).then(function (result) {
                                var NextPage = result.NextPage, Stores = result.Stores;
                                _this.setStoreList({ NextPage: NextPage, Stores: _this.Stores.concat(Stores) });
                            });
                        },
                        onTitleClick: function () {
                            self.rememberPosition();
                        },
                        setStoreList: function (result) {
                            var NextPage = result.NextPage, Stores = result.Stores;
                            this.NextPage = NextPage;
                            this.Stores = Stores;
                            self.setGoogleDirectionLinks();
                        },
                        currentLocationAction: function () {
                            self.searchCurrentLocation();
                        }
                    }
                };
            };
            StoreLocatorController.prototype.registerStoreLocatorVue = function () {
                var self = this;
                var commonOptions = this.getCommonStoreLocatorVueConfig(self);
                this.VueStoreList = new Vue({
                    el: '#storeLocator',
                    mounted: commonOptions.mounted,
                    data: __assign({}, commonOptions.data, { SelectedStoreId: null, StoreLocatorLocationError: false }),
                    methods: __assign({}, commonOptions.methods, { selectPickupStore: function (store) {
                            this.SelectedStoreId = store.Id;
                        },
                        showStoreLocatorLocationError: function () {
                            this.StoreLocatorLocationError = true;
                        } })
                });
            };
            StoreLocatorController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe('mapBoundsUpdated', function (e) { return _this.onMapBoundsUpdated(e.data, _this._isSearch); });
                this.eventHub.subscribe('searchPointChanged', function (e) { return _this.setSearchLocationInMap(e.data); });
                this.eventHub.subscribe('markerClick', function (e) { return _this.onMarkerClick(e.data); });
                this.eventHub.subscribe('clusterClick', function (e) { return _this.onClusterClick(e.data); });
            };
            StoreLocatorController.prototype.initSearchBox = function () {
                this._autoCompleteJQ = this.findElement('input[name="storeLocatorAutocompleteInput"]');
                var opt = { fields: ['geometry'] };
                this._autoCompleteBox = new google.maps.places.Autocomplete(this._autoCompleteJQ[0], opt);
                this.searchBoxOnPlacesChanged();
                this.searchBoxOnEnterPressed();
            };
            StoreLocatorController.prototype.searchBoxOnPlacesChanged = function () {
                var _this = this;
                this._autoCompleteBox.addListener('place_changed', function () {
                    clearTimeout(_this._enterPressedTimer);
                    var place = _this._autoCompleteBox.getPlace();
                    if (place && place.geometry) {
                        _this.eventHub.publish('searchPointChanged', { data: place.geometry.location });
                    }
                });
            };
            StoreLocatorController.prototype.searchBoxOnEnterPressed = function () {
                var _this = this;
                this._autoCompleteJQ.on('keypress', function (e) {
                    var key = e.which || e.keyCode;
                    if (key === 13) {
                        _this._enterPressedTimer = setTimeout(function () {
                            if (_this._searchPoint) {
                                _this.setSearchLocationInMap(_this._searchPoint);
                            }
                        }, 750);
                    }
                });
            };
            StoreLocatorController.prototype.initCacheData = function () {
                var _this = this;
                // first check if address is posted from other page.
                var postedAddress = this.getPostedAddress();
                if (postedAddress) {
                    return Q.resolve(postedAddress);
                }
                // then check history state
                this._historyState.parseHistoryState();
                // then if any entered address saved in local storage
                return this.cache.get(this._searchPointAddressCacheKey)
                    .then(function (cachedAddr) {
                    _this.setPostedAddress(cachedAddr);
                    return cachedAddr;
                }).fail(function () { return ''; });
            };
            StoreLocatorController.prototype.getMapOptions = function (storeLocatorOption, historyState) {
                var coordinates = storeLocatorOption.coordinates, mapId = storeLocatorOption.mapId;
                var mapCenter = new google.maps.LatLng(coordinates.Lat, coordinates.Lng);
                var mapOptions = {
                    mapCanvas: this.findElement("#" + mapId)[0],
                    infoWindowMaxWidth: 450,
                    options: {
                        center: historyState.point || mapCenter,
                        zoom: historyState.zoom || 1,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        panControl: false,
                        keyboardShortcuts: true,
                        scaleControl: false,
                        scrollwheel: false,
                        zoomControl: true,
                        streetViewControl: false,
                        overviewMapControl: true,
                        overviewMapControlOptions: { opened: false }
                    }
                };
                return mapOptions;
            };
            StoreLocatorController.prototype.getPostedAddress = function () {
                return this._autoCompleteJQ.val();
            };
            StoreLocatorController.prototype.setPostedAddress = function (address) {
                this._autoCompleteJQ.val(address);
            };
            StoreLocatorController.prototype.findElement = function (selector) {
                return $(selector);
            };
            StoreLocatorController.prototype.getContainer = function () {
                return $('body');
            };
            StoreLocatorController.prototype.getPageSize = function () {
                return this.context.container.data('pagesize');
            };
            StoreLocatorController.prototype.searchBoxSetBounds = function (bounds) {
                var southWest = new google.maps.LatLng(bounds.SouthWest.Lat, bounds.SouthWest.Lng);
                var northEast = new google.maps.LatLng(bounds.NorthEast.Lat, bounds.NorthEast.Lng);
                bounds = new google.maps.LatLngBounds(southWest, northEast);
                this._autoCompleteBox.setBounds(bounds);
            };
            StoreLocatorController.prototype.onMapBoundsUpdated = function (data, isSearch) {
                var _this = this;
                clearTimeout(this._timer);
                this._timer = setTimeout(function () {
                    _this.updateMarkers(data, isSearch);
                }, 750);
            };
            StoreLocatorController.prototype.onMarkerClick = function (marker) {
                var _this = this;
                if (marker != null && marker.storeNumber) {
                    this._storeLocatorService.getStore(marker.storeNumber)
                        .then(function (store) {
                        _this.getCurrentLocation().then(function (location) {
                            if (location) {
                                store.GoogleDirectionsLink = _this._geoService.getDirectionLatLngSourceAddress(store.GoogleDirectionsLink, location);
                            }
                            var content = _this.getRenderedTemplateContents('StoreMapMarkerInfo', store);
                            _this._mapService.openInformationWindow(content, marker.value);
                        });
                    })
                        .fail(function (reason) { return _this.handlePromiseFail('StoreLocator OnMarkerClick', reason); });
                }
            };
            StoreLocatorController.prototype.onClusterClick = function (marker) {
                this._mapService.getInformationWindow().close();
                this._mapService.getMap().panTo(marker.value.getPosition());
                marker.value.setMap(null);
                this._mapService.getMap().setZoom(this._mapService.getMap().getZoom() + 1);
            };
            StoreLocatorController.prototype.updateMarkers = function (data, isSearch) {
                var _this = this;
                if (isSearch === void 0) { isSearch = false; }
                var mapBounds = this._mapService.getBounds(this._storeLocatorOptions.markerPadding);
                var zoomLevel = this._mapService.getZoom();
                var searchPoint = this._searchPoint;
                var page = this._isRestoreListPaging ? this._historyState.page : 1;
                var pageSize = page * this.getPageSize();
                this._storeLocatorService.getMarkers(mapBounds.getSouthWest(), mapBounds.getNorthEast(), zoomLevel, searchPoint, isSearch, pageSize)
                    .then(function (result) {
                    if (result.Lat && result.Lng) {
                        _this._mapService.extendBounds(searchPoint, new google.maps.LatLng(result.Lat, result.Lng));
                    }
                    else {
                        _this._mapService.setMarkers(result.Markers, isSearch);
                        if (_this._isRestoreListPaging && result.NextPage) {
                            result.NextPage.Page = _this._historyState.page + 1;
                        }
                        _this.VueStoreList.setStoreList(result);
                        if (_this._isRestoreListPaging && _this._historyState.pos) {
                            $('html, body').animate({
                                scrollTop: _this._historyState.pos
                            }, 500);
                            _this._historyState.historyPushState({});
                        }
                        _this._isRestoreListPaging = false;
                        if (_this._storeLocatorOptions.showNearestStoreInfo && result.Stores) {
                            var firstStore = result.Stores[0];
                            if (firstStore && firstStore.SearchIndex === 1) {
                                _this.setNearestStoreInfo(firstStore.DestinationToSearchPoint);
                            }
                        }
                    }
                    var center = _this._mapService.getMap().getCenter();
                    _this._historyState.historyPushState({ page: page, point: searchPoint, zoom: zoomLevel, center: center });
                    _this._isSearch = false;
                })
                    .fail(function (reason) { return _this.handlePromiseFail('StoreLocator UpdateMarkers getMarkers', reason); });
            };
            StoreLocatorController.prototype.setSearchLocationInMap = function (point, zoomLevel) {
                if (zoomLevel === void 0) { zoomLevel = this._storeLocatorOptions.zoomLevel; }
                this._searchPoint = point;
                var title = this.getPostedAddress();
                this.createSearchPointMarker(point, title);
                this._isSearch = true;
                this.cache.set(this._searchPointAddressCacheKey, title);
                this._mapService.setLocationInMap(point, zoomLevel);
            };
            StoreLocatorController.prototype.createSearchPointMarker = function (searchPoint, title) {
                if (this._searchPointMarker == null) {
                    this._searchPointMarker = this._mapService.createMarkerOnMap(searchPoint, title);
                }
                else {
                    this._searchPointMarker.setPosition(searchPoint);
                    this._searchPointMarker.setTitle(title);
                }
            };
            StoreLocatorController.prototype.searchCurrentLocation = function () {
                var _this = this;
                this._geoService.geolocate()
                    .then(function (currentLocation) { return _this._geoService.getAddressByLocation(currentLocation)
                    .then(function (address) {
                    _this.setPostedAddress(address);
                    _this.eventHub.publish('searchPointChanged', { data: currentLocation });
                }); })
                    .fail(function (reason) { return _this.handlePromiseFail('StoreLocator searchCurrentLocation', reason); });
            };
            // Remember element position in history
            StoreLocatorController.prototype.rememberPosition = function () {
                var pos = $(document).scrollTop();
                this._historyState.historyPushState({ pos: pos });
            };
            StoreLocatorController.prototype.setNearestStoreInfo = function (info) {
                var nearestInfoPanel = this.findElement('#store-locator-nearest');
                if (!nearestInfoPanel.length) {
                    return;
                }
                if (!this.findElement('#nearestInfo').length) {
                    nearestInfoPanel.html(nearestInfoPanel.html().replace('{0}', '<strong id=\'nearestInfo\'></strong>'));
                }
                this.findElement('#nearestInfo').html(info);
                nearestInfoPanel.removeClass('d-none');
            };
            StoreLocatorController.prototype.getStores = function (page) {
                this._historyState.historyPushState({ page: page });
                return this.getStoresForPage(page, this.getPageSize());
            };
            StoreLocatorController.prototype.getStoresForPage = function (page, pageSize) {
                var mapBounds = this._mapService.getBounds(this._storeLocatorOptions.markerPadding);
                var searchPoint = this._searchPoint;
                return this._storeLocatorService.getStores(mapBounds.getSouthWest(), mapBounds.getNorthEast(), searchPoint, page, pageSize);
            };
            StoreLocatorController.prototype.setGoogleDirectionLinks = function () {
                var _this = this;
                return this.getCurrentLocation().then(function (location) {
                    _this._geoService.updateDirectionLinksWithLatLngSourceAddress(_this.getContainer(), location);
                });
            };
            StoreLocatorController.prototype.restoreMapFromHistoryState = function () {
                this._searchPoint = this._historyState.point;
                this.createSearchPointMarker(this._historyState.point, this.getPostedAddress());
                if (this._historyState.center) {
                    this._mapService.getMap().setCenter(this._historyState.center);
                }
                if (this._historyState.page > 1) {
                    this._isRestoreListPaging = true;
                }
            };
            StoreLocatorController.prototype.handlePromiseFail = function (title, reason) {
                if (typeof reason === 'object') {
                    console.log(title + ': ' + reason.message);
                    if (reason.code === 1) {
                        this.VueStoreList.showStoreLocatorLocationError();
                    }
                }
                else {
                    console.log(title + ': ' + reason);
                }
            };
            return StoreLocatorController;
        }(Composer.Controller));
        Composer.StoreLocatorController = StoreLocatorController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
///<reference path='../Composer.Store/StoreLocator/StoreLocatorController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var PickUpAddressSingleCheckoutController = /** @class */ (function (_super) {
            __extends(PickUpAddressSingleCheckoutController, _super);
            function PickUpAddressSingleCheckoutController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.viewModelName = 'PickUpAddress';
                return _this;
            }
            PickUpAddressSingleCheckoutController.prototype.registerStoreLocatorVue = function () {
                var self = this;
                this.checkoutService = Composer.SingleCheckoutService.getInstance();
                var commonOptions = this.getCommonStoreLocatorVueConfig(self);
                var vueStoreLocatorMixin = {
                    data: __assign({}, commonOptions.data, { initialized: false }),
                    mounted: function () {
                        self.VueStoreList = this;
                        if (this.IsPickUpMethodType) {
                            this.initializeMap();
                        }
                    },
                    computed: {
                        SelectedStore: function () {
                            var _this = this;
                            return this.Cart.PickUpLocationId && this.Stores.find(function (store) { return store.Id === _this.Cart.PickUpLocationId; });
                        },
                        SelectedStoreId: function () {
                            return this.Cart.PickUpLocationId;
                        }
                    },
                    methods: __assign({}, commonOptions.methods, { selectPickupStore: function (store) {
                            this.Cart.PickUpLocationId = store.Id;
                            this.Errors.StoreNotSelectedError = false;
                        },
                        showStoreLocatorLocationError: function () {
                            this.Errors.StoreLocatorLocationError = true;
                        },
                        processPickUpAddress: function () {
                            var controllersToUpdate = [self.viewModelName];
                            if (!this.Cart.PickUpLocationId) {
                                this.Errors.StoreNotSelectedError = true;
                                return Q.reject('PickUpLocationId is not specified');
                            }
                            if (!this.pickUpAddressModified()) {
                                return Q.resolve(true);
                            }
                            return self.checkoutService.updateCart(controllersToUpdate)
                                .then(function () { return true; });
                        },
                        preparePickUpAddress: function () {
                            this.pickUpLocationIdBeforeEdit = this.Cart.PickUpLocationId;
                        },
                        pickUpAddressModified: function () {
                            return this.pickUpLocationIdBeforeEdit !== this.Cart.PickUpLocationId;
                        },
                        initializeMap: function () {
                            if (this.initialized) {
                                return;
                            }
                            this.initialized = true;
                            commonOptions.mounted();
                        },
                        onSelectPickUpMethod: function () {
                            this.initializeMap();
                        } })
                };
                this.checkoutService.VueCheckoutMixins.push(vueStoreLocatorMixin);
                this.checkoutService.registerController(this);
            };
            PickUpAddressSingleCheckoutController.prototype.getValidationPromise = function () {
                return Q.resolve(true);
            };
            PickUpAddressSingleCheckoutController.prototype.getUpdateModelPromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var _a;
                    var PickUpLocationId = _this.checkoutService.VueCheckout.Cart.PickUpLocationId;
                    return _a = {}, _a[_this.viewModelName] = JSON.stringify({ PickUpLocationId: PickUpLocationId }), _a;
                });
            };
            PickUpAddressSingleCheckoutController.prototype.getViewModelNameForUpdatePromise = function () {
                var vueData = this.checkoutService.VueCheckout;
                if (vueData.pickUpAddressModified()) {
                    return Q.resolve(this.viewModelName);
                }
            };
            return PickUpAddressSingleCheckoutController;
        }(Composer.StoreLocatorController));
        Composer.PickUpAddressSingleCheckoutController = PickUpAddressSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ReviewCartSingleCheckoutController = /** @class */ (function (_super) {
            __extends(ReviewCartSingleCheckoutController, _super);
            function ReviewCartSingleCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ReviewCartSingleCheckoutController.prototype.initialize = function () {
                var self = this;
                self.viewModelName = 'ReviewCart';
                _super.prototype.initialize.call(this);
                var vueReviewCartMixin = {
                    mounted: function () {
                        this.updateBeforeEditLineItemList();
                    },
                    methods: {
                        processCart: function () {
                            return true;
                        },
                        DecrementDisabled: function (item) {
                            return item.Quantity < 2 || this.Mode.Loading;
                        },
                        IncrementDisabled: function (item) {
                            return item.Quantity >= 99 || this.Mode.Loading;
                        },
                        updateItemQuantity: function (id, action) {
                            var _this = this;
                            if (action === void 0) { action = ''; }
                            var item = _.find(this.Cart.LineItemDetailViewModels, function (i) { return i.Id === id; });
                            if (action === 'increment') {
                                item.Quantity++;
                            }
                            if (action === 'decrement') {
                                item.Quantity--;
                            }
                            if (!this.debounceUpdateItem) {
                                this.debounceUpdateItem = _.debounce(function (id) {
                                    var itemToUpdate = _.find(_this.Cart.LineItemDetailViewModels, function (i) { return i.Id === id; });
                                    self.checkoutService.updateCartItem(itemToUpdate.Id, itemToUpdate.Quantity, itemToUpdate.ProductId, itemToUpdate.RecurringOrderFrequencyName ? itemToUpdate.RecurringOrderFrequencyName : null, itemToUpdate.RecurringOrderProgramName);
                                }, 400);
                            }
                            this.debounceUpdateItem(id);
                        },
                        removeCartItem: function (index) {
                            var _this = this;
                            var item = this.Cart.LineItemDetailViewModels[index];
                            this.Mode.Loading = true;
                            self.checkoutService.removeCartItem(item.Id, item.ProductId)
                                .then(function (cart) {
                                if (cart) {
                                    _this.Cart = cart;
                                }
                            })
                                .finally(function () {
                                _this.Mode.Loading = false;
                            });
                            this.Cart.LineItemDetailViewModels.splice(index, 1);
                        },
                        updateBeforeEditLineItemList: function () {
                            this.beforeEditLineItemList = this.Cart.LineItemDetailViewModels.map(function (x) { return (__assign({}, x)); });
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueReviewCartMixin);
            };
            return ReviewCartSingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.ReviewCartSingleCheckoutController = ReviewCartSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ShippingAddressSingleCheckoutController = /** @class */ (function (_super) {
            __extends(ShippingAddressSingleCheckoutController, _super);
            function ShippingAddressSingleCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ShippingAddressSingleCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                self.viewModelName = 'ShippingAddress';
                self.formSelector = '#addressForm';
                var vueShippingAddressMixin = {
                    created: function () {
                        this.adressBeforeEdit = __assign({}, this.Cart.ShippingAddress);
                    },
                    mounted: function () {
                        this.initializeParsey(self.formSelector);
                    },
                    computed: {},
                    methods: {
                        prepareShippingAddress: function () {
                            if (!this.Cart.ShippingAddress.FirstName && !this.Cart.ShippingAddress.LastName) {
                                this.Cart.ShippingAddress.FirstName = this.Customer.FirstName;
                                this.Cart.ShippingAddress.LastName = this.Customer.LastName;
                            }
                            this.Mode.AddingLine2Address = !this.Cart.ShippingAddress.Line2;
                            this.Mode.AddingNewAddress = false;
                            this.initializeParsey(self.formSelector);
                        },
                        processShippingAddress: function () {
                            var _this = this;
                            var isValid = this.validateParsey(self.formSelector);
                            if (!isValid) {
                                return Q.reject('Shipping Address information is not valid');
                            }
                            if (!this.shippingAddressModified()) {
                                return Q.resolve(true);
                            }
                            var postalCode = this.Cart.ShippingAddress.PostalCode;
                            return this.changePostalCode(postalCode).then(function (success) {
                                if (!success)
                                    return false;
                                //WHEN CHANGING SHIPPING, WE ALSO NEED UPDATE BILLING
                                var needUpdateBilling = _this.Cart.Payment.BillingAddress.UseShippingAddress;
                                var controllersToUpdate = needUpdateBilling ? [self.viewModelName, 'BillingAddress'] : [self.viewModelName];
                                if (needUpdateBilling)
                                    _this.fixAddressNullValues(_this.Cart.Payment.BillingAddress);
                                return self.checkoutService.updateCart(controllersToUpdate)
                                    .fail(function (reason) {
                                    console.log(reason);
                                    return false;
                                });
                            });
                        },
                        recalculateShippingFee: function () {
                            var formId = !this.IsAuthenticated ? '#addressForm' : '#addNewAddressForm';
                            var isValid = this.validateParsey(formId);
                            if (isValid) {
                                this.changePostalCode(this.Cart.ShippingAddress.PostalCode);
                            }
                        },
                        changePostalCode: function (postalCode) {
                            var _this = this;
                            var processPostalCode = Q.defer();
                            this.Errors.PostalCodeError = false;
                            if (this.adressBeforeEdit.PostalCode !== postalCode) {
                                this.Mode.Loading = true;
                                self.checkoutService.updatePostalCode(postalCode).then(function (cart) {
                                    _this.adressBeforeEdit = __assign({}, _this.Cart.ShippingAddress);
                                    _this.Cart = __assign({}, _this.Cart, { ShippingAddress: __assign({}, _this.Cart.ShippingAddress, { PostalCode: cart.ShippingAddress.PostalCode, RegionCode: cart.ShippingAddress.RegionCode, RegionName: cart.ShippingAddress.RegionName }), OrderSummary: cart.OrderSummary });
                                    processPostalCode.resolve(true);
                                })
                                    .fail(function (reason) {
                                    console.log(reason);
                                    _this.Errors.PostalCodeError = true;
                                    processPostalCode.resolve(false);
                                })
                                    .finally(function () { return _this.Mode.Loading = false; });
                            }
                            else {
                                processPostalCode.resolve(true);
                            }
                            return processPostalCode.promise;
                        },
                        shippingAddressModified: function () {
                            var _this = this;
                            var keys = _.keys(this.Cart.ShippingAddress);
                            var isModified = _.some(keys, function (key) { return _this.adressBeforeEdit[key] !== _this.Cart.ShippingAddress[key]; });
                            return isModified;
                        },
                        adjustPostalCode: function () {
                            this.Cart.ShippingAddress.PostalCode = this.Cart.ShippingAddress.PostalCode.toUpperCase();
                            if (this.BillingAddress && this.BillingAddress.PostalCode) {
                                this.BillingAddress.PostalCode = this.BillingAddress.PostalCode.toUpperCase();
                            }
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueShippingAddressMixin);
            };
            ShippingAddressSingleCheckoutController.prototype.getViewModelNameForUpdatePromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var vueData = _this.checkoutService.VueCheckout;
                    var isValid = vueData.validateParsey(_this.formSelector);
                    if (!isValid) {
                        return Q.reject('Shipping Address information is not valid');
                    }
                    if (vueData.shippingAddressModified()) {
                        return _this.viewModelName;
                    }
                });
            };
            ShippingAddressSingleCheckoutController.prototype.getUpdateModelPromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var _a;
                    var vueAddressData = _this.checkoutService.VueCheckout.Cart.ShippingAddress;
                    return _a = {}, _a[_this.viewModelName] = JSON.stringify(vueAddressData), _a;
                });
            };
            return ShippingAddressSingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.ShippingAddressSingleCheckoutController = ShippingAddressSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
///<reference path='./ShippingAddressSingleCheckoutController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ShippingAddressRegisteredSingleCheckoutController = /** @class */ (function (_super) {
            __extends(ShippingAddressRegisteredSingleCheckoutController, _super);
            function ShippingAddressRegisteredSingleCheckoutController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ShippingAddressRegisteredSingleCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                self.viewModelName = 'ShippingAddressRegistered';
                self.formSelector = '#addNewAddressForm';
                var vueShippingAddressRegisteredMixin = {
                    data: {
                        SelectedShippingAddressId: null,
                        AddressName: null,
                    },
                    methods: {
                        processShippingAddressRegistered: function () {
                            if (!this.shippingAddressModified()) {
                                return Q.resolve(true);
                            }
                            //WHEN CHANGING SHIPPING ADDRESS, WE ALSO NEED UPDATE BILLING IF UseShippingAddress = TRUE
                            var needUpdateBilling = this.Cart.Payment.BillingAddress.UseShippingAddress;
                            var controllersToUpdate = needUpdateBilling ? [self.viewModelName, 'BillingAddressRegistered'] : [self.viewModelName];
                            if (needUpdateBilling) {
                                this.fixAddressNullValues(this.Cart.Payment.BillingAddress);
                            }
                            return self.checkoutService.updateCart(controllersToUpdate)
                                .then(function () { return true; });
                        },
                        addNewAddressMode: function () {
                            this.Mode.AddingNewAddress = true;
                            this.Mode.EditingAddress = false;
                            this.adressBeforeEdit = {};
                            this.AddressName = null;
                            this.SelectedShippingAddressId = undefined;
                            this.Cart.ShippingAddress = this.getClearShippingAddress();
                            this.initializeParsey(self.formSelector);
                        },
                        addShippingAddressToMyAddressBook: function () {
                            var _this = this;
                            var isValid = this.validateParsey(self.formSelector);
                            if (!isValid) {
                                return Q.reject('Shipping Address information is not valid');
                            }
                            var postalCode = this.Cart.ShippingAddress.PostalCode;
                            this.changePostalCode(postalCode)
                                .then(function (success) {
                                if (success) {
                                    var addressData = __assign({}, _this.Cart.ShippingAddress);
                                    addressData.AddressName = _this.AddressName;
                                    self.checkoutService.saveAddressToMyAccountAddressBook(addressData)
                                        .then(function (address) {
                                        address.RegionName = _this.ShippingAddress.RegionName;
                                        _this.changeRegisteredShippingAddress(address.Id);
                                    })
                                        .fail(function (reason) {
                                        console.log(reason);
                                        _this.handleAddressErrors(reason);
                                    });
                                }
                                else {
                                    //
                                }
                            });
                        },
                        changeRegisteredShippingAddress: function (addressId) {
                            this.SelectedShippingAddressId = addressId;
                            this.Mode.AddingNewAddress = false;
                            this.Mode.EditingAddress = false;
                            if (!this.debounceChangeRegisteredShippingAddress) {
                                this.debounceChangeRegisteredShippingAddress = _.debounce(function () {
                                    //WHEN CHANGING SHIPPING, WE ALSO NEED UPDATE BILLING
                                    var controllersToUpdate = [self.viewModelName, 'BillingAddressRegistered'];
                                    self.checkoutService.updateCart(controllersToUpdate)
                                        .fail(function (reason) {
                                        console.log(reason);
                                    });
                                }, 500);
                            }
                            this.debounceChangeRegisteredShippingAddress();
                        },
                        deleteShippingAddressConfirm: function (event) {
                            this.Modal.deleteAddressModal.openModal(event);
                        },
                        updateEditedShippingAddress: function () {
                            var _this = this;
                            var isValid = this.validateParsey('#editAddressForm');
                            if (!isValid) {
                                return Q.reject('Address information is not valid');
                            }
                            this.Mode.Loading = true;
                            this.EditingAddress.AddressName = this.AddressName;
                            self.checkoutService.updateAddressInMyAccountAddressBook(this.EditingAddress)
                                .then(function () {
                                _this.Mode.EditingAddress = false;
                                if (_this.Cart.ShippingAddress.AddressBookId === _this.EditingAddress.Id) {
                                    var isMatch = Composer.AddressUtils.isEquals(_this.Cart.ShippingAddress, _this.EditingAddress);
                                    if (!isMatch) {
                                        return _this.changeRegisteredShippingAddress(_this.EditingAddress.Id);
                                    }
                                }
                            })
                                .fail(function (reason) { return _this.handleAddressErrors(reason); })
                                .fin(function () { return _this.Mode.Loading = false; });
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueShippingAddressRegisteredMixin);
            };
            ShippingAddressRegisteredSingleCheckoutController.prototype.getViewModelNameForUpdatePromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var vueData = _this.checkoutService.VueCheckout;
                    if (!vueData.IsAuthenticated) {
                        return;
                    }
                    if (vueData.shippingAddressModified()) {
                        return _this.viewModelName;
                    }
                });
            };
            ShippingAddressRegisteredSingleCheckoutController.prototype.getUpdateModelPromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var _a;
                    var selectedAddressId = _this.checkoutService.VueCheckout.SelectedShippingAddressId;
                    return _a = {}, _a[_this.viewModelName] = JSON.stringify({ ShippingAddressId: selectedAddressId }), _a;
                });
            };
            return ShippingAddressRegisteredSingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.ShippingAddressRegisteredSingleCheckoutController = ShippingAddressRegisteredSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
///<reference path='../Composer.MyAccount/Common/CustomerService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ShippingSingleCheckoutController = /** @class */ (function (_super) {
            __extends(ShippingSingleCheckoutController, _super);
            function ShippingSingleCheckoutController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.customerService = new Composer.CustomerService(new Composer.CustomerRepository());
                return _this;
            }
            ShippingSingleCheckoutController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                self.viewModelName = 'ShippingMethod';
                var vueShippingMixin = {
                    mounted: function () {
                        this.calculateSelectedMethod();
                        this.prepareShipping();
                    },
                    computed: {
                        FulfilledShipping: function () {
                            return self.checkoutService.shippingFulfilled(this.Cart, this.IsAuthenticated);
                        },
                        SelectedMethodTypeString: function () {
                            return this.Cart.ShippingMethod ? this.Cart.ShippingMethod.FulfillmentMethodTypeString : '';
                        },
                        SelectedMethodType: function () {
                            var _this = this;
                            return this.Cart.ShippingMethod &&
                                this.ShippingMethodTypes.find(function (type) { return type.FulfillmentMethodTypeString === _this.Cart.ShippingMethod.FulfillmentMethodTypeString; });
                        },
                        IsShippingMethodType: function () {
                            return this.Cart.ShippingMethod &&
                                this.Cart.ShippingMethod.FulfillmentMethodTypeString === Composer.FulfillmentMethodTypes.Shipping;
                        },
                        IsPickUpMethodType: function () {
                            return this.Cart.ShippingMethod &&
                                this.Cart.ShippingMethod.FulfillmentMethodTypeString === Composer.FulfillmentMethodTypes.PickUp;
                        },
                    },
                    methods: {
                        prepareShipping: function () {
                            var _this = this;
                            if (!this.Cart.ShippingAddress.FirstName && !this.Cart.ShippingAddress.LastName) {
                                this.Cart.ShippingAddress.FirstName = this.Customer.FirstName;
                                this.Cart.ShippingAddress.LastName = this.Customer.LastName;
                            }
                            this.Mode.AddingLine2Address = !this.Cart.ShippingAddress.Line2;
                            this.Mode.AddingNewAddress = false;
                            this.ShippingMethodTypes.forEach(function (methodType) {
                                if (_this.IsPickUpMethodType && methodType.FulfillmentMethodTypeString === Composer.FulfillmentMethodTypes.Shipping) {
                                    methodType.OldAddress = _this.getClearShippingAddress();
                                }
                                else {
                                    methodType.OldAddress = _this.Cart.ShippingAddress;
                                }
                            });
                            this.preparePickUpAddress();
                        },
                        processShipping: function () {
                            if (this.IsShippingMethodType) {
                                if (this.IsAuthenticated) {
                                    return this.processShippingAddressRegistered();
                                }
                                else {
                                    return this.processShippingAddress();
                                }
                            }
                            if (this.IsPickUpMethodType) {
                                return this.processPickUpAddress();
                            }
                            return Q.resolve(true);
                        },
                        processBilling: function () {
                            if (this.IsAuthenticated) {
                                return this.processBillingAddressRegistered();
                            }
                            else {
                                return this.processBillingAddress();
                            }
                        },
                        selectShippingMethod: function (methodEntity) {
                            this.ShippingMethodTypes = this.ShippingMethodTypes.map(function (x) {
                                return x.FulfillmentMethodTypeString === methodEntity.FulfillmentMethodTypeString ? __assign({}, x, { SelectedMethod: methodEntity }) : x;
                            });
                            this.changeMethodsCollapseState(methodEntity.FulfillmentMethodTypeString, 'hide');
                            this.updateShippingMethodProcess(methodEntity);
                        },
                        changeShippingMethodType: function (e) {
                            var _this = this;
                            var value = e.target.value;
                            var shippingMethodType = this.ShippingMethodTypes.find(function (method) {
                                return method.FulfillmentMethodTypeString === value;
                            });
                            if (this.Cart.ShippingMethod) {
                                this.changeMethodsCollapseState(this.Cart.ShippingMethod.FulfillmentMethodTypeString, 'hide');
                            }
                            if (!this.debounceUpdateShippingMethod) {
                                this.debounceUpdateShippingMethod = _.debounce(function (methodType) {
                                    _this.updateShippingMethodProcess(methodType.SelectedMethod)
                                        .then(function () {
                                        if (_this.IsPickUpMethodType) {
                                            _this.onSelectPickUpMethod();
                                        }
                                    });
                                }, 800);
                            }
                            this.debounceUpdateShippingMethod(shippingMethodType);
                        },
                        changeMethodsCollapseState: function (shippingMethodType, command) {
                            var shippingMethodCollapse = $("#ShippingMethod" + shippingMethodType);
                            if (shippingMethodCollapse) {
                                shippingMethodCollapse.collapse(command);
                            }
                        },
                        updateShippingMethodProcess: function (methodEntity) {
                            var _this = this;
                            var oldShippingMethod = __assign({}, this.Cart.ShippingMethod);
                            var oldPickUpLocationId = this.Cart.PickUpLocationId;
                            if (this.SelectedMethodType) {
                                this.SelectedMethodType.OldAddress = __assign({}, this.Cart.ShippingAddress);
                            }
                            this.Cart.ShippingMethod = methodEntity;
                            if (methodEntity.ShippingProviderId === oldShippingMethod.ShippingProviderId) {
                                return;
                            }
                            this.Cart.ShippingAddress = this.SelectedMethodType.OldAddress ? this.SelectedMethodType.OldAddress : this.getClearShippingAddress();
                            var isAddressValid = !!(this.Cart.ShippingAddress.PostalCode) || this.SelectedShippingAddressId;
                            var controllersToUpdate = [self.viewModelName];
                            if (isAddressValid) {
                                controllersToUpdate.push(this.IsAuthenticated ? 'ShippingAddressRegistered' : 'ShippingAddress');
                            }
                            ;
                            var needUpdateBilling = this.Cart.Payment.BillingAddress.UseShippingAddress;
                            if (needUpdateBilling && isAddressValid) {
                                controllersToUpdate.push(this.IsAuthenticated ? 'BillingAddressRegistered' : 'BillingAddress');
                            }
                            return self.checkoutService.updateCart(controllersToUpdate)
                                .then(function () {
                                _this.Cart.PickUpLocationId = oldPickUpLocationId;
                            }).catch(function () {
                                _this.Cart.ShippingMethod = oldShippingMethod;
                            });
                        },
                        getClearShippingAddress: function () {
                            this.Mode.AddingLine2Address = true;
                            var _a = this.Cart, _b = _a.ShippingAddress, FirstName = _b.FirstName, LastName = _b.LastName, CountryCode = _b.CountryCode, PhoneRegex = _b.PhoneRegex, PostalCodeRegexPattern = _b.PostalCodeRegexPattern, Customer = _a.Customer;
                            return {
                                FirstName: FirstName || Customer.FirstName,
                                LastName: LastName || Customer.LastName,
                                PhoneRegex: PhoneRegex,
                                PostalCodeRegexPattern: PostalCodeRegexPattern,
                                CountryCode: CountryCode
                            };
                        },
                        calculateSelectedMethod: function () {
                            var selectedProviderId = this.Cart.ShippingMethod ? this.Cart.ShippingMethod.ShippingProviderId : undefined;
                            this.ShippingMethodTypes.forEach(function (type) {
                                type.IsModified = type.ShippingMethods.length > 1;
                                var selectedInCart = type.ShippingMethods.find(function (method) { return method.ShippingProviderId === selectedProviderId; });
                                type.SelectedMethod = selectedInCart || type.ShippingMethods.find(function (method) { return method.IsSelected; });
                            });
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(vueShippingMixin);
            };
            ShippingSingleCheckoutController.prototype.getUpdateModelPromise = function () {
                var _this = this;
                return Q.fcall(function () {
                    var _a;
                    var _b = _this.checkoutService.VueCheckout.Cart.ShippingMethod, Name = _b.Name, ShippingProviderId = _b.ShippingProviderId;
                    return _a = {}, _a[_this.viewModelName] = JSON.stringify({ Name: Name, ShippingProviderId: ShippingProviderId }), _a;
                });
            };
            return ShippingSingleCheckoutController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.ShippingSingleCheckoutController = ShippingSingleCheckoutController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../CartSummary/CartService.ts' />
///<reference path='../CartSummary/CartEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CouponService = /** @class */ (function () {
            function CouponService(cartService, eventHub) {
                if (!cartService) {
                    throw new Error('Error: cartService is required');
                }
                if (!eventHub) {
                    throw new Error('Error: eventHub is required');
                }
                this.cartService = cartService;
                this.eventHub = eventHub;
            }
            /**
            * Adds a coupon using the Composer API.
            * @param couponCode Code of the Coupon to add through the API.
            */
            CouponService.prototype.addCoupon = function (couponCode) {
                var _this = this;
                var data = {
                    CouponCode: couponCode
                };
                this.eventHub.publish('couponUpdating', { data: data });
                return this.cartService.addCoupon(couponCode)
                    .then(function () { return _this.cartService.getCart(); })
                    .then(function (cart) {
                    _this.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cart });
                    _this.publishCouponUpdatedEvent(cart, true);
                }, function (reason) {
                    console.error('Error while adding coupon', reason);
                    _this.publishCouponUpdatedEvent(undefined, false);
                });
            };
            /**
             * Removes a coupon using the Composer API
             * @param {String} couponCode Code of the coupon to remove.
             */
            CouponService.prototype.removeCoupon = function (couponCode) {
                var _this = this;
                var data = {
                    CouponCode: couponCode
                };
                return this.cartService.removeCoupon(couponCode)
                    .then(function () { return _this.cartService.getCart(); })
                    .then(function (cart) {
                    _this.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cart });
                    _this.publishCouponUpdatedEvent(cart, true);
                }, function (reason) { return _this.publishCouponUpdatedEvent(undefined, false); });
            };
            CouponService.prototype.publishCouponUpdatedEvent = function (result, isSuccess) {
                this.eventHub.publish(Composer.CartEvents.CouponUpdated, { data: result });
            };
            return CouponService;
        }());
        Composer.CouponService = CouponService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../..//Typings/tsd.d.ts' />
///<reference path='./BaseSingleCheckoutController.ts' />
///<reference path='../Composer.Cart/Coupons/CouponService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SingleCheckoutCouponsController = /** @class */ (function (_super) {
            __extends(SingleCheckoutCouponsController, _super);
            function SingleCheckoutCouponsController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.couponService = new Composer.CouponService(Composer.CartService.getInstance(), _this.eventHub);
                return _this;
            }
            SingleCheckoutCouponsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                var couponsMixins = {
                    data: {
                        CouponCode: undefined,
                        Mode: {
                            ApplyingCoupon: false
                        },
                        ShowAlert: false
                    },
                    mounted: function () {
                        self.eventHub.subscribe(Composer.CartEvents.CartUpdated, this.onCartUpdated);
                    },
                    computed: {
                        Coupons: function () {
                            return this.Cart.Coupons;
                        },
                        HasCouponsErrorMessage: function () {
                            return _.some(this.Coupons.Messages, function (m) { return m.Level === 'danger'; });
                        }
                    },
                    methods: {
                        applyCoupon: function () {
                            var _this = this;
                            if (!this.CouponCode)
                                return;
                            this.Mode.ApplyingCoupon = true;
                            this.Mode.Loading = true;
                            self.couponService.addCoupon(this.CouponCode)
                                .fin(function () {
                                if (!_this.HasCouponsErrorMessage)
                                    _this.CouponCode = undefined;
                                _this.Mode.ApplyingCoupon = false;
                                _this.Mode.Loading = false;
                                _this.ShowAlert = true;
                            });
                        },
                        removeCoupon: function (couponCode) {
                            var _this = this;
                            if (!couponCode || 0 === couponCode.length) {
                                console.log('The coupon code may not be null');
                                return;
                            }
                            this.Mode.Loading = true;
                            self.couponService.removeCoupon(couponCode.toString())
                                .fin(function () { return _this.Mode.Loading = false; });
                        },
                        onCartUpdated: function (cart) {
                            this.Cart = cart.data;
                        }
                    }
                };
                this.checkoutService.VueCheckoutMixins.push(couponsMixins);
            };
            return SingleCheckoutCouponsController;
        }(Orckestra.Composer.BaseSingleCheckoutController));
        Composer.SingleCheckoutCouponsController = SingleCheckoutCouponsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./IFacet.ts' />
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='./IFacet.ts' />
/// <reference path='./ISelectedFacet.ts' />
/// <reference path='../../Generics/Collections/IHashTable.ts' />
/// <reference path='./ISearchCriteriaOptions.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var SearchCriteria = /** @class */ (function () {
            function SearchCriteria(eventHub, _window) {
                this.eventHub = eventHub;
                this._window = _window;
                this._facetRegistry = {};
                this.keywords = '';
                this.page = 1;
                this.sortBy = '';
                this.sortDirection = '';
                this.selectedFacets = {};
            }
            SearchCriteria.prototype.initialize = function (options) {
                this._facetRegistry = options.facetRegistry;
                this.correctedSearchTerm = options.correctedSearchTerm;
                this.queryName = options.queryName;
                this.queryType = options.queryType;
                this.categoryId = options.categoryId;
                this.loadFromQuerystring(this._window.location.search);
            };
            SearchCriteria.prototype.updateFacetRegistry = function (facetRegistry) {
                this._facetRegistry = facetRegistry;
            };
            SearchCriteria.prototype.loadFromQuerystring = function (querystring) {
                this.loadNonFacetCriteria(querystring);
                this.loadFacetCriteria(querystring);
            };
            SearchCriteria.prototype.toQuerystring = function () {
                var queryBuilder = [], facetKey, facetIndex = 1, facetValue, selectedFacets = this.selectedFacets;
                if (!_.isEmpty(this.keywords) ||
                    !_.isEmpty(this.sortBy) ||
                    !_.isEmpty(this.sortDirection) ||
                    !_.isEmpty(this.page) && this.page > 1 ||
                    !_.isEmpty(this.selectedFacets)) {
                    queryBuilder.push('?');
                }
                if (!_.isEmpty(this.keywords) || !_.isEmpty(this.correctedSearchTerm)) {
                    queryBuilder.push('keywords=');
                    var keyword = _.isEmpty(this.correctedSearchTerm) ? this.keywords : this.correctedSearchTerm;
                    queryBuilder.push(this.encodeQuerystringValue(keyword));
                }
                if (!_.isEmpty(this.sortBy)) {
                    queryBuilder.push('&sortBy=');
                    queryBuilder.push(this.encodeQuerystringValue(this.sortBy));
                }
                if (!_.isEmpty(this.sortDirection)) {
                    queryBuilder.push('&sortDirection=');
                    queryBuilder.push(this.encodeQuerystringValue(this.sortDirection));
                }
                if (this.page > 1) {
                    queryBuilder.push('&page=');
                    queryBuilder.push(this.page.toString());
                }
                for (facetKey in selectedFacets) {
                    if (selectedFacets.hasOwnProperty(facetKey)) {
                        facetValue = selectedFacets[facetKey];
                        queryBuilder.push('&');
                        queryBuilder.push(SearchCriteria.facetFieldNameKeyPrefix);
                        queryBuilder.push(facetIndex.toString());
                        queryBuilder.push('=');
                        queryBuilder.push(this.encodeQuerystringValue(facetKey));
                        queryBuilder.push('&');
                        queryBuilder.push(SearchCriteria.facetValueKeyPrefix);
                        queryBuilder.push(facetIndex.toString());
                        queryBuilder.push('=');
                        queryBuilder.push(this.encodeQuerystringValue(_.isArray(facetValue) ? facetValue.join('|') : facetValue));
                        facetIndex++;
                    }
                }
                return queryBuilder.join('');
            };
            SearchCriteria.prototype.clearFacets = function () {
                this.resetPaging();
                this.selectedFacets = {};
            };
            SearchCriteria.prototype.clearAll = function () {
                this.sortBy = '';
                this.sortDirection = '';
                this.resetPaging();
                this.selectedFacets = {};
            };
            SearchCriteria.prototype.addSingleFacet = function (facetKey, facetValue) {
                this.resetPaging();
                this.selectedFacets[facetKey] = facetValue;
            };
            SearchCriteria.prototype.updateMultiFacets = function (facets) {
                var _this = this;
                var facetKey, facetValues;
                this.resetPaging();
                this.clearSelectedMultiFacets();
                for (facetKey in facets) {
                    if (facets.hasOwnProperty(facetKey)) {
                        this.selectedFacets[facetKey] = [];
                        facetValues = (typeof facets[facetKey] === 'string' ?
                            [facets[facetKey]] : facets[facetKey]);
                        facetValues.forEach(function (value, index, array) {
                            _this.selectedFacets[facetKey].push(value);
                        });
                    }
                }
            };
            SearchCriteria.prototype.removeFacet = function (facetToRemove) {
                var facet;
                this.resetPaging();
                if (this.selectedFacets.hasOwnProperty(facetToRemove.facetFieldName)) {
                    facet = this.getSelectedFacetsArray(facetToRemove.facetFieldName);
                    if (facetToRemove.facetType.toLowerCase() === 'range') {
                        facet.selectedValues = undefined;
                    }
                    else {
                        // to string in case facetValue is a number
                        facet.selectedValues = _.without(facet.selectedValues, facetToRemove.facetValue.toString());
                    }
                    this.setSelectedFacet(facet);
                }
            };
            SearchCriteria.prototype.getSelectedFacetsArray = function (facetFieldName) {
                var isSelectedFacetArray;
                var selectedFacet = this.selectedFacets[facetFieldName];
                var selectedFacetArray;
                if (_.isArray(selectedFacet)) {
                    isSelectedFacetArray = true;
                    selectedFacetArray = selectedFacet;
                }
                else if (_.isString(selectedFacet)) {
                    isSelectedFacetArray = false;
                    selectedFacetArray = selectedFacet.split('|');
                }
                else {
                    throw new Error("The selected facet " + facetFieldName + " is not an array or a string");
                }
                return {
                    facetFieldName: facetFieldName,
                    selectedValues: selectedFacetArray,
                    isFacetArray: isSelectedFacetArray
                };
            };
            SearchCriteria.prototype.setSelectedFacet = function (selectedFacet) {
                var facetStr = '';
                if (_.isEmpty(selectedFacet.selectedValues)) {
                    delete this.selectedFacets[selectedFacet.facetFieldName];
                }
                else {
                    if (selectedFacet.isFacetArray) {
                        this.selectedFacets[selectedFacet.facetFieldName] = selectedFacet.selectedValues;
                    }
                    else {
                        _.each(selectedFacet.selectedValues, function (v) {
                            if (!_.isEmpty(facetStr)) {
                                facetStr = facetStr + '|';
                            }
                            facetStr = facetStr + v;
                        });
                        this.selectedFacets[selectedFacet.facetFieldName] = facetStr;
                    }
                }
            };
            SearchCriteria.prototype.clearSelectedMultiFacets = function () {
                var _this = this;
                var selectedFacets = this.selectedFacets, facetKey, facetKeysToDelete = [];
                for (facetKey in selectedFacets) {
                    if (selectedFacets.hasOwnProperty(facetKey) && this._facetRegistry[facetKey] === 'multiselect') {
                        facetKeysToDelete.push(facetKey);
                    }
                }
                facetKeysToDelete.forEach(function (facetKey) {
                    delete _this.selectedFacets[facetKey];
                });
            };
            SearchCriteria.prototype.resetPaging = function () {
                this.page = 1;
            };
            SearchCriteria.prototype.loadFacetCriteria = function (querystring) {
                var _this = this;
                // TODO: Don't need to loop over querystring again. Should
                // be processing this in the same loop as the non-facet criteria.
                var facetFieldName, facetValue, key, keys = {}, keyValues = {};
                if (querystring.length === 0) {
                    return;
                }
                querystring.substring(1).split('&').forEach(function (value, index, array) {
                    var keyValue = value.split('='), keyFound, valueFound;
                    if (keyValue.length === 2) {
                        keyFound = keyValue[0].toLowerCase();
                        valueFound = _this.decodeQuerystringValue(keyValue[1]);
                        if (keyFound.indexOf(SearchCriteria.facetFieldNameKeyPrefix) === 0) {
                            keys[keyFound.replace(SearchCriteria.facetFieldNameKeyPrefix, '')] = valueFound;
                        }
                        if (keyFound.indexOf(SearchCriteria.facetValueKeyPrefix) === 0) {
                            keyValues[keyFound.replace(SearchCriteria.facetValueKeyPrefix, '')] = valueFound;
                        }
                    }
                });
                for (key in keys) {
                    if (keys.hasOwnProperty(key)) {
                        facetFieldName = this.decodeQuerystringValue(keys[key]);
                        if (keyValues.hasOwnProperty(key)) {
                            facetValue = this.decodeQuerystringValue(keyValues[key]);
                            switch (this._facetRegistry[facetFieldName]) {
                                case 'multiselect':
                                    this.selectedFacets[facetFieldName] = facetValue.split('|');
                                    break;
                                default:
                                    this.selectedFacets[facetFieldName] = facetValue;
                                    break;
                            }
                        }
                    }
                }
            };
            SearchCriteria.prototype.loadNonFacetCriteria = function (querystring) {
                var _this = this;
                if (querystring.length === 0) {
                    return;
                }
                querystring.substring(1).split('&').forEach(function (value, index, array) {
                    var keyValue = value.split('='), keyFound, valueFound;
                    if (keyValue.length === 2) {
                        keyFound = keyValue[0].toUpperCase();
                        valueFound = _this.decodeQuerystringValue((keyValue[1] + ''));
                        switch (keyFound) {
                            case 'KEYWORDS':
                                _this.keywords = valueFound;
                                break;
                            case 'SORTBY':
                                _this.sortBy = valueFound;
                                break;
                            case 'SORTDIRECTION':
                                _this.sortDirection = valueFound;
                                break;
                            case 'PAGE':
                                _this.page = parseInt(valueFound, 10);
                                break;
                            default:
                                break;
                        }
                    }
                });
            };
            SearchCriteria.prototype.encodeQuerystringValue = function (valueToEncode) {
                return encodeURIComponent(valueToEncode).replace(/%20/g, '+');
            };
            SearchCriteria.prototype.decodeQuerystringValue = function (valueToDecode) {
                return decodeURIComponent(valueToDecode).replace(/\+/g, ' ');
            };
            SearchCriteria.facetFieldNameKeyPrefix = 'fn';
            SearchCriteria.facetValueKeyPrefix = 'fv';
            return SearchCriteria;
        }());
        Composer.SearchCriteria = SearchCriteria;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Events/IEventInformation.ts' />
/// <reference path='../../../Generics/Collections/IHashTable.ts' />
/// <reference path='../ISearchCriteriaOptions.ts' />
///<reference path='../../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var SearchEvents;
        (function (SearchEvents) {
            SearchEvents["SortingChanged"] = "sortingChanged";
            SearchEvents["SingleFacetsChanged"] = "singleFacetsChanged";
            SearchEvents["MultiFacetChanged"] = "multiFacetChanged";
            SearchEvents["FacetsCleared"] = "facetsCleared";
            SearchEvents["FacetRemoved"] = "facetRemoved";
            SearchEvents["FacetsRemoved"] = "facetsRemoved";
            SearchEvents["SingleCategoryAdded"] = "singleCategoryAdded";
            SearchEvents["FacetsModalOpened"] = "facetsModalOpened";
            SearchEvents["FacetsModalClosed"] = "facetsModalClosed";
            SearchEvents["SearchRequested"] = "searchRequested";
            SearchEvents["SearchResultsLoaded"] = "searchResultsLoaded";
            SearchEvents["FacetsLoaded"] = "facetsLoaded";
        })(SearchEvents = Composer.SearchEvents || (Composer.SearchEvents = {}));
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../../Typings/tsd.d.ts' />
/// <reference path='../../../Events/IEventHub.ts' />
/// <reference path='../../../Events/IEventInformation.ts' />
/// <reference path='../SearchCriteria.ts' />
/// <reference path='./ISearchService.ts' />
/// <reference path='../IFacet.ts' />
/// <reference path='../ISingleSelectCategory.ts' />
///<reference path='../../../Repositories/ISearchRepository.ts' />
///<reference path='../../../Repositories/SearchRepository.ts' />
/// <reference path='../Constants/SearchEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var FacetsModalId = '#facetsModal';
        // TODO: Decouple window object from search service.
        var SearchService = /** @class */ (function () {
            function SearchService(_eventHub, _window) {
                this._eventHub = _eventHub;
                this._window = _window;
                this._searchRepository = new Composer.SearchRepository();
                this._baseSearchUrl = window.location.href.replace(window.location.search, '');
                this.IsFacetsModalMode = false;
                this._searchCriteria = new Composer.SearchCriteria(_eventHub, _window);
                SearchService.instance = this;
            }
            SearchService.getInstance = function () {
                return SearchService.instance;
            };
            /**
             * Initializes the search service.
             *
             * param facetRegistry Facets available to the search service.
             */
            SearchService.prototype.initialize = function (options) {
                this._searchCriteria.initialize(options);
                this.registerSubscriptions();
            };
            SearchService.prototype.updateFacetRegistry = function (facetRegistry) {
                this._searchCriteria.updateFacetRegistry(facetRegistry);
            };
            SearchService.prototype.singleFacetsChanged = function (eventInformation) {
                var facetKey = eventInformation.data.facetKey, facetValue = eventInformation.data.facetValue;
                this._searchCriteria.addSingleFacet(facetKey, facetValue);
                this.search();
            };
            SearchService.prototype.sortingChanged = function (eventInformation) {
                this._searchCriteria.clearAll();
                this._searchCriteria.loadFromQuerystring(eventInformation.data.url);
                this.search();
            };
            SearchService.prototype.getSelectedFacets = function () {
                return this._searchCriteria.selectedFacets;
            };
            SearchService.prototype.multiFacetChanged = function (eventInformation) {
                this._searchCriteria.updateMultiFacets(eventInformation.data.filter);
                this.search();
            };
            SearchService.prototype.clearFacets = function (eventInformation) {
                var landingPageUrl = eventInformation.data.landingPageUrl;
                this._searchCriteria.clearFacets();
                if (landingPageUrl) {
                    this._baseSearchUrl = landingPageUrl;
                }
                this.search();
            };
            SearchService.prototype.removeFacet = function (eventInformation) {
                var facet = eventInformation.data;
                this._searchCriteria.removeFacet(facet);
                if (facet.facetLandingPageUrl && facet.facetType === 'SingleSelect') {
                    this._baseSearchUrl = facet.facetLandingPageUrl;
                    this._window.location.href = this._baseSearchUrl + this._searchCriteria.toQuerystring();
                }
                this.search();
            };
            SearchService.prototype.removeFacets = function (eventInformation) {
                var _this = this;
                var faces = eventInformation.data;
                faces.forEach(function (f) { return _this._searchCriteria.removeFacet(f); });
                this.search();
            };
            SearchService.prototype.addSingleSelectCategory = function (eventInformation) {
                var singleSelectCategory = eventInformation.data;
                this._baseSearchUrl = singleSelectCategory.categoryUrl;
                this.search();
            };
            SearchService.prototype.facetsModalOpened = function () {
                this.IsFacetsModalMode = true;
                this._searchCriteriaBackup = this._searchCriteria.toQuerystring();
                this.updateClearButtonState();
            };
            SearchService.prototype.facetsModalClosed = function () {
                this._searchCriteria.clearFacets();
                this._searchCriteria.loadFromQuerystring(this._searchCriteriaBackup);
                this.search();
                this.IsFacetsModalMode = false;
            };
            SearchService.prototype.facetsModalApply = function () {
                this.IsFacetsModalMode = false;
                this.search();
            };
            SearchService.prototype.facetsModalCancel = function () {
                this._searchCriteria.clearFacets();
                this.search();
            };
            SearchService.prototype.updateClearButtonState = function () {
                var clearAllButton = $(FacetsModalId + " .modal--cancel");
                var applyButton = $(FacetsModalId + " .modal--confirm");
                var selected = Object.keys(this.getSelectedFacets());
                if (selected.length === 0) {
                    clearAllButton.attr('disabled', 'true');
                }
                else {
                    clearAllButton.removeAttr('disabled');
                }
                applyButton.prop('disabled', this._searchCriteria.toQuerystring() === this._searchCriteriaBackup);
            };
            SearchService.prototype.registerSubscriptions = function () {
                var _this = this;
                this._eventHub.subscribe(Composer.SearchEvents.SortingChanged, this.sortingChanged.bind(this));
                this._eventHub.subscribe(Composer.SearchEvents.SingleFacetsChanged, this.singleFacetsChanged.bind(this));
                this._eventHub.subscribe(Composer.SearchEvents.MultiFacetChanged, this.multiFacetChanged.bind(this));
                this._eventHub.subscribe(Composer.SearchEvents.FacetsCleared, this.clearFacets.bind(this));
                this._eventHub.subscribe(Composer.SearchEvents.FacetRemoved, this.removeFacet.bind(this));
                this._eventHub.subscribe(Composer.SearchEvents.FacetsRemoved, this.removeFacets.bind(this));
                this._eventHub.subscribe(Composer.SearchEvents.SingleCategoryAdded, this.addSingleSelectCategory.bind(this));
                this._eventHub.subscribe(Composer.SearchEvents.FacetsModalOpened, this.facetsModalOpened.bind(this));
                this._eventHub.subscribe(Composer.SearchEvents.FacetsModalClosed, this.facetsModalClosed.bind(this));
                $(FacetsModalId).on('show.bs.modal', function (event) { return _this.facetsModalOpened(); });
                $(FacetsModalId).on('click', '.modal--close', this.facetsModalClosed.bind(this));
                $(FacetsModalId).on('click', '.modal--confirm', this.facetsModalApply.bind(this));
                $(FacetsModalId).on('click', '.modal--cancel', this.facetsModalCancel.bind(this));
            };
            SearchService.prototype.search = function () {
                var _this = this;
                if (this.IsFacetsModalMode) {
                    this.updateClearButtonState();
                    if ($(FacetsModalId).hasClass('loading'))
                        return;
                    $(FacetsModalId).addClass('loading');
                    var queryString = this._searchCriteria.toQuerystring();
                    var _a = this._searchCriteria, categoryId = _a.categoryId, queryName = _a.queryName, queryType = _a.queryType;
                    var getFacetsPromise = categoryId ? this._searchRepository.getCategoryFacets(categoryId, queryString) :
                        (queryName ? this._searchRepository.getQueryFacets(queryName, queryType, queryString) :
                            this._searchRepository.getFacets(queryString));
                    getFacetsPromise.then(function (result) { return _this._eventHub.publish(Composer.SearchEvents.FacetsLoaded, { data: result }); })
                        .fail(function (reason) { return console.log(reason); })
                        .finally(function () { return $(FacetsModalId).removeClass('loading'); });
                }
                else {
                    var queryString = this._searchCriteria.toQuerystring();
                    var _b = this._searchCriteria, categoryId = _b.categoryId, queryName = _b.queryName, queryType = _b.queryType;
                    this._eventHub.publish(Composer.SearchEvents.SearchRequested, { data: { categoryId: categoryId, queryName: queryName, queryType: queryType, queryString: queryString, selectedFacets: this.getSelectedFacets() } });
                    this._window.history.pushState(this._window.history.state, "", this._baseSearchUrl + queryString);
                }
            };
            return SearchService;
        }());
        Composer.SearchService = SearchService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Composer.Product/ProductSearch/Services/SearchService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var AutocompleteSearchService = /** @class */ (function (_super) {
            __extends(AutocompleteSearchService, _super);
            function AutocompleteSearchService() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.categoryFacet = /^CategoryLevel(\d+)_Facet$/;
                return _this;
            }
            AutocompleteSearchService.prototype.initialize = function (options) {
                this._searchCriteria.initialize(options);
                this._eventHub.subscribe('categorySuggestionClicked', this.categorySuggestionClicked.bind(this));
                this._eventHub.subscribe('brandSuggestionClicked', this.brandSuggestionClicked.bind(this));
            };
            AutocompleteSearchService.prototype.singleFacetsChanged = function (eventInformation) {
                var _this = this;
                var facetKey = eventInformation.data.facetKey, facetValue = eventInformation.data.facetValue;
                var matches = facetKey.match(/\d+/);
                if (matches) {
                    var selectedCategoryRank = +matches[0];
                    var selectedFacets = this._searchCriteria.selectedFacets;
                    Object.keys(selectedFacets).filter(function (facet) {
                        var categoryFacetMatches = facet.match(_this.categoryFacet);
                        return categoryFacetMatches && +categoryFacetMatches[1] > selectedCategoryRank;
                    }).forEach(function (facet) {
                        delete selectedFacets[facet];
                    });
                }
                this._searchCriteria.addSingleFacet(facetKey, facetValue);
                this.search();
            };
            AutocompleteSearchService.prototype.removeCategories = function () {
                var _this = this;
                var selectedFacets = this._searchCriteria.selectedFacets;
                Object.keys(selectedFacets).filter(function (facet) {
                    return _this.categoryFacet.test(facet);
                }).forEach(function (facet) {
                    delete selectedFacets[facet];
                });
                this.search();
            };
            AutocompleteSearchService.prototype.categorySuggestionClicked = function (eventInformation) {
                if (eventInformation.data.url) {
                    this._window.location.href = eventInformation.data.url;
                }
                else {
                    this._searchCriteria.clearFacets();
                    var suggestion = eventInformation.data.suggestion;
                    var parents = eventInformation.data.parents;
                    for (var i = 0; i < parents.length; ++i) {
                        this._searchCriteria.addSingleFacet("CategoryLevel" + (i + 1) + "_Facet", parents[i]);
                    }
                    this._searchCriteria.addSingleFacet("CategoryLevel" + (parents.length + 1) + "_Facet", suggestion);
                    this._searchCriteria.keywords = '*';
                    this._searchCriteria.correctedSearchTerm = '*';
                    this.search();
                }
            };
            AutocompleteSearchService.prototype.brandSuggestionClicked = function (eventInformation) {
                var suggestion = eventInformation.data.suggestion;
                this._searchCriteria.clearFacets();
                this._searchCriteria.addSingleFacet('Brand', suggestion);
                this._searchCriteria.keywords = '*';
                this._searchCriteria.correctedSearchTerm = '*';
                this.search();
            };
            AutocompleteSearchService.prototype.search = function () {
                var queryString = this._searchCriteria.toQuerystring();
                this._window.location.href = this._baseSearchUrl + queryString;
            };
            return AutocompleteSearchService;
        }(Composer.SearchService));
        Composer.AutocompleteSearchService = AutocompleteSearchService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Mvc/Controller.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var SearchBoxController = /** @class */ (function (_super) {
            __extends(SearchBoxController, _super);
            function SearchBoxController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SearchBoxController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerFormsForValidation(this.context.container.find('form'));
            };
            return SearchBoxController;
        }(Composer.Controller));
        Composer.SearchBoxController = SearchBoxController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Services/AutocompleteSearchService.ts' />
/// <reference path='../Events/EventHub.ts' />
/// <reference path='./SearchBoxController.ts' />
///<reference path='../Mvc/ComposerClient.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var AutocompleteSearchBoxVueController = /** @class */ (function (_super) {
            __extends(AutocompleteSearchBoxVueController, _super);
            function AutocompleteSearchBoxVueController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AutocompleteSearchBoxVueController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeVue();
                this.searchService = new Composer.AutocompleteSearchService(Composer.EventHub.instance(), window);
                this.searchService.initialize({
                    correctedSearchTerm: '',
                    facetRegistry: {}
                });
                this.searchService['_baseSearchUrl'] = document.getElementById("frm-search-box").getAttribute('action');
            };
            AutocompleteSearchBoxVueController.prototype.initializeVue = function () {
                this.VueAutocomplete = new Vue({
                    el: '#vueAutocomplete',
                    components: {
                        VueAutosuggest: VueAutosuggest.VueAutosuggest
                    },
                    data: function () {
                        return {
                            query: "",
                            results: [],
                            timeout: null,
                            selected: null,
                            debounceMilliseconds: 500,
                            suggestions: [],
                            sectionConfigs: {
                                autocomplete: {
                                    active: true,
                                    onSelected: function (selected) {
                                        this.selected = selected.item;
                                    }.bind(this),
                                    //label: "suggestbrands",
                                    type: "default-section",
                                    ulClass: "row autosuggest-top-results",
                                    liClass: {
                                        "col-12": true,
                                    }
                                },
                                suggestcategories: {
                                    onSelected: function (selected) {
                                        this.selectedCategorySuggestion(selected);
                                        this.selected = selected.item;
                                    }.bind(this),
                                },
                                suggestbrands: {
                                    onSelected: function (selected) {
                                        this.selectedBrandSuggestion(selected);
                                        this.selected = selected.item;
                                    }.bind(this),
                                },
                                suggestterms: {
                                    onSelected: function (selected) {
                                        this.selected = selected.item;
                                        this.selectedSearchTermsSuggestion(selected);
                                    }.bind(this),
                                },
                                default: {
                                    onSelected: function () { },
                                }
                            }
                        };
                    },
                    mounted: function () {
                        var _this = this;
                        this.query = this.$el.attributes.keywords.value;
                        this.sectionConfigs.autocomplete.limit = +this.$el.attributes['autocomplete-limit'].value;
                        this.sectionConfigs.suggestcategories.limit = +this.$el.attributes['categories-limit'].value;
                        this.sectionConfigs.suggestbrands.limit = +this.$el.attributes['brand-limit'].value;
                        this.sectionConfigs.suggestterms.limit = +this.$el.attributes['search-terms-limit'].value;
                        this.sectionConfigs.suggestcategories.active = !!this.$el.attributes['categories-enable'];
                        this.sectionConfigs.suggestbrands.active = !!this.$el.attributes['brands-enable'];
                        this.sectionConfigs.suggestterms.active = !!this.$el.attributes['search-terms-enable'];
                        this.sectionConfigs.suggestcategories.displayCategoryPage = !!this.$el.attributes['category-suggestions-as-pages'];
                        this.minSearchSize = +this.$el.attributes['min-search-size'].value;
                        if (this.query) {
                            this.fetchResults(this.query);
                        }
                        var input = document.getElementById('autosuggest__input');
                        input.addEventListener('keydown', function (event) {
                            if (event.code === 'Enter') {
                                _this.searchMore();
                            }
                        });
                    },
                    updated: function () {
                    },
                    computed: {
                        isEmptyRight: function () {
                            return this.suggestions.length === 1;
                        }
                    },
                    methods: {
                        selectCategory: function (suggestion) {
                            this.sectionConfigs.suggestcategories.onSelected({ item: suggestion });
                        },
                        fetchResults: function (result) {
                            var _this = this;
                            var query = this.query;
                            clearTimeout(this.timeout);
                            this.timeout = setTimeout(function () {
                                var sectionNames = Object.keys(_this.sectionConfigs).filter(function (name) { return _this.sectionConfigs[name].active; });
                                var results = sectionNames.map(function (sectionName) {
                                    var limit = _this.sectionConfigs[sectionName].limit;
                                    var apiPath = "/api/search/" + sectionName + "?limit=" + limit;
                                    if (sectionName === 'suggestcategories' && _this.sectionConfigs.suggestcategories.displayCategoryPage) {
                                        apiPath = apiPath + "&withCategoriesUrl=" + _this.sectionConfigs.suggestcategories.displayCategoryPage;
                                    }
                                    return Composer.ComposerClient.post(apiPath, { Query: query });
                                });
                                Q.all(results).then(function (values) {
                                    _this.selected = null;
                                    _this.suggestions = sectionNames
                                        .map(_this.mapSections(values, query))
                                        .filter(function (_a) {
                                        var data = _a.data, name = _a.name;
                                        return data.length || name === 'autocomplete';
                                    });
                                });
                            }, this.debounceMilliseconds);
                        },
                        htmlDecode: function (value) {
                            return $('<div/>').html(value).text();
                        },
                        highlightSuggestion: function (value, query) {
                            var decodedValue = this.htmlDecode(value);
                            var start = decodedValue.toLowerCase().indexOf(query.toLowerCase());
                            var end = start + query.length;
                            if (start < 0)
                                return decodedValue;
                            return [
                                decodedValue.slice(0, start),
                                "<strong>" + decodedValue.slice(start, end) + "</strong>",
                                decodedValue.slice(end),
                            ].join('');
                        },
                        mapSections: function (values, query) {
                            var _this = this;
                            return function (sectionName, index) { return ({
                                name: sectionName,
                                data: _this.mapSuggestions(values[index].Suggestions, sectionName, query)
                            }); };
                        },
                        mapSuggestions: function (suggestions, sectionName, query) {
                            var _this = this;
                            if (suggestions === void 0) { suggestions = []; }
                            return suggestions.map(function (suggest) {
                                var mappedDisplayName = _this.highlightSuggestion(suggest.DisplayName, query);
                                if (sectionName === 'suggestcategories') {
                                    suggest.ParentsFullInfo.forEach(function (el) {
                                        var displayName = _this.highlightSuggestion(el.DisplayName, query);
                                        el.mappedDisplayName = displayName + " (" + el.Quantity + ") >";
                                    });
                                    mappedDisplayName = mappedDisplayName + " (" + suggest.Quantity + ")";
                                }
                                return (__assign({}, suggest, { mappedDisplayName: mappedDisplayName }));
                            });
                        },
                        getSuggestionValue: function (suggestion) {
                            var name = suggestion.name, item = suggestion.item;
                            return item.DisplayName;
                        },
                        shouldRenderSuggestions: function (size, loading) {
                            return this.query.length >= this.minSearchSize && !loading && this.suggestions.length;
                        },
                        searchMore: function () {
                            var elem = document.getElementById("frm-search-box");
                            elem.submit();
                        },
                        selectedSearchTermsSuggestion: function (suggestion) {
                            var _this = this;
                            Composer.EventHub.instance().publish('searchTermSuggestionClicked', {
                                data: {
                                    suggestion: suggestion.item.DisplayName,
                                }
                            });
                            this.query = suggestion.item.DisplayName;
                            this.$nextTick().then(function () {
                                _this.searchMore();
                            });
                        },
                        selectedCategorySuggestion: function (suggestion) {
                            Composer.EventHub.instance().publish('categorySuggestionClicked', {
                                data: {
                                    suggestion: suggestion.item.DisplayName,
                                    parents: suggestion.item.Parents,
                                    url: suggestion.item.Url
                                }
                            });
                        },
                        selectedBrandSuggestion: function (suggestion) {
                            Composer.EventHub.instance().publish('brandSuggestionClicked', {
                                data: { suggestion: suggestion.item.DisplayName }
                            });
                        },
                        onImageError: function (e, suggestion) {
                            var img = suggestion.item.FallbackImageUrl;
                            if (img) {
                                e.target.onerror = null;
                                e.target.src = img;
                            }
                        },
                        onOpened: function () {
                            document.body.classList.add("modal-open");
                        },
                        onClosed: function () {
                            document.body.classList.remove("modal-open");
                        }
                    }
                });
            };
            return AutocompleteSearchBoxVueController;
        }(Composer.SearchBoxController));
        Composer.AutocompleteSearchBoxVueController = AutocompleteSearchBoxVueController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Mvc/Controller.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var LanguageSwitchController = /** @class */ (function (_super) {
            __extends(LanguageSwitchController, _super);
            function LanguageSwitchController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.languageSwitchEvent = 'languageSwitchEvent';
                return _this;
            }
            LanguageSwitchController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.cacheProvider = Composer.CacheProvider.instance();
            };
            LanguageSwitchController.prototype.onLanguageSwitch = function () {
                this.cacheProvider.defaultCache.set(this.languageSwitchEvent, true);
            };
            return LanguageSwitchController;
        }(Composer.Controller));
        Composer.LanguageSwitchController = LanguageSwitchController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Mvc/Controller.ts' />
///<reference path='../Mvc/ComposerClient.ts'/>
///<reference path='../Mvc/ControllerFactory.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var LazyController = /** @class */ (function (_super) {
            __extends(LazyController, _super);
            function LazyController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LazyController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.loadContent();
            };
            LazyController.prototype.loadContent = function () {
                var _this = this;
                var request = this.context.container.data('request');
                if (request) {
                    Composer.ComposerClient.post('/api/function/body', request).then(function (payload) {
                        _this.replaceContent(payload);
                    });
                }
            };
            LazyController.prototype.replaceContent = function (newContent) {
                var _this = this;
                var controllerRegistry = new Orckestra.Composer.ControllerRegistry(), controller;
                var newHtml = $(newContent);
                this.context.container.replaceWith(newHtml);
                var blades = newHtml.find('[data-oc-controller]').addBack('[data-oc-controller]'), controllers = [];
                blades.each(function (index, item) {
                    var bladeName = item.getAttribute('data-oc-controller'), context;
                    if (controllerRegistry.isRegistered(bladeName)) {
                        context = {
                            container: $(item),
                            dataItemId: item.getAttribute('data-item-id'),
                            templateName: bladeName,
                            viewModel: JSON.parse(item.getAttribute('data-context') || window[item.getAttribute('data-context-var')] || '{}'),
                            window: window
                        };
                        controller = Orckestra.Composer.ControllerFactory.createController({
                            controllerName: bladeName,
                            context: context,
                            eventHub: _this.eventHub,
                            composerContext: _this.composerContext,
                            composerConfiguration: _this.composerConfiguration
                        });
                        controller.initialize();
                        controllers.push(controller);
                    }
                });
                $(window).on('beforeunload', function () {
                    controllers.forEach(function (controller) { return controller.dispose(); });
                });
            };
            return LazyController;
        }(Composer.Controller));
        Composer.LazyController = LazyController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../Mvc/Controller.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var PageNotFoundAnalyticsController = /** @class */ (function (_super) {
            __extends(PageNotFoundAnalyticsController, _super);
            function PageNotFoundAnalyticsController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PageNotFoundAnalyticsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var pageUrl = decodeURIComponent(Composer.urlHelper.getURLParameter(window.location.href, 'errorpath'));
                if (!pageUrl || pageUrl === 'null') {
                    pageUrl = window.location.href;
                }
                this.eventHub.publish('pageNotFound', { data: { PageUrl: pageUrl, ReferrerUrl: document.referrer } });
            };
            return PageNotFoundAnalyticsController;
        }(Composer.Controller));
        Composer.PageNotFoundAnalyticsController = PageNotFoundAnalyticsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../Mvc/Controller.ts' />
/// <reference path='./IErrorCollection.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ErrorController = /** @class */ (function (_super) {
            __extends(ErrorController, _super);
            function ErrorController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ErrorController.prototype.initialize = function () {
                this.subscribeToEvents();
            };
            ErrorController.prototype.subscribeToEvents = function () {
                var _this = this;
                this.eventHub.subscribe('GeneralErrorOccured', function (eventInfo) { return _this.handleGeneralError(eventInfo.data, eventInfo.source); });
            };
            ErrorController.prototype.handleGeneralError = function (errors, source) {
                var errorCodes = _.map(errors.Errors, 'ErrorCode').sort();
                var lastErrorCodes = this.lastErrorCodes ? this.lastErrorCodes : [];
                var isMatch = _.isEqual(errorCodes, lastErrorCodes);
                if (!isMatch) {
                    this.lastErrorCodes = errorCodes;
                    this.render('FormErrorMessages', errors);
                }
                //Scroll to the error message if there's one
                if (errors && errors.Errors && errors.Errors.length > 0) {
                    this.scrollToElement($('[data-templateid="FormErrorMessages"]'));
                }
            };
            ErrorController.prototype.scrollToElement = function (element, offsetDiff) {
                if (offsetDiff === void 0) { offsetDiff = 100; }
                $('html, body').animate({
                    scrollTop: $(element).offset().top - offsetDiff
                }, 10);
            };
            return ErrorController;
        }(Composer.Controller));
        Composer.ErrorController = ErrorController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='./IScheduledCallback.ts' />
///<reference path='./EventHub.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        /**
         * Class in charge of scheduling multiple calls to an event.
         * This class is a multiton. Please use the instance() method to get an instance.
         */
        var EventScheduler = /** @class */ (function () {
            /**
             * Constructor. Should be used for testing purposes and inside the multiton only.
             * @param eventName The name of the event to subscribe to.
             */
            function EventScheduler(eventName) {
                var _this = this;
                var instance = EventScheduler.instances[eventName];
                if (instance) {
                    throw new Error('Error: Instantiation failed: Use EventScheduler.instance(eventName: string) instead of new.');
                }
                this.eventName = eventName;
                this.onEventCallbacks = [];
                Composer.EventHub.instance().subscribe(this.eventName, function (e) { return _this.trigger(e.data); });
            }
            /**
             * Get an instance of the EventScheduler for a specific event.
             * @param eventName The name of the event to listen to.
             */
            EventScheduler.instance = function (eventName) {
                var instance = EventScheduler.instances[eventName];
                if (!instance) {
                    instance = new EventScheduler(eventName);
                    EventScheduler.instances[eventName] = instance;
                }
                return instance;
            };
            /**
             * Subscribes a callback to the EventScheduler.
             * @param callback Function to call when the event arises. Must return a promise.
             */
            EventScheduler.prototype.subscribe = function (callback) {
                this.onEventCallbacks.push(callback);
            };
            /**
             * Sets the callback method that will be invoked after all the others are done executing.
             * @param postEventCallback Function to call when all other callbacks have been executed.
             */
            EventScheduler.prototype.setPostEventCallback = function (postEventCallback) {
                this.postEventCallback = postEventCallback;
            };
            EventScheduler.prototype.trigger = function (data) {
                var _this = this;
                var promise = this.triggerCallbacks(data);
                promise
                    .then(function (data) { return _this.triggerPostEvent(data); })
                    .done(function () { return console.log("Event '" + _this.eventName + "' fulfilled by the Event Schedule successfully."); }, function (reason) { return _this.onError(reason); });
            };
            EventScheduler.prototype.triggerCallbacks = function (data) {
                var promise;
                if (_.isEmpty(this.onEventCallbacks)) {
                    promise = Q(data);
                }
                else {
                    var promises = _.map(this.onEventCallbacks, function (callback) { return callback(data); });
                    promise = Q.all(promises)
                        .then(function (values) {
                        return data;
                    });
                }
                return promise;
            };
            EventScheduler.prototype.triggerPostEvent = function (data) {
                var promise;
                if (this.postEventCallback) {
                    promise = this.postEventCallback(data);
                }
                else {
                    promise = Q(data);
                }
                return promise;
            };
            /**
             * Gets invoked when an error occurs while executing the promises chain.
             */
            EventScheduler.prototype.onError = function (reason) {
                console.error("An error occured while processing the event '" + this.eventName + "' with the EventScheduler.", reason);
            };
            EventScheduler.instances = {};
            return EventScheduler;
        }());
        Composer.EventScheduler = EventScheduler;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
///<reference path='./IControllerActionContext.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='./IPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var AntiIFrameClickJackingPlugin = /** @class */ (function () {
            function AntiIFrameClickJackingPlugin() {
            }
            AntiIFrameClickJackingPlugin.prototype.initialize = function (window, document) {
                if (this.getOrigin(window.self) !== this.getOrigin(window.top)) {
                    console.warn('This site cannot be hosted in an iFrame. Redirecting.');
                    window.top.location.href = window.self.location.href;
                }
            };
            AntiIFrameClickJackingPlugin.prototype.getOrigin = function (window) {
                return window.location['origin'];
            };
            return AntiIFrameClickJackingPlugin;
        }());
        Composer.AntiIFrameClickJackingPlugin = AntiIFrameClickJackingPlugin;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Typings/tsd.d.ts' />
/// <reference path='../Validation/IParsleyValidator.ts' />
/// <reference path='../ComposerContext.ts' />
/// <reference path='./IPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ComposerValidationLocalizationPlugin = /** @class */ (function () {
            function ComposerValidationLocalizationPlugin() {
            }
            ComposerValidationLocalizationPlugin.prototype.initialize = function (window, document) {
                var locale, parlseyConfig = window.ParsleyConfig, parsleyLocaleMessages = JSON.parse(Orckestra.Composer.Templates['GlobalValidation']()), composerContext = new Composer.ComposerContext();
                locale = composerContext.language;
                if (_.isEmpty(locale)) {
                    throw new Error('The locale has not been set');
                }
                window.ParsleyConfig = window.ParsleyConfig || {};
                window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};
                window.ParsleyConfig.i18n[locale] =
                    jQuery.extend(window.ParsleyConfig.i18n[locale] || {}, parsleyLocaleMessages);
                // If file is loaded after Parsley main file, auto-load locale
                if (window.ParsleyValidator !== void 0) {
                    window.ParsleyValidator.addCatalog(locale, window.ParsleyConfig.i18n[locale], true);
                    window.ParsleyValidator.setLocale(locale);
                }
                this.defineValidators(window.ParsleyValidator);
            };
            ComposerValidationLocalizationPlugin.prototype.defineValidators = function (parsleyValidator) {
                var regex = /^(?!(.|\n)*<[a-z!\/?])(?!(.|\n)*&#)(.|\n)*$/i;
                parsleyValidator.addValidator('antixss', function (value, requirement) {
                    var isReq;
                    if (_.isString(requirement)) {
                        isReq = requirement.toLowerCase() === 'true';
                    }
                    else {
                        isReq = !!requirement;
                    }
                    var isValid = !isReq || regex.test(value);
                    return isValid;
                });
                //en: 'This field contains invalid characters.',
                //fr: 'Ce champ contient des caractères invalides.'
            };
            return ComposerValidationLocalizationPlugin;
        }());
        Composer.ComposerValidationLocalizationPlugin = ComposerValidationLocalizationPlugin;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='./IPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var FocusElementPlugin = /** @class */ (function () {
            function FocusElementPlugin() {
            }
            FocusElementPlugin.prototype.initialize = function (window, document) {
                /**
                 * On click, scroll to field and focus in it.
                 */
                $('body', document).on('click', '[data-focus-element]', function (e) {
                    var target = $(this).data('focus-element');
                    $('body, html').scrollTop($(target).offset().top - 20);
                    $(target).focus();
                    e.preventDefault();
                });
            };
            return FocusElementPlugin;
        }());
        Composer.FocusElementPlugin = FocusElementPlugin;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='./IPlugin.ts' />
/// <reference path='../JQueryPlugins/IPopOverJqueryPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var HelpBubblesPlugin = /** @class */ (function () {
            function HelpBubblesPlugin() {
            }
            HelpBubblesPlugin.prototype.initialize = function (window, document) {
                /**
                 * Will calculate if there is enough space for the popover on the right
                 * else will put it in the bottom.
                 */
                function popoverPlacement(popover, triggeringElement) {
                    var triggeringElementWidth = $(triggeringElement).outerWidth();
                    var placement = 'bottom';
                    // we will consider that if the trrigering element can't be doubled
                    // we won't have enough space to display the popover on the right
                    if ((window.innerWidth - triggeringElementWidth) > triggeringElementWidth) {
                        placement = 'right';
                    }
                    return placement;
                }
                //  As discussed with Sam, this is in the app.ts for now. Because we don't have a strategy
                //  yet for generic presentation/plugins javascript.
                //  Pop over initialization.
                $('body').popover({
                    html: true,
                    placement: popoverPlacement,
                    selector: '[data-toggle=popover]',
                    trigger: 'focus',
                    content: function () {
                        return $('#popover-content').html();
                    }
                });
                /**
                 * Needs the select block of a same group to have data-parent defined
                 * OR that they be in the same form.
                 */
                $('body').on('change', '.select-block', function () {
                    var input = $(this).find('.input');
                    var type = input.attr('type');
                    var name = input.attr('name');
                    // if checkbox check current state of prop
                    if (type === 'checkbox') {
                        if (input.prop('checked')) {
                            $(this).addClass('active');
                        }
                        else {
                            $(this).removeClass('active');
                        }
                    }
                    if (type === 'radio') {
                        var parentSelector = $(this).data('parent');
                        var parentElement;
                        if (parentSelector) {
                            parentElement = input.closest(parentSelector);
                        }
                        else {
                            // if no parent specified, default to form and fallback to body
                            parentElement = input.closest('form');
                            if (parentElement.length === 0) {
                                parentElement = $('body');
                            }
                        }
                        parentElement
                            .find('.select-block:has(:radio[name="' + name + '"])')
                            .removeClass('active');
                        $(this).addClass('active');
                    }
                });
            };
            return HelpBubblesPlugin;
        }());
        Composer.HelpBubblesPlugin = HelpBubblesPlugin;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./IPlugin.ts' />
///<reference path='../Events/EventHub.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var SlickCarouselPlugin = /** @class */ (function () {
            function SlickCarouselPlugin() {
            }
            SlickCarouselPlugin.prototype.initialize = function (window, document) {
                this.subscriptEvents();
                this.initSlick();
            };
            SlickCarouselPlugin.prototype.initSlick = function () {
                $.each($('.js-slick-carousel'), function (index, element) {
                    var slickInstance = $(element);
                    var slickOptions = {
                        arrows: true,
                        responsive: [{
                                dots: false,
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    infinite: true
                                }
                            }]
                    };
                    if (!$(slickInstance).hasClass('slick-initialized')) {
                        if (slickInstance.data('slick').mobileCarousel) {
                            var nbSlideToShow = slickInstance.data('slick').mobileSlidesToShow;
                            nbSlideToShow = (nbSlideToShow) ? nbSlideToShow : 1;
                            var nbSlideToScroll = slickInstance.data('slick').mobileSlidesToScroll;
                            nbSlideToScroll = (nbSlideToScroll) ? nbSlideToScroll : 1;
                            slickOptions.responsive.push({
                                breakpoint: 576,
                                arrows: false,
                                dots: true,
                                settings: {
                                    slidesToShow: nbSlideToShow,
                                    slidesToScroll: nbSlideToScroll,
                                    dots: true,
                                    infinite: true,
                                    centerMode: true,
                                }
                            });
                        }
                        else {
                            slickOptions.responsive.push({
                                breakpoint: 576,
                                arrows: false,
                                settings: 'unslick' // destroys slick
                            });
                        }
                        slickInstance.slick(slickOptions);
                    }
                });
            };
            SlickCarouselPlugin.prototype.subscriptEvents = function () {
                var _this = this;
                var self = this;
                $(window).on('resize', function () {
                    if ($(window).width() > 768) {
                        _this.initSlick();
                    }
                });
                Composer.EventHub.instance().subscribe('iniCarousel', function (data) {
                    _this.initSlick();
                });
            };
            return SlickCarouselPlugin;
        }());
        Composer.SlickCarouselPlugin = SlickCarouselPlugin;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='./IPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var StickyAffixPlugin = /** @class */ (function () {
            function StickyAffixPlugin() {
            }
            StickyAffixPlugin.prototype.initialize = function (window, document) {
                $('[data-sticky-top]').each(function () {
                    var stickyOffset = $(this).data('sticky-top-offset');
                    stickyOffset = stickyOffset ? stickyOffset : 0;
                    $(this).affix({
                        offset: {
                            top: function (element) {
                                return $(element).parent().offset().top - stickyOffset;
                            }
                        }
                    });
                });
            };
            return StickyAffixPlugin;
        }());
        Composer.StickyAffixPlugin = StickyAffixPlugin;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../Mvc/ComposerClient.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
/// <reference path='../Mvc/ComposerClient.ts' />
/// <reference path='./IOrderRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var OrderRepository = /** @class */ (function () {
            function OrderRepository() {
            }
            OrderRepository.prototype.editOrder = function (OrderNumber) {
                return Composer.ComposerClient.post('/api/order/edit-order', { OrderNumber: OrderNumber });
            };
            OrderRepository.prototype.saveEditOrder = function (OrderNumber) {
                return Composer.ComposerClient.post('/api/order/save-edited-order', { OrderNumber: OrderNumber });
            };
            OrderRepository.prototype.cancelEditOrder = function (OrderNumber) {
                return Composer.ComposerClient.post('/api/order/cancel-edit-order', { OrderNumber: OrderNumber });
            };
            OrderRepository.prototype.getEditedOrder = function () {
                return Composer.ComposerClient.post('/api/order/get-edited-order', {});
            };
            OrderRepository.prototype.getPastOrders = function (options) {
                if (options === void 0) { options = { page: 1 }; }
                return Composer.ComposerClient.post('/api/order/past-orders', options);
            };
            OrderRepository.prototype.getCurrentOrders = function (options) {
                if (options === void 0) { options = { page: 1 }; }
                return Composer.ComposerClient.post('/api/order/current-orders', options);
            };
            OrderRepository.prototype.cancelOrder = function (OrderNumber) {
                return Composer.ComposerClient.post('/api/order/cancel-order', OrderNumber);
            };
            return OrderRepository;
        }());
        Composer.OrderRepository = OrderRepository;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var AddressUtils = /** @class */ (function () {
            function AddressUtils() {
            }
            /**
             * Get current website id
             */
            AddressUtils.isEquals = function (addr1, addr2) {
                return (addr1.FirstName === addr2.FirstName) &&
                    (addr1.LastName === addr2.LastName) &&
                    (addr1.Line1 === addr2.Line1) &&
                    (addr1.Line2 === addr2.Line2) &&
                    (addr1.City === addr2.City) &&
                    (addr1.RegionCode === addr2.RegionCode) &&
                    (addr1.PostalCode === addr2.PostalCode) &&
                    (addr1.PhoneNumber === addr2.PhoneNumber) &&
                    (addr1.CountryCode === addr2.CountryCode);
            };
            return AddressUtils;
        }());
        Composer.AddressUtils = AddressUtils;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./IAnalyticsProduct.ts' />
///<reference path='./IAnalyticsSearchResults.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./IAnalyticsCoupon.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../Events/EventHub.ts' />
/// <reference path='./IAnalyticsPlugin.ts' />
/// <reference path='./IAnalyticsOrder.ts' />
/// <reference path='./IAnalyticsTransaction.ts' />
/// <reference path='./IAnalyticsSearchFilters.ts' />
/// <reference path='../../Plugins/IPlugin.ts' />
/// <reference path='../../Composer.MyAccount/Common/MyAccountEvents.ts' />
/// <reference path='../../Composer.Product/ProductEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var AnalyticsPlugin = /** @class */ (function () {
            function AnalyticsPlugin() {
            }
            AnalyticsPlugin.prototype.initialize = function () {
                this.useVariantIdWhenPossible = true;
                this.eventHub = Composer.EventHub.instance();
                this.cacheProvider = Composer.CacheProvider.instance();
                this.registerSubscriptions();
            };
            AnalyticsPlugin.setCheckoutOrigin = function (checkoutOrigin) {
                Composer.CacheProvider.instance().sessionStorage.setItem('analytics.checkoutOrigin', checkoutOrigin);
            };
            AnalyticsPlugin.getCheckoutOrigin = function () {
                return Composer.CacheProvider.instance().sessionStorage.getItem('analytics.checkoutOrigin');
            };
            /**
             * Binds all the events for Analytics
             */
            AnalyticsPlugin.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe(Composer.ProductEvents.LineItemAdding, function (eventInfo) {
                    _this.onLineItemAdding(eventInfo);
                });
                this.eventHub.subscribe(Composer.ProductEvents.LineItemRemoving, function (eventInfo) {
                    _this.onLineItemRemoving(eventInfo);
                });
                this.eventHub.subscribe('productDetailsRendered', function (eventInfo) {
                    _this.onProductDetailsRendered(eventInfo);
                });
                this.eventHub.subscribe('checkoutStepRendered', function (eventInfo) {
                    _this.onCheckoutStepRendered(eventInfo);
                });
                this.eventHub.subscribe('checkoutNavigationRendered', function (eventInfo) {
                    _this.onCheckoutNavigationRendered(eventInfo);
                });
                this.eventHub.subscribe('CheckoutConfirmation', function (eventInfo) {
                    _this.onCheckoutCompleted(eventInfo);
                });
                this.eventHub.subscribe('searchResultRendered', function (eventInfo) {
                    _this.onSearchResultRendered(eventInfo);
                });
                this.eventHub.subscribe('contentSearchResultRendered', function (eventInfo) {
                    _this.onContentSearchResultRendered(eventInfo);
                });
                this.eventHub.subscribe('relatedProductsLoaded', function (eventInfo) {
                    _this.onRelatedProductsLoaded(eventInfo);
                });
                this.eventHub.subscribe('productClick', function (eventInfo) {
                    _this.onProductClick(eventInfo);
                });
                this.eventHub.subscribe('pageNotFound', function (eventInfo) {
                    _this.onPageNotFound(eventInfo);
                });
                this.eventHub.subscribe('wishListLineItemAdding', function (eventInfo) {
                    _this.onWishListLineItemAdding(eventInfo);
                });
                this.eventHub.subscribe('wishListLineItemAddingToCart', function (eventInfo) {
                    _this.onLineItemAdding(eventInfo);
                });
                this.eventHub.subscribe('wishListCopyingShareUrl', function (eventInfo) {
                    _this.onWishListCopingShareUrl(eventInfo);
                });
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn], function (eventInfo) {
                    _this.onUserLoggedIn(eventInfo);
                });
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.AccountCreated], function (eventInfo) {
                    _this.onUserCreated(eventInfo);
                });
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.ForgotPasswordInstructionSent], function (eventInfo) {
                    _this.onRecoverPassword(eventInfo);
                });
                this.eventHub.subscribe('noResultsFound', function (eventInfo) {
                    _this.onNoResultsFound(eventInfo);
                });
                this.eventHub.subscribe('searchTermCorrected', function (eventInfo) {
                    _this.onSearchTermCorrected(eventInfo);
                });
                this.eventHub.subscribe('singleCategoryAdded', function (eventInfo) {
                    _this.onSingleFacetChanged(eventInfo);
                });
                this.eventHub.subscribe('singleFacetsChanged', function (eventInfo) {
                    _this.onSingleFacetChanged(eventInfo);
                });
                this.eventHub.subscribe('multiFacetChanged', function (eventInfo) {
                    _this.onMultiFacetChanged(eventInfo);
                });
                this.eventHub.subscribe('sortingChanged', function (eventInfo) {
                    _this.onSortingChanged(eventInfo);
                });
            };
            /**
             * Occurs when a user log in
             */
            AnalyticsPlugin.prototype.onUserLoggedIn = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                this.userLoggedIn('regular', data.ReturnUrl);
            };
            /**
             * Occurs when a user creates an account
             */
            AnalyticsPlugin.prototype.onUserCreated = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                this.userCreated();
            };
            /**
             * Occurs when a user log in
             */
            AnalyticsPlugin.prototype.onRecoverPassword = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                this.recoverPassword();
            };
            AnalyticsPlugin.prototype.onSingleFacetChanged = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var facetKey = data.facetKey;
                if (_.isString(data.facetKey)) {
                    facetKey = data.facetKey.replace('[]', '').toLowerCase();
                    if (facetKey.indexOf('category') !== -1) {
                        facetKey = 'category';
                    }
                }
                var searchFilters = {
                    facetKey: facetKey,
                    facetValue: data.facetValue,
                    pageType: data.pageType
                };
                this.singleFacetChanged(searchFilters);
            };
            AnalyticsPlugin.prototype.onMultiFacetChanged = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var facetKey = _.isString(data.facetKey) ? data.facetKey.replace('[]', '').toLowerCase() : data.facetKey;
                var searchFilters = {
                    facetKey: facetKey,
                    facetValue: data.facetValue,
                    pageType: data.pageType
                };
                this.multiFacetChanged(searchFilters);
            };
            AnalyticsPlugin.prototype.onSortingChanged = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                this.sortingChanged(data.sortingType, data.pageType);
            };
            /**
             * Occurs when a 404 page loads.
             */
            AnalyticsPlugin.prototype.onPageNotFound = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                this.sendEvent('event', '404 Errors', data.PageUrl, data.ReferrerUrl);
            };
            /**
            * Occurs when a user click on 'Copy Share Url' button
            */
            AnalyticsPlugin.prototype.onWishListCopingShareUrl = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                this.shareWishList(data);
            };
            /**
             * Occurs when a Line Item is being added to the Wish List.
             */
            AnalyticsPlugin.prototype.onWishListLineItemAdding = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var analyticsProduct = {
                    name: data.DisplayName,
                    price: this.trimPrice(data.ListPrice)
                };
                this.addToWishList(analyticsProduct);
            };
            /**
             * Occurs when a Line Item is being added.
             */
            AnalyticsPlugin.prototype.onLineItemAdding = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var analyticsProduct = {
                    name: data.DisplayName,
                    id: data.ProductId,
                    variant: data.Variant,
                    price: this.trimPriceAndUnlocalize(data.ListPrice),
                    quantity: data.Quantity,
                    category: data.CategoryId,
                    brand: data.Brand,
                    list: data.List
                };
                this.addToCart(analyticsProduct, data.List);
            };
            /**
             * Occurs when a Line item is being removed.
             */
            AnalyticsPlugin.prototype.onLineItemRemoving = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var analyticsProduct = {
                    name: data.DisplayName,
                    id: data.ProductId,
                    variant: data.Variant,
                    price: this.trimPriceAndUnlocalize(data.ListPrice),
                    quantity: data.Quantity,
                    category: data.CategoryId,
                    brand: data.Brand
                };
                this.removeFromCart(analyticsProduct, data.List);
            };
            /**
             * Occurs when a product Details is rendered.
             */
            AnalyticsPlugin.prototype.onProductDetailsRendered = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var analyticsProducts = [];
                analyticsProducts.push({
                    name: data.DisplayName,
                    id: data.ProductId,
                    price: this.trimPriceAndUnlocalize(data.ListPrice),
                    brand: data.Brand,
                    category: data.CategoryId,
                    variant: data.Variant
                });
                this.productDetailImpressions(analyticsProducts, 'Detail');
            };
            /**
             *  Occurs when a Checkout Step is rendered.
             */
            AnalyticsPlugin.prototype.onCheckoutStepRendered = function (eventInfo) {
                var _this = this;
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var analyticsProducts = [];
                if (data.Cart) {
                    Q.resolve(data.Cart).then(function (cart) {
                        _.each(cart.LineItemDetailViewModels, function (lineItemDetailViewModel) {
                            var analyticsProduct = {
                                name: lineItemDetailViewModel.ProductSummary.DisplayName,
                                id: lineItemDetailViewModel.ProductId,
                                price: _this.trimPriceAndUnlocalize(lineItemDetailViewModel.ListPrice),
                                quantity: lineItemDetailViewModel.Quantity,
                                category: lineItemDetailViewModel.ProductSummary.CategoryId.replace(/-/g, '/'),
                                variant: _this.buildVariantForLineItem(lineItemDetailViewModel),
                                brand: lineItemDetailViewModel.ProductSummary.Brand
                            };
                            if (_this.useVariantIdWhenPossible && lineItemDetailViewModel.VariantId) {
                                analyticsProduct.id = lineItemDetailViewModel.VariantId;
                            }
                            analyticsProducts.push(analyticsProduct);
                        });
                        var checkoutOrigin = AnalyticsPlugin.getCheckoutOrigin();
                        var transaction = {
                            checkoutOrigin: checkoutOrigin
                        };
                        _this.checkout(data.StepNumber, transaction, analyticsProducts);
                    });
                }
            };
            /**
             * Occurs when a the Checkout Navigation strip is rendered.
             */
            AnalyticsPlugin.prototype.onCheckoutNavigationRendered = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                this.checkoutOption(data.StepNumber);
            };
            /**
             * Occurs when a the Checkout completes, creating an order out of a Cart.
             */
            AnalyticsPlugin.prototype.onCheckoutCompleted = function (eventInfo) {
                var _this = this;
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var order = {
                    id: data.OrderNumber,
                    affiliation: data.Affiliation,
                    revenue: data.Revenu,
                    tax: data.Tax,
                    shipping: data.Shipping,
                    coupon: _.isEmpty(data.Coupons) ? '' : data.Coupons.map(function (c) { return c.CouponCode; }).join(', '),
                    currencyCode: data.BillingCurrency
                };
                var transaction = this.mapAnalyticTransactionFromOrder(data);
                var products = this.mapAnalyticProductsFromLineItems(data);
                var coupons = this.mapAnalyticCouponsFromOrder(data);
                _.each(coupons, function (coupon) {
                    _this.couponsUsed(coupon);
                });
                this.purchase(order, transaction, products);
            };
            /**
             * Occurs when the Search results on a page are rendered.
             */
            AnalyticsPlugin.prototype.onSearchResultRendered = function (eventInfo) {
                var _this = this;
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                if (data.ProductSearchResults.length > 0) {
                    var products = [];
                    _.each(data.ProductSearchResults, function (product, i) {
                        var analyticsProduct = {
                            id: product.ProductId,
                            name: product.DisplayName,
                            price: _this.trimPriceAndUnlocalize(product.IsOnSale ? product.Price : product.ListPrice),
                            brand: product.Brand,
                            category: product.CategoryId,
                            list: data.ListName,
                            position: (i + 1) + (data.MaxItemsPerPage * (data.PageNumber - 1))
                        };
                        products.push(analyticsProduct);
                    });
                    this.productImpressions(products);
                }
                this.sendEvent('event', 'Search Results', 'Rendered', data.Keywords, data.TotalCount);
            };
            AnalyticsPlugin.prototype.onContentSearchResultRendered = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var _a = eventInfo.data, Keywords = _a.Keywords, TotalCount = _a.TotalCount, CurrentTab = _a.CurrentTab;
                this.sendEvent('event', CurrentTab + " Content Search Results", 'Rendered', Keywords, TotalCount);
            };
            /**
             * Occurs when Related Products are loaded.
             */
            AnalyticsPlugin.prototype.onRelatedProductsLoaded = function (eventInfo) {
                var _this = this;
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var products = [];
                _.each(data.Products, function (product, i) {
                    var analyticsProduct = {
                        id: product.ProductId,
                        name: product.DisplayName,
                        price: _this.trimPriceAndUnlocalize(product.Price),
                        brand: product.Brand,
                        list: data.ListName,
                        category: product.CategoryId,
                        position: i + 1
                    };
                    products.push(analyticsProduct);
                });
                this.productImpressions(products);
            };
            /**
             * Occurs when the user clicks on a product.
             */
            AnalyticsPlugin.prototype.onProductClick = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var _a = eventInfo.data, Index = _a.Index, PageNumber = _a.PageNumber, MaxItemsPerPage = _a.MaxItemsPerPage, Product = _a.Product, ListName = _a.ListName;
                var position = Index + 1;
                if (MaxItemsPerPage && PageNumber) {
                    position = position + (MaxItemsPerPage * (parseInt(PageNumber, 10) - 1));
                }
                var product = {
                    id: Product.ProductId,
                    name: Product.DisplayName,
                    price: this.trimPriceAndUnlocalize(Product.IsOnSale ? Product.Price : Product.ListPrice),
                    brand: Product.Brand,
                    category: Product.CategoryId,
                    position: position
                };
                //var products: IAnalyticsProduct[] = [product];
                this.productClick(product, ListName);
            };
            /**
             * Occurs when no results were found for a search.
             */
            AnalyticsPlugin.prototype.onNoResultsFound = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                this.noResultsFound(data.Keyword);
            };
            /**
             * Occurs when a search term has been auto corrected during a search.
             */
            AnalyticsPlugin.prototype.onSearchTermCorrected = function (eventInfo) {
                if (!eventInfo) {
                    return;
                }
                var data = eventInfo.data;
                var searchResults = {
                    keywordCorrected: data.KeywordCorrected,
                    keywordEntered: data.KeywordEntered
                };
                this.searchKeywordCorrection(searchResults);
            };
            AnalyticsPlugin.prototype.buildVariantForLineItem = function (lineItem) {
                if (lineItem.VariantId && lineItem.KeyVariantAttributesList) {
                    return this.buildVariantName(lineItem.KeyVariantAttributesList);
                }
                return undefined;
            };
            AnalyticsPlugin.prototype.buildVariantName = function (kvas) {
                var nameParts = [];
                for (var i = 0; i < kvas.length; i++) {
                    var value = kvas[i].OriginalValue;
                    nameParts.push(value);
                }
                return nameParts.join(' ');
            };
            AnalyticsPlugin.prototype.mapAnalyticProductsFromLineItems = function (data) {
                var _this = this;
                var products = [];
                products = _.map(data.LineItems, function (lineItem) {
                    var analyticsProduct = {
                        id: lineItem.ProductId,
                        name: lineItem.Name,
                        price: lineItem.Price,
                        variant: _this.buildVariantForLineItem(lineItem),
                        quantity: lineItem.Quantity,
                        category: lineItem.CategoryId,
                        brand: lineItem.Brand
                    };
                    if (_this.useVariantIdWhenPossible && lineItem.VariantId) {
                        analyticsProduct.id = lineItem.VariantId;
                    }
                    return analyticsProduct;
                });
                return products;
            };
            AnalyticsPlugin.prototype.mapAnalyticCouponsFromOrder = function (data) {
                var coupons = [];
                var billingCurrency = data.BillingCurrency;
                coupons = _.map(data.Coupons, function (coupon) {
                    var analyticsCoupon = {
                        code: coupon.CouponCode,
                        discountAmount: coupon.Amount,
                        currencyCode: billingCurrency,
                        promotionName: coupon.PromotionName
                    };
                    return analyticsCoupon;
                });
                return coupons;
            };
            AnalyticsPlugin.prototype.mapAnalyticTransactionFromOrder = function (data) {
                var checkoutOrigin = AnalyticsPlugin.getCheckoutOrigin();
                var analyticsTransaction = {
                    shippingType: data.ShippingOptions,
                    checkoutOrigin: checkoutOrigin
                };
                return analyticsTransaction;
            };
            //Abstract methods
            AnalyticsPlugin.prototype.userLoggedIn = function (type, source) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.userCreated = function () {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.recoverPassword = function () {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.singleFacetChanged = function (searchFilters) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.multiFacetChanged = function (searchFilters) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.sortingChanged = function (sortingType, pageType) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.productImpressions = function (products) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.productClick = function (product, listName) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.productDetailImpressions = function (products, listName) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.addToCart = function (product, listName) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.addToWishList = function (product) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.removeFromCart = function (product, listName) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.checkout = function (step, transaction, products) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.checkoutOption = function (step) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.purchase = function (order, transaction, products) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.couponsUsed = function (order) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.shareWishList = function (data) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.searchKeywordCorrection = function (data) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.noResultsFound = function (keywordNotFound) {
                console.error('Not implemented Exception');
            };
            /**
             * Send a custom event to the analytics providers with multiples informations concerning the event
             * https://support.google.com/analytics/answer/1033068?hl=en
             * @param {string} eventName - The name of the custom event to send (e.g. productClick)
             * @param {string} category - The name that you supply as a way to group objects that you want to track (e.g. Product)
             * @param {string} action - The name the type of event or interaction you want to track for a particular web object (e.g. Click)
             * @param {string} label - Provide additional information for events that you want to track (e.g. Url of the clicked product)
             * @param {number} value - Use it to assign a numerical value to a tracked page object (e.g. Price of the product)
             */
            AnalyticsPlugin.prototype.sendEvent = function (eventName, category, action, label, value) {
                console.error('Not implemented Exception');
            };
            AnalyticsPlugin.prototype.trimPrice = function (price) {
                if (typeof price === 'number') {
                    return price;
                }
                return price ? parseFloat(price.match(/[\d\.\d]+/i)[0]) : null;
            };
            AnalyticsPlugin.prototype.trimPriceAndUnlocalize = function (price) {
                if (!price || typeof price === 'number') {
                    return price;
                }
                // remove anything that is not a digit, '.' or ','
                price = price.replace(/[^0-9,.]/, '');
                // if price contains a '.' its an English price and you can remove any ','
                if (price.indexOf('.') !== -1) {
                    price = price.replace(',', '');
                }
                else {
                    price = price.replace(',', '.');
                }
                return price ? parseFloat(price.match(/[\d\.\d]+/i)[0]) : null;
            };
            AnalyticsPlugin.prototype.formatDate = function (date) {
                var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
                if (month.length < 2) {
                    month = '0' + month;
                }
                if (day.length < 2) {
                    day = '0' + day;
                }
                return [year, month, day].join('-');
            };
            return AnalyticsPlugin;
        }());
        Composer.AnalyticsPlugin = AnalyticsPlugin;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../Mvc/ComposerClient.ts' />
/// <reference path='../../Events/EventHub.ts' />
/// <reference path='./AnalyticsPlugin.ts' />
/// <reference path='./IAnalyticsProduct.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var GoogleAnalyticsPlugin = /** @class */ (function (_super) {
            __extends(GoogleAnalyticsPlugin, _super);
            function GoogleAnalyticsPlugin() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GoogleAnalyticsPlugin.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                if (!window['dataLayer']) {
                    console.warn('The dataLayer variable does not exists. Have you included the gtm.js script ?');
                    window['dataLayer'] = [];
                }
            };
            GoogleAnalyticsPlugin.prototype.userLoggedIn = function (type, source) {
                dataLayer.push({
                    event: 'accountLogin',
                    loginType: type,
                    loginSource: source
                });
            };
            GoogleAnalyticsPlugin.prototype.userCreated = function () {
                dataLayer.push({
                    event: 'accountCreated'
                });
            };
            GoogleAnalyticsPlugin.prototype.recoverPassword = function () {
                dataLayer.push({
                    event: 'passRecovery'
                });
            };
            GoogleAnalyticsPlugin.prototype.singleFacetChanged = function (searchFilters) {
                dataLayer.push({
                    event: 'filterRefinement',
                    filterName: searchFilters.facetKey,
                    filterValue: searchFilters.facetValue,
                    sectionName: searchFilters.pageType
                });
            };
            GoogleAnalyticsPlugin.prototype.multiFacetChanged = function (searchFilters) {
                dataLayer.push({
                    event: 'filterRefinement',
                    filterName: searchFilters.facetKey,
                    filterValue: searchFilters.facetValue,
                    sectionName: searchFilters.pageType
                });
            };
            GoogleAnalyticsPlugin.prototype.sortingChanged = function (sortingType, pageType) {
                dataLayer.push({
                    event: 'sortingOption',
                    sortingType: sortingType,
                    sectionName: pageType
                });
            };
            GoogleAnalyticsPlugin.prototype.productImpressions = function (products) {
                dataLayer.push({
                    event: 'productImpressions',
                    ecommerce: {
                        impressions: products
                    }
                });
            };
            GoogleAnalyticsPlugin.prototype.productClick = function (product, listName) {
                dataLayer.push({
                    event: 'productClick',
                    ecommerce: {
                        click: {
                            actionField: {
                                list: listName
                            },
                            products: [product]
                        }
                    }
                });
            };
            GoogleAnalyticsPlugin.prototype.productDetailImpressions = function (products, listName) {
                dataLayer.push({
                    event: 'productDetailImpressions',
                    ecommerce: {
                        detail: {
                            actionField: {
                                list: listName
                            },
                            products: products
                        }
                    }
                });
            };
            GoogleAnalyticsPlugin.prototype.addToCart = function (product, listName) {
                dataLayer.push({
                    event: 'addToCart',
                    ecommerce: {
                        add: {
                            actionField: { list: listName },
                            products: [product]
                        }
                    }
                });
            };
            GoogleAnalyticsPlugin.prototype.addToWishList = function (product) {
                dataLayer.push({
                    'event': 'addToWishList',
                    'productName': product.name,
                    'productPrice': product.price
                });
            };
            GoogleAnalyticsPlugin.prototype.couponsUsed = function (coupon) {
                dataLayer.push({
                    'event': 'checkoutComplete',
                    'couponCode': coupon.code,
                    'discountAmount': coupon.discountAmount
                });
            };
            GoogleAnalyticsPlugin.prototype.shareWishList = function (data) {
                dataLayer.push({
                    'event': 'shareMyWishList'
                });
            };
            GoogleAnalyticsPlugin.prototype.removeFromCart = function (product, listName) {
                dataLayer.push({
                    event: 'removeFromCart',
                    ecommerce: {
                        remove: {
                            actionField: { list: listName },
                            products: [product]
                        }
                    }
                });
            };
            GoogleAnalyticsPlugin.prototype.checkout = function (step, transaction, products) {
                dataLayer.push({
                    event: 'checkout',
                    transaction: transaction,
                    ecommerce: {
                        checkout: {
                            actionField: {
                                step: this.getStepNumber(step)
                            },
                            products: products
                        }
                    }
                });
            };
            GoogleAnalyticsPlugin.prototype.checkoutOption = function (step) {
                dataLayer.push({
                    event: 'checkoutOption',
                    ecommerce: {
                        checkout_option: {
                            actionField: {
                                step: this.getStepNumber(step)
                            }
                        }
                    }
                });
            };
            GoogleAnalyticsPlugin.prototype.purchase = function (order, transaction, products) {
                dataLayer.push({
                    event: 'purchase',
                    transaction: transaction,
                    ecommerce: {
                        purchase: {
                            actionField: order,
                            products: products
                        }
                    }
                });
            };
            GoogleAnalyticsPlugin.prototype.noResultsFound = function (keywordNotFound) {
                dataLayer.push({
                    'event': 'noResults',
                    'keywordEntered': keywordNotFound
                });
            };
            GoogleAnalyticsPlugin.prototype.searchKeywordCorrection = function (searchResults) {
                dataLayer.push({
                    'event': 'keywordCorrection',
                    'keywordCorrected': searchResults.keywordCorrected,
                    'keywordEntered': searchResults.keywordEntered
                });
            };
            GoogleAnalyticsPlugin.prototype.sendEvent = function (eventName, category, action, label, value) {
                dataLayer.push({
                    event: eventName,
                    gaEventCategory: category,
                    gaEventAction: action,
                    gaEventLabel: label,
                    gaEventValue: value
                });
            };
            GoogleAnalyticsPlugin.prototype.getStepNumber = function (step) {
                return step + 1;
            };
            return GoogleAnalyticsPlugin;
        }(Composer.AnalyticsPlugin));
        Composer.GoogleAnalyticsPlugin = GoogleAnalyticsPlugin;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../../Mvc/Controller.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var AddToCartNotificationController = /** @class */ (function (_super) {
            __extends(AddToCartNotificationController, _super);
            function AddToCartNotificationController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AddToCartNotificationController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
            };
            AddToCartNotificationController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe('lineItemAddedToCart', function (e) {
                    _this.displayNotification(e);
                });
            };
            AddToCartNotificationController.prototype.displayNotification = function (e) {
                var _this = this;
                var notificationContainer = $(this.context.container), notificationTime = notificationContainer.data('notificationTime'), cart = e.data.Cart;
                if (notificationTime > 0) {
                    this.render('AddToCartNotificationModal', cart);
                    notificationContainer.removeClass('hidden');
                    setTimeout(function () {
                        _this.closeNotification();
                    }, parseInt(notificationTime, 10));
                }
            };
            AddToCartNotificationController.prototype.onClose = function (e) {
                e.event.preventDefault();
                this.closeNotification();
            };
            AddToCartNotificationController.prototype.closeNotification = function () {
                $(this.context.container).addClass('hidden');
            };
            return AddToCartNotificationController;
        }(Composer.Controller));
        Composer.AddToCartNotificationController = AddToCartNotificationController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CartChangeRecurringFrequencyController = /** @class */ (function (_super) {
            __extends(CartChangeRecurringFrequencyController, _super);
            function CartChangeRecurringFrequencyController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cartStateService = Composer.CartStateService.getInstance();
                _this.cartService = Composer.CartService.getInstance();
                return _this;
            }
            CartChangeRecurringFrequencyController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                var vueChangeRecurringFrequencyMixin = {
                    methods: {
                        changeRecurringMode: function (e, item) {
                            var value = e.target.value;
                            item.RecurringOrderFrequencyName = value !== 'single' && item.RecurringOrderProgramFrequencies.length
                                ? item.RecurringOrderProgramFrequencies[0].RecurringOrderFrequencyName : null;
                        },
                        resetLineItemRecurringFrequency: function (item) {
                            var oldItem = this.beforeEditLineItemList.find(function (lineItem) { return lineItem.Id === item.Id; });
                            item.RecurringOrderFrequencyName = oldItem.RecurringOrderFrequencyName;
                            item.RecurringOrderFrequencyDisplayName = oldItem.RecurringOrderFrequencyDisplayName;
                        },
                        updateLineItemRecurringFrequency: function (event, item) {
                            var _this = this;
                            var collapseId = $(event.target).data('lablecollapse');
                            if (!this.isRecurringFrequencyModified(item)) {
                                this.collapseById(collapseId, 'show');
                                return;
                            }
                            self.cartService.updateLineItem(item.Id, item.Quantity, item.ProductId, item.RecurringOrderFrequencyName ? item.RecurringOrderFrequencyName : null, item.RecurringOrderProgramName)
                                .finally(function () {
                                _this.collapseById(collapseId, 'show');
                            });
                        },
                        collapseById: function (collapseId, action) {
                            $("#" + collapseId).collapse(action);
                        },
                        isRecurringFrequencyModified: function (item) {
                            return this.beforeEditLineItemList.find(function (i) { return i.Id === item.Id && i.RecurringOrderFrequencyName !== item.RecurringOrderFrequencyName; });
                        },
                    }
                };
                this.cartStateService.VueCartMixins.push(vueChangeRecurringFrequencyMixin);
            };
            return CartChangeRecurringFrequencyController;
        }(Orckestra.Composer.Controller));
        Composer.CartChangeRecurringFrequencyController = CartChangeRecurringFrequencyController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Cache/CacheProvider.ts' />
///<reference path='../../Cache/CacheError.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../../Utils/Utils.ts' />
///<reference path='./ICartService.ts' />
///<reference path='./CartEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CartStateService = /** @class */ (function () {
            function CartStateService() {
                this.VueCartMixins = [];
                this.eventHub = Composer.EventHub.instance();
                this.cartService = Composer.CartService.getInstance();
                this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                this.registerSubscriptions();
                CartStateService.instance = this;
            }
            CartStateService.prototype.initialize = function () {
                var _this = this;
                this.VueFullCart = new Vue({
                    el: '#vueFullCart',
                    mixins: this.VueCartMixins,
                    data: {
                        Cart: undefined,
                        IsAuthenticated: false,
                        Mode: {
                            Loading: false,
                            Busy: true
                        }
                    },
                    computed: {
                        IsLoading: function () {
                            return this.Mode.Loading;
                        },
                        IsBusy: function () {
                            return this.Mode.Busy;
                        },
                        OrderSummary: function () {
                            return this.Cart.OrderSummary;
                        }
                    },
                    methods: {
                        updateBeforeEditLineItemList: function () {
                            this.beforeEditLineItemList = this.Cart.LineItemDetailViewModels.map(function (x) { return (__assign({}, x)); });
                        }
                    }
                });
                var authenticatedPromise = this.membershipService.isAuthenticated();
                var getCartPromise = this.cartService.getFreshCart().fail(function (reason) { return _this.loadCartFailed(reason); });
                Q.all([authenticatedPromise, getCartPromise])
                    .spread(function (authVm, cartVm) {
                    _this.publishToAnalytics(cartVm);
                    _this.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cartVm });
                    var vueData = _this.VueFullCart;
                    vueData.IsAuthenticated = authVm.IsAuthenticated;
                });
            };
            CartStateService.prototype.publishToAnalytics = function (cartVm) {
                var e = {
                    data: {
                        Cart: cartVm,
                        StepNumber: 'cart'
                    }
                };
                this.eventHub.publish('checkoutStepRendered', e);
            };
            CartStateService.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe('allControllersInitialized', function () {
                    _this.initialize();
                });
                this.eventHub.subscribe(Composer.CartEvents.CartUpdated, function (e) { return _this.onCartUpdated(e.data); });
            };
            CartStateService.getInstance = function () {
                if (!CartStateService.instance) {
                    CartStateService.instance = new CartStateService();
                }
                return CartStateService.instance;
            };
            CartStateService.prototype.onCartUpdated = function (cart) {
                var vueData = this.VueFullCart;
                if (vueData) {
                    vueData.Cart = cart;
                    vueData.updateBeforeEditLineItemList();
                    vueData.Mode.Loading = false;
                    vueData.Mode.Busy = false;
                }
                Composer.ErrorHandler.instance().removeErrors();
            };
            CartStateService.prototype.loadCartFailed = function (reason) {
                console.error('Error while loading the cart.', reason);
                Composer.ErrorHandler.instance().outputErrorFromCode('LoadCartFailed');
            };
            return CartStateService;
        }());
        Composer.CartStateService = CartStateService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../IRecurringOrderParameters.ts' />
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Events/IEventHub.ts' />
///<reference path='./IRecurringOrderService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var RecurringOrderService = /** @class */ (function () {
            function RecurringOrderService(repository, eventHub) {
                if (!eventHub) {
                    throw new Error('Error: eventHub is required');
                }
                this.repository = repository;
                this.eventHub = eventHub;
            }
            RecurringOrderService.prototype.updateLineItemsDate = function (updateLineItemsParam) {
                return this.repository.updateLineItemsDate(updateLineItemsParam);
            };
            RecurringOrderService.prototype.deleteLineItem = function (deleteLineItemParam) {
                return this.repository.deleteLineItem(deleteLineItemParam);
            };
            RecurringOrderService.prototype.deleteLineItems = function (deleteLineItemsParam) {
                return this.repository.deleteLineItems(deleteLineItemsParam);
            };
            RecurringOrderService.prototype.getCustomerAddresses = function () {
                return this.repository.getCustomerAddresses();
            };
            RecurringOrderService.prototype.getCustomerPaymentMethods = function () {
                return this.repository.getCustomerPaymentMethods();
            };
            RecurringOrderService.prototype.updateCartShippingAddress = function (updateCartAddressParam) {
                return this.repository.updateCartShippingAddress(updateCartAddressParam);
            };
            RecurringOrderService.prototype.updateCartBillingAddress = function (updateTemplateAddressParam) {
                return this.repository.updateCartBillingAddress(updateTemplateAddressParam);
            };
            RecurringOrderService.prototype.updateTemplatePaymentMethod = function (updateTemplatePaymentMethodParam) {
                return this.repository.updateTemplatePaymentMethod(updateTemplatePaymentMethodParam);
            };
            RecurringOrderService.prototype.updateLineItemQuantity = function (updateLineItemQuantityParam) {
                return this.repository.updateLineItemQuantity(updateLineItemQuantityParam);
            };
            RecurringOrderService.prototype.getRecurringOrderCartsByUser = function () {
                return this.repository.getRecurringOrderCartsByUser();
            };
            RecurringOrderService.prototype.getRecurringOrderTemplatesByUser = function () {
                return this.repository.getRecurringOrderTemplatesByUser();
            };
            RecurringOrderService.prototype.updateTemplateLineItemQuantity = function (updateLineItemQuantityParam) {
                return this.repository.updateTemplateLineItemQuantity(updateLineItemQuantityParam);
            };
            RecurringOrderService.prototype.getRecurringOrderProgramsByUser = function () {
                return this.repository.getRecurringOrderProgramsByUser();
            };
            RecurringOrderService.prototype.getRecurringOrderProgramsByNames = function (programsByNamesParam) {
                return this.repository.getRecurringOrderProgramsByNames(programsByNamesParam);
            };
            RecurringOrderService.prototype.updateTemplateLineItem = function (templateLineItemUpdateParam) {
                return this.repository.updateTemplateLineItem(templateLineItemUpdateParam);
            };
            RecurringOrderService.prototype.deleteTemplateLineItem = function (deleteTemplateLineItemParam) {
                return this.repository.deleteTemplateLineItem(deleteTemplateLineItemParam);
            };
            RecurringOrderService.prototype.deleteTemplateLineItems = function (deleteTemplateLineItemsParam) {
                return this.repository.deleteTemplateLineItems(deleteTemplateLineItemsParam);
            };
            RecurringOrderService.prototype.getCartContainsRecurrence = function () {
                return this.repository.getCartContainsRecurrence();
            };
            RecurringOrderService.prototype.getRecurrenceConfigIsActive = function () {
                return this.repository.getRecurrenceConfigIsActive();
            };
            RecurringOrderService.prototype.getCanRemovePaymentMethod = function (paymentMethodId) {
                return this.repository.getCanRemovePaymentMethod(paymentMethodId);
            };
            RecurringOrderService.prototype.getRecurringOrderCartSummaries = function () {
                return this.repository.getRecurringOrderCartSummaries();
            };
            RecurringOrderService.prototype.addRecurringOrderCartLineItem = function (addLineItemQuantityParam) {
                return this.repository.addRecurringOrderCartLineItem(addLineItemQuantityParam);
            };
            RecurringOrderService.prototype.getAnonymousCartSignInUrl = function () {
                return this.repository.getAnonymousCartSignInUrl();
            };
            RecurringOrderService.prototype.updateCartShippingMethod = function (updateCartShippingMethodParam) {
                return this.repository.updateCartShippingMethod(updateCartShippingMethodParam);
            };
            RecurringOrderService.prototype.getCartShippingMethods = function (getCartShippingMethodsParam) {
                return this.repository.getCartShippingMethods(getCartShippingMethodsParam);
            };
            RecurringOrderService.prototype.getOrderTemplateShippingMethods = function () {
                return this.repository.getOrderTemplateShippingMethods();
            };
            RecurringOrderService.prototype.getInactifProductsFromCustomer = function () {
                return this.repository.getInactifProductsFromCustomer();
            };
            RecurringOrderService.prototype.clearCustomerInactifItems = function () {
                return this.repository.clearCustomerInactifItems();
            };
            RecurringOrderService.prototype.getRecurringCart = function (getRecurringCartParam) {
                return this.repository.getRecurringCart(getRecurringCartParam);
            };
            RecurringOrderService.prototype.getCartPaymentMethods = function (getCartPaymentMethodsParam) {
                return this.repository.getCartPaymentMethods(getCartPaymentMethodsParam);
            };
            RecurringOrderService.prototype.updateCartPaymentMethod = function (updateCartPaymentMethodParam) {
                return this.repository.updateCartPaymentMethod(updateCartPaymentMethodParam);
            };
            RecurringOrderService.prototype.getRecurringTemplateDetail = function (recurringOrderTemplateId) {
                return this.repository.getRecurringTemplateDetail(recurringOrderTemplateId);
            };
            RecurringOrderService.prototype.getTemplatePaymentMethods = function (getTemplatePaymentMethodsParam) {
                return this.repository.getTemplatePaymentMethods(getTemplatePaymentMethodsParam);
            };
            RecurringOrderService.prototype._mapLineItemToRequest = function (lineItem) {
                return {
                    CategoryId: lineItem.ProductSummary.CategoryId,
                    ProductInfo: {
                        ProductId: lineItem.ProductId,
                        Sku: lineItem.Sku,
                        VariantId: lineItem.VariantId
                    }
                };
            };
            RecurringOrderService.prototype._mapRecurringLineItemToRequest = function (lineItem) {
                return lineItem.SelectedRecurringOrderFrequencyId;
            };
            return RecurringOrderService;
        }());
        Composer.RecurringOrderService = RecurringOrderService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../IRecurringOrderParameters.ts' />
///<reference path='../ViewModels/IRecurringOrderViewModel.ts' />
/// <reference path='../../../../Typings/tsd.d.ts' />
/// <reference path='../../../Mvc/ComposerClient.ts' />
/// <reference path='./IRecurringOrderRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var RecurringOrderRepository = /** @class */ (function () {
            function RecurringOrderRepository() {
            }
            RecurringOrderRepository.prototype.updateLineItemsDate = function (updateLineItemsParam) {
                return Composer.ComposerClient.put("/api/recurringcart/reschedule", updateLineItemsParam);
            };
            RecurringOrderRepository.prototype.deleteLineItem = function (deleteLineItemParam) {
                var lineItemId = deleteLineItemParam.lineItemId, cartName = deleteLineItemParam.cartName;
                if (!lineItemId) {
                    throw new Error('lineItemId is required');
                }
                if (!cartName) {
                    throw new Error('cartName is required');
                }
                var data = {
                    CartName: cartName,
                    LineItemId: lineItemId
                };
                return Composer.ComposerClient.remove("/api/recurringcart/lineitem/", data);
            };
            RecurringOrderRepository.prototype.deleteLineItems = function (deleteLineItemsParam) {
                var lineItemsIds = deleteLineItemsParam.lineItemsIds, cartName = deleteLineItemsParam.cartName;
                if (!lineItemsIds) {
                    throw new Error('lineItemsIds is required');
                }
                if (!cartName) {
                    throw new Error('cartName is required');
                }
                var datas = {
                    LineItemsIds: lineItemsIds,
                    cartName: cartName
                };
                return Composer.ComposerClient.remove("/api/recurringordercart/" + cartName + "/lineitems/byIds", datas);
            };
            RecurringOrderRepository.prototype.getCustomerAddresses = function () {
                return Composer.ComposerClient.get("/api/recurringordercart/get-customer-addresses");
            };
            RecurringOrderRepository.prototype.getCustomerPaymentMethods = function () {
                return Composer.ComposerClient.get("/api/recurringordercart/get-customer-payment-methods");
            };
            RecurringOrderRepository.prototype.getRecurringOrderCartsByUser = function () {
                return Composer.ComposerClient.get("/api/recurringcart/upcoming-orders");
            };
            RecurringOrderRepository.prototype.getRecurringOrderTemplatesByUser = function () {
                return Composer.ComposerClient.get("/api/recurringordertemplate/getrecurringordertemplates");
            };
            RecurringOrderRepository.prototype.updateCartShippingAddress = function (updateCartAddressParam) {
                var billingAddressId = updateCartAddressParam.billingAddressId, shippingAddressId = updateCartAddressParam.shippingAddressId, cartName = updateCartAddressParam.cartName, useSameForShippingAndBilling = updateCartAddressParam.useSameForShippingAndBilling;
                if (!billingAddressId && !shippingAddressId) {
                    throw new Error('billingAddressId or shippingAddressId is required');
                }
                if (!cartName) {
                    throw new Error('cartName is required');
                }
                var data = {
                    billingAddressId: billingAddressId,
                    shippingAddressId: shippingAddressId,
                    cartName: cartName,
                    UseSameForShippingAndBilling: useSameForShippingAndBilling
                };
                return Composer.ComposerClient.put("/api/recurringcart/address", data);
            };
            RecurringOrderRepository.prototype.updateCartBillingAddress = function (updateTemplateAddressParam) {
                var billingAddressId = updateTemplateAddressParam.billingAddressId, shippingAddressId = updateTemplateAddressParam.shippingAddressId, cartName = updateTemplateAddressParam.cartName, useSameForShippingAndBilling = updateTemplateAddressParam.useSameForShippingAndBilling;
                if (!billingAddressId && !shippingAddressId) {
                    throw new Error('billingAddressId or shippingAddressId is required');
                }
                if (!cartName) {
                    throw new Error('cartName is required');
                }
                var data = {
                    billingAddressId: billingAddressId,
                    shippingAddressId: shippingAddressId,
                    cartName: cartName,
                    UseSameForShippingAndBilling: useSameForShippingAndBilling
                };
                return Composer.ComposerClient.put("/api/recurringordercart/" + cartName + "/billing-address", data);
            };
            RecurringOrderRepository.prototype.updateTemplatePaymentMethod = function (updateTemplatePaymentMethodParam) {
                var paymentMethodId = updateTemplatePaymentMethodParam.paymentMethodId, cartName = updateTemplatePaymentMethodParam.cartName, providerName = updateTemplatePaymentMethodParam.providerName;
                if (!paymentMethodId) {
                    throw new Error('paymentMethodId is required');
                }
                if (!cartName) {
                    throw new Error('cartName is required');
                }
                if (!providerName) {
                    throw new Error('paymentMethodId is required');
                }
                var data = {
                    paymentMethodId: paymentMethodId,
                    cartName: cartName,
                    providerName: providerName
                };
                return Composer.ComposerClient.put("/api/recurringordercart/" + cartName + "/paymentmethod", data);
            };
            RecurringOrderRepository.prototype.updateLineItemQuantity = function (updateLineItemQuantityParam) {
                var lineItemId = updateLineItemQuantityParam.lineItemId, quantity = updateLineItemQuantityParam.quantity, cartName = updateLineItemQuantityParam.cartName, recurringProgramName = updateLineItemQuantityParam.recurringProgramName, recurringFrequencyName = updateLineItemQuantityParam.recurringFrequencyName;
                if (!lineItemId) {
                    throw new Error('lineItemId is required');
                }
                if (!quantity) {
                    throw new Error('quantity is required');
                }
                if (!cartName) {
                    throw new Error('cartName is required');
                }
                var data = {
                    LineItemId: lineItemId,
                    Quantity: quantity,
                    CartName: cartName,
                    RecurringOrderProgramName: recurringProgramName,
                    RecurringOrderFrequencyName: recurringFrequencyName
                };
                return Composer.ComposerClient.put("/api/recurringcart/lineitem/", data);
            };
            RecurringOrderRepository.prototype.updateTemplateLineItemQuantity = function (updateLineItemQuantityParam) {
                var lineItemId = updateLineItemQuantityParam.lineItemId, quantity = updateLineItemQuantityParam.quantity;
                if (!lineItemId) {
                    throw new Error('lineItemId is required');
                }
                if (!quantity) {
                    throw new Error('quantity is required');
                }
                var data = {
                    RecurringLineItemId: lineItemId,
                    Quantity: quantity
                };
                return Composer.ComposerClient.put("/api/recurringordertemplate/lineitemquantity/", data);
            };
            RecurringOrderRepository.prototype.getRecurringOrderProgramsByUser = function () {
                return Composer.ComposerClient.get("/api/recurringordertemplate/get-recurring-order-programs-by-user/");
            };
            RecurringOrderRepository.prototype.getRecurringOrderProgramsByNames = function (programsByNamesParam) {
                var recurringOrderProgramNames = programsByNamesParam.recurringOrderProgramNames;
                if (!recurringOrderProgramNames) {
                    throw new Error('recurringOrderProgramNames is required');
                }
                var data = {
                    RecurringOrderProgramNames: recurringOrderProgramNames
                };
                return Composer.ComposerClient.post("/api/recurringordercart/get-recurring-order-programs-by-names/", data);
            };
            RecurringOrderRepository.prototype.updateTemplateLineItem = function (templateLineItemUpdateParam) {
                var lineItemId = templateLineItemUpdateParam.lineItemId, paymentMethodId = templateLineItemUpdateParam.paymentMethodId, shippingAddressId = templateLineItemUpdateParam.shippingAddressId, billingAddressId = templateLineItemUpdateParam.billingAddressId, nextOccurence = templateLineItemUpdateParam.nextOccurence, frequencyName = templateLineItemUpdateParam.frequencyName, shippingProviderId = templateLineItemUpdateParam.shippingProviderId, shippingMethodName = templateLineItemUpdateParam.shippingMethodName;
                if (!lineItemId) {
                    throw new Error('lineItemId is required');
                }
                if (!paymentMethodId) {
                    throw new Error('paymentMethodId is required');
                }
                if (!billingAddressId) {
                    throw new Error('billingAddressId is required');
                }
                if (!shippingAddressId) {
                    throw new Error('shippingAddressId is required');
                }
                if (!nextOccurence) {
                    throw new Error('nextOccurence is required');
                }
                if (!frequencyName) {
                    throw new Error('frequencyName is required');
                }
                if (!shippingProviderId) {
                    throw new Error('shippingProviderId is required');
                }
                if (!shippingMethodName) {
                    throw new Error('shippingMethodName is required');
                }
                var data = {
                    LineItemId: lineItemId,
                    PaymentMethodId: paymentMethodId,
                    ShippingAddressId: shippingAddressId,
                    BillingAddressId: billingAddressId,
                    NextOccurence: nextOccurence,
                    RecurringOrderFrequencyName: frequencyName,
                    ShippingProviderId: shippingProviderId,
                    ShippingMethodName: shippingMethodName
                };
                return Composer.ComposerClient.put("/api/recurringordertemplate/lineitem/", data);
            };
            RecurringOrderRepository.prototype.deleteTemplateLineItem = function (deleteTemplateLineItemParam) {
                var lineItemId = deleteTemplateLineItemParam.lineItemId;
                if (!lineItemId) {
                    throw new Error('lineItemId is required');
                }
                var data = {
                    LineItemId: lineItemId
                };
                return Composer.ComposerClient.remove("/api/recurringordertemplate/lineitem/", data);
            };
            RecurringOrderRepository.prototype.deleteTemplateLineItems = function (deleteTemplateLineItemsParam) {
                var lineItemsIds = deleteTemplateLineItemsParam.lineItemsIds;
                if (!lineItemsIds) {
                    throw new Error('lineItemsIds is required');
                }
                var datas = {
                    LineItemsIds: lineItemsIds,
                };
                return Composer.ComposerClient.remove("/api/recurringordertemplate/lineitems/byIds", datas);
            };
            RecurringOrderRepository.prototype.getCartContainsRecurrence = function () {
                return Composer.ComposerClient.get("/api/recurringordercart/get-cart-contains-recurrence");
            };
            RecurringOrderRepository.prototype.getRecurrenceConfigIsActive = function () {
                return Composer.ComposerClient.get("/api/recurringordercart/get-recurrence-config-is-active");
            };
            RecurringOrderRepository.prototype.getCanRemovePaymentMethod = function (paymentMethodId) {
                var datas = {
                    PaymentMethodId: paymentMethodId,
                };
                return Composer.ComposerClient.post("/api/recurringordertemplate/get-can-remove-payment-method", datas);
            };
            RecurringOrderRepository.prototype.getRecurringOrderCartSummaries = function () {
                return Composer.ComposerClient.get("/api/recurringordercart/customer-cart-summaries");
            };
            RecurringOrderRepository.prototype.addRecurringOrderCartLineItem = function (addLineItemQuantityParam) {
                if (!addLineItemQuantityParam.cartName) {
                    throw new Error('billingAddressId is required');
                }
                if (!addLineItemQuantityParam.productId) {
                    throw new Error('productId is required');
                }
                if (!addLineItemQuantityParam.productDisplayName) {
                    throw new Error('productDisplayName is required');
                }
                if (!addLineItemQuantityParam.sku) {
                    throw new Error('sku is required');
                }
                if (!addLineItemQuantityParam.quantity) {
                    throw new Error('quantity is required');
                }
                return Composer.ComposerClient.post("/api/recurringordercart/lineitem", addLineItemQuantityParam);
            };
            RecurringOrderRepository.prototype.updateCartShippingMethod = function (updateCartShippingMethodParam) {
                if (!updateCartShippingMethodParam.shippingProviderId) {
                    throw new Error('shippingProviderId is required');
                }
                if (!updateCartShippingMethodParam.shippingMethodName) {
                    throw new Error('shippingMethodName is required');
                }
                if (!updateCartShippingMethodParam.cartName) {
                    throw new Error('cartName is required');
                }
                return Composer.ComposerClient.put("/api/recurringcart/shippingmethod", updateCartShippingMethodParam);
            };
            RecurringOrderRepository.prototype.getAnonymousCartSignInUrl = function () {
                return Composer.ComposerClient.get("/api/recurringcart/getanonymouscartsigninurl");
            };
            RecurringOrderRepository.prototype.getCartShippingMethods = function (getCartShippingMethodsParam) {
                if (!getCartShippingMethodsParam.CartName) {
                    throw new Error('CartName is required');
                }
                return Composer.ComposerClient.post("/api/cart/shippingmethodsbycartname", getCartShippingMethodsParam);
            };
            RecurringOrderRepository.prototype.getOrderTemplateShippingMethods = function () {
                return Composer.ComposerClient.get("/api/cart/shippingmethodsscope");
            };
            RecurringOrderRepository.prototype.getInactifProductsFromCustomer = function () {
                return Composer.ComposerClient.get("/api/recurringordertemplate/inactifProducts");
            };
            RecurringOrderRepository.prototype.clearCustomerInactifItems = function () {
                return Composer.ComposerClient.get("/api/recurringordertemplate/clear-customer-inactif-items");
            };
            RecurringOrderRepository.prototype.getRecurringCart = function (getRecurringCartParam) {
                var cartName = getRecurringCartParam.cartName;
                if (!cartName) {
                    throw new Error('cartName is required');
                }
                var data = {
                    Name: cartName,
                };
                return Composer.ComposerClient.post("/api/recurringcart/getrecurringcart", data);
            };
            RecurringOrderRepository.prototype.getCartPaymentMethods = function (getCartPaymentMethodsParam) {
                var cartName = getCartPaymentMethodsParam.cartName;
                if (!cartName) {
                    throw new Error('cartName is required');
                }
                var data = {
                    CartName: cartName,
                };
                return Composer.ComposerClient.post("/api/payment/recurringcartspaymentmethods", data);
            };
            RecurringOrderRepository.prototype.updateCartPaymentMethod = function (updateCartPaymentMethodParam) {
                if (!updateCartPaymentMethodParam.paymentId) {
                    throw new Error('paymentId is required');
                }
                if (!updateCartPaymentMethodParam.paymentProviderName) {
                    throw new Error('paymentProviderName is required');
                }
                if (!updateCartPaymentMethodParam.cartName) {
                    throw new Error('cartName is required');
                }
                if (!updateCartPaymentMethodParam.paymentMethodId) {
                    throw new Error('paymentMethodId is required');
                }
                if (!updateCartPaymentMethodParam.paymentType) {
                    throw new Error('paymentType is required');
                }
                return Composer.ComposerClient.put("/api/recurringcart/paymentmethod", updateCartPaymentMethodParam);
            };
            RecurringOrderRepository.prototype.getRecurringTemplateDetail = function (recurringOrderTemplateId) {
                if (!recurringOrderTemplateId) {
                    throw new Error('recurringOrderTemplateId is required');
                }
                var data = {
                    RecurringOrderTemplateId: recurringOrderTemplateId,
                };
                return Composer.ComposerClient.post("/api/recurringordertemplate/getrecurringordertemplatedetails", data);
            };
            RecurringOrderRepository.prototype.getTemplatePaymentMethods = function (getTemplatePaymentMethodsParam) {
                var id = getTemplatePaymentMethodsParam.id;
                if (!id) {
                    throw new Error('id is required');
                }
                var data = {
                    Id: id,
                };
                return Composer.ComposerClient.post("/api/payment/recurringorderstemplatespaymentmethods", data);
            };
            return RecurringOrderRepository;
        }());
        Composer.RecurringOrderRepository = RecurringOrderRepository;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../ErrorHandling/ErrorHandler.ts' />
///<reference path='../../Events/EventScheduler.ts' />
///<reference path='../RecurringOrder/Services/RecurringOrderService.ts' />
///<reference path='../RecurringOrder/Repositories/RecurringOrderRepository.ts' />
///<reference path='./CartService.ts' />
///<reference path='./CartStateService.ts' />
///<reference path='./CartEvents.ts' />
///<reference path='../../Composer.Product/ProductEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var CartSummaryController = /** @class */ (function (_super) {
            __extends(CartSummaryController, _super);
            function CartSummaryController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.source = 'Checkout';
                _this.loaded = false;
                _this.cartService = Composer.CartService.getInstance();
                _this.cartStateService = Composer.CartStateService.getInstance();
                return _this;
            }
            CartSummaryController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                var cartSummaryMixins = {
                    methods: {
                        DecrementDisabled: function (item) {
                            return this.IsLoading || (this.Cart.QuantityRange && item.Quantity <= this.Cart.QuantityRange.Min);
                        },
                        IncrementDisabled: function (item) {
                            return this.IsLoading || (this.Cart.QuantityRange && item.Quantity >= this.Cart.QuantityRange.Max);
                        },
                        updateItemQuantity: function (item, quantity) {
                            var _this = this;
                            if (this.Mode.Loading)
                                return;
                            if (this.Cart.QuantityRange) {
                                var _a = this.Cart.QuantityRange, Min = _a.Min, Max = _a.Max;
                                quantity = Math.min(Math.max(Min, quantity), Max);
                            }
                            if (quantity == item.Quantity) {
                                //force update vue component
                                this.Cart = __assign({}, this.Cart);
                                return;
                            }
                            var analyticEventName = quantity > this.Quantity ? Composer.ProductEvents.LineItemAdding : Composer.ProductEvents.LineItemRemoving;
                            item.Quantity = quantity;
                            if (item.Quantity < 1) {
                                this.Mode.Loading = true; // disable ui immediately when we will delete  the line item
                            }
                            if (!this.debounceUpdateItem) {
                                this.debounceUpdateItem = _.debounce(function (itemToUpdate) {
                                    var Id = itemToUpdate.Id, Quantity = itemToUpdate.Quantity, ProductId = itemToUpdate.ProductId, Frequency = itemToUpdate.RecurringOrderFrequencyName, Program = itemToUpdate.RecurringOrderProgramName;
                                    self.publishProductDataForAnalytics(itemToUpdate, analyticEventName);
                                    _this.Mode.Loading = true;
                                    var updatePromise = Quantity > 0 ?
                                        self.cartService.updateLineItem(Id, Quantity, ProductId, Frequency || null, Program) :
                                        self.cartService.deleteLineItem(Id, ProductId);
                                    updatePromise.then(function (cart) {
                                        _this.Cart = cart;
                                    })
                                        .fail(function (reason) { return self.lineItemUpdateFailed(reason); })
                                        .fin(function () { return _this.Mode.Loading = false; });
                                }, 400);
                            }
                            this.debounceUpdateItem(item);
                        },
                        removeCartItem: function (id) {
                            var _this = this;
                            var item = _.find(this.Cart.LineItemDetailViewModels, function (i) { return i.Id === id; });
                            self.publishProductDataForAnalytics(item, Composer.ProductEvents.LineItemRemoving);
                            this.Mode.Loading = true;
                            self.cartService.deleteLineItem(item.Id, item.ProductId)
                                .then(function (cart) {
                                if (cart) {
                                    _this.Cart = cart;
                                }
                            })
                                .fail(function (reason) { return self.onLineItemDeleteFailed(reason); })
                                .finally(function () {
                                _this.Mode.Loading = false;
                            });
                            this.Cart.LineItemDetailViewModels = _.filter(this.Cart.LineItemDetailViewModels, function (i) { return i.Id != id; });
                        }
                    }
                };
                this.cartStateService.VueCartMixins.push(cartSummaryMixins);
            };
            CartSummaryController.prototype.publishProductDataForAnalytics = function (lineItem, eventName) {
                var data = this.getLineItemDataForAnalytics(lineItem);
                this.eventHub.publish(eventName, { data: data });
            };
            CartSummaryController.prototype.getLineItemDataForAnalytics = function (lineItem) {
                var data = {
                    List: this.source,
                    DisplayName: lineItem.ProductSummary.DisplayName,
                    ProductId: lineItem.ProductId,
                    ListPrice: lineItem.ListPrice,
                    Brand: lineItem.ProductSummary.Brand,
                    CategoryId: lineItem.ProductSummary.CategoryId,
                    Variant: undefined,
                    Quantity: lineItem.Quantity
                };
                if (lineItem.VariantId && lineItem.KeyVariantAttributesList) {
                    data.Variant = this.buildVariantName(lineItem.KeyVariantAttributesList);
                }
                return data;
            };
            CartSummaryController.prototype.lineItemUpdateFailed = function (reason) {
                console.error('Error while updating line item quantity.', reason);
                Composer.ErrorHandler.instance().outputErrorFromCode('LineItemUpdateFailed');
            };
            CartSummaryController.prototype.onLineItemDeleteFailed = function (reason) {
                console.error('Error while deleting line item.', reason);
                Composer.ErrorHandler.instance().outputErrorFromCode('LineItemDeleteFailed');
            };
            CartSummaryController.prototype.buildVariantName = function (kvas) {
                var nameParts = [];
                for (var i = 0; i < kvas.length; i++) {
                    var value = kvas[i].OriginalValue;
                    nameParts.push(value);
                }
                return nameParts.join(' ');
            };
            return CartSummaryController;
        }(Orckestra.Composer.Controller));
        Composer.CartSummaryController = CartSummaryController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='./CouponService.ts' />
///<reference path='../../Composer.Cart/CartSummary/CartEvents.ts' />
///<reference path='../../Composer.Cart/CartSummary/CartStateService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        /**
         * Controller for the Coupons section.
         */
        var CouponController = /** @class */ (function (_super) {
            __extends(CouponController, _super);
            function CouponController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.couponService = new Composer.CouponService(Composer.CartService.getInstance(), _this.eventHub);
                _this.cartStateService = Composer.CartStateService.getInstance();
                return _this;
            }
            CouponController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                var couponsMixins = {
                    data: {
                        CouponCode: undefined,
                        Mode: {
                            ApplyingCoupon: false
                        },
                        ShowAlert: false
                    },
                    computed: {
                        Coupons: function () {
                            return this.Cart.Coupons;
                        },
                        HasCouponsErrorMessage: function () {
                            return _.some(this.Coupons.Messages, function (m) { return m.Level === 'danger'; });
                        }
                    },
                    methods: {
                        applyCoupon: function () {
                            var _this = this;
                            if (!this.CouponCode)
                                return;
                            this.Mode.ApplyingCoupon = true;
                            self.couponService.addCoupon(this.CouponCode)
                                .fin(function () {
                                if (!_this.HasCouponsErrorMessage)
                                    _this.CouponCode = undefined;
                                _this.Mode.ApplyingCoupon = false;
                                _this.ShowAlert = true;
                            });
                        },
                        removeCoupon: function (couponCode) {
                            if (!couponCode || 0 === couponCode.length) {
                                console.log('The coupon code may not be null');
                                return;
                            }
                            self.couponService.removeCoupon(couponCode.toString());
                        }
                    }
                };
                this.cartStateService.VueCartMixins.push(couponsMixins);
            };
            return CouponController;
        }(Orckestra.Composer.Controller));
        Composer.CouponController = CouponController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Mvc/ComposerClient.ts' />
///<reference path='../Parameters/IGetOrderParameters.ts' />
///<reference path='../../../Events/EventHub.ts' />
///<reference path='../../../Repositories/IOrderRepository.ts' />
///<reference path='../../CartSummary/ICartService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var OrderService = /** @class */ (function () {
            function OrderService() {
                this.eventHub = Composer.EventHub.instance();
                this.orderRepository = new Composer.OrderRepository;
                this.cartService = Composer.CartService.getInstance();
                this.cacheProvider = Composer.CacheProvider.instance();
                this.orderCacheKey = 'orderCacheKey';
                this.orderConfirmationCacheKey = 'orderConfirmationCacheKey';
            }
            ;
            OrderService.prototype.editOrder = function (orderNumber) {
                var _this = this;
                return this.orderRepository.editOrder(orderNumber)
                    .then(function (result) {
                    if (result.CartUrl) {
                        var data = { redirectUrl: result.CartUrl };
                        _this.eventHub.publish(Composer.MyAccountEvents.EditOrderStarted, { data: data });
                    }
                })
                    .fail(function () {
                    Composer.ErrorHandler.instance().outputErrorFromCode('EditingOrderFailed');
                });
            };
            OrderService.prototype.saveEditOrder = function (orderNumber) {
                var _this = this;
                return this.orderRepository.saveEditOrder(orderNumber).then(function (result) {
                    result.IsUpdatedOrder = true;
                    _this.cacheProvider.defaultCache.set(_this.orderCacheKey, result).done();
                    _this.cacheProvider.defaultCache.set(_this.orderConfirmationCacheKey, result).done();
                    _this.eventHub.publish(Composer.MyAccountEvents.EditOrderFinished, { data: { orderNumber: orderNumber } });
                    _this.cartService.invalidateCache();
                    _this.cartService.getFreshCart(true);
                    if (result.NextStepUrl) {
                        window.location.href = result.NextStepUrl;
                    }
                }).fail(function (reason) { return Composer.ErrorHandler.instance().outputErrorFromCode('UpdatingOrderFailed'); });
            };
            OrderService.prototype.cancelOrder = function (orderNumber) {
                var _this = this;
                return this.orderRepository.cancelOrder(orderNumber).then(function (result) { return _this.eventHub.publish(Composer.MyAccountEvents.OrderCanceled, { data: { orderNumber: orderNumber } }); })
                    .fail(function (reason) { return Composer.ErrorHandler.instance().outputErrorFromCode('CancelOrderFailed'); });
            };
            OrderService.prototype.cancelEditOrder = function (orderNumber) {
                var _this = this;
                return this.orderRepository.cancelEditOrder(orderNumber).then(function (result) {
                    _this.eventHub.publish(Composer.MyAccountEvents.EditOrderCanceled, { data: { orderNumber: orderNumber } });
                    return _this.cartService.getFreshCart(true);
                })
                    .then(function (cart) { return _this.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cart }); })
                    .fail(function (reason) { return console.log(reason); });
            };
            OrderService.prototype.getPastOrders = function (options) {
                if (options === void 0) { options = { page: 1 }; }
                return this.orderRepository.getPastOrders(options);
            };
            OrderService.prototype.getCurrentOrders = function (options) {
                if (options === void 0) { options = { page: 1 }; }
                return this.orderRepository.getCurrentOrders(options);
            };
            return OrderService;
        }());
        Composer.OrderService = OrderService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../CartSummary/CartService.ts' />
///<reference path='../OrderHistory/Services/OrderService.ts' />
///<reference path='../CartSummary/CartEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var EditOrderBannerController = /** @class */ (function (_super) {
            __extends(EditOrderBannerController, _super);
            function EditOrderBannerController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cartService = Composer.CartService.getInstance();
                _this.orderService = new Composer.OrderService();
                return _this;
            }
            EditOrderBannerController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.cartService.getCart()
                    .then(function (currentCart) { return _this.initializeVueComponent(currentCart); });
            };
            EditOrderBannerController.prototype.initializeVueComponent = function (currentCart) {
                var self = this;
                this.VueEditOrderBanner = new Vue({
                    el: '#vueEditOrderBanner',
                    mounted: function () {
                        var _this = this;
                        self.eventHub.subscribe(Composer.CartEvents.CartUpdated, function (e) { return _this.Cart = e.data; });
                    },
                    data: {
                        Cart: currentCart
                    },
                    computed: {
                        IsDraftCart: function () { return this.Cart.CartType == "OrderDraft"; },
                        OrderNumberForOrderDraft: function () { return this.Cart.OrderSummary.OrderNumberForOrderDraft; }
                    },
                    methods: {
                        cancelEditOrder: function () {
                            self.orderService.cancelEditOrder(this.OrderNumberForOrderDraft);
                        }
                    }
                });
            };
            return EditOrderBannerController;
        }(Composer.Controller));
        Composer.EditOrderBannerController = EditOrderBannerController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='./IFindOrderService.ts' />
///<reference path='./FindOrderService.ts' />
///<reference path='./IGetOrderDetailsUrlRequest.ts' />
///<reference path='./IGuestOrderDetailsViewModel.ts' />
///<reference path='./IFindMyOrderViewModel.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var FindMyOrderController = /** @class */ (function (_super) {
            __extends(FindMyOrderController, _super);
            function FindMyOrderController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            FindMyOrderController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerFormsForValidation(this.context.container.find('form'));
                this.findOrderService = new Composer.FindOrderService(this.eventHub);
            };
            FindMyOrderController.prototype.getWindow = function () {
                return window;
            };
            FindMyOrderController.prototype.onFindMyOrder = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                var busy = this.asyncBusy();
                var request = actionContext.elementContext.serializeObject();
                this.findOrderAsync(request)
                    .then(function (vm) {
                    _this.getWindow().location.href = vm.Url;
                })
                    .fail(function (reason) {
                    busy.done();
                    if (reason.status && reason.status === 404) {
                        _this.handleOrderNotFound(reason, request);
                    }
                    else {
                        console.error(reason);
                    }
                });
            };
            FindMyOrderController.prototype.findOrderAsync = function (request) {
                return this.findOrderService.getOrderDetailsUrl(request);
            };
            FindMyOrderController.prototype.handleOrderNotFound = function (reason, request) {
                var vm = {
                    Email: request.Email,
                    OrderNumber: request.OrderNumber,
                    OrderNotFound: true
                };
                this.render('FindMyOrder', vm);
            };
            return FindMyOrderController;
        }(Orckestra.Composer.Controller));
        Composer.FindMyOrderController = FindMyOrderController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Events/EventScheduler.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../../Events/IEventInformation.ts' />
///<reference path='../CartSummary/CartService.ts' />
///<reference path='../../Composer.MyAccount/Common/MyAccountEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var MiniCartController = /** @class */ (function (_super) {
            __extends(MiniCartController, _super);
            function MiniCartController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cartService = Composer.CartService.getInstance();
                return _this;
            }
            MiniCartController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeMiniCartQuantity();
                this.registerSubscriptions();
            };
            MiniCartController.prototype.initializeMiniCartQuantity = function () {
                var _this = this;
                this.cartService.getCart()
                    .done(function (cart) {
                    if (!_.isEmpty(cart)) {
                        _this.renderCart(cart);
                    }
                });
            };
            MiniCartController.prototype.registerSubscriptions = function () {
                var _this = this;
                var loggedInScheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn]);
                var loggedOutScheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedOut]);
                this.eventHub.subscribe('cartUpdated', function (e) { return _this.onCartUpdated(e); });
                this.eventHub.subscribe(Composer.MyAccountEvents.EditOrderStarted, function (e) { return _this.onEditOrderStarted(e); });
                loggedOutScheduler.subscribe(function (e) { return _this.onRefreshUser(e); });
                loggedInScheduler.subscribe(function (e) { return _this.onRefreshUser(e); });
            };
            MiniCartController.prototype.onEditOrderStarted = function (e) {
                this.cartService.invalidateCache()
                    .then(function () { return window.location = e.data.redirectUrl; });
            };
            MiniCartController.prototype.onCartUpdated = function (e) {
                var cart = e.data;
                this.renderCart(cart);
            };
            MiniCartController.prototype.onRefreshUser = function (e) {
                return this.cartService.invalidateCache();
            };
            MiniCartController.prototype.renderCart = function (cart) {
                var viewModel = (_.isEmpty(cart) || cart.TotalQuantity === 0) ? {} : cart;
                this.render('MinicartQuantity', viewModel);
            };
            MiniCartController.prototype.onError = function (reason) {
                console.error("An error occured while rendering the cart with the MiniCartController.", reason);
            };
            return MiniCartController;
        }(Orckestra.Composer.Controller));
        Composer.MiniCartController = MiniCartController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Events/EventScheduler.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../../Events/IEventInformation.ts' />
///<reference path='../../Composer.Analytics/Analytics/GoogleAnalyticsPlugin.ts' />
///<reference path='../CartSummary/CartService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var MiniCartSummaryController = /** @class */ (function (_super) {
            __extends(MiniCartSummaryController, _super);
            function MiniCartSummaryController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cartService = Composer.CartService.getInstance();
                _this.cacheProvider = Composer.CacheProvider.instance();
                return _this;
            }
            MiniCartSummaryController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeMiniCartSummary();
                this.registerSubscriptions();
            };
            MiniCartSummaryController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe('cartUpdated', function (e) {
                    _this.renderMiniCart(e.data);
                });
                this.eventHub.subscribe('lineItemAddedToCart', function (e) {
                    _this.displayMiniCart(e);
                });
                this.eventHub.subscribe('languageSwitched', function (e) {
                    _this.invalidateCart(e);
                });
            };
            MiniCartSummaryController.prototype.invalidateCart = function (e) {
                this.cartService.invalidateCache();
                this.initializeMiniCartSummary();
            };
            MiniCartSummaryController.prototype.displayMiniCart = function (e) {
                var miniCartContainer = $(this.context.container);
                var notificationTime = parseInt(miniCartContainer.data('notificationTime'), 10);
                var scrollToLineItemKey = e.data.ProductId + '-' + (e.data.VariantId || '');
                //To reset timer
                clearTimeout(this.timer);
                if (notificationTime > 0) {
                    miniCartContainer.addClass('displayMiniCart');
                    // Scroll to added item
                    $('.minicart-summary-products', miniCartContainer).stop().animate({
                        scrollTop: $('[data-lineitem-id="' + scrollToLineItemKey + '"]', miniCartContainer).position().top
                    }, 1000);
                    this.timer = setTimeout(function () {
                        miniCartContainer.removeClass('displayMiniCart');
                    }, notificationTime);
                }
            };
            MiniCartSummaryController.prototype.onCloseMiniCart = function (e) {
                var miniCartContainer = $(this.context.container);
                miniCartContainer.addClass('d-none');
                setTimeout(function () {
                    miniCartContainer.removeClass('d-none');
                }, 250);
                //Hide the display and cancel the display timer to not have a flickering display
                miniCartContainer.removeClass('displayMiniCart');
                clearTimeout(this.timer);
            };
            MiniCartSummaryController.prototype.onCheckout = function (actionContext) {
                // Set origin of checkout that we will be used in AnalyticsPlugin
                Composer.AnalyticsPlugin.setCheckoutOrigin('Mini Cart Checkout');
            };
            MiniCartSummaryController.prototype.initializeMiniCartSummary = function () {
                var _this = this;
                var busy = this.asyncBusy({ containerContext: this.context.container });
                this.cartService.getCart().done(function (cart) {
                    if (!_.isEmpty(cart)) {
                        _this.renderMiniCart(cart);
                    }
                    busy.done();
                });
            };
            MiniCartSummaryController.prototype.renderMiniCart = function (cart) {
                this.render('MinicartSummary', cart);
            };
            return MiniCartSummaryController;
        }(Orckestra.Composer.Controller));
        Composer.MiniCartSummaryController = MiniCartSummaryController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Events/EventScheduler.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../../Events/IEventInformation.ts' />
///<reference path='../CartSummary/CartService.ts' />
///<reference path='../../Composer.MyAccount/Common/MyAccountEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var MiniCartButtonController = /** @class */ (function (_super) {
            __extends(MiniCartButtonController, _super);
            function MiniCartButtonController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cartService = Composer.CartService.getInstance();
                return _this;
            }
            MiniCartButtonController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.cartService.getCart().then(function (cart) {
                    _this.initializeMiniCartQuantity(cart);
                });
                var loggedInScheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn]);
                var loggedOutScheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedOut]);
                loggedOutScheduler.subscribe(function (e) { return _this.cartService.invalidateCache(); });
                loggedInScheduler.subscribe(function (e) { return _this.cartService.invalidateCache(); });
                this.eventHub.subscribe(Composer.MyAccountEvents.EditOrderStarted, function (e) { return _this.onEditOrderStarted(e); });
            };
            MiniCartButtonController.prototype.onEditOrderStarted = function (e) {
                this.cartService.invalidateCache()
                    .then(function () { return window.location = e.data.redirectUrl; });
            };
            MiniCartButtonController.prototype.initializeMiniCartQuantity = function (cart) {
                var self = this;
                var elements = ["#vueMiniCartButton", "#vueMiniCartButtonMobile"];
                elements.forEach(function (el) {
                    new Vue({
                        el: el,
                        data: {
                            Cart: cart
                        },
                        mounted: function () {
                            var _this = this;
                            self.eventHub.subscribe('cartUpdated', function (e) { return _this.onCartUpdated(e); });
                        },
                        methods: {
                            onCartUpdated: function (e) {
                                this.Cart = e.data;
                            }
                        }
                    });
                });
            };
            return MiniCartButtonController;
        }(Orckestra.Composer.Controller));
        Composer.MiniCartButtonController = MiniCartButtonController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
/// <reference path='../../Mvc/Controller.ts' />
/// <reference path='../../Mvc/IControllerContext.ts' />
/// <reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../OrderHistory/Services/OrderService.ts' />
///<reference path='../../UI/UIModal.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var OrderDetailsController = /** @class */ (function (_super) {
            __extends(OrderDetailsController, _super);
            function OrderDetailsController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.orderService = new Composer.OrderService();
                return _this;
            }
            OrderDetailsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var cancelModalElementSelector = '#cancelOrderModal';
                var self = this;
                self.eventHub.subscribe(Composer.MyAccountEvents.EditOrderCanceled, function () { return window.location.reload(); });
                this.VueOrderDetails = new Vue({
                    el: '#vueOrderDetails',
                    data: {
                        Loading: false,
                        Modal: {
                            cancelOrderModal: null,
                        },
                        OrderNumber: null
                    },
                    mounted: function () {
                        var _this = this;
                        this.Modal.cancelOrderModal = new Composer.UIModal(window, cancelModalElementSelector, this.cancelOrder, this);
                        self.eventHub.subscribe(Composer.MyAccountEvents.OrderCanceled, function () { return _this.reload(); });
                    },
                    methods: {
                        editOrder: function (orderNumber) {
                            var _this = this;
                            if (this.Loading)
                                return;
                            this.Loading = true;
                            self.eventHub.publish(Composer.MyAccountEvents.StartEditOrder, { data: orderNumber });
                            self.orderService.editOrder(orderNumber)
                                .fin(function () { return _this.Loading = false; });
                        },
                        cancelEditingOrder: function (orderNumber) {
                            var _this = this;
                            if (this.Loading)
                                return;
                            this.Loading = true;
                            self.orderService.cancelEditOrder(orderNumber)
                                .fin(function () { return _this.Loading = false; });
                        },
                        reload: function () {
                            window.location.reload();
                        },
                        cancelOrderConfirm: function (event, orderNumber) {
                            this.OrderNumber = orderNumber;
                            this.Modal.cancelOrderModal.openModal(event);
                        },
                        cancelOrder: function () {
                            var _this = this;
                            if (this.Loading)
                                return;
                            this.Loading = true;
                            self.orderService.cancelOrder(this.OrderNumber)
                                .fin(function () { return _this.Loading = false; });
                        }
                    }
                });
            };
            return OrderDetailsController;
        }(Composer.Controller));
        Composer.OrderDetailsController = OrderDetailsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
/// <reference path='../../Mvc/Controller.ts' />
/// <reference path='../../Mvc/IControllerContext.ts' />
/// <reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./Services/OrderService.ts' />
/// <reference path='../../ErrorHandling/ErrorHandler.ts' />
///<reference path='../../UI/UIModal.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CurrentOrdersController = /** @class */ (function (_super) {
            __extends(CurrentOrdersController, _super);
            function CurrentOrdersController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.orderService = new Composer.OrderService();
                return _this;
            }
            CurrentOrdersController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                var cancelModalElementSelector = '#cancelOrderModal';
                var self = this;
                self.orderService.getCurrentOrders().then(function (data) {
                    _this.VueCurrentOrderData = new Vue({
                        el: '#vueCurrentOrders',
                        data: {
                            Orders: data ? data.Orders : null,
                            Pagination: data ? data.Pagination : null,
                            Page: 1,
                            Loading: false,
                            Modal: {
                                cancelOrderModal: null,
                            },
                            OrderNumber: null
                        },
                        mounted: function () {
                            var _this = this;
                            this.Modal.cancelOrderModal = new Composer.UIModal(window, cancelModalElementSelector, this.cancelOrder, this);
                            self.eventHub.subscribe(Composer.MyAccountEvents.EditOrderCanceled, function () { return _this.getOrders(_this.Page); });
                            self.eventHub.subscribe(Composer.MyAccountEvents.OrderCanceled, function () { return _this.reload(); });
                        },
                        methods: {
                            getOrders: function (page) {
                                var _this = this;
                                this.Loading = true;
                                self.orderService.getCurrentOrders({ page: page })
                                    .then(function (data) {
                                    _this.Orders = data.Orders;
                                    _this.Pagination = data.Pagination;
                                    _this.Page = page;
                                })
                                    .fail(function (reason) { return console.log(reason); })
                                    .fin(function () { return _this.Loading = false; });
                            },
                            editOrder: function (orderNumber) {
                                var _this = this;
                                if (this.Loading)
                                    return;
                                this.Loading = true;
                                self.eventHub.publish(Composer.MyAccountEvents.StartEditOrder, { data: orderNumber });
                                self.orderService.editOrder(orderNumber)
                                    .fin(function () { return _this.Loading = false; });
                            },
                            cancelEditingOrder: function (orderNumber) {
                                var _this = this;
                                if (this.Loading)
                                    return;
                                this.Loading = true;
                                self.orderService.cancelEditOrder(orderNumber)
                                    .fin(function () { return _this.Loading = false; });
                            },
                            reload: function () {
                                window.location.reload();
                            },
                            cancelOrderConfirm: function (event, orderNumber) {
                                this.OrderNumber = orderNumber;
                                this.Modal.cancelOrderModal.openModal(event);
                            },
                            cancelOrder: function () {
                                var _this = this;
                                if (this.Loading)
                                    return;
                                this.Loading = true;
                                self.orderService.cancelOrder(this.OrderNumber).fin(function () { return _this.Loading = false; });
                            }
                        }
                    });
                });
            };
            return CurrentOrdersController;
        }(Composer.Controller));
        Composer.CurrentOrdersController = CurrentOrdersController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
/// <reference path='../../Mvc/Controller.ts' />
/// <reference path='../../Mvc/IControllerContext.ts' />
/// <reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./Services/OrderService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var PastOrdersController = /** @class */ (function (_super) {
            __extends(PastOrdersController, _super);
            function PastOrdersController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.orderService = new Composer.OrderService();
                return _this;
            }
            PastOrdersController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                var self = this;
                self.orderService.getPastOrders().then(function (data) {
                    _this.VuePastOrderData = new Vue({
                        el: '#vuePastOrders',
                        data: {
                            Orders: data ? data.Orders : null,
                            Pagination: data ? data.Pagination : null,
                            Loading: false
                        },
                        methods: {
                            getOrders: function (page) {
                                var _this = this;
                                this.Loading = true;
                                self.orderService.getPastOrders({ page: page }).then(function (data) {
                                    _this.Orders = data.Orders;
                                    _this.Pagination = data.Pagination;
                                })
                                    .fail(function (reason) { return console.log(reason); })
                                    .fin(function () { return _this.Loading = false; });
                            }
                        }
                    });
                });
            };
            return PastOrdersController;
        }(Composer.Controller));
        Composer.PastOrdersController = PastOrdersController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../CartSummary/CartService.ts' />
///<reference path='../CartSummary/CartEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var OrderSummaryService = /** @class */ (function () {
            function OrderSummaryService(cartService, eventHub) {
                if (!cartService) {
                    throw new Error('Error: cartService is required');
                }
                if (!eventHub) {
                    throw new Error('Error: eventHub is required');
                }
                this.cartService = cartService;
                this.eventHub = eventHub;
            }
            OrderSummaryService.prototype.setCheapestShippingMethodUsing = function (postalCode) {
                var _this = this;
                this.eventHub.publish(Composer.CartEvents.CartUpdating, { data: { PostalCode: postalCode } });
                return this.cartService.updateShippingMethodPostalCode(postalCode)
                    .then(function () { return _this.cartService.setCheapestShippingMethod(); })
                    .then(function () { return _this.cartService.getCart(); })
                    .then(function (cart) { return _this.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cart }); })
                    .fail(function (reason) {
                    console.error('Error while updating the shipping method using the postal code', reason);
                    throw reason;
                });
            };
            OrderSummaryService.prototype.cleanCart = function () {
                return this.cartService.clean();
            };
            return OrderSummaryService;
        }());
        Composer.OrderSummaryService = OrderSummaryService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../ErrorHandling/ErrorHandler.ts' />
///<reference path='../../Composer.Analytics/Analytics/GoogleAnalyticsPlugin.ts' />
///<reference path='../CartSummary/CartService.ts' />
///<reference path='../CartSummary/CartStateService.ts' />
///<reference path='./OrderSummaryService.ts' />
///<reference path='../OrderHistory/Services/OrderService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var OrderSummaryController = /** @class */ (function (_super) {
            __extends(OrderSummaryController, _super);
            function OrderSummaryController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cartService = Composer.CartService.getInstance();
                _this.cartStateService = Composer.CartStateService.getInstance();
                _this.orderService = new Composer.OrderService();
                _this.orderSummaryService = new Composer.OrderSummaryService(_this.cartService, _this.eventHub);
                return _this;
            }
            OrderSummaryController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                var cartOrderSummaryMixins = {
                    data: {
                        EstimateShippingPostalCode: undefined,
                        PostalCodeEmpty: false,
                        PostalCodeMalformed: false
                    },
                    methods: {
                        openEstimateShippingModal: function () {
                            this.postalCodeModal = $('#postalCodeModal');
                            this.postalCodeModal.modal('show');
                        },
                        closeModal: function () {
                            this.postalCodeModal.modal('hide');
                            this.postalCodeModal.off('shown.bs.modal');
                        },
                        estimateShipping: function (postalCodePattern) {
                            var _this = this;
                            if (!this.EstimateShippingPostalCode) {
                                this.PostalCodeEmpty = true;
                                return;
                            }
                            var postalCode = this.EstimateShippingPostalCode.toUpperCase();
                            if (postalCodePattern) {
                                var postalCodeRegexPattern = new RegExp(postalCodePattern.toString());
                                this.PostalCodeMalformed = postalCodeRegexPattern.test(postalCode);
                                if (!this.PostalCodeMalformed) {
                                    return;
                                }
                            }
                            this.Mode.Loading = true;
                            self.orderSummaryService.setCheapestShippingMethodUsing(postalCode)
                                .then(function (data) {
                                _this.closeModal();
                                return data;
                            }, function (reason) {
                                Composer.ErrorHandler.instance().outputErrorFromCode('PostalCodeUpdateFailed');
                            })
                                .fin(function () { return _this.Mode.Loading = false; });
                        },
                        cancelEditOrder: function () {
                            var _this = this;
                            this.Mode.Loading = true;
                            self.orderService.cancelEditOrder(this.Cart.OrderSummary.OrderNumberForOrderDraft)
                                .fin(function () { return _this.Mode.Loading = false; });
                        },
                        saveEditOrder: function () {
                            var _this = this;
                            this.Mode.Loading = true;
                            self.orderService.saveEditOrder(this.Cart.OrderSummary.OrderNumberForOrderDraft)
                                .fin(function () { return _this.Mode.Loading = false; });
                        },
                        proceedToCheckout: function () {
                            var nextStepUrl = this.OrderSummary.CheckoutUrlTarget;
                            if (!nextStepUrl) {
                                throw 'No next step Url was defined.';
                            }
                            Composer.AnalyticsPlugin.setCheckoutOrigin('Checkout');
                            this.Mode.Loading = true;
                            self.orderSummaryService.cleanCart().done(function () {
                                window.location.href = nextStepUrl;
                            }, function (reason) {
                                console.error('Error while proceeding to Checkout', reason);
                                Composer.ErrorHandler.instance().outputErrorFromCode('ProceedToCheckoutFailed');
                            });
                        },
                        removeInvalidLineItems: function () {
                            var _this = this;
                            this.Mode.Loading = true;
                            self.cartService.invalidateCache();
                            self.orderSummaryService.cleanCart()
                                .then(function (cart) {
                                return self.eventHub.publish(Composer.CartEvents.CartUpdated, { data: cart });
                            }).fin(function () { return _this.Mode.Loading = false; });
                        }
                    }
                };
                this.cartStateService.VueCartMixins.push(cartOrderSummaryMixins);
            };
            return OrderSummaryController;
        }(Orckestra.Composer.Controller));
        Composer.OrderSummaryController = OrderSummaryController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../Cache/CacheError.ts' />
/// <reference path='../../Cache/ICache.ts' />
/// <reference path='../../Cache/ICachePolicy.ts' />
/// <reference path='../../Mvc/ComposerClient.ts' />
/// <reference path='./IWishListRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var WishListRepository = /** @class */ (function () {
            function WishListRepository() {
            }
            WishListRepository.prototype.getWishList = function () {
                return Composer.ComposerClient.get('/api/wishlist/getwishlist');
            };
            WishListRepository.prototype.getWishListSummary = function () {
                return Composer.ComposerClient.get('/api/wishlist/getwishlistsummary');
            };
            WishListRepository.prototype.addLineItem = function (productId, variantId, quantity, recurringOrderFrequencyName, recurringOrderProgramName) {
                if (!productId) {
                    throw new Error('The product id is required');
                }
                if (quantity <= 0) {
                    throw new Error('The quantity must be greater than zero');
                }
                var data = {
                    ProductId: productId,
                    VariantId: variantId,
                    Quantity: quantity,
                    RecurringOrderFrequencyName: recurringOrderFrequencyName,
                    RecurringOrderProgramName: recurringOrderProgramName
                };
                return Composer.ComposerClient.post('/api/wishlist/lineitem', data);
            };
            WishListRepository.prototype.deleteLineItem = function (lineItemId) {
                if (!lineItemId) {
                    throw new Error('The line item id is required');
                }
                var data = {
                    LineItemId: lineItemId
                };
                return Composer.ComposerClient.remove('/api/wishlist/lineitem', data);
            };
            return WishListRepository;
        }());
        Composer.WishListRepository = WishListRepository;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Events/EventScheduler.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../Common/MembershipService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var AccountHeaderController = /** @class */ (function (_super) {
            __extends(AccountHeaderController, _super);
            function AccountHeaderController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                return _this;
            }
            AccountHeaderController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
            };
            AccountHeaderController.prototype.registerSubscriptions = function () {
                var _this = this;
                var scheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedOut]);
                scheduler.setPostEventCallback(function (data) { return _this.onLoggedOut(data); });
            };
            AccountHeaderController.prototype.onLoggedOut = function (data) {
                var promise = Q.fcall(function () {
                    var newLocation = decodeURIComponent(data.ReturnUrl) || window.location.href;
                    window.location.replace(newLocation);
                });
                return promise;
            };
            AccountHeaderController.prototype.fullLogout = function (actionContext) {
                var _this = this;
                var returnUrlQueryString = 'ReturnUrl=';
                var returnUrl = '';
                actionContext.event.preventDefault();
                if (window.location.href.indexOf(returnUrlQueryString) > -1) {
                    returnUrl = window.location.href.substring(window.location.href.indexOf(returnUrlQueryString)
                        + returnUrlQueryString.length);
                }
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.membershipService.logout(returnUrl, false)
                    .then(function (result) { return _this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedOut], { data: result }); })
                    .fin(function () { return busy.done(); })
                    .done();
            };
            return AccountHeaderController;
        }(Orckestra.Composer.Controller));
        Composer.AccountHeaderController = AccountHeaderController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var MyAccountController = /** @class */ (function (_super) {
            __extends(MyAccountController, _super);
            function MyAccountController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MyAccountController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            MyAccountController.prototype.getFormData = function (actionContext) {
                return actionContext.elementContext.serializeObject();
            };
            MyAccountController.prototype.renderFormErrorMessages = function (reason) {
                this.render('FormErrorMessages', reason);
                this.context.container.find('input[type="password"]').val('');
                this.registerFormsForValidation(this.context.container.find('form'), {
                    serverValidationContainer: '[data-templateid="FormErrorMessages"]'
                });
            };
            return MyAccountController;
        }(Orckestra.Composer.Controller));
        Composer.MyAccountController = MyAccountController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='../Common/CustomerService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../Common/MyAccountStatus.ts' />
///<reference path='../MyAccount/MyAccountController.ts' />
///<reference path='../../UI/UIModal.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        //TODO refactor modal : create a generic modal service
        var AddressListController = /** @class */ (function (_super) {
            __extends(AddressListController, _super);
            function AddressListController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.deleteModalElementSelector = '#confirmationModal';
                _this.customerService = new Composer.CustomerService(new Composer.CustomerRepository());
                return _this;
            }
            AddressListController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.uiModal = new Composer.UIModal(window, this.deleteModalElementSelector, this.deleteAddress, this);
                this.registerSubscriptions();
            };
            AddressListController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.AddressDeleted], function (e) { return _this.onAddressDeleted(e); });
            };
            AddressListController.prototype.onAddressDeleted = function (e) {
                var result = e.data;
                var $container = result.$container;
                $container.remove();
            };
            /**
            * Requires the element in action context to have a data-address-id.
            */
            AddressListController.prototype.setDefaultAddress = function (actionContext) {
                var $addressListItem = $(actionContext.elementContext).closest('[data-address-id]');
                var addressId = $addressListItem.data('address-id');
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext, containerContext: $addressListItem });
                this.customerService.setDefaultAddress(addressId.toString(), '')
                    .then(function (result) { return location.reload(); }, function (reason) { return console.error(reason); })
                    .fin(function () { return busy.done(); })
                    .done();
            };
            /**
            * Requires the element in action context to have a data-address-id.
            */
            AddressListController.prototype.deleteAddress = function (event) {
                var _this = this;
                var element = $(event.target);
                var $addressListItem = element.closest('[data-address-id]');
                var addressId = $addressListItem.data('address-id');
                var busy = this.asyncBusy({ elementContext: element, containerContext: $addressListItem });
                this.customerService.deleteAddress(addressId, '')
                    .then(function (result) { return _this.onDeleteAddressFulfilled(result, $addressListItem); }, function (reason) { return console.error(reason); })
                    .fin(function () { return busy.done(); })
                    .done();
            };
            AddressListController.prototype.onDeleteAddressFulfilled = function (result, $addressListItem) {
                var data = {
                    result: result,
                    $container: $addressListItem
                };
                this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.AddressDeleted], { data: data });
            };
            AddressListController.prototype.deleteAddressConfirm = function (actionContext) {
                this.uiModal.openModal(actionContext.event);
            };
            return AddressListController;
        }(Orckestra.Composer.MyAccountController));
        Composer.AddressListController = AddressListController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../Common/MembershipService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../MyAccount/MyAccountController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ChangePasswordController = /** @class */ (function (_super) {
            __extends(ChangePasswordController, _super);
            function ChangePasswordController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                return _this;
            }
            ChangePasswordController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
            };
            ChangePasswordController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.registerFormsForValidation(this.context.container.find('form'));
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.PasswordChanged], function (e) { return _this.onPasswordChanged(e); });
            };
            ChangePasswordController.prototype.onPasswordChanged = function (e) {
                var result = e.data;
                if (result.ReturnUrl) {
                    window.location.replace(decodeURIComponent(result.ReturnUrl));
                }
                else {
                    this.render('ChangePassword', result);
                    this.registerFormsForValidation(this.context.container.find('form'), {
                        serverValidationContainer: '[data-templateid="ChangePasswordSuccessful"]'
                    });
                }
            };
            /**
             * Event triggered when submitting the change password form.
             * @param {IControllerActionContext} actionContext - Event context.
             */
            ChangePasswordController.prototype.changePassword = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                if (this.busyHandler && this.busyHandler.isLoading())
                    return;
                this.busyHandler = this.asyncBusy({ elementContext: actionContext.elementContext });
                var formData = this.getFormData(actionContext);
                var returnUrlQueryString = 'ReturnUrl=';
                var returnUrl = '';
                if (window.location.href.indexOf(returnUrlQueryString) > -1) {
                    returnUrl = window.location.href.substring(window.location.href.indexOf(returnUrlQueryString)
                        + returnUrlQueryString.length);
                }
                this.membershipService.changePassword(formData, returnUrl)
                    .then(function (result) { return _this.onChangePasswordFulfilled(result); }, function (reason) { return _this.renderFormErrorMessages(reason); })
                    .fin(function () { return _this.busyHandler.done(); })
                    .done();
            };
            ChangePasswordController.prototype.onChangePasswordFulfilled = function (result) {
                this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.PasswordChanged], { data: result });
            };
            return ChangePasswordController;
        }(Orckestra.Composer.MyAccountController));
        Composer.ChangePasswordController = ChangePasswordController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        ///Docs : https://bootstrap-datepicker.readthedocs.io/en/latest/
        var DatepickerService = /** @class */ (function () {
            function DatepickerService() {
            }
            /**
            * Display the datepicker with specified options
            * @param elementId Html element Id of the datepicker input.
            * @param date The earliest date that may be selected; all earlier dates will be disabled. Optional.
            * @param language Language of the datepicker labels. Optional. default data-datepicker-language attribute
            */
            DatepickerService.renderDatepicker = function (elementId, minDate, language) {
                if (minDate === undefined) {
                    minDate = new Date();
                    minDate.setDate(minDate.getDate() + 1);
                }
                //By default, only french(fr) and english(en-CA) are supported.
                //To add more locales: https://github.com/uxsolutions/bootstrap-datepicker/tree/master/js/locales
                if (language === undefined) {
                    language = document.getElementsByTagName('html')[0].getAttribute('data-datepicker-language');
                }
                var options = { year: 'numeric', month: '2-digit', day: '2-digit', timezone: 'UTC' };
                $(elementId).datepicker({
                    format: 'yyyy/mm/dd',
                    // format: {
                    //     toDisplay: function (date, format, language) {
                    //         var d = new Date(date);
                    //         var utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
                    //         return utc.toLocaleDateString(culture, options);
                    //     },
                    //     toValue: function (date, format, language) {
                    //         var d = new Date(date);
                    //         //return new Date(d.toLocaleString(culture, options));
                    //         return d;
                    //     }
                    // },
                    startDate: minDate,
                    language: language,
                    todayBtn: true,
                    todayHighlight: true
                });
            };
            return DatepickerService;
        }());
        Composer.DatepickerService = DatepickerService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Utils/UrlHelper.ts' />
///<reference path='../Common/MembershipService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../Common/MyAccountStatus.ts' />
///<reference path='../MyAccount/MyAccountController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var CreateAccountController = /** @class */ (function (_super) {
            __extends(CreateAccountController, _super);
            function CreateAccountController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                return _this;
            }
            CreateAccountController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
            };
            CreateAccountController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.registerFormsForValidation(this.context.container.find('form'));
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.AccountCreated], function (e) { return _this.onAccountCreated(e); });
            };
            CreateAccountController.prototype.onAccountCreated = function (e) {
                var result = e.data;
                if (result.ReturnUrl) {
                    window.location.replace(decodeURIComponent(result.ReturnUrl));
                }
                else {
                    this.render('CreateAccount', result);
                }
            };
            CreateAccountController.prototype.createAccount = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                if (this.busyHandler && this.busyHandler.isLoading())
                    return;
                this.busyHandler = this.asyncBusy({ elementContext: actionContext.elementContext });
                var formData = this.getFormData(actionContext);
                var returnUrlQueryString = 'ReturnUrl=';
                var returnUrl = '';
                if (window.location.href.indexOf(returnUrlQueryString) > -1) {
                    returnUrl = Composer.urlHelper.getURLParameter(location.search, 'ReturnUrl');
                }
                this.membershipService.register(formData, returnUrl)
                    .then(function (result) { return _this.onRegisterFulfilled(result); }, function (reason) { return _this.renderFormErrorMessages(reason); })
                    .fin(function () { return _this.busyHandler.done(); })
                    .done();
            };
            CreateAccountController.prototype.onRegisterFulfilled = function (result) {
                this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.AccountCreated], { data: result });
                if (result.Status === Composer.MyAccountStatus[Composer.MyAccountStatus.Success]) {
                    this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn], { data: result });
                }
            };
            return CreateAccountController;
        }(Orckestra.Composer.MyAccountController));
        Composer.CreateAccountController = CreateAccountController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='../../Utils/UrlHelper.ts' />
///<reference path='../../JQueryPlugins/IParsleyJqueryPlugin.ts' />
///<reference path='../../Validation/IParsley.ts' />
///<reference path='../Common/CustomerService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../MyAccount/MyAccountController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var EditAddressController = /** @class */ (function (_super) {
            __extends(EditAddressController, _super);
            function EditAddressController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.customerService = new Composer.CustomerService(new Composer.CustomerRepository());
                return _this;
            }
            EditAddressController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
                var busy = this.asyncBusy({ msDelay: 300, loadingIndicatorSelector: '.loading-indicator-regions' });
                Composer.ComposerClient.get('/api/address/regions')
                    .then(function (regions) { return _this.rebuildRegionSelector(regions); })
                    .done(function () { return busy.done(); });
            };
            EditAddressController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.registerFormsForValidation(this.context.container.find('form'));
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.AddressCreated], function (e) { return _this.onAddressCreatedOrUpdated(e); });
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.AddressUpdated], function (e) { return _this.onAddressCreatedOrUpdated(e); });
            };
            EditAddressController.prototype.onAddressCreatedOrUpdated = function (e) {
                var result = e.data;
                if (result.ReturnUrl) {
                    window.location.replace(decodeURIComponent(result.ReturnUrl));
                }
                else {
                    this.render('EditAddress', result);
                    this.registerFormsForValidation(this.context.container.find('form'), {
                        serverValidationContainer: '[data-templateid="FormErrorMessages"]'
                    });
                }
            };
            /**
             * Rerender the region selector, keeping the currently selected value
             */
            EditAddressController.prototype.rebuildRegionSelector = function (regions) {
                var selectedRegion = this.context.container.find('[data-templateid="AddressRegionPicker"]').val();
                this.render('AddressRegionPicker', { Regions: regions, SelectedRegion: selectedRegion });
            };
            EditAddressController.prototype.adjustPostalCode = function (actionContext) {
                actionContext.elementContext.val(actionContext.elementContext.val().toUpperCase());
                _.every(this._formInstances, function (formInstance) { return formInstance.validate('shipping-based-on', true); });
            };
            EditAddressController.prototype.createAddress = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                var formData = this.getFormData(actionContext);
                var returnUrlQueryString = 'ReturnUrl=';
                var returnUrl = '';
                if (window.location.href.indexOf(returnUrlQueryString) > -1) {
                    returnUrl = Composer.urlHelper.getURLParameter(location.search, 'ReturnUrl');
                }
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.customerService.createAddress(formData, returnUrl)
                    .then(function (result) { return _this.onCreateAddressFulfilled(result); }, function (reason) { return _this.renderFormErrorMessages(reason); })
                    .fin(function () { return busy.done(); })
                    .done();
            };
            EditAddressController.prototype.onCreateAddressFulfilled = function (result) {
                this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.AddressCreated], { data: result });
            };
            EditAddressController.prototype.updateAddress = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                var formData = this.getFormData(actionContext);
                var addressId = this.context.container.find('[data-address-id]').data('address-id').toString();
                var returnUrlQueryString = 'ReturnUrl=';
                var returnUrl = '';
                if (window.location.href.indexOf(returnUrlQueryString) > -1) {
                    returnUrl = Composer.urlHelper.getURLParameter(location.search, 'ReturnUrl');
                }
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.customerService.updateAddress(formData, addressId, returnUrl)
                    .then(function (result) { return _this.onUpdateAddressFulfilled(result); }, function (reason) { return _this.renderFormErrorMessages(reason); })
                    .fin(function () { return busy.done(); })
                    .done();
            };
            EditAddressController.prototype.onUpdateAddressFulfilled = function (result) {
                this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.AddressUpdated], { data: result });
            };
            return EditAddressController;
        }(Orckestra.Composer.MyAccountController));
        Composer.EditAddressController = EditAddressController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../Common/MembershipService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../Common/MyAccountStatus.ts' />
///<reference path='../MyAccount/MyAccountController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ForgotPasswordController = /** @class */ (function (_super) {
            __extends(ForgotPasswordController, _super);
            function ForgotPasswordController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                return _this;
            }
            ForgotPasswordController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
            };
            ForgotPasswordController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.registerFormsForValidation(this.context.container.find('form'));
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.ForgotPasswordInstructionSent], function (e) { return _this.onForgotPasswordInstructionSent(e); });
            };
            ForgotPasswordController.prototype.onForgotPasswordInstructionSent = function (e) {
                var result = e.data;
                if (result.ReturnUrl) {
                    window.location.replace(decodeURIComponent(result.ReturnUrl));
                }
                else {
                    this.render('ForgotPassword', result);
                }
            };
            /**
             * Event triggered when submitting the forgot password form.
             * @param {IControllerActionContext} actionContext - Event context.
             */
            ForgotPasswordController.prototype.forgotPassword = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                if (this.busyHandler && this.busyHandler.isLoading())
                    return;
                this.busyHandler = this.asyncBusy({ elementContext: actionContext.elementContext });
                var formData = this.getFormData(actionContext);
                this.membershipService.forgotPassword(formData)
                    .then(function (result) { return _this.onForgotPasswordFulfilled(result); }, function (reason) { return _this.renderFormErrorMessages(reason); })
                    .fin(function () { return _this.busyHandler.done(); })
                    .done();
            };
            ForgotPasswordController.prototype.onForgotPasswordFulfilled = function (result) {
                this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.ForgotPasswordInstructionSent], { data: result });
            };
            return ForgotPasswordController;
        }(Orckestra.Composer.MyAccountController));
        Composer.ForgotPasswordController = ForgotPasswordController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='../Common/MembershipService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../MyAccount/MyAccountController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var NewPasswordController = /** @class */ (function (_super) {
            __extends(NewPasswordController, _super);
            function NewPasswordController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                return _this;
            }
            NewPasswordController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
            };
            NewPasswordController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.registerFormsForValidation(this.context.container.find('form'));
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.PasswordChanged], function (e) { return _this.onPasswordChanged(e); });
            };
            NewPasswordController.prototype.onPasswordChanged = function (e) {
                var result = e.data;
                if (result.ReturnUrl) {
                    window.location.replace(decodeURIComponent(result.ReturnUrl));
                }
                else {
                    this.render('NewPassword', result);
                }
            };
            /**
             * Event triggered when submitting the new password form.
             * @param {IControllerActionContext} actionContext - Event context.
             */
            NewPasswordController.prototype.newPassword = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                if (this.busyHandler && this.busyHandler.isLoading())
                    return;
                this.busyHandler = this.asyncBusy({ elementContext: actionContext.elementContext });
                var formData = this.getFormData(actionContext);
                var returnUrlQueryString = 'ReturnUrl=';
                var ticketQueryString = 'ticket=';
                var returnUrl = '';
                var ticket = '';
                if (window.location.href.indexOf(returnUrlQueryString) > -1) {
                    returnUrl = window.location.href.substring(window.location.href.indexOf(returnUrlQueryString)
                        + returnUrlQueryString.length);
                }
                if (window.location.href.indexOf(ticketQueryString) > -1) {
                    ticket = window.location.href.substring(window.location.href.indexOf(ticketQueryString)
                        + ticketQueryString.length);
                }
                this.membershipService.resetPassword(formData, ticket, returnUrl)
                    .then(function (result) { return _this.onResetPasswordFulfilled(result); }, function (reason) { return _this.renderFormErrorMessages(reason); })
                    .fin(function () { return _this.busyHandler.done(); })
                    .done();
            };
            NewPasswordController.prototype.onResetPasswordFulfilled = function (result) {
                this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.PasswordChanged], { data: result });
            };
            return NewPasswordController;
        }(Orckestra.Composer.MyAccountController));
        Composer.NewPasswordController = NewPasswordController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Mvc/ComposerClient.ts' />
///<reference path='../../../Cache/CacheProvider.ts' />
///<reference path='../../../Cache/CacheError.ts' />
///<reference path='../IWishListRepository.ts' />
///<reference path='./IWishListService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var WishListService = /** @class */ (function () {
            function WishListService(wishListRepository, eventHub) {
                this.cacheKey = 'WishListSummaryViewModel';
                this.cachePolicy = { slidingExpiration: 300 }; // 5min
                if (!wishListRepository) {
                    throw new Error('Error: wishListRepository is required');
                }
                if (!eventHub) {
                    throw new Error('Error: eventHub is required');
                }
                this.wishListRepository = wishListRepository;
                this.cacheProvider = Composer.CacheProvider.instance();
                this.eventHub = eventHub;
            }
            WishListService.prototype.getWishListSummary = function () {
                var _this = this;
                return this.getCacheWishListSummary()
                    .fail(function (reason) {
                    if (_this.canHandle(reason)) {
                        return _this.getFreshWishListSummary();
                    }
                    console.error('An error occured while getting the wishList from cache.', reason);
                    throw reason;
                });
            };
            WishListService.prototype.getFreshWishListSummary = function () {
                var _this = this;
                if (!WishListService.GettingFreshWishListSummary) {
                    WishListService.GettingFreshWishListSummary =
                        this.wishListRepository.getWishListSummary().then(function (wishList) { return _this.setWishListToCache(wishList); });
                }
                // to avoid getting a fresh wishlist multiple times within a page session
                return WishListService.GettingFreshWishListSummary
                    .fail(function (reason) {
                    console.error('An error occured while getting a fresh wish list.', reason);
                    throw reason;
                });
            };
            WishListService.prototype.redirectToSignIn = function () {
                var _this = this;
                return this.getSignInUrl().then(function (signInUrl) {
                    _this.clearCache();
                    window.location.href = signInUrl + '?ReturnUrl=' + window.location.href;
                });
            };
            WishListService.prototype.getSignInUrl = function () {
                return this.getWishListSummary()
                    .then(function (wishList) {
                    return wishList.SignInUrl;
                });
            };
            WishListService.prototype.getLineItem = function (productId, variantId) {
                return this.getWishListSummary().then(function (wishList) {
                    if (wishList && wishList.Items) {
                        return wishList.Items.filter(function (it) { return it.ProductId === productId && it.VariantId === variantId; })[0];
                    }
                    return null;
                });
            };
            WishListService.prototype.addLineItem = function (productId, variantId, quantity, recurringOrderFrequencyName, recurringOrderProgramName) {
                var _this = this;
                if (quantity === void 0) { quantity = 1; }
                var data = {
                    ProductId: productId,
                    VariantId: variantId,
                    Quantity: quantity
                };
                this.eventHub.publish(Composer.ProductEvents.WishListUpdating, { data: data });
                return this.wishListRepository.addLineItem(productId, variantId, quantity, recurringOrderFrequencyName, recurringOrderProgramName)
                    .then(function (wishList) { return _this.setWishListToCache(wishList); })
                    .then(function (wishList) {
                    _this.eventHub.publish(Composer.ProductEvents.WishListUpdated, { data: wishList });
                    return wishList;
                })
                    .fail(function (reason) {
                    _this.clearCache();
                    throw reason;
                });
            };
            WishListService.prototype.removeLineItem = function (lineItemId) {
                var _this = this;
                var data = {
                    LineItemId: lineItemId
                };
                this.eventHub.publish(Composer.ProductEvents.WishListUpdating, { data: data });
                return this.wishListRepository.deleteLineItem(lineItemId)
                    .then(function (wishList) { return _this.setWishListToCache(wishList); })
                    .then(function (wishList) {
                    _this.eventHub.publish(Composer.ProductEvents.WishListUpdated, { data: wishList });
                    return wishList;
                })
                    .fail(function (reason) {
                    _this.clearCache();
                    throw reason;
                });
            };
            WishListService.prototype.clearCache = function () {
                return this.cacheProvider.defaultCache.clear(this.cacheKey);
            };
            WishListService.prototype.getCacheWishListSummary = function () {
                return this.cacheProvider.defaultCache.get(this.cacheKey);
            };
            WishListService.prototype.setWishListToCache = function (wishList) {
                return this.cacheProvider.defaultCache.set(this.cacheKey, wishList, this.cachePolicy);
            };
            WishListService.prototype.canHandle = function (reason) {
                return reason === Composer.CacheError.Expired || reason === Composer.CacheError.NotFound;
            };
            return WishListService;
        }());
        Composer.WishListService = WishListService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Composer.Cart/WishList/WishListRepository.ts' />
///<reference path='../../Composer.Cart/WishList/Services/WishListService.ts' />
///<reference path='../../Composer.Cart/CartSummary/CartService.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var RecurringCartDetailsController = /** @class */ (function (_super) {
            __extends(RecurringCartDetailsController, _super);
            function RecurringCartDetailsController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RecurringCartDetailsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            return RecurringCartDetailsController;
        }(Orckestra.Composer.Controller));
        Composer.RecurringCartDetailsController = RecurringCartDetailsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='../Common/CustomerService.ts' />
///<reference path='../../Dto/AddressDto.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var RecurringCartAddressRegisteredService = /** @class */ (function () {
            function RecurringCartAddressRegisteredService(customerService) {
                this.customerService = customerService;
            }
            /**
            * Get the customer addresses. The selected billing/shipping address is taken from the cart by default.
            * If no address has been set in the cart, the selected billing/shipping address corresponds to the preferred address.
            */
            RecurringCartAddressRegisteredService.prototype.getRecurringCartAddresses = function (cart) {
                var _this = this;
                if (!cart) {
                    throw new Error('The cart is required');
                }
                return this.customerService.getRecurringCartAddresses(cart.Name)
                    .then(function (addresses) {
                    addresses.AddressesLoaded = true;
                    addresses.SelectedBillingAddressId = _this.getSelectedBillingAddressId(cart, addresses);
                    addresses.SelectedShippingAddressId = _this.getSelectedShippingAddressId(cart, addresses);
                    return addresses;
                });
            };
            RecurringCartAddressRegisteredService.prototype.getRecurringTemplateAddresses = function (id) {
                if (!id) {
                    throw new Error('The recurring schedule id is required');
                }
                return this.customerService.getRecurringTemplateAddresses(id)
                    .then(function (addresses) {
                    addresses.AddressesLoaded = true;
                    return addresses;
                });
            };
            RecurringCartAddressRegisteredService.prototype.getSelectedBillingAddressId = function (cart, addressList) {
                if (this.isBillingAddressFromCartValid(cart, addressList)) {
                    return cart.Payment.BillingAddress.Id;
                }
                return this.getPreferredBillingAddressId(addressList);
            };
            RecurringCartAddressRegisteredService.prototype.isBillingAddressFromCartValid = function (cart, addressList) {
                if (cart.Payment === undefined) {
                    return false;
                }
                if (cart.Payment.BillingAddress === undefined) {
                    return false;
                }
                return _.some(addressList.Addresses, function (address) { return address.Id === cart.Payment.BillingAddress.Id; });
            };
            RecurringCartAddressRegisteredService.prototype.getPreferredBillingAddressId = function (addressList) {
                var preferredBillingAddress = _.find(addressList.Addresses, function (address) { return address.IsPreferredBilling; });
                return preferredBillingAddress === undefined ? undefined : preferredBillingAddress.Id;
            };
            RecurringCartAddressRegisteredService.prototype.getSelectedShippingAddressId = function (cart, addressList) {
                if (this.isShippingAddressFromCartValid(cart, addressList)) {
                    return cart.ShippingAddress.Id;
                }
                return this.getPreferredShippingAddressId(addressList);
            };
            RecurringCartAddressRegisteredService.prototype.isShippingAddressFromCartValid = function (cart, addressList) {
                if (cart.ShippingAddress === undefined) {
                    return false;
                }
                return _.any(addressList.Addresses, function (address) { return address.Id === cart.ShippingAddress.Id; });
            };
            RecurringCartAddressRegisteredService.prototype.getPreferredShippingAddressId = function (addressList) {
                var preferredShippingAddress = _.find(addressList.Addresses, function (address) { return address.IsPreferredShipping; });
                return preferredShippingAddress === undefined ? undefined : preferredShippingAddress.Id;
            };
            return RecurringCartAddressRegisteredService;
        }());
        Composer.RecurringCartAddressRegisteredService = RecurringCartAddressRegisteredService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/IControllerContext.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='./IStoreService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var StoreService = /** @class */ (function () {
            function StoreService() {
            }
            StoreService.instance = function () {
                return StoreService._instance;
            };
            StoreService.prototype.getStores = function () {
                return Composer.ComposerClient.get('/api/store/stores');
            };
            StoreService._instance = new StoreService();
            return StoreService;
        }());
        Composer.StoreService = StoreService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path="../ViewModels/IActivePaymentViewModel.ts" />
///<reference path='./ICreateVaultTokenOptions.ts' />
///<reference path='./ISetDefaultCustomerPaymentMethodViewModel.ts' />
///<reference path='./IMonerisAddVaultProfileViewModel.ts' />
///<reference path='../ViewModels/IPaymentMethodViewModel.ts' />
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Mvc/ComposerClient.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var MonerisPaymentService = /** @class */ (function () {
            function MonerisPaymentService() {
            }
            /**
             * Adds a token from Moneris to the current payment.
             * @param  {ICreateVaultTokenOptions} request Request to add the Vault Token.
             * @return {Q.Promise<any>}                   Promise of the AJAX request.
             */
            MonerisPaymentService.prototype.addCreditCard = function (request) {
                return Composer.ComposerClient.post('/api/vaultprofile/addprofile', request);
            };
            MonerisPaymentService.prototype.setDefaultCustomerPaymentMethod = function (request) {
                return Composer.ComposerClient.put('/api/cart/setdefaultpaymentmethod', request);
            };
            MonerisPaymentService.prototype.removePaymentMethod = function (paymentMethodId, paymentProviderName) {
                return Composer.ComposerClient.remove('/api/payment/removemethod', {
                    PaymentMethodId: paymentMethodId,
                    PaymentProviderName: paymentProviderName
                });
            };
            MonerisPaymentService.prototype.removeRecurringCartPaymentMethod = function (paymentMethodId, paymentProviderName, cartName) {
                return Composer.ComposerClient.remove('/api/payment/recurringcartremovemethod', {
                    PaymentMethodId: paymentMethodId,
                    PaymentProviderName: paymentProviderName,
                    CartName: cartName
                });
            };
            return MonerisPaymentService;
        }());
        Composer.MonerisPaymentService = MonerisPaymentService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./RecurringCartDetailsController.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Services/RecurringOrderService.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Services/IRecurringOrderService.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Repositories/RecurringOrderRepository.ts' />
///<reference path='./RecurringCartAddressRegisteredService.ts' />
///<reference path='../../Composer.Store/Store/IStoreService.ts' />
///<reference path='../../Composer.Store/Store/StoreService.ts' />
///<reference path='../../UI/UIModal.ts' />
///<reference path='../../Composer.SingleCheckout/Payment/MonerisPaymentProvider/MonerisPaymentService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../Common/DatepickerService.ts' />
///<reference path='../../Utils/Utils.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var EditSection;
        (function (EditSection) {
            EditSection[EditSection["NextOccurence"] = 0] = "NextOccurence";
            EditSection[EditSection["ShippingMethod"] = 1] = "ShippingMethod";
            EditSection[EditSection["Address"] = 2] = "Address";
            EditSection[EditSection["Payment"] = 3] = "Payment";
        })(EditSection = Composer.EditSection || (Composer.EditSection = {}));
        //From Composer
        var ShippingMethodType;
        (function (ShippingMethodType) {
            ShippingMethodType[ShippingMethodType["Unspecified"] = 0] = "Unspecified";
            ShippingMethodType[ShippingMethodType["PickUp"] = 1] = "PickUp";
            ShippingMethodType[ShippingMethodType["Delivery"] = 2] = "Delivery";
            ShippingMethodType[ShippingMethodType["Shipping"] = 3] = "Shipping";
            ShippingMethodType[ShippingMethodType["ShipToStore"] = 4] = "ShipToStore";
        })(ShippingMethodType = Composer.ShippingMethodType || (Composer.ShippingMethodType = {}));
        var MyRecurringCartDetailsController = /** @class */ (function (_super) {
            __extends(MyRecurringCartDetailsController, _super);
            function MyRecurringCartDetailsController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.recurringOrderService = new Composer.RecurringOrderService(new Composer.RecurringOrderRepository(), _this.eventHub);
                _this.storeService = new Composer.StoreService();
                _this.paymentService = new Composer.MonerisPaymentService();
                _this.editNextOcurrence = false;
                _this.editShippingMethod = false;
                _this.editAddress = false;
                _this.editPayment = false;
                _this.originalShippingMethodType = '';
                _this.hasShippingMethodTypeChanged = false;
                _this.newShippingMethodType = undefined;
                _this.viewModelName = '';
                _this.updateWaitTime = 300;
                _this.modalElementSelector = '#confirmationModal';
                _this.customerService = new Composer.CustomerService(new Composer.CustomerRepository());
                _this.recurringCartAddressRegisteredService = new Composer.RecurringCartAddressRegisteredService(_this.customerService);
                return _this;
            }
            MyRecurringCartDetailsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.viewModelName = 'MyRecurringCartDetails';
                //console.log(this.context.viewModel);
                this.getRecurringCart();
                this.uiModal = new Composer.UIModal(window, this.modalElementSelector, this.deleteAddress, this);
                this.registerSubscriptions();
                this.window = window;
            };
            MyRecurringCartDetailsController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.AddressDeleted], function (e) { return _this.onAddressDeleted(e); });
            };
            MyRecurringCartDetailsController.prototype.getRecurringCart = function () {
                var _this = this;
                var nameUrlQueryString = 'name=';
                var cartName = '';
                if (window.location.href.indexOf(nameUrlQueryString) > -1) {
                    cartName = window.location.href.substring(window.location.href.indexOf(nameUrlQueryString)
                        + nameUrlQueryString.length);
                }
                var data = {
                    cartName: cartName
                };
                this.recurringOrderService.getRecurringCart(data)
                    .then(function (result) {
                    //console.log(result);
                    _this.viewModel = result;
                    _this.reRenderCartPage(result);
                })
                    .fail(function (reason) {
                    console.error(reason);
                });
            };
            MyRecurringCartDetailsController.prototype.toggleEditNextOccurence = function (actionContext) {
                var context = $('#btntoggleEditNextOccurence');
                this.editNextOcurrence = !this.editNextOcurrence;
                if (this.editNextOcurrence) {
                    this.closeOtherEditSections(actionContext, EditSection.NextOccurence);
                }
                var nextOccurence = context.data('next-occurence');
                var formatedNextOccurence = context.data('formated-next-occurence');
                var nextOccurenceValue = context.data('next-occurence-value');
                var total = context.data('total');
                var vm = {
                    EditMode: this.editNextOcurrence,
                    NextOccurence: nextOccurence,
                    FormatedNextOccurence: formatedNextOccurence,
                    NextOccurenceValue: nextOccurenceValue,
                    OrderSummary: {
                        Total: total
                    }
                };
                this.render('RecurringCartDetailsSummary', vm);
                Composer.DatepickerService.renderDatepicker('.datepicker');
            };
            MyRecurringCartDetailsController.prototype.saveEditNextOccurence = function (actionContext) {
                var _this = this;
                var context = actionContext.elementContext;
                var element = $('#NextOcurrence')[0];
                var newDate = element.value;
                var isValid = this.nextOcurrenceIsValid(newDate);
                if (isValid) {
                    var cartName = this.viewModel.Name;
                    var data = {
                        CartName: cartName,
                        NextOccurence: newDate
                    };
                    var busyHandle = this.asyncBusy();
                    this.recurringOrderService.updateLineItemsDate(data)
                        .then(function (viewModel) {
                        var hasMerged = viewModel.RescheduledCartHasMerged;
                        if (hasMerged) {
                            //Redirect to my orders
                            var url = viewModel.RecurringCartsUrl;
                            if (!_.isUndefined(url) && url.length > 0) {
                                _this.window.location.href = url;
                            }
                        }
                        else if (!_.isEmpty(viewModel)) {
                            //TODO refresh cart cache
                            // let currentCart;
                            // viewModel.RecurringOrderCartsViewModel.RecurringOrderCartViewModelList.forEach(cart => {
                            //     if (cart.Name === this.viewModel.Name) {
                            //         currentCart = cart;
                            //     }
                            // });
                            // if (currentCart) {
                            //     this.viewModel = currentCart;
                            //     console.log(currentCart);
                            //     this.reRenderCartPage(currentCart);
                            // }
                            _this.getRecurringCart();
                        }
                        busyHandle.done();
                    })
                        .fail(function (reason) {
                        console.error(reason);
                        busyHandle.done();
                    });
                }
                else {
                    console.error('Error: Invalid date while saving cart');
                    this.showError('InvalidDateSelected', "[data-templateid=\"RecurringCartDetailsSummary\"]");
                }
            };
            MyRecurringCartDetailsController.prototype.nextOcurrenceIsValid = function (value) {
                var newDate = this.convertDateToUTC(new Date(Date.parse(value)));
                var today = this.convertDateToUTC(new Date(new Date().setHours(0, 0, 0, 0)));
                if (newDate > today) {
                    return true;
                }
                return false;
            };
            MyRecurringCartDetailsController.prototype.convertDateToUTC = function (date) {
                return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
            };
            MyRecurringCartDetailsController.prototype.toggleEditShippingMethod = function (actionContext) {
                var _this = this;
                var context = $('#btntoggleEditShippingMethod');
                this.editShippingMethod = !this.editShippingMethod;
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.render('RecurringCartDetailsShippingMethod', { IsLoading: true });
                var shippingMethodDisplayName = context.data('shipping-method-display-name');
                var shippingMethodCost = context.data('shipping-method-cost');
                var shippingMethodName = context.data('selected-shipping-method-name');
                var shippingMethodFulfillmentType = context.data('selected-shipping-method-fulfillment-type');
                var originalShippingMethodName = context.data('original-selected-shipping-method-name');
                var originalShippingMethodFulfillmentType = context.data('original-selected-shipping-method-fulfillment-type');
                //TODO : manage changing type
                //
                this.originalShippingMethodType = originalShippingMethodFulfillmentType;
                if (this.editShippingMethod) {
                    this.closeOtherEditSections(actionContext, EditSection.ShippingMethod);
                    this.getShippingMethods(this.viewModel.Name)
                        .then(function (shippingMethods) {
                        if (!shippingMethods) {
                            throw new Error('No viewModel received');
                        }
                        if (_.isEmpty(shippingMethods.ShippingMethods)) {
                            throw new Error('No shipping method was found.');
                        }
                        var selectedShippingMethodName = shippingMethodName;
                        shippingMethods.ShippingMethods.forEach(function (shippingMethod) {
                            if (shippingMethod.Name === selectedShippingMethodName) {
                                shippingMethods.SelectedShippingProviderId = shippingMethod.ShippingProviderId;
                            }
                        });
                        var vm = {
                            EditMode: _this.editShippingMethod,
                            ShippingMethods: shippingMethods,
                            SelectedMethod: selectedShippingMethodName,
                            ShippingMethod: {
                                DisplayName: shippingMethodDisplayName,
                                Cost: shippingMethodCost,
                                Name: shippingMethodName,
                                FulfillmentMethodTypeString: shippingMethodFulfillmentType
                            }
                        };
                        _this.render('RecurringCartDetailsShippingMethod', vm);
                        busy.done();
                    });
                }
                else {
                    if (this.hasShippingMethodTypeChanged) {
                        shippingMethodDisplayName = context.data('shipping-method-display-name-tmp');
                        shippingMethodCost = context.data('shipping-method-cost-tmp');
                        shippingMethodName = context.data('selected-shipping-method-name-tmp');
                        shippingMethodFulfillmentType = context.data('selected-shipping-method-fulfillment-type-tmp');
                    }
                    var vm = {
                        EditMode: this.editShippingMethod,
                        ShippingMethod: {
                            DisplayName: shippingMethodDisplayName,
                            Cost: shippingMethodCost,
                            Name: shippingMethodName,
                            FulfillmentMethodTypeString: shippingMethodFulfillmentType
                        }
                    };
                    this.render('RecurringCartDetailsShippingMethod', vm);
                    busy.done();
                }
            };
            MyRecurringCartDetailsController.prototype.closeOtherEditSections = function (actionContext, type) {
                if (this.editNextOcurrence && type !== EditSection.NextOccurence) {
                    this.toggleEditNextOccurence(actionContext);
                }
                if (this.editShippingMethod && type !== EditSection.ShippingMethod) {
                    this.toggleEditShippingMethod(actionContext);
                }
                if (this.editAddress && type !== EditSection.Address) {
                    this.toggleEditAddress(actionContext);
                }
                if (this.editPayment && type !== EditSection.Payment) {
                    this.toggleEditPayment(actionContext);
                }
            };
            MyRecurringCartDetailsController.prototype.resetEditToggleFlags = function () {
                this.editNextOcurrence = false;
                this.editShippingMethod = false;
                this.editAddress = false;
                this.editPayment = false;
            };
            MyRecurringCartDetailsController.prototype.getShippingMethods = function (cartName) {
                var param = {
                    CartName: cartName
                };
                return this.recurringOrderService.getCartShippingMethods(param)
                    .fail(function (reason) {
                    console.error('Error while retrieving shipping methods', reason);
                });
            };
            MyRecurringCartDetailsController.prototype.saveEditShippingMethod = function (actionContext) {
                var element = $('#ShippingMethod').find('input[name=ShippingMethod]:checked')[0];
                if (_.isUndefined(element)) {
                    console.error('Error: Missing shipping method');
                    this.showError('RecurringCartShippingMethodMissing', "[data-templateid=\"RecurringCartDetailsShippingMethod\"]");
                    return;
                }
                var newType = element.dataset['fulfillmentMethodType'];
                this.manageSaveShippingMethod(newType, actionContext);
            };
            MyRecurringCartDetailsController.prototype.methodSelected = function (actionContext) {
                var shippingProviderId = actionContext.elementContext.data('shipping-provider-id');
                $('#ShippingProviderId').val(shippingProviderId.toString());
            };
            MyRecurringCartDetailsController.prototype.manageSaveShippingMethod = function (newType, actionContext) {
                //When shipping method is changed from ship to store and ship to home, address must correspond to
                //store adress/home address.
                //When the type change, we wait to save shipping method and open adresse section. Then, when saving valid address,
                //also save the shipping method.
                //When cancel in one of the two steps, revert to original values.
                //If saving shipping method and the method type doesn't change, save immediatly.
                var _this = this;
                //TODO: This fulfillment type management is ON HOLD. Directly save shipping method.
                //this.hasShippingMethodTypeChanged = this.originalShippingMethodType !== newType;
                this.hasShippingMethodTypeChanged = false;
                var shippingProviderId = $('#ShippingProviderId').val();
                var element = $('#ShippingMethod').find('input[name=ShippingMethod]:checked');
                var shippingMethodName = element.val();
                var shippingMethodCost = element.data('shipping-method-cost');
                var shippingMethodDisplayName = element.data('shipping-method-display-name');
                var shippingMethodFulfillmentType = element.data('selected-shipping-method-fulfillment-type');
                if (this.hasShippingMethodTypeChanged) {
                    var btnEditShippingMethod = $('#btntoggleEditShippingMethod');
                    btnEditShippingMethod.data('shipping-method-display-name-tmp', shippingMethodDisplayName);
                    btnEditShippingMethod.data('shipping-method-cost-tmp', shippingMethodCost);
                    btnEditShippingMethod.data('selected-shipping-method-name-tmp', shippingMethodName);
                    btnEditShippingMethod.data('selected-shipping-method-fulfillment-type-tmp', shippingMethodFulfillmentType);
                    if (newType === ShippingMethodType.Shipping) {
                        //TODO
                        //Toggle addresses with Get customer Addresses
                        this.newShippingMethodType = ShippingMethodType.Shipping;
                    }
                    else if (newType === 'ShipToStore') {
                        //TODO
                        //Toggle addresses with Get store Addresses
                        this.newShippingMethodType = ShippingMethodType.ShipToStore;
                    }
                    this.toggleEditAddress(actionContext);
                }
                else {
                    //Do the save
                    var cartName = this.viewModel.Name;
                    var data = {
                        shippingProviderId: shippingProviderId,
                        shippingMethodName: shippingMethodName,
                        cartName: cartName
                    };
                    if (_.isUndefined(shippingProviderId) || _.isUndefined(shippingMethodName)) {
                        console.error('Error: Missing shipping method');
                        this.showError('RecurringCartShippingMethodMissing', "[data-templateid=\"RecurringCartDetailsShippingMethod\"]");
                        return;
                    }
                    var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                    this.recurringOrderService.updateCartShippingMethod(data)
                        .then(function (result) {
                        _this.reRenderCartPage(result);
                    })
                        .fail(function (reason) {
                        console.error('Error: Error while saving shipping method', reason);
                        _this.showError('RecurringCartShippingMethodUpdateFailed', "[data-templateid=\"RecurringCartDetailsShippingMethod\"]");
                    })
                        .fin(function () { return busy.done(); });
                }
            };
            MyRecurringCartDetailsController.prototype.reRenderCartPage = function (vm) {
                this.resetEditToggleFlags();
                this.viewModel = vm;
                this.render(this.viewModelName, vm);
            };
            MyRecurringCartDetailsController.prototype.toggleEditAddress = function (actionContext) {
                var _this = this;
                this.editAddress = !this.editAddress;
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.render('RecurringCartDetailsAddress', { IsLoading: true });
                if (this.editAddress) {
                    this.closeOtherEditSections(actionContext, EditSection.Address);
                    if (!this.newShippingMethodType || (this.newShippingMethodType === ShippingMethodType.Shipping)) {
                        this.recurringCartAddressRegisteredService.getRecurringCartAddresses(this.viewModel)
                            .then(function (addressesVm) {
                            addressesVm.EditMode = _this.editAddress;
                            addressesVm.Payment = {
                                BillingAddress: {
                                    UseShippingAddress: _this.viewModel.Payment.BillingAddress.UseShippingAddress
                                }
                            };
                            _this.render('RecurringCartDetailsAddress', addressesVm);
                        })
                            .fin(function () { return busy.done(); });
                    }
                    else {
                        this.storeService.getStores()
                            .then(function (storesVm) {
                            //console.log(storesVm);
                            //TODO: Open adresse with list of stores
                        })
                            .fin(function () { return busy.done(); });
                    }
                }
                else {
                    this.render('RecurringCartDetailsAddress', this.viewModel);
                    if (this.hasShippingMethodTypeChanged) {
                        this.hasShippingMethodTypeChanged = false;
                        this.newShippingMethodType = '';
                        this.render('RecurringCartDetailsShippingMethod', this.viewModel);
                    }
                    busy.done();
                }
            };
            MyRecurringCartDetailsController.prototype.saveEditAddress = function (actionContext) {
                //If shipping method type has changed, save address and shipping method
                var _this = this;
                var shippingAddressId = $(this.context.container).find('input[name=ShippingAddressId]:checked').val();
                var billingAddressId = $(this.context.container).find('input[name=BillingAddressId]:checked').val();
                var useSameForShippingAndBilling = $(this.context.container).find('input[name=UseShippingAddress]:checked').val();
                var cartName = this.viewModel.Name;
                if (_.isUndefined(shippingAddressId)) {
                    console.error('Error: Missing shipping address');
                    this.showError('RecurringCartShippingAddressMissing', "[data-templateid=\"RecurringCartDetailsAddress\"]");
                    return;
                }
                var data = {
                    shippingAddressId: shippingAddressId,
                    billingAddressId: null,
                    cartName: cartName,
                    useSameForShippingAndBilling: useSameForShippingAndBilling
                };
                var useSameBool = Boolean(JSON.parse(useSameForShippingAndBilling));
                if (!useSameBool) {
                    data.billingAddressId = billingAddressId;
                }
                if (!useSameBool && _.isUndefined(billingAddressId)) {
                    console.error('Error: Missing billing address');
                    this.showError('RecurringCartBillingAddressMissing', "[data-templateid=\"RecurringCartDetailsAddress\"]");
                    return;
                }
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.recurringOrderService.updateCartShippingAddress(data)
                    .then(function (result) {
                    //console.log(result);
                    if (_this.hasShippingMethodTypeChanged) {
                        _this.hasShippingMethodTypeChanged = false;
                    }
                    _this.viewModel = result;
                    _this.reRenderCartPage(result);
                })
                    .fail(function (reason) {
                    console.error('Error: Error while saving addresses', reason);
                    _this.showError('RecurringCartAddressesUpdateFailed', "[data-templateid=\"RecurringCartDetailsAddress\"]");
                })
                    .fin(function () { return busy.done(); });
            };
            MyRecurringCartDetailsController.prototype.useShippingAddress = function () {
                var useShippingAddress = $(this.context.container).find('input[name=UseShippingAddress]:checked').val() === 'true';
                return useShippingAddress;
            };
            MyRecurringCartDetailsController.prototype.changeUseShippingAddress = function () {
                this.setBillingAddressFormVisibility();
                this.setSelectedBillingAddress();
                //TODO: form validation?
            };
            MyRecurringCartDetailsController.prototype.setBillingAddressFormVisibility = function () {
                var useShippingAddress = this.useShippingAddress();
                if (useShippingAddress) {
                    $('#BillingAddressContent').addClass('hide');
                }
                else {
                    $('#BillingAddressContent').removeClass('hide');
                }
            };
            MyRecurringCartDetailsController.prototype.setSelectedBillingAddress = function () {
                var selectedBillingAddressId = $(this.context.container).find('input[name=BillingAddressId]:checked').val();
                if (!selectedBillingAddressId) {
                    return;
                }
            };
            MyRecurringCartDetailsController.prototype.toggleEditPayment = function (actionContext) {
                var _this = this;
                this.editPayment = !this.editPayment;
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.render('RecurringCartDetailsPayment', { IsLoading: true });
                if (this.editPayment) {
                    this.closeOtherEditSections(actionContext, EditSection.Payment);
                    var data = {
                        cartName: this.viewModel.Name
                    };
                    this.recurringOrderService.getCartPaymentMethods(data)
                        .then(function (result) {
                        result.EditMode = _this.editPayment;
                        _this.render('RecurringCartDetailsPayment', result);
                    })
                        .fin(function () { return busy.done(); });
                }
                else {
                    this.render('RecurringCartDetailsPayment', this.viewModel);
                    busy.done();
                }
            };
            MyRecurringCartDetailsController.prototype.updateLineItem = function (actionContext) {
                var _this = this;
                if (!this.debounceUpdateLineItem) {
                    this.debounceUpdateLineItem =
                        _.debounce(function (args) {
                            return _this.applyUpdateLineItemQuantity(args);
                        }, this.updateWaitTime);
                }
                var context = actionContext.elementContext;
                var cartQuantityElement = actionContext.elementContext
                    .parents('.cart-item')
                    .find('.cart-quantity');
                var incrementButtonElement = actionContext.elementContext
                    .parents('.cart-item')
                    .find('.increment-quantity');
                var decrementButtonElement = actionContext.elementContext
                    .parents('.cart-item')
                    .find('.decrement-quantity');
                var action = context.data('action');
                var currentQuantity = parseInt(cartQuantityElement.text(), 10);
                var frequencyName = context.data('recurringorderfrequencyname');
                var programName = context.data('recurringorderprogramname');
                var updatedQuantity = this.updateQuantity(action, currentQuantity);
                var quantity = parseInt(context.data('quantity'), 10);
                updatedQuantity === 1 ? decrementButtonElement.attr('disabled', 'disabled') : decrementButtonElement.removeAttr('disabled');
                //updatedQuantity === 99 ? incrementButtonElement.attr('disabled', 'disabled') : incrementButtonElement.removeAttr('disabled');
                cartQuantityElement.text(updatedQuantity);
                var cartName = this.viewModel.Name;
                var args = {
                    actionContext: actionContext,
                    context: context,
                    cartQuantityElement: cartQuantityElement,
                    cartName: cartName,
                    frequencyName: frequencyName,
                    programName: programName
                };
                if (quantity !== updatedQuantity) {
                    //use only debounced function when incrementing/decrementing quantity
                    this.debounceUpdateLineItem(args);
                }
            };
            MyRecurringCartDetailsController.prototype.applyUpdateLineItemQuantity = function (args) {
                var _this = this;
                var context = args.actionContext.elementContext;
                var busy = this.asyncBusy({ elementContext: args.actionContext.elementContext });
                var actionElementSpan = args.context.find('span.fa').not('.loading-indicator');
                var updateLineItemQuantityParam = {
                    lineItemId: args.context.data('lineitemid'),
                    quantity: Number(args.cartQuantityElement.text()),
                    cartName: args.cartName,
                    recurringProgramName: args.programName,
                    recurringFrequencyName: args.frequencyName
                };
                args.cartQuantityElement.parents('.cart-item').addClass('is-loading');
                actionElementSpan.hide();
                this.recurringOrderService.updateLineItemQuantity(updateLineItemQuantityParam)
                    .then(function (result) {
                    args.cartQuantityElement.parents('.cart-item').removeClass('is-loading');
                    actionElementSpan.show();
                    _this.reRenderCartPage(result);
                })
                    .fail(function (reason) { return _this.onLineItemQuantityFailed(context, reason); })
                    .fin(function () { return busy.done(); });
            };
            MyRecurringCartDetailsController.prototype.onLineItemQuantityFailed = function (context, reason) {
                console.error('Error while updating line item quantity.', reason);
                this.showError('LineItemQuantityFailed', "[data-templateid=\"RecurringCartContent\"]");
            };
            MyRecurringCartDetailsController.prototype.updateQuantity = function (action, quantity) {
                if (!action) {
                    return quantity;
                }
                switch (action.toUpperCase()) {
                    case 'INCREMENT':
                        quantity++;
                        break;
                    case 'DECREMENT':
                        quantity--;
                        if (quantity < 1) {
                            quantity = 1;
                        }
                        break;
                }
                return quantity;
            };
            MyRecurringCartDetailsController.prototype.deleteLineItem = function (actionContext) {
                var _this = this;
                var context = actionContext.elementContext;
                var lineItemId = context.data('lineitemid');
                var productId = context.attr('data-productid');
                context.closest('.cart-row').addClass('is-loading');
                var cartName = this.viewModel.Name;
                var deleteLineItemParam = {
                    lineItemId: lineItemId,
                    cartName: cartName
                };
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.recurringOrderService.deleteLineItem(deleteLineItemParam)
                    .then(function (result) {
                    _this.reRenderCartPage(result);
                    //TODO: Manage if last item?
                    //Deleting the last recurring item will reschedule the cartName to the line item next occurence
                })
                    .fail(function (reason) { return _this.onLineItemDeleteFailed(context, reason); })
                    .fin(function () { return busy.done(); });
            };
            MyRecurringCartDetailsController.prototype.onLineItemDeleteFailed = function (context, reason) {
                console.error('Error while deleting line item.', reason);
                context.closest('.cart-row').removeClass('is-loading');
                this.showError('LineItemDeleteFailed', "[data-templateid=\"RecurringCartContent\"]");
            };
            MyRecurringCartDetailsController.prototype.deleteAddressConfirm = function (actionContext) {
                this.uiModal.openModal(actionContext.event);
            };
            /**
           * Requires the element in action context to have a data-address-id.
           */
            MyRecurringCartDetailsController.prototype.deleteAddress = function (event) {
                var _this = this;
                var element = $(event.target);
                var $addressListItem = element.closest('[data-address-id]');
                var addressId = $addressListItem.data('address-id');
                var busy = this.asyncBusy({ elementContext: element, containerContext: $addressListItem });
                return this.customerService.deleteAddress(addressId, '')
                    .then(function (result) {
                    _this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.AddressDeleted], { data: addressId });
                    //this.reRenderCartPage(this.viewModel);
                })
                    .fin(function () { return busy.done(); });
            };
            MyRecurringCartDetailsController.prototype.onAddressDeleted = function (e) {
                var addressId = e.data;
                var $addressListItem = $(this.context.container).find('[data-address-id=' + addressId + ']');
                $addressListItem.remove();
            };
            MyRecurringCartDetailsController.prototype.saveEditPayment = function (actionContext) {
                var _this = this;
                var paymentMethodId = $(this.context.container).find('input[name=PaymentMethod]:checked').val();
                var cartName = this.viewModel.Name;
                var paymentProviderName = $(this.context.container).find('input[name=PaymentMethod]:checked').data('payment-provider');
                var paymentId = $(this.context.container).find('input[name=PaymentId]:checked').data('payment-id');
                var paymentType = $(this.context.container).find('input[name=PaymentMethod]:checked').data('payment-type');
                var data = {
                    paymentMethodId: paymentMethodId,
                    paymentProviderName: paymentProviderName,
                    cartName: cartName,
                    paymentId: paymentId,
                    paymentType: paymentType
                };
                if (_.isUndefined(paymentId)) {
                    console.error('Error: Missing payment method');
                    this.showError('RecurringCartPaymentMissing', "[data-templateid=\"RecurringCartDetailsPayment\"]");
                    return;
                }
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this.recurringOrderService.updateCartPaymentMethod(data)
                    .then(function (result) {
                    //console.log(result);
                    _this.viewModel = result;
                    _this.reRenderCartPage(result);
                })
                    .fail(function (reason) {
                    console.error('Error: Error while saving payment', reason);
                    _this.showError('RecurringCartPaymentUpdateFailed', "[data-templateid=\"RecurringCartDetailsPayment\"]");
                })
                    .fin(function () { return busy.done(); });
            };
            MyRecurringCartDetailsController.prototype.releaseBusyHandler = function () {
                if (this.busyHandler) {
                    this.busyHandler.done();
                    this.busyHandler = null;
                }
            };
            MyRecurringCartDetailsController.prototype.showError = function (errorCode, parentSelector) {
                var localization = Composer.LocalizationProvider.instance().getLocalizedString('Errors', "L_" + errorCode);
                var error = {
                    ErrorCode: errorCode,
                    LocalizedErrorMessage: localization
                };
                var errorCollection = {
                    Errors: []
                };
                if (error) {
                    errorCollection.Errors.push(error);
                }
                this.render('FormErrorMessages', errorCollection, parentSelector);
                //Scroll to the error message if there's one
                if (errorCollection && errorCollection.Errors && errorCollection.Errors.length > 0) {
                    Composer.Utils.scrollToElement($('[data-templateid="FormErrorMessages"]:has(div)'));
                }
            };
            return MyRecurringCartDetailsController;
        }(Orckestra.Composer.RecurringCartDetailsController));
        Composer.MyRecurringCartDetailsController = MyRecurringCartDetailsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Composer.Cart/WishList/WishListRepository.ts' />
///<reference path='../../Composer.Cart/WishList/Services/WishListService.ts' />
///<reference path='../../Composer.Cart/CartSummary/CartService.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var RecurringCartsController = /** @class */ (function (_super) {
            __extends(RecurringCartsController, _super);
            function RecurringCartsController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RecurringCartsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            return RecurringCartsController;
        }(Orckestra.Composer.Controller));
        Composer.RecurringCartsController = RecurringCartsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./RecurringCartsController.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Services/RecurringOrderService.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Repositories/RecurringOrderRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var MyRecurringCartsController = /** @class */ (function (_super) {
            __extends(MyRecurringCartsController, _super);
            function MyRecurringCartsController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.recurringOrderService = new Composer.RecurringOrderService(new Composer.RecurringOrderRepository(), _this.eventHub);
                return _this;
            }
            MyRecurringCartsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.getUpcomingOrders();
            };
            MyRecurringCartsController.prototype.getUpcomingOrders = function () {
                var _this = this;
                var busyHandle = this.asyncBusy();
                this.recurringOrderService.getRecurringOrderCartsByUser()
                    .done(function (viewModel) {
                    if (!_.isEmpty(viewModel)) {
                        _this.render('MyRecurringCarts', viewModel);
                    }
                    busyHandle.done();
                }, function (reason) {
                    console.error(reason);
                    busyHandle.done();
                });
            };
            return MyRecurringCartsController;
        }(Orckestra.Composer.RecurringCartsController));
        Composer.MyRecurringCartsController = MyRecurringCartsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Composer.Cart/WishList/WishListRepository.ts' />
///<reference path='../../Composer.Cart/WishList/Services/WishListService.ts' />
///<reference path='../../Composer.Cart/CartSummary/CartService.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var RecurringScheduleController = /** @class */ (function (_super) {
            __extends(RecurringScheduleController, _super);
            function RecurringScheduleController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RecurringScheduleController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            return RecurringScheduleController;
        }(Orckestra.Composer.Controller));
        Composer.RecurringScheduleController = RecurringScheduleController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./RecurringScheduleController.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Services/RecurringOrderService.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Services/IRecurringOrderService.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Repositories/RecurringOrderRepository.ts' />
///<reference path='../../UI/UIModal.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var MyRecurringScheduleController = /** @class */ (function (_super) {
            __extends(MyRecurringScheduleController, _super);
            function MyRecurringScheduleController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.recurringOrderService = new Composer.RecurringOrderService(new Composer.RecurringOrderRepository(), _this.eventHub);
                _this.updateWaitTime = 300;
                _this.viewModelName = '';
                _this.modalElementSelectorRemove = '#recurringOrderTemplateRemoveConfirmationModal';
                return _this;
            }
            MyRecurringScheduleController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.viewModelName = 'MyRecurringSchedule';
                this.uiModalConfirmRemove = new Composer.UIModal(window, this.modalElementSelectorRemove, this.deleteLineItem, this);
                this.window = window;
            };
            MyRecurringScheduleController.prototype.updateLineItemQuantity = function (actionContext) {
                var _this = this;
                if (!this.debounceUpdateLineItem) {
                    this.debounceUpdateLineItem =
                        _.debounce(function (args) {
                            return _this.applyUpdateLineItemQuantity(args);
                        }, this.updateWaitTime);
                }
                var context = actionContext.elementContext;
                var cartQuantityElement = actionContext.elementContext
                    .parents('.cart-item')
                    .find('.cart-quantity-template');
                var incrementButtonElement = actionContext.elementContext
                    .parents('.cart-item')
                    .find('.increment-quantity');
                var decrementButtonElement = actionContext.elementContext
                    .parents('.cart-item')
                    .find('.decrement-quantity');
                var action = context.data('action');
                var currentQuantity = parseInt(cartQuantityElement.text(), 10);
                var updatedQuantity = this.updateQuantity(action, currentQuantity);
                var quantity = parseInt(context.data('quantity'), 10);
                updatedQuantity === 1 ? decrementButtonElement.attr('disabled', 'disabled') : decrementButtonElement.removeAttr('disabled');
                //updatedQuantity === 99 ? incrementButtonElement.attr('disabled', 'disabled') : incrementButtonElement.removeAttr('disabled');
                cartQuantityElement.text(updatedQuantity);
                var args = {
                    actionContext: actionContext,
                    context: context,
                    cartQuantityElement: cartQuantityElement
                };
                if (quantity !== updatedQuantity) {
                    //use only debounced function when incrementing/decrementing quantity
                    this.debounceUpdateLineItem(args);
                }
            };
            MyRecurringScheduleController.prototype.applyUpdateLineItemQuantity = function (args) {
                var _this = this;
                var context = args.actionContext.elementContext;
                this.busyHandler = this.asyncBusy({ elementContext: args.actionContext.elementContext });
                var actionElementSpan = args.context.find('span.fa').not('.loading-indicator');
                var updateLineItemQuantityParam = {
                    lineItemId: args.cartQuantityElement.data('lineitemid'),
                    quantity: Number(args.cartQuantityElement.text())
                };
                args.cartQuantityElement.parents('.cart-item').addClass('is-loading');
                actionElementSpan.hide();
                this.recurringOrderService.updateTemplateLineItemQuantity(updateLineItemQuantityParam)
                    .then(function (result) {
                    args.cartQuantityElement.parents('.cart-item').removeClass('is-loading');
                    actionElementSpan.show();
                    //render only section?
                    _this.reRenderPage(result);
                })
                    .fail(function (reason) { return _this.onLineItemQuantityFailed(context, reason); })
                    .fin(function () { return _this.releaseBusyHandler(); });
            };
            MyRecurringScheduleController.prototype.onLineItemQuantityFailed = function (context, reason) {
                console.error('Error while updating line item quantity.', reason);
                Composer.ErrorHandler.instance().outputErrorFromCode('LineItemQuantityFailed');
            };
            MyRecurringScheduleController.prototype.updateQuantity = function (action, quantity) {
                if (!action) {
                    return quantity;
                }
                switch (action.toUpperCase()) {
                    case 'INCREMENT':
                        quantity++;
                        break;
                    case 'DECREMENT':
                        quantity--;
                        if (quantity < 1) {
                            quantity = 1;
                        }
                        break;
                }
                return quantity;
            };
            MyRecurringScheduleController.prototype.releaseBusyHandler = function () {
                if (this.busyHandler) {
                    this.busyHandler.done();
                    this.busyHandler = null;
                }
            };
            MyRecurringScheduleController.prototype.reRenderPage = function (vm) {
                //this.viewModel = vm;
                this.render(this.viewModelName, vm);
            };
            MyRecurringScheduleController.prototype.deleteLineItemConfirm = function (actionContext) {
                this.uiModalConfirmRemove.openModal(actionContext.event);
            };
            MyRecurringScheduleController.prototype.deleteLineItem = function (event) {
                var _this = this;
                var element = $(event.target);
                var $listItem = element.closest('[data-lineitemid]');
                var lineItemId = $listItem.data('lineitemid');
                var deleteLineItemsParam = {
                    lineItemId: lineItemId
                };
                this.busyHandler = this.asyncBusy({ elementContext: element, containerContext: $listItem });
                return this.recurringOrderService.deleteTemplateLineItem(deleteLineItemsParam)
                    .then(function (result) {
                    $('#recurringOrderTemplatesRemoveConfirm').modal('hide');
                    _this.reRenderPage(result);
                }).fin(function () { return _this.releaseBusyHandler(); });
            };
            MyRecurringScheduleController.prototype.editDetailsClick = function (actionContext) {
                var element = actionContext.elementContext[0];
                var url = element.dataset['href'];
                this.window.location.href = url;
            };
            return MyRecurringScheduleController;
        }(Orckestra.Composer.RecurringScheduleController));
        Composer.MyRecurringScheduleController = MyRecurringScheduleController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Composer.Cart/WishList/WishListRepository.ts' />
///<reference path='../../Composer.Cart/WishList/Services/WishListService.ts' />
///<reference path='../../Composer.Cart/CartSummary/CartService.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var RecurringScheduleDetailsController = /** @class */ (function (_super) {
            __extends(RecurringScheduleDetailsController, _super);
            function RecurringScheduleDetailsController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RecurringScheduleDetailsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            return RecurringScheduleDetailsController;
        }(Orckestra.Composer.Controller));
        Composer.RecurringScheduleDetailsController = RecurringScheduleDetailsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./RecurringScheduleDetailsController.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Services/RecurringOrderService.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Services/IRecurringOrderService.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Repositories/RecurringOrderRepository.ts' />
///<reference path='../../ErrorHandling/ErrorHandler.ts' />
///<reference path='../Common/DatepickerService.ts' />
///<reference path='../../Utils/Utils.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var MyRecurringScheduleDetailsController = /** @class */ (function (_super) {
            __extends(MyRecurringScheduleDetailsController, _super);
            function MyRecurringScheduleDetailsController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.recurringOrderService = new Composer.RecurringOrderService(new Composer.RecurringOrderRepository(), _this.eventHub);
                _this.viewModelName = '';
                _this.id = '';
                _this.modalElementSelector = '#confirmationModal';
                _this.customerService = new Composer.CustomerService(new Composer.CustomerRepository());
                _this.recurringCartAddressRegisteredService = new Composer.RecurringCartAddressRegisteredService(_this.customerService);
                return _this;
            }
            MyRecurringScheduleDetailsController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.viewModelName = 'MyRecurringScheduleDetails';
                this.window = window;
                this.getRecurringTemplateDetail();
                this.uiModal = new Composer.UIModal(window, this.modalElementSelector, this.deleteAddress, this);
            };
            MyRecurringScheduleDetailsController.prototype.getRecurringTemplateDetail = function () {
                var _this = this;
                var nameUrlQueryString = 'id=';
                var id = '';
                if (window.location.href.indexOf(nameUrlQueryString) > -1) {
                    id = window.location.href.substring(window.location.href.indexOf(nameUrlQueryString)
                        + nameUrlQueryString.length);
                }
                this.recurringOrderService.getRecurringTemplateDetail(id)
                    .then(function (result) {
                    //console.log(result);
                    _this.viewModel = result;
                    _this.id = id;
                    _this.reRenderPage(result.RecurringOrderTemplateLineItemViewModels[0]);
                })
                    .fail(function (reason) {
                    console.error(reason);
                });
            };
            MyRecurringScheduleDetailsController.prototype.getAvailableEditList = function () {
                this.getAddresses();
                this.getShippingMethodsList();
                this.getPaymentMethods();
            };
            MyRecurringScheduleDetailsController.prototype.reRenderPage = function (vm) {
                //this.viewModel = vm;
                Composer.ErrorHandler.instance().removeErrors();
                this.render(this.viewModelName, vm);
                //Scroll to success message if visible
                Composer.Utils.scrollToElement($('[data-templateid="RecurringScheduleDetailsUpdateSuccessful"]:has(div)'));
                this.getAvailableEditList();
                Composer.DatepickerService.renderDatepicker('.datepicker');
            };
            MyRecurringScheduleDetailsController.prototype.renderShippingMethods = function (vm) {
                this.render('RecurringScheduleDetailsShippingMethods', vm);
            };
            MyRecurringScheduleDetailsController.prototype.renderAddresses = function (vm) {
                this.render('RecurringScheduleDetailsAddresses', vm);
            };
            MyRecurringScheduleDetailsController.prototype.renderPayment = function (vm) {
                this.render('RecurringScheduleDetailsPayments', vm);
            };
            MyRecurringScheduleDetailsController.prototype.getAddresses = function () {
                var _this = this;
                this.recurringCartAddressRegisteredService.getRecurringTemplateAddresses(this.id)
                    .then(function (addressesVm) {
                    addressesVm.SelectedBillingAddressId = _this.viewModel.RecurringOrderTemplateLineItemViewModels[0].BillingAddressId;
                    addressesVm.SelectedShippingAddressId = _this.viewModel.RecurringOrderTemplateLineItemViewModels[0].ShippingAddressId;
                    addressesVm.UseShippingAddress = addressesVm.SelectedBillingAddressId === addressesVm.SelectedShippingAddressId;
                    //console.log(addressesVm);
                    _this.renderAddresses(addressesVm);
                });
            };
            MyRecurringScheduleDetailsController.prototype.getShippingMethodsList = function () {
                var _this = this;
                var shippingMethodName = this.viewModel.RecurringOrderTemplateLineItemViewModels[0].ShippingMethodName;
                this.getShippingMethods()
                    .then(function (shippingMethods) {
                    if (!shippingMethods) {
                        throw new Error('No viewModel received');
                    }
                    if (_.isEmpty(shippingMethods.ShippingMethods)) {
                        throw new Error('No shipping method was found.');
                    }
                    var selectedShippingMethodName = shippingMethodName;
                    shippingMethods.ShippingMethods.forEach(function (shippingMethod) {
                        if (shippingMethod.Name === selectedShippingMethodName) {
                            shippingMethods.SelectedShippingProviderId = shippingMethod.ShippingProviderId;
                        }
                    });
                    var vm = {
                        ShippingMethods: shippingMethods,
                        SelectedMethod: selectedShippingMethodName
                    };
                    //console.log(vm);
                    _this.renderShippingMethods(vm);
                });
            };
            MyRecurringScheduleDetailsController.prototype.getShippingMethods = function () {
                return this.recurringOrderService.getOrderTemplateShippingMethods()
                    .fail(function (reason) {
                    console.error('Error while retrieving shipping methods', reason);
                });
            };
            MyRecurringScheduleDetailsController.prototype.getPaymentMethods = function () {
                var _this = this;
                var busy = this.asyncBusy();
                this.renderPayment({ IsLoading: true });
                var data = {
                    id: this.id
                };
                this.recurringOrderService.getTemplatePaymentMethods(data)
                    .then(function (result) {
                    var selected = _this.viewModel.RecurringOrderTemplateLineItemViewModels[0].PaymentMethodId;
                    result.SavedCreditCards.forEach(function (payment) {
                        payment.IsSelected = payment.Id === selected;
                    });
                    //console.log(result);
                    _this.renderPayment(result);
                });
                busy.done();
            };
            MyRecurringScheduleDetailsController.prototype.useShippingAddress = function () {
                var useShippingAddress = $(this.context.container).find('input[name=UseShippingAddress]:checked').val() === 'true';
                return useShippingAddress;
            };
            MyRecurringScheduleDetailsController.prototype.changeUseShippingAddress = function () {
                this.setBillingAddressFormVisibility();
                this.setSelectedBillingAddress();
                //TODO: form validation?
            };
            MyRecurringScheduleDetailsController.prototype.setBillingAddressFormVisibility = function () {
                var useShippingAddress = this.useShippingAddress();
                if (useShippingAddress) {
                    $('#BillingAddressContent').addClass('hide');
                }
                else {
                    $('#BillingAddressContent').removeClass('hide');
                }
            };
            MyRecurringScheduleDetailsController.prototype.setSelectedBillingAddress = function () {
                var selectedBillingAddressId = $(this.context.container).find('input[name=BillingAddressId]:checked').val();
                if (!selectedBillingAddressId) {
                    return;
                }
            };
            MyRecurringScheduleDetailsController.prototype.deleteAddressConfirm = function (actionContext) {
                this.uiModal.openModal(actionContext.event);
            };
            /**
           * Requires the element in action context to have a data-address-id.
           */
            MyRecurringScheduleDetailsController.prototype.deleteAddress = function (event) {
                var _this = this;
                var element = $(event.target);
                var $addressListItem = element.closest('[data-address-id]');
                var addressId = $addressListItem.data('address-id');
                var busy = this.asyncBusy({ elementContext: element, containerContext: $addressListItem });
                return this.customerService.deleteAddress(addressId, '')
                    .then(function (result) {
                    _this.reRenderPage(_this.viewModel);
                })
                    .fin(function () { return busy.done(); });
            };
            MyRecurringScheduleDetailsController.prototype.releaseBusyHandler = function () {
                if (this.busyHandler) {
                    this.busyHandler.done();
                    this.busyHandler = null;
                }
            };
            MyRecurringScheduleDetailsController.prototype.saveRecurringOrderTemplate = function (actionContext) {
                var _this = this;
                var lineItemId = this.id;
                var paymentMethodId;
                var shippingAddressId;
                var billingAddressId;
                var nextOccurence;
                var frequencyName;
                var shippingProviderId;
                var shippingMethodName;
                var isAllValid = true;
                //If save successful is still showing
                $('[data-templateid="RecurringScheduleDetailsUpdateSuccessful"]').hide();
                paymentMethodId = $(this.context.container).find('input[name=PaymentMethod]:checked').val();
                shippingAddressId = $(this.context.container).find('input[name=ShippingAddressId]:checked').val();
                billingAddressId = $(this.context.container).find('input[name=BillingAddressId]:checked').val();
                if (this.useShippingAddress()) {
                    billingAddressId = shippingAddressId;
                }
                var element = $('#NextOcurrence')[0];
                var newDate = element.value;
                var isValid = this.nextOcurrenceIsValid(newDate);
                if (isValid) {
                    nextOccurence = newDate;
                }
                else {
                    isAllValid = false;
                    console.error('Error: Invalid date while saving template');
                    Composer.ErrorHandler.instance().outputErrorFromCode('InvalidDateSelected');
                }
                var frequency = $('#modifyFrequency').find(':selected')[0];
                frequencyName = frequency.value;
                if (frequencyName === '' || frequencyName === undefined) {
                    isAllValid = false;
                    console.error('Error: Invalid frequency while saving template');
                    Composer.ErrorHandler.instance().outputErrorFromCode('InvalidFrequencySelected');
                }
                var elementShipping = $('#ShippingMethod').find('input[name=ShippingMethod]:checked');
                shippingMethodName = elementShipping.val();
                shippingProviderId = elementShipping.data('shipping-provider-id');
                if (_.isUndefined(paymentMethodId)) {
                    isAllValid = false;
                    console.error('Error: Missing payment method');
                    Composer.ErrorHandler.instance().outputErrorFromCode('RecurringSchedulePaymentMissing');
                }
                if (!this.useShippingAddress() && _.isUndefined(shippingAddressId)) {
                    isAllValid = false;
                    console.error('Error: Missing shipping address');
                    Composer.ErrorHandler.instance().outputErrorFromCode('RecurringScheduleShippingAddressMissing');
                }
                if (_.isUndefined(billingAddressId)) {
                    isAllValid = false;
                    console.error('Error: Missing billing address');
                    Composer.ErrorHandler.instance().outputErrorFromCode('RecurringScheduleBillingAddressMissing');
                }
                if (_.isUndefined(shippingProviderId) || _.isUndefined(shippingMethodName)) {
                    isAllValid = false;
                    console.error('Error: Missing shipping provider or shipping method name');
                    Composer.ErrorHandler.instance().outputErrorFromCode('RecurringScheduleBillingAddressMissing');
                }
                if (isAllValid) {
                    this.busyHandler = this.asyncBusy({ elementContext: actionContext.elementContext });
                    var updateTemplateLineItemParam = {
                        nextOccurence: nextOccurence,
                        lineItemId: lineItemId,
                        billingAddressId: billingAddressId,
                        shippingAddressId: shippingAddressId,
                        paymentMethodId: paymentMethodId,
                        frequencyName: frequencyName,
                        shippingProviderId: shippingProviderId,
                        shippingMethodName: shippingMethodName
                    };
                    this.recurringOrderService.updateTemplateLineItem(updateTemplateLineItemParam)
                        .then(function (result) {
                        var templateLineItems = _.map(result.RecurringOrderTemplateViewModelList, function (x) {
                            return x.RecurringOrderTemplateLineItemViewModels;
                        });
                        var templateLineItemsList = _.reduce(templateLineItems, function (a, b) { return a.concat(b); }, []);
                        var item = templateLineItemsList.filter(function (u) { return u.Id === _this.id; });
                        var vm = {
                            RecurringOrderTemplateLineItemViewModels: item
                        };
                        _this.viewModel = vm;
                        item[0].UpdateStatus = 'Success';
                        _this.reRenderPage(item[0]);
                    })
                        .fail(function (reason) {
                        console.error(reason);
                        Composer.ErrorHandler.instance().outputErrorFromCode('RecurringScheduleUpdateFailed');
                    })
                        .fin(function () { return _this.releaseBusyHandler(); });
                }
                return null;
            };
            MyRecurringScheduleDetailsController.prototype.nextOcurrenceIsValid = function (value) {
                var newDate = this.convertDateToUTC(new Date(value));
                var today = this.convertDateToUTC(new Date(new Date().setHours(0, 0, 0, 0)));
                if (newDate > today) {
                    return true;
                }
                return false;
            };
            MyRecurringScheduleDetailsController.prototype.convertDateToUTC = function (date) {
                return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
            };
            return MyRecurringScheduleDetailsController;
        }(Orckestra.Composer.RecurringScheduleDetailsController));
        Composer.MyRecurringScheduleDetailsController = MyRecurringScheduleDetailsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Events/EventScheduler.ts' />
///<reference path='../../Cache/CacheProvider.ts' />
///<reference path='../Common/MembershipService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../Common/MyAccountStatus.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        /**
         * Controller for the Coupons section.
         */
        var ReturningCustomerController = /** @class */ (function (_super) {
            __extends(ReturningCustomerController, _super);
            function ReturningCustomerController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                _this.cacheProvider = Composer.CacheProvider.instance();
                return _this;
            }
            ReturningCustomerController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
            };
            ReturningCustomerController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.registerFormsForValidation(this.context.container.find('form'));
                var scheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn]);
                scheduler.setPostEventCallback(function (data) { return _this.onLoggedIn(data); });
            };
            ReturningCustomerController.prototype.onLoggedIn = function (data) {
                var _this = this;
                var promise = Q.fcall(function () {
                    if (data.ReturnUrl) {
                        window.location.replace(decodeURIComponent(data.ReturnUrl));
                    }
                    else {
                        _this.render('ReturningCustomer', data);
                        _this.registerFormsForValidation(_this.context.container.find('form'), {
                            serverValidationContainer: '[data-templateid="ReturningCustomerFormsServerValidations"]'
                        });
                    }
                });
                return promise;
            };
            /**
             * Event triggered when submitting the login form.
             * @param {IControllerActionContext} actionContext - Event context.
             */
            ReturningCustomerController.prototype.login = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                if (this.busyHandler && this.busyHandler.isLoading())
                    return;
                this.busyHandler = this.asyncBusy();
                this.loginImpl(actionContext)
                    .then(function (result) { return _this.onLoginFulfilled(result); })
                    .fail(function (reason) { return _this.onLoginRejected(reason); })
                    .done();
            };
            ReturningCustomerController.prototype.loginImpl = function (actionContext) {
                var formData = actionContext.elementContext.serializeObject();
                var href = window.location.href;
                var returnUrlKey = 'ReturnUrl=';
                var returnUrl = href.indexOf(returnUrlKey) > -1 ? href.substring(href.indexOf(returnUrlKey) + returnUrlKey.length) : '';
                return this.membershipService.login(formData, returnUrl);
            };
            ReturningCustomerController.prototype.onLoginFulfilled = function (result) {
                if (result.Status === Composer.MyAccountStatus[Composer.MyAccountStatus.Success]) {
                    this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn], { data: result });
                    this.cacheProvider.defaultCache.set('customerId', null).done();
                }
                else {
                    this.renderFailedForm(result.Status);
                    this.busyHandler.done();
                }
            };
            ReturningCustomerController.prototype.onLoginRejected = function (reason) {
                var errorCode = Composer.MyAccountStatus[Composer.MyAccountStatus.AjaxFailed];
                if (reason && reason.Errors && reason.Errors[0] && reason.Errors[0].ErrorCode) {
                    errorCode = reason.Errors[0].ErrorCode;
                }
                this.renderFailedForm(errorCode, reason.Errors[0].Bag);
                this.busyHandler.done();
            };
            /**
             * Render the template for message failures
             * Register Format validation to hide those server message on client interaction
             * Reset potentially unsafe fields
             */
            ReturningCustomerController.prototype.renderFailedForm = function (status, errorBag) {
                if (errorBag === void 0) { errorBag = {}; }
                this.render('ReturningCustomerFormsServerValidations', { Status: status, Bag: errorBag });
                this.context.container.find('input[type="password"]').val('');
                this.registerFormsForValidation(this.context.container.find('form'), {
                    serverValidationContainer: '[data-templateid="ReturningCustomerFormsServerValidations"]'
                });
            };
            return ReturningCustomerController;
        }(Orckestra.Composer.Controller));
        Composer.ReturningCustomerController = ReturningCustomerController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Events/EventScheduler.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../../Services/UserMetadataService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SignInHeaderController = /** @class */ (function (_super) {
            __extends(SignInHeaderController, _super);
            function SignInHeaderController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.userMetadataService = Composer.UserMetadataService.getInstance();
                return _this;
            }
            SignInHeaderController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeSignInHeader();
                this.registerSubscriptions();
            };
            SignInHeaderController.prototype.initializeSignInHeader = function () {
                var _this = this;
                var self = this;
                this.userMetadataService.getUserMetadata()
                    .then(function (vm) {
                    _this.VueSignInHeader = new Vue({
                        el: '#vueSignInHeader',
                        data: vm
                    });
                    _this.VueSignInSticky = new Vue({
                        el: '#vueSignInSticky',
                        data: vm
                    });
                });
            };
            SignInHeaderController.prototype.registerSubscriptions = function () {
                var _this = this;
                var loggedInScheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn]);
                var loggedOutScheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedOut]);
                loggedOutScheduler.subscribe(function (e) { return _this.onLoggedOut(e); });
                loggedInScheduler.subscribe(function (e) { return _this.onLoggedIn(e); });
            };
            SignInHeaderController.prototype.onLoggedOut = function (e) {
                return this.userMetadataService.invalidateCache();
            };
            SignInHeaderController.prototype.onLoggedIn = function (e) {
                return this.userMetadataService.invalidateCache();
            };
            return SignInHeaderController;
        }(Orckestra.Composer.Controller));
        Composer.SignInHeaderController = SignInHeaderController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Utils/UrlHelper.ts' />
///<reference path='../Common/CustomerService.ts' />
///<reference path='../../Services/UserMetadataService.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../MyAccount/MyAccountController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var UpdateAccountStates;
        (function (UpdateAccountStates) {
            UpdateAccountStates["Sucsess"] = "sucsess";
            UpdateAccountStates["Failed"] = "failed";
        })(UpdateAccountStates || (UpdateAccountStates = {}));
        var UpdateAccountController = /** @class */ (function (_super) {
            __extends(UpdateAccountController, _super);
            function UpdateAccountController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.customerService = new Composer.CustomerService(new Composer.CustomerRepository());
                _this.userService = new Composer.UserMetadataService(new Composer.MembershipRepository());
                return _this;
            }
            UpdateAccountController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
                var userData = this.context.viewModel;
                var self = this;
                var updateAccountFormId = "#updateAccountForm";
                this.VueUpdateAccount = new Vue({
                    el: '#vueUpdateAccount',
                    data: __assign({}, userData, { UpdateAccountState: "", IsLoading: false, Errors: [] }),
                    mounted: function () {
                        self.initializeParsey(updateAccountFormId);
                    },
                    computed: {
                        SaveChangesFailed: function () {
                            return this.UpdateAccountState === UpdateAccountStates.Failed;
                        },
                        SaveChangesSucceeded: function () {
                            return this.UpdateAccountState === UpdateAccountStates.Sucsess;
                        }
                    },
                    methods: {
                        enableSubmitButton: function () {
                            this.UpdateAccountState = "";
                            var parsleyInit = self.getParsleyInit(updateAccountFormId);
                            $('#UpdateAccountSubmit').prop('disabled', !parsleyInit.isValid());
                        },
                        updateAccount: function () {
                            var _this = this;
                            var parsleyInit = self.getParsleyInit(updateAccountFormId);
                            if (parsleyInit && !parsleyInit.validate()) {
                                return;
                            }
                            var formData = {
                                FirstName: this.FirstName,
                                Username: this.Username,
                                LastName: this.LastName,
                                Email: this.Email,
                                PreferredLanguage: this.Language
                            };
                            var returnUrlQueryString = 'ReturnUrl=';
                            var returnUrl = '';
                            if (window.location.href.indexOf(returnUrlQueryString) > -1) {
                                returnUrl = Composer.urlHelper.getURLParameter(location.search, 'ReturnUrl');
                            }
                            this.IsLoading = true;
                            self.customerService.updateAccount(formData, returnUrl)
                                .then(function (result) {
                                self.userService.invalidateCache();
                                _this.UpdateAccountState = UpdateAccountStates.Sucsess;
                                return result;
                            })
                                .then(function (result) { return self.onUpdateAccountFulfilled(result); })
                                .fail(function (reason) {
                                console.error('Error updating the account.', reason);
                                if (reason && reason.Errors) {
                                    _this.Errors = reason.Errors;
                                }
                                _this.UpdateAccountState = UpdateAccountStates.Failed;
                            })
                                .fin(function () { return _this.IsLoading = false; });
                        }
                    }
                });
            };
            UpdateAccountController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe(Composer.MyAccountEvents[Composer.MyAccountEvents.AccountUpdated], function (e) { return _this.onAccountUpdated(e); });
            };
            UpdateAccountController.prototype.initializeParsey = function (formId) {
                $(formId).parsley({ trigger: 'focusout change' });
            };
            ;
            UpdateAccountController.prototype.getParsleyInit = function (formId) {
                return $(formId).parsley();
            };
            UpdateAccountController.prototype.onAccountUpdated = function (result) {
                if (result.ReturnUrl) {
                    window.location.replace(decodeURIComponent(result.ReturnUrl));
                }
            };
            UpdateAccountController.prototype.onUpdateAccountFulfilled = function (result) {
                this.eventHub.publish(Composer.MyAccountEvents[Composer.MyAccountEvents.AccountUpdated], { data: result });
                return Q(result);
            };
            return UpdateAccountController;
        }(Orckestra.Composer.MyAccountController));
        Composer.UpdateAccountController = UpdateAccountController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Composer.Cart/WishList/WishListRepository.ts' />
///<reference path='../../Composer.Cart/WishList/Services/WishListService.ts' />
///<reference path='../../Composer.Cart/CartSummary/CartService.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../Composer.Product/Product/ProductHelpers.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var WishListController = /** @class */ (function (_super) {
            __extends(WishListController, _super);
            function WishListController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._wishListService = new Composer.WishListService(new Composer.WishListRepository(), _this.eventHub);
                _this._cartService = Composer.CartService.getInstance();
                return _this;
            }
            WishListController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var vueId = this.context.container.data("vueid");
                var self = this;
                this.VueWishList = new Vue({
                    el: '#' + vueId,
                    data: __assign({ Items: [], ActiveProductId: undefined }, this.context.viewModel),
                    computed: {
                        Total: function () {
                            return this.Items.length;
                        }
                    },
                    methods: {
                        addToCart: function (item) {
                            var _this = this;
                            var price = item.IsOnSale ? item.ListPrice : item.DefaultListPrice;
                            item.Loading = true;
                            this.Items = this.Items.slice();
                            self.eventHub.publish('wishListLineItemAddingToCart', {
                                data: Composer.ProductsHelper.getProductDataForAnalytics(item, item.VariantId, price, self.getListNameForAnalytics(), 1)
                            });
                            self._cartService.addLineItem(item, price, item.VariantId, 1, self.getListNameForAnalytics())
                                .then(function () {
                                item.Loading = false;
                                _this.Items = _this.Items.slice();
                            });
                        },
                        copyShareUrl: function (shareUrl) {
                            navigator.clipboard.writeText(shareUrl);
                            self.eventHub.publish('wishListCopyingShareUrl', {
                                data: {}
                            });
                        },
                        deleteLineItem: function (lineItemId) {
                            var _this = this;
                            var item = this.Items.find(function (x) { return x.Id === lineItemId; });
                            if (item) {
                                item.Removing = true;
                                this.Items = this.Items.slice();
                            }
                            self._wishListService.removeLineItem(lineItemId)
                                .then(function (wishList) {
                                _this.Items = _this.Items.filter(function (x) { return x.Id !== lineItemId; });
                            });
                        }
                    }
                });
            };
            WishListController.prototype.getListNameForAnalytics = function () {
                throw new Error('ListName not defined for this controller');
            };
            return WishListController;
        }(Orckestra.Composer.Controller));
        Composer.WishListController = WishListController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./WishListController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var MyWishListController = /** @class */ (function (_super) {
            __extends(MyWishListController, _super);
            function MyWishListController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MyWishListController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            MyWishListController.prototype.getListNameForAnalytics = function () {
                return 'My Wish List';
            };
            return MyWishListController;
        }(Orckestra.Composer.WishListController));
        Composer.MyWishListController = MyWishListController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Events/EventScheduler.ts' />
///<reference path='../../Composer.Cart/WishList/WishListRepository.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../../Events/IEventInformation.ts' />
///<reference path='../Common/MyAccountEvents.ts' />
///<reference path='../../Composer.Cart/WishList/Services/WishListService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var WishListInHeaderController = /** @class */ (function (_super) {
            __extends(WishListInHeaderController, _super);
            function WishListInHeaderController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._wishListService = new Composer.WishListService(new Composer.WishListRepository(), _this.eventHub);
                return _this;
            }
            WishListInHeaderController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeWishListQuantity();
                this.registerSubscriptions();
            };
            WishListInHeaderController.prototype.initializeWishListQuantity = function () {
                var _this = this;
                if (this.context.viewModel.IsAuthenticated === false) {
                    this._wishListService.clearCache();
                }
                this._wishListService.getWishListSummary()
                    .done(function (wishList) {
                    if (!_.isEmpty(wishList)) {
                        _this.renderWishList(wishList);
                    }
                });
            };
            WishListInHeaderController.prototype.registerSubscriptions = function () {
                var _this = this;
                var loggedInScheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedIn]);
                var loggedOutScheduler = Composer.EventScheduler.instance(Composer.MyAccountEvents[Composer.MyAccountEvents.LoggedOut]);
                this.eventHub.subscribe(Composer.ProductEvents.WishListUpdated, function (e) { return _this.onWishListUpdated(e); });
                loggedOutScheduler.subscribe(function (e) { return _this.onRefreshUser(e); });
                loggedInScheduler.subscribe(function (e) { return _this.onRefreshUser(e); });
            };
            WishListInHeaderController.prototype.onWishListUpdated = function (e) {
                var wishList = e.data;
                this.renderWishList(wishList);
            };
            WishListInHeaderController.prototype.onRefreshUser = function (e) {
                return this._wishListService.clearCache();
            };
            WishListInHeaderController.prototype.renderWishList = function (wishList) {
                this.render('WishListQuantity', wishList);
            };
            WishListInHeaderController.prototype.onError = function (reason) {
                console.error("An error occured while rendering the wishList with the WishListInHeader.", reason);
            };
            return WishListInHeaderController;
        }(Orckestra.Composer.Controller));
        Composer.WishListInHeaderController = WishListInHeaderController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../WishList/WishListController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var SharedWishListController = /** @class */ (function (_super) {
            __extends(SharedWishListController, _super);
            function SharedWishListController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SharedWishListController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            SharedWishListController.prototype.getListNameForAnalytics = function () {
                return 'Shared Wish List';
            };
            return SharedWishListController;
        }(Orckestra.Composer.WishListController));
        Composer.SharedWishListController = SharedWishListController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ProductIdentifierDto = /** @class */ (function () {
            function ProductIdentifierDto(ProductId, VariantId) {
                this.ProductId = ProductId;
                this.VariantId = VariantId;
            }
            return ProductIdentifierDto;
        }());
        Composer.ProductIdentifierDto = ProductIdentifierDto;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../RelatedProducts/ProductIdentifierDto.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='./IInventoryService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var InventoryService = /** @class */ (function () {
            function InventoryService() {
            }
            InventoryService.prototype.isAvailableToSell = function (sku) {
                var _this = this;
                if (!sku) {
                    throw new Error('The sku is required');
                }
                if (!this._memoizeIsAvailableToSell) {
                    this._memoizeIsAvailableToSell = _.memoize(function (arg) { return _this.isAvailableToSellImpl(arg); });
                }
                return this._memoizeIsAvailableToSell(sku);
            };
            InventoryService.prototype.isAvailableToSellImpl = function (sku) {
                var data = { skus: [sku] };
                return Composer.ComposerClient.post('/api/inventory/findInventoryItems', data)
                    .then(function (availableSkus) { return _.includes(availableSkus, sku); });
            };
            return InventoryService;
        }());
        Composer.InventoryService = InventoryService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../RelatedProducts/ProductIdentifierDto.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/IControllerContext.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='../../Events/EventHub.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        //
        //Isolated logic, this class rebuild the keyVariantAttributeItems array
        //as expected by KvaItems.hbs
        //TODO: Instancier dans productService (passer dans le constructeur)
        var KeyVariantAttributeItemsBuilder = /** @class */ (function () {
            //Passer viewModel
            function KeyVariantAttributeItemsBuilder(context) {
                if (!context) {
                    throw new Error('Error: context is required');
                }
                if (!context.viewModel) {
                    throw new Error('Error: context.viewModel is required');
                }
                this.context = context;
            }
            //Find possible kva value states bases on the given selection
            //
            //<returns>
            // KeyVariantAttributeItem ViewModel ready for render
            //</returns>
            KeyVariantAttributeItemsBuilder.prototype.BuildKeyVariantAttributeItemsFor = function (selectedKvas) {
                selectedKvas = selectedKvas || {};
                //Get the last known KvaState and use it as a starting point
                var keyVariantAttributeItems = this.context.viewModel.keyVariantAttributeItems || [];
                //Initiate
                var reverseKvaLookup = this.InitiateKVAStateFor(keyVariantAttributeItems, selectedKvas);
                //Find
                var reachableVariants = this.FindReachableVariantsFrom(keyVariantAttributeItems, selectedKvas);
                //Enable
                this.EnableKVAState(reverseKvaLookup, reachableVariants, selectedKvas);
                //Memoize the KvaState for later
                this.context.viewModel.keyVariantAttributeItems = keyVariantAttributeItems;
                //
                return keyVariantAttributeItems;
            };
            //Toggle the Selected state and Disable everything
            //After this initial state, the KVAs will either be
            // Selected or Disable
            //
            //<returns>
            //  A Lookup of all KVA for later easy access using
            //  lookup[propertyName][value]
            //</returns>
            KeyVariantAttributeItemsBuilder.prototype.InitiateKVAStateFor = function (keyVariantAttributeItems, selectedKvas) {
                var reverseLookup = {};
                _.each(keyVariantAttributeItems, function (kva) {
                    var propertyName = kva.PropertyName;
                    var selectedValue = selectedKvas[propertyName];
                    reverseLookup[propertyName] = {};
                    _.each(kva.Values, function (val) {
                        val.Selected = val.Value === selectedValue;
                        val.Disabled = true;
                        reverseLookup[propertyName][val.Value] = val;
                    });
                });
                return reverseLookup;
            };
            //Find all reachable variants from the given configuration
            //Those are variant that could possibly be reach by changing
            //one and only one KVA value
            //<returns>
            //  An array of Variants with all their properties
            //</returns>
            KeyVariantAttributeItemsBuilder.prototype.FindReachableVariantsFrom = function (keyVariantAttributeItems, selectedKvas) {
                var allVariants = (this.context.viewModel.allVariants || {});
                var possibleVariantsLookup = {};
                //Changing Selection
                _.each(selectedKvas, function (value, propertyName) {
                    var possibleMove = _.omit(selectedKvas, propertyName);
                    var v = _.each(_.filter(allVariants, { Kvas: possibleMove }), function (variant) {
                        possibleVariantsLookup[variant.Id] = variant;
                    });
                });
                //
                var variants = _.mapValues(possibleVariantsLookup, _.identity);
                return variants;
            };
            //Enable the KVAs based on the reachable variants
            //Using the reverse lookkup for faster access
            KeyVariantAttributeItemsBuilder.prototype.EnableKVAState = function (reverseKvaLookup, reachableVariants, selectedKvas) {
                //Enable reachable states
                _.each(reachableVariants, function (variant, variantId) {
                    _.each(variant.Kvas, function (value, propertyName) {
                        var kva = reverseKvaLookup[propertyName] || [];
                        var val = kva[value] || {};
                        val.Disabled = false;
                    });
                });
                //If the current selection match nothing, disable it.
                var selectedVariant = _.find(reachableVariants, { Kvas: selectedKvas });
                if (!selectedVariant) {
                    _.each(selectedKvas, function (value, propertyName) {
                        var kva = reverseKvaLookup[propertyName] || [];
                        var val = kva[value] || {};
                        val.Disabled = true;
                    });
                }
            };
            return KeyVariantAttributeItemsBuilder;
        }());
        Composer.KeyVariantAttributeItemsBuilder = KeyVariantAttributeItemsBuilder;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/IControllerContext.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='../../Events/EventHub.ts' />
///<reference path='../RelatedProducts/ProductIdentifierDto.ts' />
///<reference path='./IProductService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var ProductService = /** @class */ (function () {
            function ProductService(eventHub, context) {
                if (!eventHub) {
                    throw new Error('Error: eventHub is required');
                }
                if (!context) {
                    throw new Error('Error: context is required');
                }
                if (!context.viewModel) {
                    throw new Error('Error: context.viewModel is required');
                }
                this.eventHub = eventHub;
                this.context = context;
            }
            ProductService.prototype.showQuickView = function () {
                $('#addToCartModal').modal('show');
            };
            ProductService.prototype.closeQuickView = function () {
                $('#addToCartModal').modal('hide');
            };
            ProductService.prototype.calculatePrices = function (productId, concern) {
                var data = { products: [productId] };
                return Composer.ComposerClient.post('/api/product/calculatePrices', data);
            };
            ProductService.prototype.calculatePrice = function (productId, concern) {
                var _this = this;
                var data = { products: [productId] };
                return Composer.ComposerClient.post('/api/product/calculatePrices', data)
                    .then(function (result) {
                    var details = _this.context.viewModel;
                    var mainResult = _.find(result.ProductPrices, { ProductId: productId });
                    //TODO extend all other products on the page (if any)
                    //Extend the product details
                    _.extend(details, mainResult);
                    if (result && result.Currency) {
                        details.Currency = result.Currency;
                    }
                    //Extend the variants
                    var allVariants = _this.context.viewModel.allVariants;
                    _.each(mainResult.VariantPrices, function (variantPrice) {
                        var variant = _.find(allVariants, { Id: variantPrice.VariantId });
                        _.extend(variant, variantPrice);
                        if (variant !== undefined && variant.Id === details.displayedVariantId) {
                            _.extend(details, variant);
                        }
                    });
                    _this.eventHub.publish(concern + 'PricesChanged', { data: details });
                    _this.eventHub.publish(concern + 'PriceCalculated', { data: details });
                });
            };
            /*
             * Return the ViewModel of the Selected Variant.
             * If no variants are available,
             *    it returns the ViewModel of the Product
             * If no variant is selected (aka the KVA selection binds to an unavailable variant)
             *    it returns a None Buyable ViewModel
             */
            ProductService.prototype.getSelectedVariantViewModel = function () {
                var selectedVariantId = this.context.viewModel.selectedVariantId;
                var displayedVariantId = this.context.viewModel.displayedVariantId;
                if (!displayedVariantId) {
                    //This is mostlikely a product
                    return this.context.viewModel;
                }
                else if (selectedVariantId === displayedVariantId) {
                    //This is mostlikely a variant
                    return this.getVariant(selectedVariantId);
                }
                return {
                    'IsAvailableToSell': false
                };
            };
            // TODO (SAM) : getVariant and updateSelectedKvasWith shouldn't be in this file.
            //              They're more suited to a Controller or a helper class.
            //Get the Variant for the given id
            //<param name="variantId">The variant id to find</param>
            //<returns>KeyVariantAttributeItem ViewModel ready for render</returns>
            ProductService.prototype.getVariant = function (variantId) {
                var allVariants = this.context.viewModel.allVariants;
                var variant = _.find(allVariants, { Id: variantId });
                return variant;
            };
            ProductService.prototype.updateSelectedKvasWith = function (selectionsToAdd, concern) {
                var allVariants = this.context.viewModel.allVariants;
                var initialSelectedKvas = this.context.viewModel.selectedKvas || {};
                var initialSelectedVariantId = this.context.viewModel.selectedVariantId;
                var initialDisplayedVariantId = this.context.viewModel.displayedVariantId;
                //Update current selection
                var selectedKvas = _.merge(initialSelectedKvas, selectionsToAdd);
                //Find possible matches
                var variants = _.filter(allVariants, { Kvas: selectedKvas });
                if (variants && variants.length === 1) {
                    //Exactly one variant found, let's update the detail to display it.
                    var variant = variants[0];
                    this.context.viewModel.selectedKvas = _.clone(variant.Kvas);
                    this.context.viewModel.selectedVariantId = variant.Id;
                    this.context.viewModel.displayedVariantId = variant.Id;
                }
                else {
                    //More than one possibile variants, let's not assume any selected ones.
                    this.context.viewModel.selectedKvas = selectedKvas;
                    this.context.viewModel.selectedVariantId = null;
                }
                //Superseed the product details with the selection variant details
                _.extend(this.context.viewModel, this.getSelectedVariantViewModel());
                this.buildKeyVariantAttributeItems(concern);
                if (initialDisplayedVariantId !== this.context.viewModel.displayedVariantId) {
                    this.eventHub.publish(concern + 'DisplayedVariantIdChanged', {
                        data: {
                            initialDisplayedVariantId: initialDisplayedVariantId,
                            displayVariantId: this.context.viewModel.displayedVariantId,
                            selectedSku: this.context.viewModel.Sku
                        }
                    });
                }
                if (initialSelectedVariantId !== this.context.viewModel.selectedVariantId) {
                    this.eventHub.publish(concern + 'SelectedVariantIdChanged', {
                        data: {
                            initialSelectedVariantId: initialSelectedVariantId,
                            selectedVariantId: this.context.viewModel.selectedVariantId,
                            selectedSku: this.context.viewModel.Sku
                        }
                    });
                }
                this.eventHub.publish(concern + 'ImagesChanged', { data: this.context.viewModel });
                //I think this publish is unnecessary because it calculate the price after on a API server call
                this.eventHub.publish(concern + 'PricesChanged', { data: this.context.viewModel });
            };
            ProductService.prototype.getRelatedProducts = function (relatedProductIdentifiers) {
                return Composer.ComposerClient.post('/api/product/relatedProducts', relatedProductIdentifiers);
            };
            ProductService.prototype.loadProduct = function (productId, variantId) {
                var data = {
                    ProductId: productId,
                    VariantId: variantId
                };
                return Composer.ComposerClient.post('/api/product/variantSelection', data).
                    fail(function (reason) {
                    console.error('Failed loading the Product', reason);
                    throw reason;
                });
            };
            ProductService.prototype.loadQuickBuyProduct = function (productId, variantId, concern, source) {
                var _this = this;
                var data = {
                    ProductId: productId,
                    VariantId: variantId
                };
                return Composer.ComposerClient.post('/api/product/variantSelection', data)
                    .then(function (quickBuyProductViewModel) {
                    _this.eventHub.publish(concern + 'QuickBuyLoaded', { data: quickBuyProductViewModel, source: source });
                    return quickBuyProductViewModel;
                }).fail(function (reason) {
                    console.error('Failed loading the ProductQuickView', reason);
                    throw reason;
                });
            };
            ProductService.prototype.findInventoryItems = function (viewModel, concern) {
                var _this = this;
                var selectedSku = viewModel.Sku, skus;
                if (_.isEmpty(viewModel.allVariants)) {
                    skus = [viewModel.Sku];
                }
                else {
                    skus = _.pluck(viewModel.allVariants, 'Sku');
                }
                var data = { skus: skus };
                return Composer.ComposerClient.post('/api/inventory/findInventoryItems', data)
                    .then(function (skusAvailableToSell) {
                    var isAvailableToSell = _.includes(skusAvailableToSell, selectedSku) && viewModel.IsAvailableToSell;
                    _this.eventHub.publish(concern + 'InventoryRetrieved', { data: isAvailableToSell });
                });
            };
            ProductService.prototype.productAvailableToSell = function (selectedSku, productAvailableToSell, productIsAvailableToSell) {
                return _.includes(productAvailableToSell, selectedSku) && productIsAvailableToSell;
            };
            ProductService.prototype.buildKeyVariantAttributeItems = function (concern) {
                var selectedKvas = this.context.viewModel.selectedKvas;
                var builder = new Orckestra.Composer.KeyVariantAttributeItemsBuilder(this.context);
                var keyVariantAttributeItems = builder.BuildKeyVariantAttributeItemsFor(selectedKvas);
                this.eventHub.publish(concern + 'SelectedKvasChanged', { data: keyVariantAttributeItems });
            };
            ProductService.prototype.replaceHistory = function () {
                var variantId = this.context.viewModel.selectedVariantId;
                //Variant selection is not valid use last valid
                if (variantId === null) {
                    return;
                }
                var fullPathArray = window.location.pathname.split('/').filter(Boolean);
                var shortPathArray = fullPathArray.slice(0, 3);
                shortPathArray.push(variantId);
                var builtPath = window.location.protocol
                    + '//'
                    + window.location.host
                    + this.buildUrlPath(shortPathArray);
                history.replaceState({}, null, builtPath);
            };
            ProductService.prototype.buildUrlPath = function (pathArray) {
                var newPathname = '';
                for (var i = 0; i < pathArray.length; i++) {
                    newPathname += '/';
                    newPathname += pathArray[i];
                }
                return newPathname;
            };
            return ProductService;
        }());
        Composer.ProductService = ProductService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='../../Events/EventHub.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        /**
          * Module helper to format string value using the Overture convertion rules.
          */
        var ProductFormatter = /** @class */ (function () {
            function ProductFormatter() {
            }
            /**
             * convert a ProductProperty string value into the right strongly typed variable.
             *
             *     formatter.convertToStronglyTyped(actionContext.elementContext.val(), 'Decimal');
             *
             * @param strValue         The ProductProperty value to convert
             * @param propertyDataType the ProductProperty.DataType to induce the type
             */
            ProductFormatter.prototype.convertToStronglyTyped = function (strValue, propertyDataType) {
                var value;
                if (propertyDataType === 'Decimal') {
                    value = parseFloat(strValue);
                }
                else if (propertyDataType === 'Number') {
                    value = parseInt(strValue, 10);
                }
                else if (propertyDataType === 'Boolean') {
                    value = (strValue === 'true');
                }
                else if (propertyDataType === 'Text') {
                    value = strValue + '';
                }
                else if (propertyDataType === 'Lookup') {
                    value = strValue + '';
                }
                else {
                    value = strValue;
                }
                return value;
            };
            return ProductFormatter;
        }());
        Composer.ProductFormatter = ProductFormatter;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../Composer.Cart/CartSummary/CartService.ts' />
///<reference path='../../Composer.Cart/WishList/Services/WishListService.ts' />
///<reference path='../../Composer.Cart/WishList/WishListRepository.ts' />
///<reference path='../../Composer.MyAccount/Common/MembershipService.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Repositories/CartRepository.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../../Events/IEventInformation.ts' />
///<reference path='../../UI/UIBusyHandle.ts' />
///<reference path='../../ErrorHandling/ErrorHandler.ts' />
///<reference path='./InventoryService.ts' />
///<reference path='./ProductService.ts' />
///<reference path='./ProductFormatter.ts' />
///<reference path='./KeyVariantAttributeItemsBuilder.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ProductController = /** @class */ (function (_super) {
            __extends(ProductController, _super);
            function ProductController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.inventoryService = new Composer.InventoryService();
                _this.productService = new Composer.ProductService(_this.eventHub, _this.context);
                _this.cartService = Composer.CartService.getInstance();
                _this._wishListService = new Composer.WishListService(new Composer.WishListRepository(), _this.eventHub);
                _this._membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                return _this;
            }
            ProductController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
            };
            ProductController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe(this.concern + 'DisplayedVariantIdChanged', function (e) { return _this.onSelectedVariantIdChanged(e); });
                this.eventHub.subscribe(this.concern + 'SelectedVariantIdChanged', function (e) { return _this.onSelectedVariantIdChanged(e); });
                this.eventHub.subscribe(this.concern + 'SelectedKvasChanged', function (e) { return _this.onSelectedKvasChanged(e); });
                this.eventHub.subscribe(this.concern + 'ImagesChanged', function (e) { return _this.onImagesChanged(e); });
                this.eventHub.subscribe(this.concern + 'PricesChanged', function (e) { return _this.onPricesChanged(e); });
            };
            ProductController.prototype.onSelectedVariantIdChanged = function (e) {
                return;
            };
            ProductController.prototype.onSelectedKvasChanged = function (e) {
                return;
            };
            ProductController.prototype.onImagesChanged = function (e) {
                return;
            };
            ProductController.prototype.onPricesChanged = function (e) {
                return;
            };
            ProductController.prototype.renderData = function () {
                var quantity = this.getCurrentQuantity();
                var renderTasks = [];
                if (this.isProductWithVariants() && this.isSelectedVariantUnavailable()) {
                    renderTasks.push(this.renderUnavailableQuantity(quantity));
                    renderTasks.push(this.renderUnavailableAddToCart());
                }
                else {
                    renderTasks.push(this.renderAvailableQuantity(quantity));
                    renderTasks.push(this.renderAvailableAddToCart());
                }
                renderTasks.push(this.renderAddToWishList());
                return Q.all(renderTasks);
            };
            ProductController.prototype.isProductWithVariants = function () {
                return $.isArray(this.context.viewModel.allVariants);
            };
            ProductController.prototype.isSelectedVariantUnavailable = function () {
                return !this.context.viewModel.selectedVariantId;
            };
            ProductController.prototype.renderUnavailableQuantity = function (quantity) {
                var _this = this;
                return Q.fcall(function () { return _this.render('ProductQuantity', { Quantity: quantity, Disabled: true }); });
            };
            ProductController.prototype.renderAvailableQuantity = function (quantity) {
                var _this = this;
                return this.inventoryService
                    .isAvailableToSell(this.context.viewModel.Sku)
                    .then(function (result) { return _this.render('ProductQuantity', { Quantity: quantity, Disabled: !result }); });
            };
            ProductController.prototype.renderAddToWishList = function () {
                var _this = this;
                var vm = this.context.viewModel;
                this.render('AddToWishList', { Loaded: false });
                if (this.isProductWithVariants() && this.isSelectedVariantUnavailable()) {
                    return;
                }
                return this._wishListService.getLineItem(vm.productId, vm.selectedVariantId)
                    .then(function (result) {
                    if (result) {
                        _this.render('AddToWishList', { Loaded: true, IsInWishList: true, Id: result.Id });
                    }
                    else {
                        _this.render('AddToWishList', { Loaded: true, IsInWishList: false });
                    }
                });
            };
            ProductController.prototype.renderUnavailableAddToCart = function () {
                return;
            };
            ProductController.prototype.renderAvailableAddToCart = function () {
                return;
            };
            ProductController.prototype.decrementQuantity = function (actionContext) {
                var quantity = this.getCurrentQuantity();
                quantity.Value--;
                actionContext.event.preventDefault();
                this.renderAvailableQuantity(quantity).done();
            };
            ProductController.prototype.incrementQuantity = function (actionContext) {
                var quantity = this.getCurrentQuantity();
                quantity.Value++;
                actionContext.event.preventDefault();
                this.renderAvailableQuantity(quantity).done();
            };
            ProductController.prototype.changeQuantity = function (actionContext) {
                var quantity = this.getCurrentQuantity();
                var newValue = parseInt(actionContext.elementContext.val(), 10);
                if (isFinite(newValue)) {
                    quantity.Value = Math.max(Math.min(newValue, quantity.Max), quantity.Min); // constraint newvalue to max and min.
                }
                this.renderAvailableQuantity(quantity).done();
            };
            ProductController.prototype.addLineItemToWishList = function (actionContext) {
                var _this = this;
                this._membershipService.isAuthenticated().then(function (result) {
                    if (result.IsAuthenticated) {
                        var vm = _this.context.viewModel;
                        var busy = _this.asyncBusy({ elementContext: actionContext.elementContext });
                        var analyticData = {
                            DisplayName: vm.DisplayName,
                            ListPrice: vm.ListPrice
                        };
                        _this.eventHub.publish('wishListLineItemAdding', {
                            data: analyticData
                        });
                        _this._wishListService.addLineItem(vm.productId, vm.selectedVariantId, 1, null, vm.RecurringOrderProgramName).then(function (data) {
                            var lineItem = data.Items.filter(function (it) { return it.ProductId === vm.productId && it.VariantId === vm.selectedVariantId; })[0];
                            _this.render('AddToWishList', { Loaded: true, IsInWishList: true, Id: lineItem.Id });
                        }).fin(function () { return busy.done(); });
                    }
                    else {
                        _this.redirectToSignInBeforeAddToWishList();
                    }
                });
            };
            ProductController.prototype.removeLineItemToWishList = function (actionContext) {
                var _this = this;
                this._membershipService.isAuthenticated().then(function (result) {
                    if (result.IsAuthenticated) {
                        var id = actionContext.elementContext.data('id');
                        var busy = _this.asyncBusy({ elementContext: actionContext.elementContext });
                        _this._wishListService.removeLineItem(id).then(function (data) {
                            _this.render('AddToWishList', { Loaded: true, IsInWishList: false });
                        }).fin(function () { return busy.done(); });
                    }
                    else {
                        _this.redirectToSignInBeforeAddToWishList();
                    }
                });
            };
            ProductController.prototype.redirectToSignInBeforeAddToWishList = function () {
                var _this = this;
                this._wishListService.getSignInUrl().then(function (signInUrl) {
                    _this._wishListService.clearCache();
                    _this.context.window.location.href = signInUrl + '?ReturnUrl=' + _this.context.window.location.href;
                });
            };
            ProductController.prototype.addLineItem = function (actionContext, recurringOrderFrequencyName) {
                var _this = this;
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext }), quantity = this.getCurrentQuantity(), vm = this.context.viewModel;
                this.addLineItemImpl(vm, vm.ListPrice, vm.selectedVariantId, quantity, recurringOrderFrequencyName)
                    .then(function (data) {
                    _this.onAddLineItemSuccess(data);
                    actionContext.elementContext.focus();
                    return data;
                }, function (reason) {
                    _this.onAddLineItemFailed(reason);
                    actionContext.elementContext.focus();
                    throw reason;
                })
                    .then(function (data) { return _this.completeAddLineItem(quantity); })
                    .fin(function () { return busy.done(); });
            };
            ProductController.prototype.onAddLineItemSuccess = function (data) {
                if (data === void 0) { data = undefined; }
                Composer.ErrorHandler.instance().removeErrors();
            };
            ProductController.prototype.onAddLineItemFailed = function (reason) {
                console.error('Error on adding line item', reason);
                Composer.ErrorHandler.instance().outputErrorFromCode('AddToCartFailed');
            };
            ProductController.prototype.getCurrentQuantity = function () {
                var element = $(this.context.container).find('[name="product-quantity"]');
                return {
                    Min: parseInt(element.data('quantityMin'), 10),
                    Max: parseInt(element.data('quantityMax'), 10),
                    Value: parseInt(element.data('quantity'), 10)
                };
            };
            ProductController.prototype.addLineItemImpl = function (product, price, variantId, quantity, recurringOrderFrequencyName) {
                return this.cartService.addLineItem(product, price, variantId, quantity.Value, this.getListNameForAnalytics(), recurringOrderFrequencyName);
            };
            ProductController.prototype.completeAddLineItem = function (quantityAdded) {
                return;
            };
            ProductController.prototype.selectImage = function (actionContext) {
                actionContext.event.preventDefault();
                var target = actionContext.event.target;
                var mainSrc = $(target).attr('data-main-src');
                var zoomSrc = $(target).attr('data-zoom-src');
                if (target.tagName.toLowerCase() === 'img') {
                    $(target).parents('[data-variant]').find('a').removeClass('active');
                    $(target).parent('a').addClass('active');
                    $('.product-main-img:visible').attr('src', mainSrc);
                    var zoomThumbnail = $('.js-zoom-thumbnails').find('img[data-zoom-src="' + zoomSrc + '"]');
                    zoomThumbnail.click();
                }
            };
            ProductController.prototype.zoomImage = function (actionContext) {
                var target = actionContext.event.target;
                var zoomSrc = $(target).attr('data-zoom-src');
                if (target.tagName.toLowerCase() === 'img') {
                    var zoomThumbnail = $('.js-zoom-thumbnails').find('img[data-zoom-src="' + zoomSrc + '"]');
                    zoomThumbnail.click();
                }
            };
            ProductController.prototype.selectKva = function (actionContext) {
                var selectionsToAdd = {};
                var propertyName = actionContext.elementContext.parents('[data-propertyname]').data('propertyname');
                var propertyDataType = actionContext.elementContext.parents('[data-propertydatatype]').data('propertydatatype');
                var formatter = new Orckestra.Composer.ProductFormatter();
                var value = formatter.convertToStronglyTyped(actionContext.elementContext.val(), propertyDataType);
                selectionsToAdd[propertyName] = value;
                this.productService.updateSelectedKvasWith(selectionsToAdd, this.concern);
            };
            ProductController.prototype.calculatePrice = function () {
                return this.productService.calculatePrice(this.context.viewModel.productId, this.concern);
            };
            ProductController.prototype.publishProductDataForAnalytics = function (vm, eventName) {
                var data = Composer.ProductsHelper.getProductDataForAnalytics(vm, vm.selectedVariantId, vm.ListPrice, this.getListNameForAnalytics());
                this.eventHub.publish(eventName, { data: data });
            };
            ProductController.prototype.getProductDataForAnalytics = function (vm) {
                var productId = (vm.productId) ? vm.productId : vm.ProductId;
                var data = {
                    List: this.getListNameForAnalytics(),
                    ProductId: productId,
                    DisplayName: vm.DisplayName,
                    ListPrice: vm.ListPrice,
                    Brand: vm.Brand,
                    CategoryId: vm.CategoryId
                };
                return data;
            };
            ProductController.prototype.getListNameForAnalytics = function () {
                throw new Error('ListName not defined for this controller');
            };
            return ProductController;
        }(Orckestra.Composer.Controller));
        Composer.ProductController = ProductController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../Product/ProductController.ts' />
///<reference path='../ProductEvents.ts' />
///<reference path='../../Composer.Cart/RecurringOrder/Repositories/RecurringOrderRepository.ts' />
/// <reference path='../../JQueryPlugins/IPopOverJqueryPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var RecurringMode;
        (function (RecurringMode) {
            RecurringMode["Single"] = "Single";
            RecurringMode["Recurring"] = "Recurring";
        })(RecurringMode || (RecurringMode = {}));
        var ProductDetailController = /** @class */ (function (_super) {
            __extends(ProductDetailController, _super);
            function ProductDetailController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.concern = 'productDetail';
                return _this;
            }
            ProductDetailController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.initKvaSelectVueComponent();
                this.productService.updateSelectedKvasWith(this.context.viewModel.selectedKvas, this.concern);
                var priceDisplayBusy = this.asyncBusy({
                    msDelay: 300,
                    loadingIndicatorSelector: '.loading-indicator-pricediscount'
                });
                Q.when(this.calculatePrice()).done(function () {
                    priceDisplayBusy.done();
                    _this.notifyAnalyticsOfProductDetailsImpression();
                });
                var $recurringOrderContainer = this.context.container.find('[data-recurring-mode]');
                this.recurringMode = $recurringOrderContainer.data('recurring-mode');
                this.selectedRecurringOrderFrequencyName = $recurringOrderContainer.data('recurring-order-frequency');
                var Sku = this.context.viewModel.Sku;
                var availableToSellPromise = this.inventoryService.isAvailableToSell(Sku);
                var getCartPromise = this.cartService.getFreshCart();
                var authenticatedPromise = this._membershipService.isAuthenticated();
                var getWishListPromise = this._wishListService.getWishListSummary();
                Q.all([availableToSellPromise, getCartPromise, authenticatedPromise, getWishListPromise])
                    .spread(function (isAvailableToSell, cartVm, authVm, wishListVm) {
                    _this.initAddToCartWithQtyInCartVueComponent(isAvailableToSell, cartVm, authVm);
                    _this.initAddToCartWithQtyVueComponent(isAvailableToSell, cartVm, authVm);
                    _this.initAddToWishListVueComponent(authVm, wishListVm);
                });
            };
            ProductDetailController.prototype.initAddToCartWithQtyInCartVueComponent = function (isAvailableToSell, cartVm, authVm) {
                var elId = 'vueAddToCartWithQuantityInCart';
                var el = document.getElementById(elId);
                if (!el)
                    return;
                var product = this.context.viewModel;
                var self = this;
                var addToCartWithQuantity = new Vue({
                    el: '#' + elId,
                    data: {
                        IsAuthenticated: authVm.IsAuthenticated,
                        Cart: cartVm,
                        Product: product,
                        IsUnavailable: false,
                        IsAvailableToSell: isAvailableToSell,
                        Loading: false
                    },
                    mounted: function () {
                        self.eventHub.subscribe(Composer.CartEvents.CartUpdated, this.onCartUpdated);
                        self.eventHub.subscribe(self.concern + 'SelectedVariantIdChanged', this.onSelectedVariantIdChanged);
                    },
                    computed: {
                        CartItem: function () {
                            var _this = this;
                            if (!this.Cart)
                                return null;
                            var item = _.find(this.Cart.LineItemDetailViewModels, function (i) {
                                return i.ProductId === _this.Product.productId && i.VariantId == _this.Product.selectedVariantId;
                            });
                            return item;
                        },
                        Quantity: function () {
                            return this.CartItem ? this.CartItem.Quantity : 0;
                        },
                        IsUnavailableVariant: function () {
                            return $.isArray(this.Product.allVariants) && !this.Product.selectedVariantId;
                        },
                        DecrementDisabled: function () {
                            return !this.CartItem || this.Loading || (this.Cart.QuantityRange && this.CartItem.Quantity <= this.Cart.QuantityRange.Min);
                        },
                        IncrementDisabled: function () {
                            return !this.CartItem || this.Loading || (this.Cart.QuantityRange && this.CartItem.Quantity >= this.Cart.QuantityRange.Max);
                        },
                        AddToCartDisabled: function () {
                            return this.Loading ||
                                !this.Product.DefaultListPrice ||
                                !this.IsAvailableToSell ||
                                this.IsUnavailableVariant ||
                                (!this.IsAuthenticated && self.recurringMode === RecurringMode.Recurring);
                        }
                    },
                    methods: {
                        onCartUpdated: function (result) {
                            this.Cart = result.data;
                        },
                        onSelectedVariantIdChanged: function (result) {
                            var _this = this;
                            var selectedSku = result.data.selectedSku;
                            self.inventoryService.isAvailableToSell(selectedSku)
                                .then(function (isAvailableToSell) { return _this.IsAvailableToSell = isAvailableToSell; });
                        },
                        addItemToCart: function (event) {
                            var _this = this;
                            if (this.Loading)
                                return;
                            this.Loading = true;
                            var FrequencyName = self.getRecurringData().FrequencyName;
                            var _a = this.Product, selectedVariantId = _a.selectedVariantId, ListPrice = _a.ListPrice;
                            self.cartService.addLineItem(this.Product, ListPrice, selectedVariantId, 1, this.concern, FrequencyName)
                                .then(function () {
                                self.onAddLineItemSuccess();
                            }, function (reason) {
                                self.onAddLineItemFailed(reason);
                                throw reason;
                            })
                                .fin(function () { return _this.Loading = false; });
                        },
                        updateItemQuantity: function (quantity) {
                            var _this = this;
                            if (this.Loading || !this.CartItem)
                                return;
                            if (this.Cart.QuantityRange) {
                                var _a = this.Cart.QuantityRange, Min = _a.Min, Max = _a.Max;
                                quantity = Math.min(Math.max(Min, quantity), Max);
                            }
                            if (quantity == this.Quantity) {
                                //force update vue component
                                this.Cart = __assign({}, this.Cart);
                                return;
                            }
                            var analyticEventName = quantity > this.Quantity ? Composer.ProductEvents.LineItemAdding : Composer.ProductEvents.LineItemRemoving;
                            this.CartItem.Quantity = quantity;
                            if (this.Quantity < 1) {
                                this.Loading = true; // disable ui immediately when we will delete  the line item
                            }
                            self.publishProductDataForAnalytics(self.context.viewModel, analyticEventName);
                            var _b = self.getRecurringData(), FrequencyName = _b.FrequencyName, RecurringProgramName = _b.RecurringProgramName;
                            var _c = this.Product, ProductId = _c.ProductId, selectedVariantId = _c.selectedVariantId;
                            if (!this.debounceUpdateItem) {
                                this.debounceUpdateItem = _.debounce(function () {
                                    _this.Loading = true;
                                    var updatePromise = _this.Quantity > 0 ?
                                        self.cartService.updateLineItem(_this.CartItem.Id, _this.Quantity, ProductId, FrequencyName, RecurringProgramName) :
                                        self.cartService.deleteLineItem(_this.CartItem.Id, ProductId);
                                    updatePromise
                                        .then(function (cart) {
                                        self.onAddLineItemSuccess({ Quantity: _this.Quantity, Cart: cart, ProductId: ProductId, selectedVariantId: selectedVariantId });
                                    }, function (reason) {
                                        self.onAddLineItemFailed(reason);
                                        throw reason;
                                    })
                                        .fin(function () { return _this.Loading = false; });
                                }, 400);
                            }
                            this.debounceUpdateItem();
                        }
                    }
                });
            };
            ProductDetailController.prototype.initAddToCartWithQtyVueComponent = function (isAvailableToSell, cartVm, authVm) {
                var elId = 'vueAddToCartWithQuantity';
                var el = document.getElementById(elId);
                if (!el)
                    return;
                var product = this.context.viewModel;
                var self = this;
                var addToCartWithQuantity = new Vue({
                    el: '#' + elId,
                    data: {
                        IsAuthenticated: authVm.IsAuthenticated,
                        Product: product,
                        Cart: cartVm,
                        Quantity: cartVm.QuantityRange.Min,
                        IsUnavailable: false,
                        IsAvailableToSell: isAvailableToSell,
                        Loading: false
                    },
                    mounted: function () {
                        self.eventHub.subscribe(self.concern + 'SelectedVariantIdChanged', this.onSelectedVariantIdChanged);
                    },
                    computed: {
                        IsUnavailableVariant: function () {
                            return $.isArray(this.Product.allVariants) && !this.Product.selectedVariantId;
                        },
                        DecrementDisabled: function () {
                            return this.Loading || (this.Cart.QuantityRange && this.Quantity <= this.Cart.QuantityRange.Min);
                        },
                        IncrementDisabled: function () {
                            return this.Loading || (this.Cart.QuantityRange && this.Quantity >= this.Cart.QuantityRange.Max);
                        },
                        AddToCartDisabled: function () {
                            return this.Loading ||
                                !this.Product.DefaultListPrice ||
                                !this.IsAvailableToSell ||
                                this.IsUnavailableVariant ||
                                (!this.IsAuthenticated && self.recurringMode === RecurringMode.Recurring);
                        }
                    },
                    methods: {
                        onSelectedVariantIdChanged: function (result) {
                            var _this = this;
                            var selectedSku = result.data.selectedSku;
                            self.inventoryService.isAvailableToSell(selectedSku)
                                .then(function (isAvailableToSell) { return _this.IsAvailableToSell = isAvailableToSell; });
                        },
                        addItemToCart: function (event) {
                            var _this = this;
                            if (this.Loading)
                                return;
                            this.Loading = true;
                            var FrequencyName = self.getRecurringData().FrequencyName;
                            var _a = this.Product, selectedVariantId = _a.selectedVariantId, ListPrice = _a.ListPrice;
                            self.cartService.addLineItem(this.Product, selectedVariantId, ListPrice, this.Quantity, this.getListNameForAnalytics(), FrequencyName)
                                .then(function () {
                                self.onAddLineItemSuccess();
                            }, function (reason) {
                                self.onAddLineItemFailed(reason);
                                throw reason;
                            })
                                .fin(function () {
                                _this.Loading = false;
                                _this.Quantity = _this.Cart.QuantityRange.Min;
                            });
                        },
                        updateQuantity: function (quantity) {
                            if (this.Cart.QuantityRange) {
                                var _a = this.Cart.QuantityRange, Min = _a.Min, Max = _a.Max;
                                this.Quantity = Math.min(Math.max(Min, quantity), Max);
                            }
                        }
                    }
                });
            };
            ProductDetailController.prototype.initAddToWishListVueComponent = function (authVm, wishListVm) {
                var elId = 'vueAddProductToWishList';
                var el = document.getElementById(elId);
                if (!el)
                    return;
                var product = this.context.viewModel;
                var self = this;
                var vueWishList = new Vue({
                    el: '#' + elId,
                    data: {
                        IsAuthenticated: authVm.IsAuthenticated,
                        Product: product,
                        WishList: wishListVm,
                        Loading: false
                    },
                    mounted: function () {
                        self.eventHub.subscribe(Composer.ProductEvents.WishListUpdated, this.onWishListUpdated);
                    },
                    computed: {
                        WishListItem: function () {
                            var _this = this;
                            return _.find(this.WishList.Items, function (i) {
                                return i.ProductId === _this.Product.productId && i.VariantId == _this.Product.selectedVariantId;
                            });
                        },
                        IsUnavailableVariant: function () {
                            return $.isArray(this.Product.allVariants) && !this.Product.selectedVariantId;
                        }
                    },
                    methods: {
                        onWishListUpdated: function (result) {
                            this.WishList = result.data;
                        },
                        addLineItemToWishList: function () {
                            var _this = this;
                            if (this.Loading)
                                return;
                            if (!this.IsAuthenticated) {
                                return self.redirectToSignInBeforeAddToWishList();
                            }
                            this.Loading = true;
                            var _a = this.Product, DisplayName = _a.DisplayName, ProductId = _a.ProductId, selectedVariantId = _a.selectedVariantId, ListPrice = _a.ListPrice, RecurringOrderProgramName = _a.RecurringOrderProgramName;
                            self.eventHub.publish('wishListLineItemAdding', {
                                data: { DisplayName: DisplayName, ListPrice: ListPrice }
                            });
                            self._wishListService.addLineItem(ProductId, selectedVariantId, 1, null, RecurringOrderProgramName)
                                .fin(function () { return _this.Loading = false; });
                        },
                        removeLineItemFromWishList: function () {
                            var _this = this;
                            if (this.Loading)
                                return;
                            if (!this.IsAuthenticated) {
                                return self.redirectToSignInBeforeAddToWishList();
                            }
                            this.Loading = true;
                            self._wishListService.removeLineItem(this.WishListItem.Id)
                                .fin(function () { return _this.Loading = false; });
                        }
                    }
                });
            };
            ProductDetailController.prototype.initKvaSelectVueComponent = function () {
                var elId = 'vueKvaList';
                var el = document.getElementById(elId);
                if (!el)
                    return;
                var self = this;
                $('[data-toggle="popover"]').popover({
                    placement: "top"
                });
                new Vue({
                    el: "#" + elId,
                    data: {
                        dataUpdatedTracker: 1
                    },
                    computed: {
                        KvaAttributeItems: function () {
                            return this.dataUpdatedTracker && self.context.viewModel.keyVariantAttributeItems;
                        }
                    },
                    mounted: function () {
                        self.eventHub.subscribe(self.concern + 'SelectedVariantIdChanged', this.onSelectedVariantIdChanged);
                    },
                    methods: {
                        onSelectedVariantIdChanged: function (result) {
                            this.dataUpdatedTracker += 1;
                        },
                        KvaColorStyle: function (value) {
                            var colorStyle = value.ConfiguredValue ? { "background": value.ConfiguredValue } : { "background": value.Value };
                            return colorStyle;
                        },
                        onMouseover: function (event) {
                            var target = $(event.target);
                            $(target).popover('show');
                        },
                        onMouseleave: function (event) {
                            var target = $(event.target);
                            $(target).popover('hide');
                        },
                        changeKva: function (event) {
                            //target is kva-color (outter div of the color swatch)
                            var isColor = event.target.classList.contains("kva-color");
                            //target is kva-property (outter 'property' button)
                            var isProperty = event.target.classList.contains("kva-property");
                            var target = event.target;
                            if (isColor) {
                                target = event.target.getElementsByClassName('kva-color-value')[0];
                            }
                            else if (isProperty) {
                                target = event.target.getElementsByClassName('kva-property-value')[0];
                            }
                            // we don't accept clicks if the button is disabled
                            if (target.parentElement.classList.contains("disabled"))
                                return;
                            // set element value in jquery for the parent ProductController's use
                            $(target).val($(target.parentElement).attr('value'));
                            self.selectKva({ elementContext: $(target), event: event });
                        },
                    }
                });
            };
            ProductDetailController.prototype.getListNameForAnalytics = function () {
                return 'Detail';
            };
            ProductDetailController.prototype.notifyAnalyticsOfProductDetailsImpression = function () {
                var product = this.context.viewModel;
                product.Variants = product.allVariants;
                var data = Composer.ProductsHelper.getProductDataForAnalytics(product, product.selectedVariantId, product.ListPrice, this.getListNameForAnalytics());
                this.publishProductImpressionEvent(data);
            };
            ProductDetailController.prototype.publishProductImpressionEvent = function (data) {
                this.eventHub.publish('productDetailsRendered', { data: data });
            };
            ProductDetailController.prototype.onSelectedVariantIdChanged = function (e) {
                var _this = this;
                var varId = e.data.selectedVariantId || e.data.displayVariantId || 'unavailable';
                var all = $('[data-variant]');
                $.each(all, function (index, el) {
                    var $el = $(el);
                    var vIds = $el.data('variant').toString().split(',');
                    if (vIds.indexOf(varId) >= 0) {
                        _this.handleHiddenImages($el);
                        $el.removeClass('d-none');
                    }
                    else {
                        $el.addClass('d-none');
                    }
                });
            };
            ProductDetailController.prototype.handleHiddenImages = function (el) {
                el.find('img').each(function (index, img) {
                    if (!$(img).attr('src')) {
                        $(img).attr('src', $(img).data('src'));
                    }
                });
            };
            ProductDetailController.prototype.onPricesChanged = function (e) {
                var vm = this.isProductWithVariants() && this.isSelectedVariantUnavailable() ? null : e.data;
                this.render('PriceDiscount', vm);
            };
            ProductDetailController.prototype.selectKva = function (actionContext) {
                var currentSelectedVariantId = this.context.viewModel.selectedVariantId;
                _super.prototype.selectKva.call(this, actionContext);
                //IE8 check
                if (history) {
                    this.replaceHistory(currentSelectedVariantId);
                }
            };
            ProductDetailController.prototype.replaceHistory = function (previousSelectedVariantId) {
                var variantId = this.context.viewModel.selectedVariantId;
                if (variantId === null && previousSelectedVariantId === null) {
                    return;
                }
                var pathArray = window.location.pathname.split('/').filter(Boolean);
                var prevVariantIdIndex = pathArray.lastIndexOf(previousSelectedVariantId); //Variant id should be at the foremost right
                if (variantId === null) {
                    if (prevVariantIdIndex !== -1) {
                        pathArray.splice(prevVariantIdIndex, 1);
                    }
                }
                else if (prevVariantIdIndex === -1) {
                    //We couldn't find the variant id in the path, which means the PDP was accessed without a variant in the URL.
                    //In that case, we add it right after the product id in the URL. If for some aweful reason the product id is not found,
                    //add the variant id at the end.
                    var productIdIndex = pathArray.indexOf(this.context.viewModel.productId);
                    pathArray.splice(productIdIndex === -1 ? pathArray.length : productIdIndex + 1, 0, variantId);
                }
                else {
                    //Replace the old variant id with the new one
                    pathArray[prevVariantIdIndex] = variantId;
                }
                var _a = window.location, protocol = _a.protocol, host = _a.host;
                var builtPath = protocol + "//" + host + this.productService.buildUrlPath(pathArray);
                history.replaceState({}, null, builtPath);
            };
            ProductDetailController.prototype.onRecurringOrderFrequencySelectChanged = function (actionContext) {
                var element = actionContext.elementContext[0], option = element.options[element.selectedIndex];
                if (option) {
                    this.selectedRecurringOrderFrequencyName = option.value === '' ? null : option.value;
                }
            };
            ProductDetailController.prototype.changeRecurringMode = function (actionContext) {
                var container$ = actionContext.elementContext.closest('.js-recurringModes');
                container$.find('.js-recurringModeRow.selected').removeClass('selected');
                actionContext.elementContext.closest('.js-recurringModeRow').addClass('selected');
                $('.modeSelection').collapse('toggle');
                this.recurringMode = actionContext.elementContext.val();
            };
            ProductDetailController.prototype.getRecurringData = function () {
                var FrequencyName = this.recurringMode === RecurringMode.Single ? null : this.selectedRecurringOrderFrequencyName;
                var RecurringProgramName = this.context.viewModel.RecurringOrderProgramName;
                return { FrequencyName: FrequencyName, RecurringProgramName: RecurringProgramName };
            };
            return ProductDetailController;
        }(Orckestra.Composer.ProductController));
        Composer.ProductDetailController = ProductDetailController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../Product/ProductController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var ProductZoomController = /** @class */ (function (_super) {
            __extends(ProductZoomController, _super);
            function ProductZoomController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.allImages = {};
                return _this;
            }
            ProductZoomController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.initZoom();
                this.eventHub.subscribe('productDetailSelectedVariantIdChanged', function (e) { return _this.updateModalImages(e); });
            };
            ProductZoomController.prototype.openZoom = function (event) {
                event.preventDefault();
                $('.modal-fullscreen').modal();
            };
            ProductZoomController.prototype.changeZoomedImage = function (event) {
                var context$ = $(event.target), largeImage = document.querySelector('.js-zoom-image'), selector = event.target.tagName, // Clicked HTML element
                $largeImage = $(largeImage);
                event.preventDefault();
                if (selector.toLocaleLowerCase() === 'img') {
                    var src = context$.attr('data-zoom-src');
                    $('.js-zoom-thumbnails').find('a').removeClass('active');
                    context$.parent().addClass('active');
                    $largeImage.attr('src', src);
                }
            };
            ProductZoomController.prototype.errorZoomedImage = function (event) {
                var $element = $(event.target), fallbackImageUrl = $element.attr('data-fallback-image-url');
                $element.attr('src', fallbackImageUrl);
            };
            ProductZoomController.prototype.initZoom = function () {
                var _this = this;
                $(document).on('click', '.js-zoom', function (event) { return _this.openZoom(event); });
                $(document).on('click', '.js-zoom-thumbnails', function (event) { return _this.changeZoomedImage(event); });
                $('.js-zoom-image').on('error', function (event) { return _this.errorZoomedImage(event); });
            };
            ProductZoomController.prototype.updateModalImages = function (e) {
                $('.js-zoom-thumbnails').html('');
                $('.js-thumbnails[data-variant="' + e.data.selectedVariantId + '"]').find('a').each(function (index, el) {
                    $(el).clone().appendTo('.js-zoom-thumbnails');
                    if ($(el).hasClass('active')) {
                        var img = $(el).find('img');
                        if ($(img).attr('src')) {
                            $(img).click();
                        }
                    }
                });
            };
            return ProductZoomController;
        }(Orckestra.Composer.ProductController));
        Composer.ProductZoomController = ProductZoomController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Composer.MyAccount/ReturningCustomer/ReturningCustomerController.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var RecurringOrderSignInFormController = /** @class */ (function (_super) {
            __extends(RecurringOrderSignInFormController, _super);
            function RecurringOrderSignInFormController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RecurringOrderSignInFormController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.returnUrl = this.context.container.data('product-url');
            };
            RecurringOrderSignInFormController.prototype.loginImpl = function (actionContext) {
                var formData = actionContext.elementContext.serializeObject();
                return this.membershipService.login(formData, this.returnUrl);
            };
            return RecurringOrderSignInFormController;
        }(Composer.ReturningCustomerController));
        Composer.RecurringOrderSignInFormController = RecurringOrderSignInFormController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../../Typings/tsd.d.ts' />
/// <reference path='../../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
/// <reference path='../../../Mvc/Controller.ts' />
/// <reference path='../../../Mvc/IControllerActionContext.ts' />
/// <reference path='../../../Mvc/IControllerContext.ts' />
///<reference path='../../../Mvc/IControllerActionContext.ts' />
/// <reference path='../../../Events/IEventHub.ts' />
/// <reference path='../../../System/IDisposable.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SliderService = /** @class */ (function () {
            function SliderService(context, eventHub) {
                this.context = context;
                this.eventHub = eventHub;
                this.context = context;
            }
            SliderService.prototype.initialize = function (selectedValues) {
                this.applyButtonContext = this.context.find(':submit');
                this.mapData(this.context.data());
                this.initializeSlider(selectedValues);
            };
            SliderService.prototype.dispose = function () {
                this.sliderInstance.destroy();
            };
            SliderService.prototype.mapData = function (containerData) {
                this.step = containerData.step || 1;
                this.maxLabel = containerData.maxLabel;
                this.maxValue = containerData.max;
                this.minValue = containerData.min;
                this.facetFieldName = containerData.facetfieldname;
            };
            SliderService.prototype.dirtied = function () {
                this.applyButtonContext.prop('disabled', false);
            };
            /**
             * Formatting for the formatted values of the slider. When getting.
             */
            SliderService.prototype.formatFrom = function (value) {
                if (this.maxLabel && value === this.maxLabel) {
                    value = this.maxValue;
                }
                return value;
            };
            /**
             * Formatting for the formatted values of the slider. When setting.
             */
            SliderService.prototype.formatTo = function (value) {
                value = parseInt(value, 10) || 0;
                if (this.maxLabel && value === this.maxValue) {
                    value = this.maxLabel;
                }
                return value;
            };
            SliderService.prototype.initializeSlider = function (facetData) {
                var _this = this;
                var sliderElement = this.context.find('.range').get(0);
                var defaultRange = [this.minValue, this.maxValue];
                var startRange = defaultRange;
                var selectedRange;
                var lowerRangeContext = this.context.find('.js-lowerValue');
                var upperRangeContext = this.context.find('.js-higherValue');
                // TODO handle array or not array
                if (facetData) {
                    selectedRange = facetData.split('|');
                    startRange = defaultRange.map(function (value, index) {
                        return selectedRange[index] ? selectedRange[index] : defaultRange[index];
                    });
                }
                this.sliderInstance = this.createSlider(startRange, sliderElement);
                this.sliderInstance.on('set', function (values, handle) {
                    _this.dirtied();
                });
                this.sliderInstance.on('update', function (values, handle) {
                    lowerRangeContext.val(values[0]);
                    upperRangeContext.val(values[1]);
                });
                lowerRangeContext.on('keyup', function (event) { return _this.dirtied(); });
                upperRangeContext.on('keyup', function (event) { return _this.dirtied(); });
                lowerRangeContext.on('blur', function (event) { return _this.sliderInstance.set([$(event.target).val(), null]); });
                upperRangeContext.on('blur', function (event) { return _this.sliderInstance.set([null, $(event.target).val()]); });
            };
            SliderService.prototype.createSlider = function (startRange, sliderElement) {
                var _this = this;
                noUiSlider.create(sliderElement, {
                    start: startRange,
                    connect: true,
                    margin: this.step,
                    step: this.step,
                    range: {
                        'min': this.minValue,
                        'max': this.maxValue
                    },
                    format: {
                        to: function (value) { return _this.formatTo(value); },
                        from: function (value) { return _this.formatFrom(value); }
                    }
                });
                return sliderElement.noUiSlider;
            };
            SliderService.prototype.getKey = function () {
                return this.facetFieldName;
            };
            SliderService.prototype.getValues = function () {
                var values = this.sliderInstance.get();
                if (values[1] === this.maxLabel) {
                    values[1] = undefined;
                }
                return values;
            };
            return SliderService;
        }());
        Composer.SliderService = SliderService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var UrlHelper = /** @class */ (function () {
            function UrlHelper() {
            }
            UrlHelper.resolvePageType = function () {
                if (window.location.href.indexOf('keywords') !== -1) {
                    return 'search';
                }
                else {
                    return 'browse';
                }
            };
            return UrlHelper;
        }());
        Composer.UrlHelper = UrlHelper;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../../Typings/vue/index.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var FacetTreeVueComponent = /** @class */ (function () {
            function FacetTreeVueComponent() {
            }
            FacetTreeVueComponent.initialize = function () {
                Vue.component(this.componentName, this.getComponent());
            };
            FacetTreeVueComponent.getComponent = function () {
                return {
                    name: FacetTreeVueComponent.componentName,
                    components: {},
                    props: {
                        nodeсlicked: {
                            type: Function,
                            required: false,
                        },
                        loading: {
                            type: Boolean,
                            required: false
                        },
                        node: {
                            type: Object,
                            required: false
                        },
                        parentnode: {
                            type: Object,
                            required: false
                        },
                        showmoretext: {
                            type: String,
                            required: false
                        },
                        showlesstext: {
                            type: String,
                            required: false
                        },
                        categoryid: {
                            type: String,
                            required: false
                        }
                    },
                    computed: {
                        currentNode: function () {
                            return this.node ? this.node : this.parentnode;
                        },
                        hasChildren: function () {
                            var ChildNodes = this.currentNode.ChildNodes;
                            return ChildNodes && ChildNodes.length > 0;
                        },
                        visibleNodes: function () {
                            var _a = this.currentNode, ChildNodes = _a.ChildNodes, MaxCollapsedCount = _a.MaxCollapsedCount;
                            return this.isSelectedInColapsed ? ChildNodes : ChildNodes.slice(0, MaxCollapsedCount);
                        },
                        collapsedNodes: function () {
                            var _a = this.currentNode, ChildNodes = _a.ChildNodes, MaxCollapsedCount = _a.MaxCollapsedCount, MaxExpandedCount = _a.MaxExpandedCount;
                            return this.isSelectedInColapsed ? [] : ChildNodes.slice(MaxCollapsedCount, MaxExpandedCount);
                        },
                        isSelectedInColapsed: function () {
                            var _a = this.currentNode, ChildNodes = _a.ChildNodes, MaxCollapsedCount = _a.MaxCollapsedCount;
                            return ChildNodes.map(function (e) { return e.IsSelected; }).lastIndexOf(true) >= MaxCollapsedCount;
                        }
                    },
                    methods: {
                        isHighlighted: function (facet) {
                            return facet.IsSelected && (!facet.ChildNodes || facet.ChildNodes.every(function (child) { return !child.IsSelected; }));
                        }
                    },
                    mounted: function () {
                    },
                    template: "\n                 \n                <div class=\"mb-1\"\n                    :class=\"{'form-check': !!node }\"\n                    :data-facetfieldname=\"node?.FieldName\"\n                    :data-facettype=\"node?.FacetType\">\n                    <label v-if=\"node\" \n                        class=\"m-0\" :class=\"{'selected': node.IsSelected, 'highlighted': isHighlighted(node)}\">\n                        <input v-if=\"node.FacetType == 'MultiSelect'\"\n                            type=\"checkbox\"\n                            :disabled=\"!node.IsRemovable\"\n                            class=\"form-check-input\"\n                            :name=\"node.FieldName + '[]'\"\n                            :value=\"node.Value\"\n                            :data-type=\"node.FacetType\"\n                            :data-facetfieldname=\"node.FieldName\"\n                            :data-facetvalue=\"node.Value\"\n                            :data-categoryid=\"node.CategoryId\"\n                            :checked=\"node.IsSelected\"\n                            :data-selected=\"node.IsSelected\"\n                            v-on:click=\"(event) => node\u0441licked(event, node.IsSelected)\" \n                        />\n                        <input v-else-if=\"node.FacetType == 'SingleSelect'\"\n                            type=\"checkbox\"\n                            :disabled=\"!node.IsRemovable\"\n                            class=\"form-check-input\"\n                            :name=\"node.FieldName\"\n                            :data-facetfieldname=\"node.FieldName\"\n                            :data-facetvalue=\"node.Value\"\n                            :value=\"node.Value\"\n                            :data-type=\"node.FacetType\"\n                            :data-categoryid=\"node.CategoryId\"\n                            :checked=\"node.IsSelected\"\n                            :data-selected=\"node.IsSelected\"\n                            v-on:click=\"(event) => node\u0441licked(event, node.IsSelected)\" \n                        />\n                        <span v-html=\"node.Title\"></span> <span>({{node.Quantity}})</span>\n                    </label>\n\n                <div v-if=\"hasChildren\">\n                  <facets-tree\n                     v-for=\"childNode in visibleNodes\"\n                        :key=\"childNode.CategoryId\"\n                        :node=\"childNode\"\n                        :parentnode=\"currentNode\"\n                        :node\u0441licked=\"node\u0441licked\"\n                        :showmoretext=\"showmoretext\"\n                        :showlesstext=\"showlesstext\"\n                        :categoryid=\"categoryid\"   />              \n                  <div v-if=\"collapsedNodes.length\" >\n                  <div class=\"collapse\" :id=\"'onDemandFacets-' + currentNode.FieldName\">\n                    <facets-tree\n                        v-for=\"childNode in collapsedNodes\"\n                        :key=\"childNode.CategoryId\"\n                        :node=\"childNode\"\n                        :parentnode=\"currentNode\"\n                        :node\u0441licked=\"node\u0441licked\"\n                        :showmoretext=\"showmoretext\"\n                        :showlesstext=\"showlesstext\"\n                        :categoryid=\"categoryid\"                  \n                    />\n                    </div>\n                    <a class=\"btn  btn-link  collapsed  font-weight-bold\" \n                        data-toggle=\"collapse\" \n                        :data-target=\"'#onDemandFacets-' + currentNode.FieldName\">\n                        <span class=\"more\">{{showmoretext}} <i class=\"fa fa-angle-down\" /></span>\n                        <span class=\"less\">{{showlesstext}} <i class=\"fa fa-angle-up\" /></span>\n                    </a>\n                  </div>\n                </div>\n              </div>"
                };
            };
            FacetTreeVueComponent.componentName = 'facets-tree';
            return FacetTreeVueComponent;
        }());
        Composer.FacetTreeVueComponent = FacetTreeVueComponent;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
/// <reference path='../../Mvc/Controller.ts' />
/// <reference path='../../Mvc/IControllerActionContext.ts' />
/// <reference path='../../Mvc/IControllerContext.ts' />
/// <reference path='./Services/SearchService.ts' />
/// <reference path='./Services/ISearchService.ts' />
/// <reference path='./Services/SliderService.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
/// <reference path='./UrlHelper.ts' />
/// <reference path='./Facets/FacetTreeVueComponent.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var FacetSearchController = /** @class */ (function (_super) {
            __extends(FacetSearchController, _super);
            function FacetSearchController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._debounceTimeout = 500;
                _this.sliderServicesInstances = {};
                return _this;
            }
            FacetSearchController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeVueComponent();
            };
            FacetSearchController.prototype.initializeVueComponent = function () {
                var _a;
                var _b = this.context.viewModel, CategoryFacetValuesTree = _b.CategoryFacetValuesTree, Facets = _b.Facets, PromotedFacetValues = _b.PromotedFacetValues, SelectedFacets = _b.SelectedFacets;
                var self = this;
                this.VueFacets = new Vue({
                    el: '#vueSearchFacets',
                    components: (_a = {},
                        _a[Composer.FacetTreeVueComponent.componentName] = Composer.FacetTreeVueComponent.getComponent(),
                        _a),
                    data: {
                        CategoryFacetValuesTree: CategoryFacetValuesTree,
                        Facets: Facets,
                        PromotedFacetValues: PromotedFacetValues,
                        Mode: {
                            Loading: false
                        }
                    },
                    mounted: function () {
                        self.initializeServices();
                        self.eventHub.subscribe(Composer.SearchEvents.FacetsLoaded, this.onFacetsLoaded);
                        self.eventHub.subscribe(Composer.SearchEvents.SearchResultsLoaded, this.onFacetsLoaded);
                    },
                    methods: {
                        onFacetsLoaded: function (_a) {
                            var data = _a.data;
                            this.CategoryFacetValuesTree = data.FacetSettings.CategoryFacetValuesTree;
                            this.Facets = data.ProductSearchResults.Facets;
                            self._searchService.updateFacetRegistry(self.buildFacetRegistry());
                        },
                        categoryFacetChanged: function (event, isSelected) {
                            self.categoryFacetChanged(event, isSelected);
                        },
                        IsValuesCollapsed: function (facet) {
                            return facet.OnDemandFacetValues.findIndex(function (n) { return n.IsSelected; }) < 0;
                        }
                    },
                    updated: function () {
                        self.disposeRangeSlider();
                        self.initializeRangeSlider();
                    }
                });
            };
            FacetSearchController.prototype.multiFacetChanged = function (actionContext) {
                var _this = this;
                if (!_.isEmpty(this._debounceHandle)) {
                    this._debounceHandle.cancel();
                }
                var anchorContext = actionContext.elementContext, facetKey = anchorContext.attr('name'), facetValue = anchorContext.attr('value');
                this._debounceHandle = _.debounce(function () {
                    _this.publishMultiFacetChanged(facetKey, facetValue, Composer.UrlHelper.resolvePageType());
                }, 800);
                this._debounceHandle();
            };
            FacetSearchController.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
                this.disposeRangeSlider();
            };
            FacetSearchController.prototype.disposeRangeSlider = function () {
                var _this = this;
                Object.keys(this.sliderServicesInstances).forEach(function (sliderServiceKey) { return _this.sliderServicesInstances[sliderServiceKey].dispose(); });
            };
            FacetSearchController.prototype.categoryFacetChanged = function (event, isSelected) {
                var _this = this;
                var el = event.target, facetKey = el.dataset.facetfieldname, facetType = el.dataset.type, facetValue = el.dataset.facetvalue;
                if (facetType === 'SingleSelect') {
                    if (isSelected) {
                        var checkedItems = $(el).parent().parent().find('[data-selected=true]');
                        var data = [];
                        checkedItems.each(function (index) {
                            var el = $(checkedItems[index]);
                            el[0]['checked'] = false;
                            data.push({
                                facetFieldName: el.data('facetfieldname'),
                                facetValue: el.data('facetvalue'),
                                facetType: el.data('type'),
                            });
                        });
                        this.eventHub.publish(Composer.SearchEvents.FacetsRemoved, { data: data });
                    }
                    else {
                        var parentDiv = $(el).parent().parent();
                        parentDiv.parent().find('input:checked').each(function (index, el) {
                            if (el.dataset.selected) {
                                el['checked'] = false;
                            }
                        });
                        this.publishSingleFacetsChanged(facetKey, facetValue, Composer.UrlHelper.resolvePageType());
                    }
                }
                if (facetType === 'MultiSelect') {
                    if (!_.isEmpty(this._debounceHandle)) {
                        this._debounceHandle.cancel();
                    }
                    this._debounceHandle = _.debounce(function () {
                        _this.publishMultiFacetChanged(facetKey, facetValue, Composer.UrlHelper.resolvePageType());
                    }, 800);
                    this._debounceHandle();
                }
            };
            FacetSearchController.prototype.singleFacetChanged = function (actionContext) {
                var anchorContext = actionContext.elementContext, facetKey = anchorContext.data('facetfieldname'), facetValue = anchorContext.data('facetvalue'), facetType = anchorContext.data('type'), isSelected = anchorContext.data('selected');
                actionContext.event.preventDefault();
                actionContext.event.stopPropagation();
                if (isSelected) {
                    anchorContext.removeClass('selected');
                    var data = {
                        facetFieldName: facetKey,
                        facetValue: facetValue,
                        facetType: facetType
                    };
                    this.eventHub.publish(Composer.SearchEvents.FacetRemoved, { data: data });
                }
                else {
                    var parentDiv = anchorContext.parent().parent();
                    parentDiv.find('a').removeClass('selected');
                    anchorContext.addClass('selected');
                    this.publishSingleFacetsChanged(facetKey, facetValue, Composer.UrlHelper.resolvePageType());
                }
            };
            FacetSearchController.prototype.publishSingleFacetsChanged = function (facetKey, facetValue, pageType) {
                this.eventHub.publish('singleFacetsChanged', {
                    data: {
                        facetKey: facetKey,
                        facetValue: facetValue,
                        pageType: pageType
                    }
                });
            };
            FacetSearchController.prototype.publishMultiFacetChanged = function (facetKey, facetValue, pageType) {
                this.eventHub.publish(Composer.SearchEvents.MultiFacetChanged, {
                    data: {
                        facetKey: facetKey,
                        facetValue: facetValue,
                        pageType: pageType,
                        filter: $('form[name="searchFacets"]', this.context.container).serializeObject()
                    }
                });
            };
            FacetSearchController.prototype.refineByRange = function (actionContext) {
                actionContext.event.preventDefault();
                var container = actionContext.elementContext.closest('[data-facetfieldname]');
                var sliderServiceInstance = this.sliderServicesInstances[container.data('facetfieldname')];
                var values = sliderServiceInstance.getValues();
                var key = sliderServiceInstance.getKey();
                this.publishSingleFacetsChanged(key, values.join('|'), Composer.UrlHelper.resolvePageType());
            };
            FacetSearchController.prototype.initializeServices = function () {
                var correctedSearchTerm = this.context.container.attr('data-corrected-search-term');
                var categoryId = this.context.container.attr('data-categoryId');
                var queryName = this.context.container.attr('data-queryName');
                var queryType = this.context.container.attr('data-queryType');
                this._searchService = new Composer.SearchService(this.eventHub, window);
                this._searchService.initialize({
                    facetRegistry: this.buildFacetRegistry(),
                    correctedSearchTerm: correctedSearchTerm,
                    categoryId: categoryId,
                    queryName: queryName,
                    queryType: queryType
                });
                this.initializeRangeSlider();
            };
            FacetSearchController.prototype.initializeRangeSlider = function () {
                var _this = this;
                var selectedFacets = this._searchService.getSelectedFacets();
                this.context.container.find('[data-facettype="Range"]').each(function (index, element) {
                    var facetFieldName = element.dataset.facetfieldname;
                    var serviceInstance = new Composer.SliderService($(element), _this.eventHub);
                    serviceInstance.initialize(selectedFacets[facetFieldName]);
                    _this.sliderServicesInstances[facetFieldName] = serviceInstance;
                });
            };
            FacetSearchController.prototype.buildFacetRegistry = function () {
                var facetRegistry = {};
                $('[data-facettype]', this.context.container)
                    .add($('#selectedFacets [data-facetfieldname]', this.context.container))
                    .each(function (index, item) {
                    var facetType, facetFieldName, facetGroup = $(item);
                    facetFieldName = facetGroup.data('facetfieldname');
                    facetType = facetGroup.data('facettype').toLowerCase();
                    facetRegistry[facetFieldName] = facetType;
                });
                return facetRegistry;
            };
            FacetSearchController.prototype.addSingleSelectCategory = function (actionContext) {
                var singleSelectCategory = actionContext.elementContext, anchorContext = actionContext.elementContext, facetFieldName = anchorContext.data('facetfieldname'), facetValue = anchorContext.data('facetvalue');
                actionContext.event.preventDefault();
                actionContext.event.stopPropagation();
                this.eventHub.publish('singleCategoryAdded', {
                    data: {
                        categoryUrl: singleSelectCategory.data('categoryurl'),
                        facetKey: facetFieldName,
                        facetValue: facetValue,
                        pageType: Composer.UrlHelper.resolvePageType()
                    }
                });
            };
            return FacetSearchController;
        }(Orckestra.Composer.Controller));
        Composer.FacetSearchController = FacetSearchController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../../Typings/vue/index.d.ts' />
/// <reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
/// <reference path='../../Mvc/Controller.ts' />
/// <reference path='../../ErrorHandling/ErrorHandler.ts' />
/// <reference path='../../Mvc/IControllerActionContext.ts' />
/// <reference path='../../Mvc/IControllerContext.ts' />
/// <reference path='../../Repositories/CartRepository.ts' />
/// <reference path='../../Composer.Cart/CartSummary/CartService.ts' />
/// <reference path='../Product/ProductService.ts' />
///<reference path='../../Repositories/ISearchRepository.ts' />
///<reference path='../../Repositories/SearchRepository.ts' />
/// <reference path='./UrlHelper.ts' />
/// <reference path='../ProductEvents.ts' />
/// <reference path='./Constants/SearchEvents.ts' />
/// <reference path='../Product/InventoryService.ts' />
///<reference path='../../Composer.MyAccount/Common/IMembershipService.ts' />
///<reference path='../../Composer.MyAccount/Common/MembershipService.ts' />
/// <reference path='./Services/ShowFacetsService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SearchResultsController = /** @class */ (function (_super) {
            __extends(SearchResultsController, _super);
            function SearchResultsController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.cartService = Composer.CartService.getInstance();
                _this.wishListService = new Composer.WishListService(new Composer.WishListRepository(), _this.eventHub);
                _this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                _this.inventoryService = new Composer.InventoryService();
                _this.productService = new Composer.ProductService(_this.eventHub, _this.context);
                _this.showFacetsService = Composer.ShowFacetsService.instance();
                _this.searchRepository = new Composer.SearchRepository();
                return _this;
            }
            SearchResultsController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                var getWithListTask = this.wishListService.getWishListSummary();
                var authenticatedPromise = this.membershipService.isAuthenticated();
                Q.all([authenticatedPromise, getWithListTask]).spread(function (authVm, wishList) { return _this.initializeVueComponent(wishList, authVm); });
            };
            SearchResultsController.prototype.initializeVueComponent = function (wishlist, authVm) {
                var _a = this.context.viewModel, ProductSearchResults = _a.ProductSearchResults, ListName = _a.ListName, MaxItemsPerPage = _a.MaxItemsPerPage;
                this.sendSearchResultsForAnalytics(ProductSearchResults, ListName, MaxItemsPerPage);
                var self = this;
                $('[data-toggle="popover"]').popover({
                    placement: "top"
                });
                this.vueSearchResults = new Vue({
                    el: "#" + this.context.container.data('vueid'),
                    components: {},
                    data: __assign({}, ProductSearchResults, { ListName: ListName,
                        MaxItemsPerPage: MaxItemsPerPage, isLoading: false, dataUpdatedTracker: 1, ProductsMap: {}, WishList: wishlist, IsAuthenticated: authVm.IsAuthenticated, ActiveProductId: undefined, FacetsVisible: true, SelectedFacets: Composer.SearchService.getInstance() ? Composer.SearchService.getInstance().getSelectedFacets() : {} }),
                    mounted: function () {
                        var _this = this;
                        this.registerSubscriptions();
                        self.showFacetsService.getShowFacets().then(function (value) {
                            _this.FacetsVisible = value;
                            if (!value)
                                _this.hideFacet(true); // as an intial setup we hide the facet and ask for an update to be made 
                        }, function (error) {
                            self.showFacetsService.setShowFacets(true);
                        });
                    },
                    computed: {
                        SearchResultsData: function () {
                            var _this = this;
                            // By using `dataUpdatedTracker` we tell Vue that this property depends on it,
                            // so it gets re-evaluated whenever `dataUpdatedTracker` changes
                            var results = _.map(this.SearchResults, function (product) {
                                product.WishListItem = _this.WishList && _this.WishList.Items.find(function (i) { return i.ProductId === product.ProductId && i.VariantId == product.VariantId; });
                                return product;
                            });
                            return this.dataUpdatedTracker && results;
                        }
                    },
                    updated: function () {
                        this.updateProductColumns();
                    },
                    methods: {
                        getFacetsCount: function () {
                            var _this = this;
                            var getCount = function (prev, next) { return prev + (Array.isArray(_this.SelectedFacets[next]) ? _this.SelectedFacets[next].length : 1); };
                            return Object.keys(this.SelectedFacets).reduce(getCount, 0);
                        },
                        hideFacet: function (update) {
                            if (update === void 0) { update = false; }
                            document.getElementById("leftCol").classList.add("w-0-lg");
                            document.getElementById("rightCol").classList.remove("col-lg-9");
                            if (update)
                                this.FacetsVisible = false; // setting this will trigger the "updated" function above only if requested
                        },
                        showFacet: function () {
                            document.getElementById("leftCol").classList.remove("w-0-lg");
                            document.getElementById("rightCol").classList.add("col-lg-9");
                        },
                        toggleFacet: function () {
                            if (this.FacetsVisible) {
                                this.hideFacet();
                            }
                            else {
                                this.showFacet();
                            }
                            this.FacetsVisible = !this.FacetsVisible; // setting this will trigger the "updated" function above
                            self.showFacetsService.setShowFacets(this.FacetsVisible);
                        },
                        updateProductColumns: function () {
                            if (document.getElementById('vueSearchFacets') === null)
                                return;
                            var productColContainer = document.getElementsByClassName("product-col-container");
                            if (this.FacetsVisible) {
                                for (var i = 0; i < productColContainer.length; i++) {
                                    productColContainer[i].classList.replace("col-md-3", "col-md-4");
                                    productColContainer[i].classList.replace("col-xl-3", "col-xl-4");
                                }
                            }
                            else {
                                for (var i = 0; i < productColContainer.length; i++) {
                                    productColContainer[i].classList.replace("col-md-4", "col-md-3");
                                    productColContainer[i].classList.replace("col-xl-4", "col-xl-3");
                                }
                            }
                        },
                        getKeyVariantDisplayName: function (id, kvaName) {
                            var product = this.ProductsMap[id];
                            return Composer.ProductsHelper.getKeyVariantDisplayName(product, kvaName);
                        },
                        requireSelection: function (searchProduct, kvaName) {
                            var product = this.ProductsMap[searchProduct.ProductId];
                            return Composer.ProductsHelper.isSize(kvaName) ? !product.SizeSelected : false;
                        },
                        getKeyVariantValues: function (id, kvaName) {
                            var product = this.ProductsMap[id];
                            return Composer.ProductsHelper.getKeyVariantValues(product, kvaName, Composer.ProductsHelper.isSize(kvaName) ? !product.SizeSelected : false);
                        },
                        refreshData: function () {
                            this.dataUpdatedTracker += 1;
                        },
                        onMouseover: function (searchProduct) {
                            var _this = this;
                            var ProductId = searchProduct.ProductId, VariantId = searchProduct.VariantId, HasVariants = searchProduct.HasVariants;
                            if (this.ActiveProductId)
                                return;
                            this.ActiveProductId = ProductId;
                            if (!HasVariants || this.ProductsMap[ProductId])
                                return;
                            this.loadingProduct(searchProduct, true, true);
                            var pricesTask = self.productService.calculatePrices(ProductId, this.ListName);
                            var productDetailsTask = self.productService.loadProduct(ProductId, VariantId);
                            Q.all([pricesTask, productDetailsTask])
                                .spread(function (prices, product) {
                                product.ProductPrice = _.find(prices.ProductPrices, { ProductId: ProductId });
                                product.SelectedVariant = product.Variants.find(function (v) { return v.Id === VariantId; });
                                product.SizeSelected = true;
                                _this.ProductsMap[ProductId] = product;
                            })
                                .fin(function () { return _this.loadingProduct(searchProduct, false, false); });
                        },
                        onMouseleave: function (searchProduct) {
                            this.ActiveProductId = undefined;
                        },
                        onKvaHover: function (event) {
                            var target = $(event.target);
                            $(target).popover('show');
                        },
                        onKvaOut: function (event) {
                            var target = $(event.target);
                            $(target).popover('hide');
                        },
                        selectKva: function (searchProduct, kvaName, kvaValue) {
                            var _this = this;
                            var _a;
                            var productId = searchProduct.ProductId;
                            var kva = (_a = {}, _a[kvaName] = kvaValue, _a);
                            var product = this.ProductsMap[productId];
                            var variant = Composer.ProductsHelper.findVariant(product, kva, product.SelectedVariant.Kvas);
                            if (!variant) {
                                variant = Composer.ProductsHelper.findVariant(product, kva, null);
                                //reset size selection to select existent variant 
                                product.SizeSelected = false;
                            }
                            ;
                            this.loadingProduct(searchProduct, true);
                            product.SelectedVariant = variant;
                            searchProduct.VariantId = variant.Id;
                            searchProduct.ImageUrl = variant.Images.find(function (i) { return i.Selected; }).ImageUrl;
                            if (Composer.ProductsHelper.isSize(kvaName)) {
                                product.SizeSelected = true;
                            }
                            var variantPrice = product.ProductPrice.VariantPrices.find(function (p) { return p.VariantId === variant.Id; });
                            Composer.ProductsHelper.mergeVariantPrice(searchProduct, variantPrice);
                            this.ActiveProductId = productId;
                            self.inventoryService.isAvailableToSell(variant.Sku)
                                .then(function (result) { return searchProduct.IsAvailableToSell = result; })
                                .fin(function () { return _this.loadingProduct(searchProduct, false); });
                        },
                        loadingProduct: function (product, loading, variantsLoading) {
                            if (variantsLoading === void 0) { variantsLoading = false; }
                            product.loading = loading;
                            product.variantsLoading = variantsLoading;
                            this.refreshData();
                        },
                        productDetailsLoaded: function (searchProduct) {
                            return this.ProductsMap[searchProduct.ProductId] != undefined;
                        },
                        sortingChanged: function (url) {
                            self.eventHub.publish(Composer.SearchEvents.SortingChanged, { data: { url: url } });
                        },
                        addToCart: function (event, product) {
                            var _this = this;
                            var hasVariants = product.HasVariants, productId = product.ProductId;
                            var price = product.IsOnSale ? product.Price : product.ListPrice;
                            if (hasVariants) {
                                product.VariantId = this.ProductsMap[productId].SelectedVariant.Id;
                                product.Variants = this.ProductsMap[productId].Variants;
                            }
                            this.loadingProduct(product, true);
                            self.cartService.addLineItem(product, price, product.VariantId, 1, this.ListName)
                                .fail(function (reason) { return _this.onAddToCartFailed(reason, 'AddToCartFailed'); })
                                .fin(function () { return _this.loadingProduct(product, false); });
                        },
                        isAddToCartDisabled: function (product) {
                            return Composer.ProductsHelper.isAddToCartDisabled(product, this.ProductsMap);
                        },
                        onAddToCartFailed: function (reason, errorCode) {
                            console.error('Error on adding item to cart', reason);
                            Composer.ErrorHandler.instance().outputErrorFromCode(errorCode);
                        },
                        addLineItemToWishList: function (searchProduct) {
                            var _this = this;
                            if (!this.IsAuthenticated) {
                                return self.wishListService.redirectToSignIn();
                            }
                            var ProductId = searchProduct.ProductId, VariantId = searchProduct.VariantId, RecurringOrderProgramName = searchProduct.RecurringOrderProgramName;
                            self.wishListService.addLineItem(ProductId, VariantId, 1, undefined, RecurringOrderProgramName)
                                .then(function (wishList) { return _this.WishList = wishList; })
                                .fail(function (reason) { return _this.onAddToCartFailed(reason, 'AddToWishListFailed'); });
                        },
                        removeLineItemFromWishList: function (searchProduct) {
                            var _this = this;
                            self.wishListService.removeLineItem(searchProduct.WishListItem.Id)
                                .then(function (wishList) { return _this.WishList = wishList; })
                                .fail(function (reason) { return _this.onAddToCartFailed(reason, 'AddToWishListFailed'); });
                        },
                        registerSubscriptions: function () {
                            self.eventHub.subscribe(Composer.SearchEvents.SearchRequested, this.onSearchRequested.bind(this));
                        },
                        onSearchRequested: function (_a) {
                            var _this = this;
                            var data = _a.data;
                            this.SelectedFacets = data.selectedFacets;
                            var searchRequest = (!data.categoryId && data.queryName) ?
                                self.searchRepository.getQuerySearchResults(data.queryString, data.queryName, data.queryType) :
                                self.searchRepository.getSearchResults(data.queryString, data.categoryId);
                            this.isLoading = true;
                            searchRequest.then(function (result) {
                                _this.isLoading = false;
                                Object.keys(result.ProductSearchResults).forEach(function (key) { return _this[key] = result.ProductSearchResults[key]; });
                                self.eventHub.publish(Composer.SearchEvents.SearchResultsLoaded, { data: result });
                            });
                        },
                        searchProductClick: function (product, index) {
                            self.sendProductClickForAnalytics(product, index, this.Pagination.CurrentPage, this.ListName, this.MaxItemsPerPage);
                        }
                    }
                });
            };
            SearchResultsController.prototype.sendProductClickForAnalytics = function (product, index, currentPage, listName, maxItemsPerPage) {
                var productData = {
                    Product: product,
                    ListName: listName,
                    Index: index,
                    PageNumber: currentPage.DisplayName,
                    MaxItemsPerPage: maxItemsPerPage
                };
                this.eventHub.publish('productClick', { data: productData });
            };
            SearchResultsController.prototype.sendSearchResultsForAnalytics = function (productSearchResults, listName, maxItemsPerPage) {
                var CurrentPage = productSearchResults.Pagination.CurrentPage, SearchResults = productSearchResults.SearchResults, Keywords = productSearchResults.Keywords, TotalCount = productSearchResults.TotalCount;
                var searchResultsData = {
                    ProductSearchResults: SearchResults,
                    Keywords: Keywords,
                    TotalCount: TotalCount,
                    ListName: listName,
                    PageNumber: CurrentPage && CurrentPage.DisplayName || '',
                    MaxItemsPerPage: maxItemsPerPage
                };
                this.eventHub.publish('searchResultRendered', { data: searchResultsData });
            };
            return SearchResultsController;
        }(Orckestra.Composer.Controller));
        Composer.SearchResultsController = SearchResultsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../Mvc/Controller.ts' />
/// <reference path='../../Mvc/IControllerActionContext.ts' />
/// <reference path='../../Mvc/IControllerContext.ts' />
/// <reference path='./Constants/SearchEvents.ts' />
/// <reference path='../../Composer.ContentSearch/Constants/ContentSearchEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SearchSummaryController = /** @class */ (function (_super) {
            __extends(SearchSummaryController, _super);
            function SearchSummaryController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SearchSummaryController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var Tabs = this.context.viewModel;
                var SuggestedTabs = this.context.container.data('suggestedtabs');
                var SearchQuery = this.context.container.data('searchquery');
                var CorrectedSearchTerms = this.context.container.data('сorrectedsearchterms');
                var ProductsCount = this.context.container.data('productstotal');
                var IsProductTab = this.context.container.data('isproducttab') === 'True';
                var self = this;
                this.initializeTabSummaryVue(Tabs, SearchQuery, self);
                this.vueSearchSummary = new Vue({
                    el: '#vueSearchSummary',
                    components: {},
                    data: {
                        Tabs: Tabs,
                        SearchQuery: SearchQuery,
                        CorrectedSearchTerms: CorrectedSearchTerms,
                        ProductsCount: ProductsCount,
                        ProductsLoading: false,
                        ContentLoading: false,
                        SuggestedTabs: SuggestedTabs
                    },
                    mounted: function () {
                        var _this = this;
                        self.eventHub.subscribe(Composer.SearchEvents.SearchRequested, function () { return _this.ProductsLoading = true; });
                        self.eventHub.subscribe(Composer.SearchEvents.SearchResultsLoaded, function (_a) {
                            var data = _a.data;
                            _this.ProductsLoading = false;
                            _this.Tabs.find(function (t) { return t.IsProducts; }).Total = data.ProductSearchResults.TotalCount;
                            _this.Tabs = _this.Tabs.slice();
                            _this.CorrectedSearchTerms = data.ProductSearchResults.CorrectedSearchTerms;
                            _this.ProductsCount = data.ProductSearchResults.TotalCount;
                            _this.SearchQuery = data.Keywords;
                        });
                        self.eventHub.subscribe(Composer.ContentSearchEvents.SearchResultsLoaded, function (_a) {
                            var data = _a.data;
                            _this.ContentLoading = false;
                            data.Tabs.forEach(function (x) {
                                var foundTab = _this.Tabs.find(function (tab) { return tab.Title === x.Title; });
                                if (foundTab) {
                                    foundTab.Total = x.Total;
                                    foundTab.TabUrl = x.TabUrl;
                                }
                            });
                            _this.Tabs = _this.Tabs.slice();
                        });
                    },
                    computed: {
                        Loading: function () { return this.ProductsLoading || this.ContentLoading; },
                        TotalCount: function () {
                            return this.Tabs.reduce(function (accum, item) { return accum + item.Total; }, 0);
                        },
                        IsProductsCorrected: function () {
                            return this.CorrectedSearchTerms && this.ProductsCount > 0 && IsProductTab;
                        }
                    },
                });
                this.sendSearchTermForAnalytics(this.context.viewModel);
            };
            SearchSummaryController.prototype.initializeTabSummaryVue = function (Tabs, SearchQuery, self) {
                var elTabSearchSummary = document.getElementById('vueTabSearchSummary');
                if (elTabSearchSummary) {
                    this.vueTabSearchSummary = new Vue({
                        el: '#vueTabSearchSummary',
                        data: {
                            Tabs: Tabs,
                            SearchQuery: SearchQuery
                        },
                        mounted: function () {
                            var _this = this;
                            self.eventHub.subscribe(Composer.ContentSearchEvents.SearchResultsLoaded, function () {
                                _this.Tabs = _this.Tabs.slice();
                            });
                        },
                        computed: {
                            CurrentTab: function () {
                                return this.Tabs.find(function (t) { return t.IsActive; });
                            },
                            TabsWithResults: function () {
                                return this.Tabs.filter(function (t) { return t.Total > 0; });
                            }
                        }
                    });
                }
            };
            SearchSummaryController.prototype.sendSearchTermForAnalytics = function (viewModel) {
                var TotalCount = viewModel.TotalCount, Keyword = viewModel.Keywords, ListName = viewModel.ListName, CorrectedSearchTerms = viewModel.CorrectedSearchTerms;
                if (TotalCount === 0 && Keyword) {
                    this.eventHub.publish('noResultsFound', { data: { Keyword: Keyword, ListName: ListName } });
                }
                if (!_.isEmpty(CorrectedSearchTerms) && Keyword && TotalCount !== 0) {
                    var data = {
                        KeywordEntered: Keyword,
                        KeywordCorrected: CorrectedSearchTerms,
                        ListName: ListName,
                    };
                    this.eventHub.publish('searchTermCorrected', { data: data });
                }
            };
            return SearchSummaryController;
        }(Orckestra.Composer.Controller));
        Composer.SearchSummaryController = SearchSummaryController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
/// <reference path='../../Mvc/Controller.ts' />
/// <reference path='../../Mvc/IControllerActionContext.ts' />
/// <reference path='../../Mvc/IControllerContext.ts' />
/// <reference path='./Services/SearchService.ts' />
/// <reference path='./Services/ISearchService.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
/// <reference path='./UrlHelper.ts' />
/// <reference path='../../Composer.ContentSearch/SearchParams.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SelectedFacetSearchController = /** @class */ (function (_super) {
            __extends(SelectedFacetSearchController, _super);
            function SelectedFacetSearchController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SelectedFacetSearchController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var SelectedSortBy = this.context.container.data('selected-sort');
                var AvailableSortBys = this.context.container.data('available-sort');
                var itemsCount = this.context.container.data('items-count');
                var self = this;
                this.vueSelectedSearchFacets = new Vue({
                    el: '#vueSelectedSearchFacets',
                    components: {},
                    data: __assign({}, this.context.viewModel, { SelectedSortBy: SelectedSortBy, TotalCount: itemsCount, AvailableSortBys: AvailableSortBys, LandingPageUrls: this.context.container.data('landingpageurls') || [], SelectedFacets: Composer.SearchService.getInstance() ? Composer.SearchService.getInstance().getSelectedFacets() : {} }),
                    mounted: function () {
                        self.eventHub.subscribe(Composer.SearchEvents.FacetsLoaded, this.onFacetsLoaded);
                        self.eventHub.subscribe(Composer.SearchEvents.SearchResultsLoaded, this.onFacetsLoaded);
                        self.eventHub.subscribe(Composer.SearchEvents.SearchRequested, this.onSearchRequested.bind(this));
                    },
                    computed: {},
                    methods: {
                        sortingChanged: function (url) {
                            self.eventHub.publish(Composer.SearchEvents.SortingChanged, { data: { url: url } });
                        },
                        getFacetsCount: function () {
                            var _this = this;
                            var getCount = function (prev, next) { return prev + (Array.isArray(_this.SelectedFacets[next]) ? _this.SelectedFacets[next].length : 1); };
                            return Object.keys(this.SelectedFacets).reduce(getCount, 0);
                        },
                        onFacetsLoaded: function (_a) {
                            var data = _a.data;
                            this.Facets = data.FacetSettings.SelectedFacets.Facets;
                            this.IsAllRemovable = data.FacetSettings.SelectedFacets.IsAllRemovable;
                            this.LandingPageUrls = data.LandingPageUrls || [];
                        },
                        onSearchRequested: function (_a) {
                            var data = _a.data;
                            this.SelectedFacets = data.selectedFacets;
                            var dataParams = new URLSearchParams(data.queryString);
                            this.SelectedSortBy = AvailableSortBys.find(function (sortBy, index) {
                                var sortByParams = new URLSearchParams(sortBy.Url);
                                var sortDirection = sortByParams.get("sortDirection");
                                var dataDirection = dataParams.get("sortDirection");
                                var sortByVal = sortByParams.get("sortBy");
                                var dataSortBy = dataParams.get("sortBy");
                                return ((sortByVal === dataSortBy) && (sortDirection === dataDirection));
                            });
                        },
                        clearSelectedFacets: function (landingPageUrl) {
                            self.eventHub.publish(Composer.SearchEvents.FacetsCleared, { data: { landingPageUrl: landingPageUrl } });
                        },
                        removeSelectedFacet: function (facet, index) {
                            var categoryFacetFiledNamePrefix = 'CategoryLevel';
                            var categoryTreeRef = facet.FieldName.startsWith(categoryFacetFiledNamePrefix) && facet.FieldName;
                            var facetLandingPageUrl = categoryTreeRef && this.LandingPageUrls.length > index && this.LandingPageUrls[index];
                            if (facetLandingPageUrl || !categoryTreeRef) {
                                if (categoryTreeRef) {
                                    // case, when remove category facet with landing page url and sub-categories selected
                                    var getLevel_1 = function (f) {
                                        var match = f.FieldName.match(/CategoryLevel(\d+)_Facet/);
                                        return match && match[1];
                                    };
                                    var level_1 = getLevel_1(facet);
                                    var data = this.Facets.filter(function (f) { return getLevel_1(f) > level_1; }).map(function (f) { return ({
                                        facetFieldName: f.FieldName,
                                        facetType: f.FacetType,
                                        facetValue: f.Value,
                                    }); });
                                    self.eventHub.publish(Composer.SearchEvents.FacetsRemoved, { data: data });
                                }
                                self.eventHub.publish(Composer.SearchEvents.FacetRemoved, {
                                    data: {
                                        facetFieldName: facet.FieldName,
                                        facetValue: facet.Value,
                                        facetType: facet.FacetType,
                                        facetLandingPageUrl: facetLandingPageUrl
                                    }
                                });
                            }
                            else if (categoryTreeRef) {
                                switch (facet.FacetType) {
                                    case 'MultiSelect': {
                                        var currentFacets_1 = [];
                                        Composer.SearchParams.getSearchParams().forEach(function (a) { return currentFacets_1.push(a); });
                                        var data_1 = {
                                            facetKey: facet.FieldName,
                                            facetValue: facet.Value,
                                            //    pageType,
                                            filter: this.Facets.reduce(function (filter, f) {
                                                if (f.Value !== facet.Value && currentFacets_1.includes(f.FieldName)) {
                                                    filter[f.FieldName] = f.FacetType === 'MultiSelect' ?
                                                        (filter[f.FieldName] || []).concat(f.Value) : f.Value;
                                                }
                                                return filter;
                                            }, {})
                                        };
                                        self.eventHub.publish(Composer.SearchEvents.MultiFacetChanged, { data: data_1 });
                                        break;
                                    }
                                    case 'SingleSelect':
                                    default:
                                        //remove also all child categories
                                        var parentCategoryElement = $('#categoriesTree').find('div[data-facetfieldname="' + categoryTreeRef + '"]');
                                        var checkedItems_1 = parentCategoryElement.find('input:checked');
                                        var data_2 = [];
                                        checkedItems_1.each(function (index) {
                                            var el = $(checkedItems_1[index]);
                                            data_2.push({
                                                facetFieldName: el.attr('name').replace('[]', ''),
                                                facetValue: el.attr('value'),
                                                facetType: el.data('type')
                                            });
                                        });
                                        self.eventHub.publish(Composer.SearchEvents.FacetsRemoved, { data: data_2 });
                                }
                            }
                        }
                    }
                });
            };
            return SelectedFacetSearchController;
        }(Orckestra.Composer.Controller));
        Composer.SelectedFacetSearchController = SelectedFacetSearchController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../../../Typings/tsd.d.ts' />
/// <reference path='../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
/// <reference path='../../Mvc/Controller.ts' />
/// <reference path='../../Mvc/IControllerActionContext.ts' />
/// <reference path='../../Mvc/IControllerContext.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
/// <reference path='./UrlHelper.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SortBySearchController = /** @class */ (function (_super) {
            __extends(SortBySearchController, _super);
            function SortBySearchController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SortBySearchController.prototype.sortingChanged = function (actionContext) {
                var anchorContext = actionContext.elementContext, dataSortingType = anchorContext.data('sorting'), dataUrl = anchorContext.data('url'), resolvePageType = Composer.UrlHelper.resolvePageType();
                actionContext.event.preventDefault();
                actionContext.event.stopPropagation();
                this.eventHub.publish('sortingChanged', {
                    data: {
                        sortingType: dataSortingType,
                        pageType: resolvePageType,
                        url: dataUrl
                    }
                });
            };
            return SortBySearchController;
        }(Orckestra.Composer.Controller));
        Composer.SortBySearchController = SortBySearchController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
/// <reference path='../Product/ProductController.ts' />
///<reference path='../../Plugins/SlickCarouselPlugin.ts' />
///<reference path='../ProductEvents.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var RelatedProductController = /** @class */ (function (_super) {
            __extends(RelatedProductController, _super);
            function RelatedProductController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.concern = 'relatedProduct';
                _this.source = 'Related Products';
                _this.wishListService = new Composer.WishListService(new Composer.WishListRepository(), _this.eventHub);
                _this.membershipService = new Composer.MembershipService(new Composer.MembershipRepository());
                return _this;
            }
            RelatedProductController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                var self = this;
                var vm = self.context.viewModel;
                var relatedProductsPromise = self.getRelatedProducts();
                var getWithListTask = this.wishListService.getWishListSummary();
                var authenticatedPromise = this.membershipService.isAuthenticated();
                Q.all([relatedProductsPromise, getWithListTask, authenticatedPromise])
                    .spread(function (relatedproducts, wishlist, authVm) {
                    self.VueRelatedProducts = new Vue({
                        el: '#vueRelatedProducts',
                        data: {
                            RelatedProducts: self.products,
                            ProductIdentifiers: vm.ProductIdentifiers,
                            Loading: false,
                            ProductsMap: {},
                            dataUpdatedTracker: 1,
                            WishList: wishlist,
                            IsAuthenticated: authVm.IsAuthenticated,
                            ActiveProductId: undefined
                        },
                        mounted: function () {
                            self.eventHub.subscribe(Composer.CartEvents.CartUpdated, this.onCartUpdated);
                            self.eventHub.publish('iniCarousel', null);
                        },
                        computed: {
                            ExtendedRelatedProducts: function () {
                                var _this = this;
                                var results = _.map(this.RelatedProducts, function (product) {
                                    product.WishListItem = _this.WishList && _this.WishList.Items.find(function (i) { return i.ProductId === product.ProductId && i.VariantId == product.VariantId; });
                                    return product;
                                });
                                return this.dataUpdatedTracker && results;
                            }
                        },
                        methods: {
                            onCartUpdated: function (cart) {
                                this.Cart = cart.data;
                            },
                            isAddToCartDisabled: function (product) {
                                return Composer.ProductsHelper.isAddToCartDisabled(product, this.ProductsMap);
                            },
                            productDetailsLoaded: function (relatedProduct) {
                                return this.ProductsMap[relatedProduct.ProductId] != undefined;
                            },
                            getKeyVariantDisplayName: function (id, kvaName) {
                                var product = this.ProductsMap[id];
                                return Composer.ProductsHelper.getKeyVariantDisplayName(product, kvaName);
                            },
                            requireSelection: function (relatedProduct, kvaName) {
                                var product = this.ProductsMap[relatedProduct.ProductId];
                                return Composer.ProductsHelper.isSize(kvaName) ? !product.SizeSelected : false;
                            },
                            getKeyVariantValues: function (id, kvaName) {
                                var product = this.ProductsMap[id];
                                return Composer.ProductsHelper.getKeyVariantValues(product, kvaName, Composer.ProductsHelper.isSize(kvaName) ? !product.SizeSelected : false);
                            },
                            onMouseover: function (relatedProduct) {
                                var _this = this;
                                var ProductId = relatedProduct.ProductId, VariantId = relatedProduct.VariantId, HasVariants = relatedProduct.HasVariants;
                                this.ActiveProductId = ProductId;
                                if (!HasVariants || this.ProductsMap[ProductId])
                                    return;
                                this.loadingProduct(relatedProduct, true);
                                self.productService.loadProduct(ProductId, VariantId)
                                    .then(function (product) {
                                    product.SelectedVariant = product.Variants.find(function (v) { return v.Id === VariantId; });
                                    product.SizeSelected = true;
                                    _this.ProductsMap[ProductId] = product;
                                })
                                    .fin(function () { return _this.loadingProduct(relatedProduct, false); });
                            },
                            onMouseleave: function (relatedProduct) {
                                this.ActiveProductId = undefined;
                            },
                            onKvaHover: function (event) {
                                var target = $(event.target);
                                $(target).popover('show');
                            },
                            onKvaOut: function (event) {
                                var target = $(event.target);
                                $(target).popover('hide');
                            },
                            selectKva: function (relatedProduct, kvaName, kvaValue) {
                                var _this = this;
                                var _a;
                                var productId = relatedProduct.ProductId;
                                var kva = (_a = {}, _a[kvaName] = kvaValue, _a);
                                var product = this.ProductsMap[productId];
                                var variant = Composer.ProductsHelper.findVariant(product, kva, product.SelectedVariant.Kvas);
                                if (!variant) {
                                    variant = Composer.ProductsHelper.findVariant(product, kva, null);
                                    //reset size selection to select existent variant 
                                    product.SizeSelected = false;
                                }
                                ;
                                this.loadingProduct(relatedProduct, true);
                                product.SelectedVariant = variant;
                                relatedProduct.ImageUrl = variant.Images.find(function (i) { return i.Selected; }).ImageUrl;
                                relatedProduct.VariantId = variant.Id;
                                if (Composer.ProductsHelper.isSize(kvaName)) {
                                    product.SizeSelected = true;
                                }
                                var variantPrice = relatedProduct.ProductPrice.VariantPrices.find(function (p) { return p.VariantId === variant.Id; });
                                Composer.ProductsHelper.mergeVariantPrice(relatedProduct, variantPrice);
                                self.inventoryService.isAvailableToSell(variant.Sku)
                                    .then(function (result) { return relatedProduct.IsAvailableToSell = result; })
                                    .fin(function () { return _this.loadingProduct(relatedProduct, false); });
                            },
                            searchProductClick: function (product, index) {
                                self.eventHub.publish(Composer.ProductEvents.ProductClick, {
                                    data: {
                                        Product: product,
                                        ListName: self.getPageSource(),
                                        Index: index
                                    }
                                });
                            },
                            addToCart: function (event, product) {
                                var _this = this;
                                var HasVariants = product.HasVariants, ProductId = product.ProductId;
                                var price = product.IsOnSale ? product.Price : product.ListPrice;
                                if (HasVariants) {
                                    product.VariantId = this.ProductsMap[ProductId].SelectedVariant.Id;
                                    product.Variants = this.ProductsMap[ProductId].Variants;
                                }
                                this.loadingProduct(product, true);
                                self.cartService.addLineItem(product, price, product.VariantId, 1, self.getListNameForAnalytics())
                                    .fail(function (reason) { return _this.onAddToCartFailed(reason, 'AddToCartFailed'); })
                                    .fin(function () { return _this.loadingProduct(product, false); });
                            },
                            addLineItemToWishList: function (relatedProduct) {
                                var _this = this;
                                if (!this.IsAuthenticated) {
                                    return self.wishListService.redirectToSignIn();
                                }
                                var ProductId = relatedProduct.ProductId, VariantId = relatedProduct.VariantId, RecurringOrderProgramName = relatedProduct.RecurringOrderProgramName;
                                self.wishListService.addLineItem(ProductId, VariantId, 1, undefined, RecurringOrderProgramName)
                                    .then(function (wishList) { return _this.WishList = wishList; })
                                    .fail(function (reason) { return _this.onAddToCartFailed(reason, 'AddToWishListFailed'); });
                            },
                            removeLineItemFromWishList: function (relatedProduct) {
                                var _this = this;
                                self.wishListService.removeLineItem(relatedProduct.WishListItem.Id)
                                    .then(function (wishList) { return _this.WishList = wishList; })
                                    .fail(function (reason) { return _this.onAddToCartFailed(reason, 'AddToWishListFailed'); });
                            },
                            onAddToCartFailed: function (reason, errorCode) {
                                console.error('Error on adding item to cart', reason);
                                Composer.ErrorHandler.instance().outputErrorFromCode(errorCode);
                            },
                            refreshData: function () {
                                this.dataUpdatedTracker += 1;
                            },
                            loadingProduct: function (product, loading) {
                                product.loading = loading;
                                this.refreshData();
                            },
                        }
                    });
                });
            };
            RelatedProductController.prototype.getRelatedProducts = function () {
                var _this = this;
                var vm = this.context.viewModel;
                var identifiers = vm.ProductIdentifiers;
                return this.productService.getRelatedProducts(identifiers)
                    .then(function (relatedProductsVm) {
                    _this.products = relatedProductsVm.Products;
                    vm.Products = relatedProductsVm.Products;
                    return vm;
                })
                    .then(function (vm) {
                    if (vm && vm.Products && vm.Products.length > 0) {
                        _this.eventHub.publish('relatedProductsLoaded', {
                            data: {
                                ListName: _this.getListNameForAnalytics(),
                                Products: vm.Products
                            }
                        });
                    }
                })
                    .then(function (vm) { return _this.onGetRelatedProductsSuccess(vm); }, function (reason) { return _this.onGetRelatedProductsFailed(reason); });
            };
            RelatedProductController.prototype.onGetRelatedProductsSuccess = function (vm) {
                //Hook for other projects
            };
            RelatedProductController.prototype.onGetRelatedProductsFailed = function (reason) {
                console.error('Failed loading the related products', reason);
            };
            RelatedProductController.prototype.getPageSource = function () {
                return this.source;
            };
            RelatedProductController.prototype.getListNameForAnalytics = function () {
                return this.source;
            };
            RelatedProductController.prototype.onLoadingFailed = function (reason) {
                console.error('Failed loading the Related Product View');
                Composer.ErrorHandler.instance().outputErrorFromCode('RelatedProductLoadFailed');
            };
            return RelatedProductController;
        }(Orckestra.Composer.ProductController));
        Composer.RelatedProductController = RelatedProductController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./ICheckoutGetCartPromiseFailureHandler.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='../../Events/IEventHub.ts' />
///<reference path='./IUpdatePaymentOptions.ts' />
///<reference path='./IGetPaymentMethodsOptions.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var PaymentProvider = /** @class */ (function () {
            function PaymentProvider(window, eventHub) {
                this.window = window;
                this.eventHub = eventHub;
            }
            PaymentProvider.prototype.getCurrentPaymentMethod = function () {
                return this._currentPaymentMethod;
            };
            /**
            * Return a Promise which returns an array of Payment Methods.
            */
            PaymentProvider.prototype.getPaymentMethods = function (getPaymentMethodOptions) {
                return Composer.ComposerClient.post('/api/payment/paymentmethods', getPaymentMethodOptions);
            };
            PaymentProvider.prototype.updatePaymentMethod = function (request) {
                var _this = this;
                return Composer.ComposerClient.put('/api/payment/paymentmethod', request)
                    .then(function (payload) {
                    _this._currentPaymentMethod = request;
                    return payload;
                });
            };
            return PaymentProvider;
        }());
        Composer.PaymentProvider = PaymentProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/ComposerClient.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='../StoreLocator/Services/GeoLocationService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var StoresDirectoryController = /** @class */ (function (_super) {
            __extends(StoresDirectoryController, _super);
            function StoresDirectoryController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._geoService = new Composer.GeoLocationService();
                return _this;
            }
            StoresDirectoryController.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeSearchBox();
                this.setGoogleDirectionLinks();
            };
            StoresDirectoryController.prototype.initializeSearchBox = function () {
                var input = this.context.container.find('#storeDirectorySearchInput')[0];
                this._searchBox = new google.maps.places.SearchBox(input);
            };
            // Action on Click on locator icon in search box
            StoresDirectoryController.prototype.currentLocationAction = function (actionContext) {
                actionContext.event.preventDefault();
                this.context.container.find('form').submit();
            };
            StoresDirectoryController.prototype.setGoogleDirectionLinks = function () {
                var _this = this;
                return this._geoService.geolocate().then(function (location) {
                    _this._geoService.updateDirectionLinksWithLatLngSourceAddress(_this.context.container, location);
                });
            };
            return StoresDirectoryController;
        }(Composer.Controller));
        Composer.StoresDirectoryController = StoresDirectoryController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var GetStoresInventoryParam = /** @class */ (function () {
            function GetStoresInventoryParam() {
            }
            return GetStoresInventoryParam;
        }());
        Composer.GetStoresInventoryParam = GetStoresInventoryParam;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='./GetStoresInventoryParam.ts' />
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Mvc/IControllerContext.ts' />
///<reference path='../../../Mvc/ComposerClient.ts' />
///<reference path='../../../Events/EventHub.ts' />
///<reference path='./IStoreInventoryService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var StoreInventoryService = /** @class */ (function () {
            function StoreInventoryService() {
            }
            StoreInventoryService.prototype.getStoresInventory = function (param) {
                return Composer.ComposerClient.post('/api/storeinventory/storesinventory', param);
            };
            StoreInventoryService.prototype.getDefaultAddress = function () {
                return Composer.ComposerClient.get('/api/customer/getdefaultaddress');
            };
            StoreInventoryService.prototype.getSkuSelection = function (productId) {
                var data = {
                    ProductId: productId
                };
                return Composer.ComposerClient.post('/api/product/variantSelection', data);
            };
            return StoreInventoryService;
        }());
        Composer.StoreInventoryService = StoreInventoryService;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='../../Mvc/IControllerActionContext.ts' />
///<reference path='./Services/StoreInventoryService.ts' />
///<reference path='../StoreLocator/Services/GeoLocationService.ts' />
///<reference path='../../Cache/CacheProvider.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var StoreInventoryController = /** @class */ (function (_super) {
            __extends(StoreInventoryController, _super);
            function StoreInventoryController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._concern = 'StoreInventory_';
                _this._service = new Composer.StoreInventoryService();
                _this._geoService = new Composer.GeoLocationService();
                _this._searchPointAddressCacheKey = 'StoreLocatorSearchAddress';
                _this.cache = Composer.CacheProvider.instance().defaultCache;
                _this._getCurrentLocation = Q.defer();
                return _this;
            }
            StoreInventoryController.prototype.getCurrentLocation = function () {
                return this._getCurrentLocation.promise;
            };
            StoreInventoryController.prototype.initialize = function () {
                var _this = this;
                var getDefaultsTasks = [];
                var getDefaultAddressTask;
                _super.prototype.initialize.call(this);
                this.registerSubscriptions();
                this.initSearchBox();
                this.getDataFromContextViewModel();
                if (!this._selectedSku && this._productId) {
                    getDefaultsTasks.push(this._service.getSkuSelection(this._productId).then(function (result) {
                        _this._selectedSku = result.Sku;
                    }));
                }
                getDefaultsTasks.push(this.getDefaultAddress());
                Q.all(getDefaultsTasks).then(function () {
                    _this.getStoresInventory();
                }).fail(function (reason) { return console.log(_this._concern + reason); });
                this._geoService.geolocate().then(function (location) {
                    _this._getCurrentLocation.resolve(location);
                }, function (reason) { return _this._getCurrentLocation.resolve(null); });
            };
            StoreInventoryController.prototype.registerSubscriptions = function () {
                var _this = this;
                this.eventHub.subscribe('productDetailSelectedVariantIdChanged', function (e) { return _this.onSelectedVariantIdChanged(e); });
                this.eventHub.subscribe('inventorySearchPointChanged', function (e) { return _this.searchPointChanged(e); });
                this.context.window.addEventListener('hashchange', function () { return _this.onHashChanged(); });
            };
            StoreInventoryController.prototype.getDataFromContextViewModel = function () {
                this._selectedSku = this.context.viewModel.selectedSku;
                this._isAuthenticated = this.context.viewModel.isAuthenticated;
                this._pageSize = this.context.viewModel.pageSize;
                this._productId = this.context.viewModel.productId;
            };
            StoreInventoryController.prototype.initSearchBox = function () {
                var _this = this;
                this._searchBoxJQ = this.context.container.find('input[name="storeInventorySearchInput"]');
                this._searchBox = new google.maps.places.SearchBox(this._searchBoxJQ[0]);
                this._searchBox.addListener('places_changed', function () {
                    var places = _this._searchBox.getPlaces();
                    if (places && places.length && places[0].geometry) {
                        _this.eventHub.publish('inventorySearchPointChanged', { data: places[0].geometry.location });
                    }
                });
            };
            StoreInventoryController.prototype.searchPointChanged = function (e) {
                this._searchPoint = e.data;
                this.cache.set(this._searchPointAddressCacheKey, this._searchBoxJQ.val());
                this.getStoresInventory();
            };
            StoreInventoryController.prototype.onSelectedVariantIdChanged = function (e) {
                this._selectedSku = e.data.selectedSku;
                this.getStoresInventory();
            };
            StoreInventoryController.prototype.onHashChanged = function () {
                var _this = this;
                if (location.hash === '#storeinventory' && !this._searchPoint) {
                    this.getCurrentLocation()
                        .then(function (currentLocation) {
                        if (currentLocation) {
                            _this._searchPoint = currentLocation;
                            _this.getStoresInventory();
                            _this._geoService.getAddressByLocation(currentLocation).then(function (result) {
                                _this.cache.set(_this._searchPointAddressCacheKey, result);
                                _this._searchBoxJQ.val(result);
                            });
                        }
                    });
                }
            };
            StoreInventoryController.prototype.getStoresInventory = function () {
                var _this = this;
                var debounceHandle;
                if (this._selectedSku) {
                    debounceHandle = _.debounce(function () { return _this.render('StoreInventoryList', { IsLoading: true }); }, 300);
                    return this._service.getStoresInventory(this.getStoresInventoryParam())
                        .then(function (result) {
                        debounceHandle.cancel();
                        _this.render('StoreInventoryList', result);
                        _this.setGoogleDirectionLinks();
                    })
                        .fail(function (reason) { return console.log(reason); });
                }
            };
            StoreInventoryController.prototype.nextPage = function (actionContext) {
                var _this = this;
                actionContext.event.preventDefault();
                var page = actionContext.elementContext.data('page');
                var busy = this.asyncBusy({ elementContext: actionContext.elementContext });
                this._service.getStoresInventory(this.getStoresInventoryParam(page))
                    .then(function (result) {
                    var target = actionContext.elementContext[0].parentElement;
                    var targetHtml = _this.getRenderedTemplateContents('StoreInventoryList', result);
                    busy.done();
                    $(target).replaceWith(targetHtml).stop().fadeIn();
                    _this.setGoogleDirectionLinks();
                })
                    .fail(function (reason) { return console.log(reason); });
            };
            StoreInventoryController.prototype.setGoogleDirectionLinks = function () {
                var _this = this;
                return this.getCurrentLocation().then(function (location) {
                    _this._geoService.updateDirectionLinksWithLatLngSourceAddress(_this.context.container, location);
                });
            };
            StoreInventoryController.prototype.getStoresInventoryParam = function (page) {
                if (page === void 0) { page = 1; }
                var param = new Composer.GetStoresInventoryParam();
                param.Sku = this._selectedSku;
                param.SearchPoint = this._searchPoint;
                param.Page = page;
                param.Pagesize = this._pageSize;
                return param;
            };
            StoreInventoryController.prototype.getDefaultAddress = function () {
                var _this = this;
                // try get address from local storage
                return this.cache.get(this._searchPointAddressCacheKey)
                    .then(function (cachedAddr) {
                    _this._searchBoxJQ.val(cachedAddr);
                    return _this._geoService.getLocationByAddress(cachedAddr);
                }, function (reason) {
                    // try get customer default delivery address
                    if (_this._isAuthenticated) {
                        return _this._service.getDefaultAddress()
                            .then(function (defaultAddr) {
                            if (defaultAddr && defaultAddr.PostalCode) {
                                var formattedAddress = defaultAddr.City + ", " + defaultAddr.RegionCode + " " + defaultAddr.PostalCode + ", " + defaultAddr.CountryCode;
                                _this._searchBoxJQ.val(formattedAddress);
                                return _this._geoService.getLocationByAddress(formattedAddress);
                            }
                        });
                    }
                })
                    .then(function (locationByAddress) {
                    _this._searchPoint = locationByAddress;
                });
            };
            return StoreInventoryController;
        }(Composer.Controller));
        Composer.StoreInventoryController = StoreInventoryController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='../../Mvc/Controller.ts' />
///<reference path='./Services/GeoLocationService.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        var StoreDetailsController = /** @class */ (function (_super) {
            __extends(StoreDetailsController, _super);
            function StoreDetailsController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._geoService = new Composer.GeoLocationService();
                return _this;
            }
            StoreDetailsController.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                var center = new google.maps.LatLng(this.context.viewModel.latitude, this.context.viewModel.longitude);
                var mapOptions = {
                    center: center,
                    zoom: this.context.viewModel.zoom ? this.context.viewModel.zoom : 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
                    keyboardShortcuts: false,
                    scaleControl: false,
                    scrollwheel: false,
                    zoomControl: false,
                    draggable: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    overviewMapControlOptions: { opened: false },
                    disableDefaultUI: true
                };
                this._map = new google.maps.Map(this.context.container.find("#map")[0], mapOptions);
                this._marker = new google.maps.Marker({
                    position: center,
                    map: this._map,
                    icon: '/UI.Package/Images/map/marker-default.png'
                });
                this.context.window.addEventListener('resize', function () { return _this._map.setCenter(_this._marker.getPosition()); });
                this.setGoogleDirectionLink();
            };
            StoreDetailsController.prototype.setGoogleDirectionLink = function () {
                var _this = this;
                this._geoService.geolocate().then(function (location) {
                    _this._geoService.updateDirectionLinksWithLatLngSourceAddress(_this.context.container, location);
                });
            };
            return StoreDetailsController;
        }(Composer.Controller));
        Composer.StoreDetailsController = StoreDetailsController;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
Handlebars.registerHelper('escape', function (options) {
    var innerContent = options.fn(this);
    var escapedContent = _.escape(innerContent);
    return new Handlebars.SafeString(escapedContent);
});
///<reference path='../../../Typings/tsd.d.ts' />
Handlebars.registerHelper('if_eq', function (left, right, options) {
    if (left === right) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
///<reference path='../../../Typings/tsd.d.ts' />
Handlebars.registerHelper('if_exists', function (value, options) {
    if (typeof value !== 'undefined') {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
///<reference path='../../../Typings/tsd.d.ts' />
Handlebars.registerHelper('if_gt', function (left, right, options) {
    if (left > right) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
///<reference path='../../../Typings/tsd.d.ts' />
Handlebars.registerHelper('if_gte', function (left, right, options) {
    if (left >= right) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
///<reference path='../../../Typings/tsd.d.ts' />
Handlebars.registerHelper('if_lt', function (left, right, options) {
    if (left < right) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
///<reference path='../../../Typings/tsd.d.ts' />
Handlebars.registerHelper('if_lte', function (left, right, options) {
    if (left <= right) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
///<reference path='../../../Typings/tsd.d.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='./IHandlebarsLocalization.ts' />
Handlebars.registerHelper('if_localized', function (categoryName, keyName, options) {
    if (Handlebars.localizationProvider.handleBarsHelper_isLocalized(categoryName, keyName)) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
///<reference path='../../../Typings/tsd.d.ts' />
Handlebars.registerHelper('if_neq', function (left, right, options) {
    if (left !== right) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='./IHandlebarsLocalization.ts' />
Handlebars.registerHelper('localizeFormat', function (categoryName, keyName) {
    var args = [];
    if (arguments.length > 2) {
        args = Array.prototype.slice.call(arguments, 2);
    }
    var value = Handlebars.localizationProvider
        .handleBarsHelper_localizeFormat(categoryName, keyName, args);
    return new Handlebars.SafeString(value);
});
///<reference path='../../../Typings/tsd.d.ts' />
///<reference path='./IHandlebarsLocalization.ts' />
Handlebars.registerHelper('localize', function (categoryName, keyName) {
    var value = Handlebars.localizationProvider.handleBarsHelper_localize(categoryName, keyName);
    return new Handlebars.SafeString(value);
});
//TODO: Custom errors and not being able to inherit from Error
// module Orckestra.Composer {
//     export class ControllerAlreadyRegisteredException implements Error {
//         public name = 'ControllerAlreadyRegisteredException';
//         constructor(public message: string = 'The controller has already been registered.') {
//         }
//     }
// }
//TODO: Custom errors and not being able to inherit from Error
// module Orckestra.Composer {
//     export class MissingControllerDispatcherNameException implements Error {
//         public name = 'MissingControllerDispatcherNameException';
//         constructor(public message: string = 'A name is required to create a controller dispatcher.') {
//         }
//     }
// }
///<reference path='../MonerisPaymentService.ts' />
///<reference path='../../../../../Typings/tsd.d.ts' />
///<reference path='../../../Payment/ViewModels/IActivePaymentViewModel.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var BaseSpecializedMonerisCanadaPaymentProvider = /** @class */ (function () {
            function BaseSpecializedMonerisCanadaPaymentProvider(window, paymentService, eventHub) {
                this._window = window;
                this._paymentService = paymentService;
                this._eventHub = eventHub;
            }
            /**
             * Register event handlers for dom events
             */
            BaseSpecializedMonerisCanadaPaymentProvider.prototype.registerDomEvents = function () {
                // do nothing
            };
            /**
             * Unregister event handlers for dom events
             */
            BaseSpecializedMonerisCanadaPaymentProvider.prototype.unregisterDomEvents = function () {
                // do nothing
            };
            /**
             * Method called to get a promise for payment validation.
             * Returns a promise of boolean. The return boolean needs to be false for validation error,
             * or true if valid.
             * @param   {IActivePaymentViewModel}   The current active payment view model
             * @return  {Q.Promise<boolean>}        Promise that will be executed when we validate the payment control.
             */
            BaseSpecializedMonerisCanadaPaymentProvider.prototype.validatePayment = function (activePaymentVM) {
                return Q(true);
            };
            /**
             * Add the temporary token to the vault profile of the user
             * @param   {IActivePaymentViewModel}   The current active payment view model
             * @return  {Q.Promise<any>}            The object is the updated properties of the cart used in CheckoutService.updateCart()
             */
            BaseSpecializedMonerisCanadaPaymentProvider.prototype.addVaultProfileToken = function (activePaymentVM) {
                return Q({});
            };
            return BaseSpecializedMonerisCanadaPaymentProvider;
        }());
        Composer.BaseSpecializedMonerisCanadaPaymentProvider = BaseSpecializedMonerisCanadaPaymentProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./BaseSpecializedMonerisCanadaPaymentProvider.ts' />
///<reference path='../MonerisPaymentService.ts' />
///<reference path='../IMonerisResponseData.ts' />
///<reference path='../../../../../Typings/tsd.d.ts' />
///<reference path='../../../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
///<reference path='../../../../ErrorHandling/ErrorHandler.ts' />
///<reference path='../../../Payment/ViewModels/IActivePaymentViewModel.ts' />
///<reference path='../../../../JQueryPlugins/IParsleyJqueryPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var CreditCardMonerisCanadaPaymentProvider = /** @class */ (function (_super) {
            __extends(CreditCardMonerisCanadaPaymentProvider, _super);
            function CreditCardMonerisCanadaPaymentProvider(window, paymentService, eventHub) {
                return _super.call(this, window, paymentService, eventHub) || this;
            }
            /**
             * Register event handlers for dom events
             */
            CreditCardMonerisCanadaPaymentProvider.prototype.registerDomEvents = function () {
                $(this._window).on('message.composer', this.handleMessageResponse.bind(this));
            };
            /**
             * Unregister event handlers for dom events
             */
            CreditCardMonerisCanadaPaymentProvider.prototype.unregisterDomEvents = function () {
                $(this._window).off('message.composer', this.handleMessageResponse);
            };
            /**
             * Method called to get a promise for payment validation.
             * Returns a promise of boolean. The return boolean needs to be false for validation error,
             * or true if valid.
             * @param   {IActivePaymentViewModel}   The current active payment view model
             * @return  {Q.Promise<boolean>}        Promise that will be executed when we validate the payment control.
             */
            CreditCardMonerisCanadaPaymentProvider.prototype.validatePayment = function (activePaymentVM) {
                var _this = this;
                return Q
                    .fcall(function () { return _this.collectAndValidateFormData(); })
                    .then(function (_) {
                    _this.hideAllMonerisErrors();
                    _this._validationDefer = Q.defer();
                    _this._validationDefer.promise
                        .then(function (monerisRes) {
                        _this._validationDefer = null;
                        if (!monerisRes.dataKey) {
                            throw new Error('Moneris did not return a dataKey.');
                        }
                        _this._monerisResponseData = monerisRes;
                        return true;
                    });
                    if (_this._monerisResponseData) {
                        _this._validationDefer.resolve(_this._monerisResponseData);
                    }
                    else {
                        _this.getMonerisIFrame().contentWindow.postMessage('', activePaymentVM.CapturePaymentUrl);
                    }
                    return _this._validationDefer.promise;
                });
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.validateMonerisIFrame = function (vm) {
                var _this = this;
                var monerisFrame = this.getMonerisIFrame();
                var monerisContentWindow = monerisFrame.contentWindow;
                var promise;
                this.hideAllMonerisErrors();
                this._validationDefer = Q.defer();
                promise = this._validationDefer.promise
                    .then(function (monerisRes) {
                    _this._validationDefer = null;
                    if (!monerisRes.dataKey) {
                        throw new Error('Moneris did not return a dataKey.');
                    }
                    _this._monerisResponseData = monerisRes;
                    return true;
                });
                if (this._monerisResponseData) {
                    this._validationDefer.resolve(this._monerisResponseData);
                }
                else {
                    monerisContentWindow.postMessage('', vm.CapturePaymentUrl);
                }
                return this._validationDefer.promise;
            };
            /**
             * Add the temporary token to the vault profile of the user
             * @param   {IActivePaymentViewModel}   The current active payment view model
             * @return  {Q.Promise<any>}            The object is the updated properties of the cart used in CheckoutService.updateCart()
             */
            CreditCardMonerisCanadaPaymentProvider.prototype.addVaultProfileToken = function (activePaymentVM) {
                var _this = this;
                if (!activePaymentVM.ShouldCapturePayment) {
                    return Q({});
                }
                var formData = this.collectAndValidateFormData();
                var request = {
                    CardHolderName: formData.cardholder,
                    CreatePaymentProfile: formData.createPaymentProfile,
                    VaultTokenId: this._monerisResponseData.dataKey,
                    PaymentId: activePaymentVM.Id,
                    PaymentProviderName: activePaymentVM.ProviderName
                };
                console.log('Adding Moneris payment information.');
                return this._paymentService
                    .addCreditCard(request)
                    .then(function (result) {
                    if (!result.Success) {
                        _this._monerisResponseData = null;
                        throw new Error("Moneris: Could not add the credit card to the payment:\n                                                (" + result.ErrorCode + ") " + result.ErrorMessage);
                    }
                    activePaymentVM.ShouldCapturePayment = false;
                    return {};
                });
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.handleMessageResponse = function (e) {
                var monerisEvent = e.originalEvent;
                var msgData = monerisEvent.data;
                var responseData = JSON.parse(monerisEvent.data);
                if (responseData.errorMessage && !_.isEmpty(responseData.errorMessage)) {
                    this.handleMonerisError(monerisEvent, responseData);
                }
                else {
                    this.handleMonerisSuccess(responseData);
                }
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.handleMonerisSuccess = function (responseData) {
                if (!this._validationDefer) {
                    throw new Error('Received Moneris success response, but no validation defer was found.');
                }
                this._validationDefer.resolve(responseData);
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.handleMonerisError = function (monerisEvent, responseData) {
                var errorMsg = monerisEvent.origin + " SENT (" + responseData.responseCode + ") " + responseData.dataKey + "\n            - " + responseData.errorMessage;
                this.showMonerisErrors(responseData.responseCode);
                if (this._validationDefer) {
                    this._validationDefer.reject(new Error(errorMsg));
                }
                else {
                    console.error(errorMsg, responseData);
                }
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.showMonerisErrors = function (errorCodes) {
                var shouldShowGeneral = false;
                _.each(errorCodes, function (code) {
                    var errorNode = $("#monerisError" + code);
                    if (_.isEmpty(errorNode)) {
                        shouldShowGeneral = true;
                    }
                    errorNode.removeClass('d-none');
                });
                if (shouldShowGeneral) {
                    $('#monerisErrorGeneral').removeClass('d-none');
                }
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.collectAndValidateFormData = function () {
                this.validateForm();
                var form = this.getForm();
                return this._formData || form.serializeObject();
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.validateForm = function () {
                var form = this.getForm();
                var parsley = form.parsley();
                parsley.validate();
                if (!parsley.isValid()) {
                    throw new Error('The form does not valid');
                }
                return parsley.isValid();
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.getMonerisIFrame = function () {
                var frames = $('#monerisFrame');
                if (_.isEmpty(frames)) {
                    throw new Error('Cannot find monerisFrame DOM element');
                }
                return frames[0];
            };
            CreditCardMonerisCanadaPaymentProvider.prototype.hideAllMonerisErrors = function () {
                this.getForm()
                    .find('.parsley-errors-list>.parsley-required')
                    .addClass('d-none');
                $('#monerisErrorGeneral').addClass('d-none');
            };
            /**
             * Gets the container for the Payment Provider.
             * @return {JQuery} jQuery object.
             */
            CreditCardMonerisCanadaPaymentProvider.prototype.getForm = function () {
                var form = $('#PaymentForm');
                if (!form || _.isEmpty(form)) {
                    throw new Error('Could not find the element PaymentForm on this page.');
                }
                return form;
            };
            return CreditCardMonerisCanadaPaymentProvider;
        }(Composer.BaseSpecializedMonerisCanadaPaymentProvider));
        Composer.CreditCardMonerisCanadaPaymentProvider = CreditCardMonerisCanadaPaymentProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./BaseSpecializedMonerisCanadaPaymentProvider.ts' />
///<reference path='../MonerisPaymentService.ts' />
///<reference path='../../../../../Typings/tsd.d.ts' />
///<reference path='../../../../ErrorHandling/ErrorHandler.ts' />
///<reference path='../../../../UI/UIModal.ts' />
///<reference path='../../../Payment/ViewModels/IActivePaymentViewModel.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var SavedCreditCardMonerisCanadaPaymentProvider = /** @class */ (function (_super) {
            __extends(SavedCreditCardMonerisCanadaPaymentProvider, _super);
            function SavedCreditCardMonerisCanadaPaymentProvider(window, paymentService, eventHub) {
                var _this = _super.call(this, window, paymentService, eventHub) || this;
                _this._deleteModalElementSelector = '#confirmationModal';
                _this._uiModal = new Composer.UIModal(window, _this._deleteModalElementSelector, _this.deleteCart, _this);
                return _this;
            }
            /**
             * Register event handlers for dom events
             */
            SavedCreditCardMonerisCanadaPaymentProvider.prototype.registerDomEvents = function () {
                $(this._window.document).on('click', '.moneris--deletecard', this._uiModal.openModal);
            };
            /**
             * Unregister event handlers for dom events
             */
            SavedCreditCardMonerisCanadaPaymentProvider.prototype.unregisterDomEvents = function () {
                $(this._window.document).off('click', '.moneris--deletecard', this._uiModal.openModal);
            };
            /**
             * Method called to get a promise for payment validation.
             * Returns a promise of boolean. The return boolean needs to be false for validation error,
             * or true if valid.
             * @param   {IActivePaymentViewModel}   The current active payment view model
             * @return  {Q.Promise<boolean>}        Promise that will be executed when we validate the payment control.
             */
            SavedCreditCardMonerisCanadaPaymentProvider.prototype.validatePayment = function (activePaymentVM) {
                // Considering the credit card was already added we do not need to run additional validations
                return Q(true);
            };
            /**
             * Add the temporary token to the vault profile of the user
             * @param   {IActivePaymentViewModel}   The current active payment view model
             * @return  {Q.Promise<any>}            The object is the updated properties of the cart used in CheckoutService.updateCart()
             */
            SavedCreditCardMonerisCanadaPaymentProvider.prototype.addVaultProfileToken = function (activePaymentVM) {
                // no need to add the payment method to the vault
                return Q({});
            };
            SavedCreditCardMonerisCanadaPaymentProvider.prototype.deleteCart = function (event) {
                var _this = this;
                var element = $(event.target);
                var paymentMethodId = element.data('payment-id');
                var paymentProviderName = element.data('payment-provider');
                //TODO : To replace with async busy from controller when change inheritance with controller.
                this._busyHandler = new Composer.UIBusyHandle($(document), $(document), 0);
                // TODO: publish valid event
                return this._paymentService
                    .removePaymentMethod(paymentMethodId, paymentProviderName)
                    .then(function () { return _this._eventHub.publish('paymentMethodsUpdated', null); })
                    .fail(function (reason) { return Composer.ErrorHandler.instance().outputError(reason); })
                    .fin(function () {
                    _this.releaseBusyHandler();
                });
            };
            SavedCreditCardMonerisCanadaPaymentProvider.prototype.releaseBusyHandler = function () {
                if (this._busyHandler) {
                    this._busyHandler.done();
                    this._busyHandler = null;
                }
            };
            return SavedCreditCardMonerisCanadaPaymentProvider;
        }(Composer.BaseSpecializedMonerisCanadaPaymentProvider));
        Composer.SavedCreditCardMonerisCanadaPaymentProvider = SavedCreditCardMonerisCanadaPaymentProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='./ICreateVaultTokenOptions.ts' />
///<reference path='./IMonerisResponseData.ts' />
///<reference path='./MonerisPaymentService.ts' />
///<reference path='./Providers/BaseSpecializedMonerisCanadaPaymentProvider.ts' />
///<reference path='./Providers/CreditCardMonerisCanadaPaymentProvider.ts' />
///<reference path='./Providers/SavedCreditCardMonerisCanadaPaymentProvider.ts' />
///<reference path='../BaseCheckoutPaymentProvider.ts' />
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Events/IEventHub.ts' />
///<reference path='../../../JQueryPlugins/ISerializeObjectJqueryPlugin.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var MonerisCanadaPaymentProvider = /** @class */ (function (_super) {
            __extends(MonerisCanadaPaymentProvider, _super);
            function MonerisCanadaPaymentProvider(window, providerName, eventHub) {
                var _this = _super.call(this, window, eventHub, 'MonerisCanadaPaymentProvider', providerName) || this;
                _this._monerisPaymentService = new Composer.MonerisPaymentService();
                _this.registerSpecializedProviders();
                _this.registerDomEvents();
                return _this;
            }
            Object.defineProperty(MonerisCanadaPaymentProvider.prototype, "providers", {
                get: function () {
                    return this._providers;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Method called to get a promise for payment validation.
             * Returns a promise of boolean. The return boolean needs to be false for validation error,
             * or true if valid.
             * @return {Q.Promise<boolean>} Promise that will be executed when we validate the payment control.
             */
            MonerisCanadaPaymentProvider.prototype.validatePayment = function (activePaymentVM) {
                return this.getProvider(activePaymentVM.PaymentMethodType).validatePayment(activePaymentVM);
            };
            MonerisCanadaPaymentProvider.prototype.submitPayment = function (activePaymentVM) {
                return this.getProvider(activePaymentVM.PaymentMethodType)
                    .addVaultProfileToken(activePaymentVM);
            };
            MonerisCanadaPaymentProvider.prototype.dispose = function () {
                this.unregisterDomEvents();
            };
            MonerisCanadaPaymentProvider.prototype.setDefaultCustomerPaymentMethod = function (activePaymentVM) {
                return this._monerisPaymentService
                    .setDefaultCustomerPaymentMethod({
                    PaymentMethodId: activePaymentVM.Id,
                    PaymentProviderName: activePaymentVM.ProviderName
                });
            };
            MonerisCanadaPaymentProvider.prototype.registerSpecializedProviders = function () {
                this._providers = {
                    'SavedCreditCard': new Composer.SavedCreditCardMonerisCanadaPaymentProvider(this.window, this._monerisPaymentService, this._eventHub),
                    'CreditCard': new Composer.CreditCardMonerisCanadaPaymentProvider(this.window, this._monerisPaymentService, this._eventHub)
                };
            };
            MonerisCanadaPaymentProvider.prototype.registerDomEvents = function () {
                _.forEach(this.providers, function (p) { return p.registerDomEvents(); });
            };
            MonerisCanadaPaymentProvider.prototype.unregisterDomEvents = function () {
                _.forEach(this.providers, function (p) { return p.unregisterDomEvents(); });
            };
            MonerisCanadaPaymentProvider.prototype.getProvider = function (providerName) {
                if (!this.providers[providerName]) {
                    throw new Error('Provider not found');
                }
                return this.providers[providerName];
            };
            return MonerisCanadaPaymentProvider;
        }(Composer.BaseCheckoutPaymentProvider));
        Composer.MonerisCanadaPaymentProvider = MonerisCanadaPaymentProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
///<reference path='../../../../Typings/tsd.d.ts' />
///<reference path='../../../Events/IEventHub.ts' />
///<reference path='../ViewModels/IActivePaymentViewModel.ts' />
///<reference path='../BaseCheckoutPaymentProvider.ts' />
var Orckestra;
(function (Orckestra) {
    var Composer;
    (function (Composer) {
        'use strict';
        var OnSitePOSPaymentProvider = /** @class */ (function (_super) {
            __extends(OnSitePOSPaymentProvider, _super);
            function OnSitePOSPaymentProvider(window, providerName, eventHub) {
                return _super.call(this, window, eventHub, 'OnSitePOSPaymentProvider', providerName) || this;
            }
            /**
             * Method called to get a promise for payment validation.
             * Returns a promise of boolean. The return boolean needs to be false for validation error,
             * or true if valid.
             * @return {Q.Promise<boolean>} Promise that will be executed when we validate the payment control.
             */
            OnSitePOSPaymentProvider.prototype.validatePayment = function (activeVM) {
                return Q(true);
            };
            /**
             * Method called to get a promise when payment will submit.
             * @return {Q.Promise<any>} Promise that will be executed when to cart is about the be updated.
             */
            OnSitePOSPaymentProvider.prototype.submitPayment = function (activeVM) {
                return Q({});
            };
            return OnSitePOSPaymentProvider;
        }(Composer.BaseCheckoutPaymentProvider));
        Composer.OnSitePOSPaymentProvider = OnSitePOSPaymentProvider;
    })(Composer = Orckestra.Composer || (Orckestra.Composer = {}));
})(Orckestra || (Orckestra = {}));
//# sourceMappingURL=orckestra.composer.tests.js.map