/*
  Q Light Controller Plus
  configureartnet.cpp

  Copyright (c) Massimo Callegari

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0.txt

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

#include <QTreeWidgetItem>
#include <QMessageBox>
#include <QSpacerItem>
#include <QComboBox>
#include <QLineEdit>
#include <QSpinBox>
#include <QLabel>
#include <QDebug>

#include "configureartnet.h"
#include "artnetplugin.h"

#define KNodesColumnIP          0
#define KNodesColumnShortName   1
#define KNodesColumnLongName    2

#define KMapColumnInterface     0
#define KMapColumnUniverse      1
#define KMapColumnIPAddress     2
#define KMapColumnArtNetUni     3
#define KMapColumnTransmitMode  4

#define PROP_UNIVERSE (Qt::UserRole + 0)
#define PROP_LINE (Qt::UserRole + 1)
#define PROP_TYPE (Qt::UserRole + 2)

// ArtNet universe is a 15bit value
#define ARTNET_UNIVERSE_MAX 0x7fff

/*****************************************************************************
 * Initialization
 *****************************************************************************/

ConfigureArtNet::ConfigureArtNet(ArtNetPlugin* plugin, QWidget* parent)
        : QDialog(parent)
{
    Q_ASSERT(plugin != NULL);
    m_plugin = plugin;

    /* Setup UI controls */
    setupUi(this);

    fillNodesTree();
    fillMappingTree();
}


void ConfigureArtNet::fillNodesTree()
{
    ArtNetController *prevController = NULL;

    QList<ArtNetIO> IOmap = m_plugin->getIOMapping();

    for (int i = 0; i < IOmap.length(); i++)
    {
        ArtNetController *controller = IOmap.at(i).controller;

        if (controller != NULL && controller != prevController)
        {
            QTreeWidgetItem* pitem = new QTreeWidgetItem(m_nodesTree);
            pitem->setText(KNodesColumnIP, tr("%1 nodes").arg(controller->getNetworkIP()));
            QHash<QHostAddress, ArtNetNodeInfo> nodesList = controller->getNodesList();
            QHashIterator<QHostAddress, ArtNetNodeInfo> it(nodesList);
            while (it.hasNext())
            {
                it.next();
                QTreeWidgetItem* nitem = new QTreeWidgetItem(pitem);
                ArtNetNodeInfo nInfo = it.value();
                nitem->setText(KNodesColumnIP, it.key().toString());
                nitem->setText(KNodesColumnShortName, nInfo.shortName);
                nitem->setText(KNodesColumnLongName, nInfo.longName);
            }
            prevController = controller;
        }
    }

    m_nodesTree->resizeColumnToContents(KNodesColumnIP);
    m_nodesTree->resizeColumnToContents(KNodesColumnShortName);
    m_nodesTree->resizeColumnToContents(KNodesColumnLongName);
}

void ConfigureArtNet::fillMappingTree()
{
    QTreeWidgetItem* inputItem = NULL;
    QTreeWidgetItem* outputItem = NULL;

    QList<ArtNetIO> IOmap = m_plugin->getIOMapping();
    foreach(ArtNetIO io, IOmap)
    {
        if (io.controller == NULL)
            continue;

        ArtNetController *controller = io.controller;
        if (controller == NULL)
            continue;

        qDebug() << "[ArtNet] controller IP" << controller->getNetworkIP() << "type:" << controller->type();
        if ((controller->type() & ArtNetController::Input) && inputItem == NULL)
        {
            inputItem = new QTreeWidgetItem(m_uniMapTree);
            inputItem->setText(KMapColumnInterface, tr("Inputs"));
            inputItem->setExpanded(true);
        }
        if ((controller->type() & ArtNetController::Output) && outputItem == NULL)
        {
            outputItem = new QTreeWidgetItem(m_uniMapTree);
            outputItem->setText(KMapColumnInterface, tr("Outputs"));
            outputItem->setExpanded(true);
        }
        foreach(quint32 universe, controller->universesList())
        {
            UniverseInfo *info = controller->getUniverseInfo(universe);

            if (info->type & ArtNetController::Input)
            {
                QTreeWidgetItem *item = new QTreeWidgetItem(inputItem);
                item->setData(KMapColumnInterface, PROP_UNIVERSE, universe);
                item->setData(KMapColumnInterface, PROP_LINE, controller->line());
                item->setData(KMapColumnInterface, PROP_TYPE, ArtNetController::Input);

                item->setText(KMapColumnInterface, io.address.broadcast().toString());
                item->setText(KMapColumnUniverse, QString::number(universe + 1));
                item->setTextAlignment(KMapColumnUniverse, Qt::AlignHCenter | Qt::AlignVCenter);

                QSpinBox *spin = new QSpinBox(this);
                spin->setRange(0, ARTNET_UNIVERSE_MAX);
                spin->setValue(info->inputUniverse);
                m_uniMapTree->setItemWidget(item, KMapColumnArtNetUni, spin);
            }
            if (info->type & ArtNetController::Output)
            {
                QTreeWidgetItem *item = new QTreeWidgetItem(outputItem);
                item->setData(KMapColumnInterface, PROP_UNIVERSE, universe);
                item->setData(KMapColumnInterface, PROP_LINE, controller->line());
                item->setData(KMapColumnInterface, PROP_TYPE, ArtNetController::Output);

                item->setText(KMapColumnInterface, controller->getNetworkIP());
                item->setText(KMapColumnUniverse, QString::number(universe + 1));
                item->setTextAlignment(KMapColumnUniverse, Qt::AlignHCenter | Qt::AlignVCenter);

                if (info->outputAddress == QHostAddress::LocalHost)
                {
                    // localhost (127.0.0.1) do not need broadcast or anything else
                    item->setText(KMapColumnIPAddress, info->outputAddress.toString());
                }
                else
                {
                    QWidget *IPwidget = new QLineEdit(info->outputAddress.toString());
                    m_uniMapTree->setItemWidget(item, KMapColumnIPAddress, IPwidget);
                }

                QSpinBox *spin = new QSpinBox(this);
                spin->setRange(0, ARTNET_UNIVERSE_MAX);
                spin->setValue(info->outputUniverse);
                m_uniMapTree->setItemWidget(item, KMapColumnArtNetUni, spin);

                QComboBox *combo = new QComboBox(this);
                combo->addItem(tr("Full"));
                combo->addItem(tr("Partial"));
                if (info->outputTransmissionMode == ArtNetController::Partial)
                    combo->setCurrentIndex(1);
                m_uniMapTree->setItemWidget(item, KMapColumnTransmitMode, combo);
            }
        }
    }

    m_uniMapTree->resizeColumnToContents(KMapColumnInterface);
    m_uniMapTree->resizeColumnToContents(KMapColumnUniverse);
    m_uniMapTree->resizeColumnToContents(KMapColumnIPAddress);
    m_uniMapTree->resizeColumnToContents(KMapColumnArtNetUni);
    m_uniMapTree->resizeColumnToContents(KMapColumnTransmitMode);
}

