export enum Raags {
    GujriTodi,
    Bairagi,
    Bhairav,
    Bhoop,
    Durga,
    Bageshree,
    Multani,
    MianMalhar,
    AhirBhairav,
    BrindavaniSarang,
    Bhimpalas,
    Yaman,
    Janasammohini,
    Malkauns,
    Darbari
};

export const gats = new Map([
[Raags.GujriTodi,`
H:Gujri Todi
B:16
S:9
H: sthayi
Sdmdmgm_  +SndmgrS_
gr dm gr /2+S+r+g+r +Sndn +S+r+g+r +SndmgrS_
H: antara
/2 N+S dN md gm rg Sr gm dN /1 +S_ Ndmd+S_
/2 md+g+r+Sn, md+r+SNd, md /1 +S_N_d_m_g
`],

[Raags.Bairagi, `
H: Bairagi Bhairav
T: Teen
S: 14
H: sthayi
{rS}{-nS}{rP}M__, PMrrMSr-NS_
-P-n-P-nS_rS, SrSrM_PM, PnPn+S_+R /2 +S+rSnPnPMrMPnPMrS /1 _
{rS}{-nS}{rP}M__, PMrrS_
H: antara
S: 10
{+S+r}{+Sn}{Pn}M{PP}nP+S__+r+S+rn+S_
+S+r+P+M+r+S, SrPMrS_ rMrMPM, PnPn+Sn, +S+r /1 +S+rSnPnPMrMPnPMrS /1 _
`],

[Raags.Bhairav, `
H:Bhairav
T: Teen
S:9
H: sthayi
GMd_P_dM P_{MP}{dP}M_Gr
GGMrGMP PMGMGr_S_
SrGMP_Pd {Pd}{N+S}{dN}{+SN}dPMG
H: antara
M_MMPPddPd+S_+SN+r+S
d_dN_N+S+SN_+S+r /2 +S+r+SN /1 dP
GGMrGMPPMGMGr_S_
SrGMP_Pd{Pd}{N+S}{dN}{+SN}dPMG
`],

[Raags.Bhoop, `
H:Bhoop (teentaal)
B:16
T: teen
H:sthayi
D+SDPGRSRG_GRGPD_
GGGRGPD_+S_DPGRS_
H: antara
G_G_P_D_+S_+S_+S+R+S_
+G+R+SD+R+SDP+S_DPGRS_
H:Bhoop (ektaal)
B:12
S:1
H: sthayi
GRG_R_S-D-P-DSR
GRG_{GP}{DP}GRSDS_
-D{-DS}-DSR{GR}SR /2 GP DP DP DP
H: antara
GGGPDPD+SD+S_+S
DDD+S+R+R{+S+R}+G+R{+S+R}{+SD}P
D{D+S}DPG{GP}GRS /2 SRS-DSR
`],

[Raags.Durga, `
H:Durga gat number 1 (teentaal)
T: teen
S:9
H: sthayi
SRRPPMPDD_MPMRS_
SRSRS-DS_D+SDPMRS_
H: antara
MMPD+SD+S_D+S+R+SDPM_
+M_+R+SDPMPDSDPMRS_

H:Durga gat number 2 (teentaal)
H: sthayi
SDPD_M_PD_MPMRS_
SRMPRMPD+S{DP}D{PM}P{MR}M{RS}
H: antara
MMPD+SD+S_D+S+R+S{D+S}{DP}M_
+M+R+SD+R+S+DP+S{DP}D{PM}P{MP}M{RS}
`],

[Raags.Bageshree, `
H:Bageshree gat number 1 (teentaal)
T: Teen
S:9
H: sthayi
MgRS-nS-D-n S_M_gRS_
-nSgMDnD_ MPDMgRS_
H: antara
gMDnS_S_ Dn+S+M+g+R+S_
+M+g+R+SDnDM MPDMgRS_
`],

[Raags.Multani, `
H:Multani (ektaal)
T: ektaal
S:9
H: sthayi
mgmP{mP}{dP}mgrS_S
-N_Sg_mP_ /2 SgmP mgrS
H: antara
PmPgmmPNN+S_+S
PN+S+g+r+SN+SNdPm
gmPN+SN /2 PN+SNdPmgrS-nS
gmPN+SN /2 PN+SNdPmgrS-nS PN+SNdPmgrS-nS PN+SNdPmgrS-nS
`],

[Raags.MianMalhar, `
H:Mian ki Malhar 
H: mattataal gat
T: mattataal 
S:7
H: sthayi
{-n-M}{-P-n}{-D-N}S{RR}P{gM}R{-nS}
{MR}{PM}{Pn}D{DN+S_}{nP}{nPMP}{gM}{RS}
H: antara
{MP}{MP}{DN}+S_{DN+S+R}{N+S}{Dn}{MP}
{+S+M+g+M}{+R+S}{DN}P{MPDN}+S{NP}{gM}{RS}


H: teentaal gat
T: teen
S:9
H: sthayi
RRPP gMRS -n_-n-D-N-NS_
SSMRP_MP {DN}+SDnP_MP
MPnDNNS_ DnMPgMRS
H: antara
MPnDNN+S_ +R+RN+SndN+S
+R{+R+P}+M+P+g+M+R+S DnMPgMRS
`],

[Raags.AhirBhairav, `
H:Ahir Bhairav (mattataal)
T: matta
S:7
H: sthayi
{Gr}{Sn}{Sr}G{GMP_}M{GM}rS
{Sr}{GM}{PD}nD{+Sn}{DP}{MG}{rS}
H: antara
{DM}{PD}{n+r}+S{nD}{PM}{GMPM}{PDPD}{nDn+S}
{DN}{+S+S}{+r+G}{+G+r}{+S+S}{nD}{P+S}{nD}{PM}
H:Ahir Bhairav (teentaal)
B:16
S:6
H: sthayi
/2 rS-nS GrSr MGrG PMGr S-nD-nSr /1 G_,GrS
/2 rS-nSGrSrMGrGPMGrS-nD-nSr /1 G_ /2 D-nSrG_ SrGMP_ GMPDn_ PDn+S+r_ /1 {+r+S}n {nD}P {PM}G {Gr}S {Sn}D {DN}{Sr}G,{DN}{Sr}G,{DN}{Sr} G_,GrS
H: antara
/2 rS-nSGrSrMGrGPMGrS-nD-nSr /1 GMPDn+R+S /2 nSDnPDMPGMSrGMPDn+R /1 +S_,nDn+rS {Dn}{+Sr}+G, {GM}{PD}n, {Sr}{GM}P, {-D-n}{Sr}{Gr}{Sr}G_, {-D-n}{Sr}{Gr}{Sr}G_, {-D-n}{Sr}{Gr}{Sr}G_,GrS
`],

[Raags.BrindavaniSarang, `
H:Brindavani Sarang (jhaptaal)
T: jhaptaal
S:1
H:sthayi
NNSS{N+S+R+S}n{PM}PR{MP}
MM{RM}{Pn}{MP}M_R-NS
M_{RS}{NS}{RM}P_nMP
MPN+SR{+S+R+Sn}{PnPM}{RMRS}{-nSRM}{PN+S+R}
H:antara
MMP{nP}N+S_{+RN}+S+S
N_+S_+R+S_NP{NP}
+R_+R_+M+R_N+S+S
MPN+S+RN+SnMP
MPN+S+R{+S+R+Sn}{PnPM}{RMRS}{-nSRM}{PN+S+R}

H: Brindavani Sarang (teentaal)
T: Teen
S: 9
H: sthayi
/2 -NSRMRSRMPnPMPN+S+R /1 S_nPMRS_
RMRMSR-NS /2 nPPM PMMR MRRS SR-NS
H: antara
{MP}{N+S}nPRMPN+S_+SN+S+R+S_
+S+RN+SPnMPRMSR-NRS_
`],

[Raags.Bhimpalas, `
H: Bhimpalas (matta taal)
T: mattataal
S: 7
{nD}{PM}{gM}P{Mg}{gR}{RS}{-NR}S
{-nS}{gM}{Pn}+S{nD}{PM}{gMPn}{+SnDP}{MgRS}
{gMgM}{PMPn}{Pn+Sn}+S_{Pn}{+S+g}+R+S
{g__M}{__P_}{_n__}+S_{Pn}{+S+g}+R+S
{+S+P+M+S}{+M+g+S+g}{+R+S+R+S}n{DP}{MP}{gMPn}{+SnDP}{MgRS}

H: Bhimpalas (teentaal)
T: Teen
S: 9
H: sthayi
P+S{nD}{PM}{Pn}{DP}{Mg}{RS} SMMgMPP_
S{SP}MP{Mg}{Mg}RS{Pn}+S{ND}{PM}{gM}P{Mg}{RS}
H: antara
{MP}n{DP}{MP}gMPn+S_+Sn{+S+M}{+g+M}{+g+R}+S
{+S+M}{+S+M}{+g+R}{+Sn}{P+S}{P+S}{nD}{PM}{SM}{SM}{gR}{S-n}{-nS}{gS}{gM}{gM}
`],

[Raags.Yaman, `
H: Yaman
T: Teen
S: 9

H: sthayi
/2 N+R+SNDPmGRGRS -nRGR /1 G_GR G{mG}MP
PRmRS_S_ -n-D-nS-n-D-P-P
-nR -nR mGmD /2 NDmDn+R+SNDPmGRS-nS

H: antara
/2 mDNDPmGR GR /1 G{MD}{_N} +S_,NDN+R+S_
N+RN+G+R DND+RN mDN DN+S+ NDPmDN+R /2 NDmDN+R+G+R+SNDPmGRS
`],

[Raags.Janasammohini, `
H: Janasammohini
T: Teen
S: 9

H: sthayi
2/ SGGPP+S+SnnDDPPGGRG__GRRSS-n-nS_
2/ GGGGPPPPDDDDnnnn+S+S+S+S+G+G+G+G +G+R+R+S+SnnDDPPGGRRS

H: antara
2/ nDDPPGGPPDDnn+R+S__ +SnnDDnn+S__
2/ +S+G+G+P+P+G+G+R+R+S+SnnDDPPGGRRS nSSG SGGP SGGPGPPD GPPDPDDn PDDnDnn+Sn+S Dnn+Sn+S+S+G n+S+S+G+S+G+S+G+G+P +G+R+R+S+SnnDDPPGGRRS 
`],

[Raags.Malkauns, `
H: Malkauns (gat 1)
T: teentaal
S: 9

H: sthayi 
gMgS-nS-d-n S_M_gMgS
-nSgMddM_ dndMgMgS

H: antara
gMdn+S_+S_ dn+Sn+S+g+S_
+S+G+M+G+SndM dndMgMgS

H: Malkauns (gat 2)
H: sthayi
{gS}-nS, {dM}gM, {+Sn}{dn} +S_, +SdndM_
gMdMgMgS {dn}+S {nd}M, {gM}d {Mg}S 
H: antara
/2 gMMgMddMdnndn+S+Sn /1 +S_, +Sn{dM}{dn}+S_ 
dn+S+g +M+g+Sn, {dn}+S {nd}M, {gM}d {Mg}S
`],

[Raags.Darbari, `
H: Darbari (gat 1)
T: ektaal
S: 1

H:sthayi
R_RRSS -nS{RS}-d-n-P
S_SRSR Pg_MRS
H:sthayi
MPd_n_+S_n+S_+S 
P+R_+R+R+Sn+S {n+S}{+R+S}{dn}P 
MP+S_ {nP}g_-MRS-nS
`]
]);
