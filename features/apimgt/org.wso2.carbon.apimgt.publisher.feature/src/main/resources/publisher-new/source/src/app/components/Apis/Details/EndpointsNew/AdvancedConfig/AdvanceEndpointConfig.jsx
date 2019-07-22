/**
 * Copyright (c)  WSO2 Inc. (http://wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import {
    Divider,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Button,
    withStyles,
} from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: (ITEM_HEIGHT * 4.5) + ITEM_PADDING_TOP, width: 250,
        },
    },
};
const styles = theme => ({
    formControl: {
        width: '500px',
    },
    subTitle: {
        fontSize: '1rem',
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    configContainer: {
        paddingTop: '10px',
    },
    configSubContainer: {
        paddingBottom: '10px',
        marginTop: '5px',
        padding: '5px',
    },
    textField: {
        marginRight: theme.spacing.unit,
        width: '45%',
    },
});

/**
 * The component for advanced endpoint configurations.
 * @param {any} props The input props
 * @returns {any} The HTML representation of the compoenent.
 */
function AdvanceEndpointConfig(props) {
    const {
        classes,
        intl,
        advanceConfig,
        isSOAPEndpoint,
        onSaveAdvanceConfig,
        onCancel,
    } = props;
    const [advanceConfigObj, setAdvanceConfig] =
        useState(() => {
            const config = {};
            if (isSOAPEndpoint) {
                config.format = 'soap11';
                config.optimize = 'SWA';
            }
            config.actionDuration = '300';
            config.actionSelect = 'fault';
            config.factor = '';
            config.retryDelay = '';
            config.retryErroCode = [];
            config.retryTimeOut = '';
            config.suspendDuration = '';
            config.suspendErrorCode = [];
            config.suspendMaxDuration = '';
            return config;
        });
    const errorCodes = [
        {
            key: '101001',
            value: '101001 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.receiver.io.error.receiving',
                defaultMessage: 'Receiver IO error receiving',
            }),
        },
        {
            key: '101500',
            value: '101500 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.sender.io.error.sending',
                defaultMessage: 'Sender IO Error Sending',
            }),
        },
        {
            key: '101000',
            value: '101000 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.receiver.io.error.sending',
                defaultMessage: 'Retriever IO Error Sending',
            }),
        },
        {
            key: '101501',
            value: '101501 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.sender.io.error.receiving',
                defaultMessage: 'Sender IO Error Receiving',
            }),
        },
        {
            key: '101503',
            value: '101503 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.connection.failed',
                defaultMessage: 'Connection Failed',
            }),
        },
        {
            key: '101504',
            value: '101504 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.connection.timed.out',
                defaultMessage: 'Connection Timed Out',
            }),
        },
        {
            key: '101505',
            value: '101505 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.connection.closed',
                defaultMessage: 'Connection Closed',
            }),
        },
        {
            key: '101506',
            value: '101506 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.tpp.protocol.violation',
                defaultMessage: 'TTP Protocol Violation',
            }),
        },
        {
            key: '101507',
            value: '101507 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.connect.cancel',
                defaultMessage: 'Connect Cancel',
            }),
        },
        {
            key: '101508',
            value: '101508 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.connect.timeout',
                defaultMessage: 'Connect Timeout',
            }),
        },
        {
            key: '101509',
            value: '101509 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.send.abort',
                defaultMessage: 'Send Abort',
            }),
        },
        {
            key: '101510',
            value: '101510 : ' + intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.response.processing.failure',
                defaultMessage: 'Response Processing Failure',
            }),
        }];
    const actionItems = [
        {
            key: 'fault',
            value: intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.execute.fault.sequence',
                defaultMessage: 'Execute Fault Sequence',
            }),
        },
        {
            key: 'discard',
            value: intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.discard.message',
                defaultMessage: 'Discard Message',
            }),
        },
    ];

    const messageTypes = [
        { key: 'soap11', value: 'SOAP 1.1' },
        { key: 'soap12', value: 'SOAP 1.2' },
        {
            key: 'POX',
            value: intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.plain.old.xml',
                defaultMessage: 'Plain Old XML (POX)',
            }),
        },
        {
            key: 'REST',
            value: intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.representational.state.transfer',
                defaultMessage: 'Representational State Transer (REST)',
            }),
        },
        {
            key: 'GET',
            value: 'GET',
        },
        {
            key: 'leave-as-is',
            value: intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.leave.as.is',
                defaultMessage: 'Leave As-Is',
            }),
        },
    ];

    const optimizeOptions = [
        { key: 'SWA', value: 'SWA' },
        { key: 'MTOM', value: 'MTOM' },
        {
            key: 'leave-as-is',
            value: intl.formatMessage({
                id: 'Apis.Details.EndpointsNew.AdvancedConfig.AdvanceEndpointConfig.leave.as.is',
                defaultMessage: 'Leave As-Is',
            }),
        },
    ];

    useEffect(() => {
        setAdvanceConfig(() => {
            if (advanceConfig === {}) {
                return { ...advanceConfigObj };
            }
            return { ...advanceConfigObj, ...advanceConfig };
        });
    }, [props]);

    const handleConfigFieldChange = (event, field) => {
        const di = { ...advanceConfigObj, [field]: event.target.value };
        setAdvanceConfig(di);
    };

    return (
        <Grid container direction='column' className={classes.configContainer}>
            {(isSOAPEndpoint) ? (
                <Grid item container className={classes.configSubContainer}>
                    <Typography className={classes.subTitle}>
                        <FormattedMessage
                            id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.message.content'
                            defaultMessage='Message Content'
                        />
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor='err-code-select'>
                            <FormattedMessage
                                id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.format.select'
                                defaultMessage='Format'
                            />
                        </InputLabel>
                        <Select
                            autoWidth={false}
                            value={advanceConfigObj.format}
                            onChange={event => handleConfigFieldChange(event, 'format')}
                            input={<Input id='err-code-select' />}
                            MenuProps={MenuProps}
                        >
                            {messageTypes.map(messageType => (
                                <MenuItem key={messageType.key} value={messageType.key}>
                                    {messageType.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor='err-code-select'>
                            <FormattedMessage
                                id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.optimize.select'
                                defaultMessage='Optimize'
                            />
                        </InputLabel>
                        <Select
                            autoWidth={false}
                            value={advanceConfigObj.optimize}
                            onChange={event => handleConfigFieldChange(event, 'optimize')}
                            input={<Input id='err-code-select' />}
                            MenuProps={MenuProps}
                        >
                            {optimizeOptions.map(option => (
                                <MenuItem key={option.key} value={option.key}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Divider />
                </Grid>
            ) : (<div />)}
            <Grid item container className={classes.configSubContainer}>
                <Typography className={classes.subTitle}>
                    <FormattedMessage id='Endpoint.Suspension.State' defaultMessage='Endpoint Suspension State' />
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='err-code-select'>
                        <FormattedMessage
                            id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.error.code'
                            defaultMessage='Error Code'
                        />
                    </InputLabel>
                    <Select
                        multiple
                        autoWidth={false}
                        value={advanceConfigObj.suspendErrorCode}
                        onChange={event => handleConfigFieldChange(event, 'suspendErrorCode')}
                        input={<Input id='err-code-select' />}
                        MenuProps={MenuProps}
                        variant='outlined'
                    >
                        {errorCodes.map(code => (
                            <MenuItem key={code.key} value={code.key}>
                                {code.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    className={classes.textField}
                    id='initial-duration-input'
                    onChange={event => handleConfigFieldChange(event, 'suspendDuration')}
                    label={
                        <FormattedMessage
                            id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.initial.duration.ms'
                            defaultMessage='Initial Duration (ms)'
                        />
                    }
                    margin='normal'
                    type='number'
                />
                <TextField
                    className={classes.textField}
                    id='max-duration-input'
                    value={advanceConfigObj.suspendMaxDuration}
                    onChange={event => handleConfigFieldChange(event, 'suspendMaxDuration')}
                    label={
                        <FormattedMessage
                            id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.max.duration.ms'
                            defaultMessage='Max Duration (ms)'
                        />
                    }
                    margin='normal'
                    type='number'
                />
                <TextField
                    className={classes.textField}
                    value={advanceConfigObj.factor}
                    onChange={event => handleConfigFieldChange(event, 'factor')}
                    id='factor-input'
                    label={
                        <FormattedMessage
                            id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.factor'
                            defaultMessage='Factor'
                        />
                    }
                    margin='normal'
                />
            </Grid>
            <Divider />
            <Grid item container className={classes.configSubContainer}>
                <Typography className={classes.subTitle}>
                    <FormattedMessage
                        id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.endpoint.timeout.state'
                        defaultMessage='Endpoint Timeout State'
                    />
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='err-code-select'>
                        <FormattedMessage
                            id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.error.code'
                            defaultMessage='Error Code'
                        />
                    </InputLabel>
                    <Select
                        multiple
                        autoWidth={false}
                        value={advanceConfigObj.retryErroCode}
                        onChange={event => handleConfigFieldChange(event, 'retryErroCode')}
                        input={<Input id='err-code-select' />}
                        MenuProps={MenuProps}
                    >
                        {errorCodes.map(code => (
                            <MenuItem key={code.key} value={code.key}>
                                {code.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    className={classes.textField}
                    id='retries-input'
                    value={advanceConfigObj.retryTimeOut}
                    onChange={event => handleConfigFieldChange(event, 'retryTimeOut')}
                    label={
                        <FormattedMessage
                            id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.retries.before.suspension'
                            defaultMessage='Retries Before Suspension'
                        />
                    }
                    type='number'
                    margin='normal'
                />
                <TextField
                    className={classes.textField}
                    id='retry-delay-input'
                    value={advanceConfigObj.retryDelay}
                    onChange={event => handleConfigFieldChange(event, 'retryDelay')}
                    label={<FormattedMessage
                        id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.retry.delay.ms'
                        defaultMessage='Retry Delay (ms)'
                    />}
                    type='number'
                    margin='normal'
                />
            </Grid>
            <Divider />
            <Grid item container className={classes.configSubContainer}>
                <Typography className={classes.subTitle}>
                    <FormattedMessage id='Connection.Timeout' defaultMessage='Connection Timeout' />
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='err-code-select'>
                        <FormattedMessage
                            id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.action'
                            defaultMessage='Action'
                        />
                    </InputLabel>
                    <Select
                        autoWidth={false}
                        value={advanceConfigObj.actionSelect}
                        onChange={event => handleConfigFieldChange(event, 'actionSelect')}
                        input={<Input id='err-code-select' />}
                        MenuProps={MenuProps}
                    >
                        {actionItems.map(item => (
                            <MenuItem key={item.key} value={item.key}>
                                {item.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    className={classes.textField}
                    id='duration-input'
                    value={advanceConfigObj.actionDuration}
                    onChange={event => handleConfigFieldChange(event, 'actionDuration')}
                    label={<FormattedMessage
                        id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.duration.ms'
                        defaultMessage='Duration (ms)'
                    />}
                    type='number'
                    margin='normal'
                />
            </Grid>
            <Grid>
                <Button onClick={onCancel} color='primary'>
                    <FormattedMessage
                        id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.cancel.button'
                        defaultMessage='Close'
                    />
                </Button>
                <Button onClick={() => onSaveAdvanceConfig(advanceConfigObj)} color='primary' autoFocus>
                    <FormattedMessage
                        id='Apis.Details.EndpointsNew.AdvancedConfig.SuspendTimeoutConfig.config.save.button'
                        defaultMessage='Save'
                    />
                </Button>
            </Grid>
        </Grid>
    );
}

AdvanceEndpointConfig.propTypes = {
    classes: PropTypes.shape({
        configContainer: PropTypes.shape({}),
        configSubContainer: PropTypes.shape({}),
        subTitle: PropTypes.shape({}),
        formControl: PropTypes.shape({}),

    }).isRequired,
    intl: PropTypes.shape({
        formatMessage: PropTypes.func,
    }).isRequired,
    advanceConfig: PropTypes.shape({}).isRequired,
    isSOAPEndpoint: PropTypes.bool.isRequired,
    onSaveAdvanceConfig: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(styles, { withTheme: true })(AdvanceEndpointConfig));