void ConfigureArtNet::showIPAlert(QString ip)
{
    QMessageBox::critical(this, tr("Invalid IP"), tr("%1 is not a valid IP.\nPlease fix it before confirming.").arg(ip));
}

ConfigureArtNet::~ConfigureArtNet()
{
}

/*****************************************************************************
 * Dialog actions
 *****************************************************************************/

void ConfigureArtNet::accept()
{
    for(int i = 0; i < m_uniMapTree->topLevelItemCount(); i++)
    {
        QTreeWidgetItem *topItem = m_uniMapTree->topLevelItem(i);
        for(int c = 0; c < topItem->childCount(); c++)
        {
            QTreeWidgetItem *item = topItem->child(c);
            if (item->data(KMapColumnInterface, PROP_UNIVERSE).isValid() == false)
                continue;

            quint32 universe = item->data(KMapColumnInterface, PROP_UNIVERSE).toUInt();
            quint32 line = item->data(KMapColumnInterface, PROP_LINE).toUInt();
            ArtNetController::Type type = ArtNetController::Type(item->data(KMapColumnInterface, PROP_TYPE).toInt());
            QLCIOPlugin::Capability cap = QLCIOPlugin::Input;
            if (type == ArtNetController::Output)
                cap = QLCIOPlugin::Output;

            QLineEdit *ipEdit = qobject_cast<QLineEdit*>(m_uniMapTree->itemWidget(item, KMapColumnIPAddress));
            if (ipEdit != NULL)
            {
                Q_ASSERT(cap == QLCIOPlugin::Output);
                QString newIP = ipEdit->text();
                QStringList IPNibbles = newIP.split(".");

                // perform all the preliminary IP validity checks
                if (IPNibbles.count() < 4)
                {
                    showIPAlert(newIP);
                    return;
                }
                if (IPNibbles.at(0).toInt() == 255 ||
                    IPNibbles.at(0).toInt() == 0 ||
                    IPNibbles.at(3).toInt() == 0)
                {
                    showIPAlert(newIP);
                    return;
                }

                QString origIP = item->text(KNodesColumnIP);
                QStringList origIPNibbles = origIP.split(".");
                QString IPChanged;

                for (int i = 0; i < 4; i++)
                {
                    // some more validity check
                    if (IPNibbles.at(i).toInt() < 0 || IPNibbles.at(i).toInt() > 255)
                    {
                        showIPAlert(newIP);
                        return;
                    }

                    if (IPNibbles.at(i) != origIPNibbles.at(i) || IPChanged.isEmpty() == false)
                    {
                        // if the 4th nibble is 255, then skip it as it is the default
                        if (i == 3 && IPNibbles.at(i).toInt() == 255 && IPChanged.isEmpty())
                            continue;

                        IPChanged.append(IPNibbles.at(i));
                        if (i < 3)
                            IPChanged.append(".");
                    }
                }

                //qDebug() << "IPchanged = " << IPChanged;
                m_plugin->setParameter(universe, line, cap, ARTNET_OUTPUTIP, IPChanged);
            }

            QSpinBox *spin = qobject_cast<QSpinBox*>(m_uniMapTree->itemWidget(item, KMapColumnArtNetUni));
            Q_ASSERT(spin != NULL);

            m_plugin->setParameter(universe, line, cap, (cap == QLCIOPlugin::Output ? ARTNET_OUTPUTUNI : ARTNET_INPUTUNI), spin->value());

            QComboBox *combo = qobject_cast<QComboBox*>(m_uniMapTree->itemWidget(item, KMapColumnTransmitMode));
            if (combo != NULL)
            {
                ArtNetController::TransmissionMode transmissionMode;
                if (combo->currentIndex() == 0)
                    transmissionMode = ArtNetController::Full;
                else
                    transmissionMode = ArtNetController::Partial;

                m_plugin->setParameter(universe, line, cap, ARTNET_TRANSMITMODE,
                        ArtNetController::transmissionModeToString(transmissionMode));
            }
        }
    }

    QDialog::accept();
}

int ConfigureArtNet::exec()
{
    return QDialog::exec();
}

